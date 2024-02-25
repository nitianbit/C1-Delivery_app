import { StyleSheet, TouchableOpacity, View, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { TextInput } from 'react-native-paper';
import { COLOR, FONT, width } from '../../utils/constants';
import { Button, Dialog, Portal, } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { SCREEN } from '../../navigation/utils';
import { useDispatch } from 'react-redux';
import { ENDPOINTS } from '../../api/constants';
import { doPOST } from '../../api/httpUtil';
import { setLocalStorageItem } from '../../storage';
import { STORAGE_KEYS } from '../../storage/constants';
import { addDetails } from '../../store/slices/user';
import BottomView from '../../components/BottomView';
import { Logo, Delivery } from '../../utils/constants';
import { useLoading } from '../../hooks';
import { MyText, MyTextInput } from '../../components/MyText';



const Login = ({ navigation }) => {
    const { loading, toggleLoading } = useLoading()
    const dispatch = useDispatch();
    const [data, setData] = useState({
        password: null,
        email: null
    });
    const [visible, setVisible] = React.useState(false);
    const [error, setError] = useState('')
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const handleChange = (key, value) => setData(prev => ({ ...prev, [key]: value }));

    const handleContinue = async () => {
        try {
            if (loading) {
                return;
            }
            if (!data.email || !data.password) {
                setError('Please fill all the details.')
                return showDialog(true)
            }
            toggleLoading(true)
            const response = await doPOST(ENDPOINTS.login, data);
            console.log(response);
            if (response?.data?.status >= 400 || response?.status >= 400) {
                setError(response.data?.message)
                showDialog(true);
                return;
            }
            setLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN, response?.data?.data?.token)
            dispatch(addDetails(response?.data?.data?.user))
            navigation.navigate(SCREEN.TABS)
        } catch (error) {

        } finally {
            toggleLoading(false);
        }
    }


    return (
        <Layout style={styles.layout}>
            <Image resizeMode='contain' style={styles.image} source={Delivery} />
            <BottomView>
                <Text style={{ marginVertical: 25, color: COLOR.textColor, fontFamily: FONT.HELVETICA_MEDIUM[Platform.OS] }} variant="titleLarge">Welcome Back!</Text>
                <TextInput
                    label={<Text style={{ color: COLOR.textColor, fontFamily: FONT.HELVETICA_MEDIUM[Platform.OS] }}>Email</Text>}
                    value={data?.email}
                    onChangeText={(val) => handleChange('email', val)}
                    // keyboardType="numeric"
                    style={styles.input}
                    mode="flat"
                    activeUnderlineColor={COLOR.panelBackground}
                    underlineColor={COLOR.panelBackground}
                    textColor={COLOR.textColor}
                    cursorColor={COLOR.textColor}
                />
                <TextInput
                    label={<Text style={{ color: COLOR.textColor, fontFamily: FONT.HELVETICA_MEDIUM[Platform.OS] }}>Password</Text>}
                    value={data?.password}
                    onChangeText={(val) => handleChange('password', val)}
                    style={styles.input}
                    mode="flat"
                    activeUnderlineColor={COLOR.panelBackground}
                    underlineColor={COLOR.panelBackground}
                    textColor={COLOR.textColor}
                    cursorColor={COLOR.textColor}

                />
                <Button textColor='#FFF' loading={loading} mode="contained" onPress={handleContinue} style={styles.btn}>
                    Continue
                </Button>

                <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate(SCREEN.SIGNUP)}>
                    <Text variant="titleMedium" style={{
                        color: COLOR.textColor,
                        fontFamily: FONT.HELVETICA_MEDIUM[Platform.OS]
                    }} >New User? signup</Text>
                </TouchableOpacity>
                <Portal >
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Content>
                            <Text style={{ fontFamily: FONT.HELVETICA_MEDIUM[Platform.OS] }} variant="bodyMedium">{error}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </BottomView>

        </Layout>
    )
}

export default Login

const styles = StyleSheet.create({
    input: {
        width: width - 40,
        marginVertical: 10,
        backgroundColor: COLOR.panelBackground,
        borderWidth: 1,
        borderColor: COLOR.panelBackground,
        borderRadius: 10,
    },
    btn: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: COLOR.THEME_COLOR,
        // position: 'absolute',
        // bottom: 20
    },
    signupBtn: {
        // position: 'absolute',
        // bottom: 0,
        paddingVertical: 10,

    },
    signupText: {
        fontWeight: '500',

    },
    layout: {
        backgroundColor: COLOR.SECONDARY_WHITE,
        justifyContent: 'flex-start'
    },
    image: {
        height: '35%',
        width: width,
    }
})