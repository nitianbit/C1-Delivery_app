import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { TextInput } from 'react-native-paper';
import { COLOR, Delivery, Logo, width } from '../../utils/constants';
import { Button } from 'react-native-paper';
import { Text, Dialog, Portal, PaperProvider, } from 'react-native-paper';
import { doPOST } from '../../api/httpUtil';
import { ENDPOINTS } from '../../api/constants';
import { SCREEN } from '../../navigation/utils';
import { useDispatch } from 'react-redux';
import { addDetails } from '../../store/slices/user';
import BottomView from '../../components/BottomView';
import { useLoading } from '../../hooks';




const Signup = ({ navigation }) => {
    const { loading, toggleLoading } = useLoading();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        name: null,
        password: null,
        email: null
    });
    const [visible, setVisible] = React.useState(false);
    const [error, setError] = useState('')
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);


    const handleChange = (key, value) => setData(prev => ({ ...prev, [key]: value }))


    const handleContinue = async () => {
        try {
            if (loading) {
                return;
            }
            if (!data.name || !data.email || !data.password) {
                setError('Please fill all the details.')
                return showDialog(true)
            }
            toggleLoading(true)
            const response = await doPOST(ENDPOINTS.signup, data);
            console.log(response)
            if (response?.data?.status >= 400) {
                setError(response.data?.message)
                showDialog(true);
                return;
            }
            navigation.navigate(SCREEN.LOGIN)
            // dispatch(addDetails(response.data.data))

        } catch (error) {

        } finally {
            toggleLoading(false)
        }
    }

    return (
        <Layout style={styles.layout}>
            <Image resizeMode='contain' style={styles.image} source={Delivery} />

            <BottomView>
                <Text style={{ textAlign: 'center', marginVertical: 25 }} variant="titleLarge">Sign Up!</Text>
                <TextInput
                    label={<Text>Name</Text>}
                    value={data?.name}
                    onChangeText={(val) => handleChange('name', val)}
                    style={styles.input}
                    mode="flat"
                    activeUnderlineColor={COLOR.SECONDARY_COLOR}
                    underlineColor={COLOR.SECONDARY_COLOR}
                    textColor={COLOR.DARK}
                    cursorColor={COLOR.DARK}

                />
                <TextInput
                    label={<Text>Email</Text>}
                    value={data?.email}
                    onChangeText={(val) => handleChange('email', val)}
                    style={styles.input}
                    mode="flat"
                    activeUnderlineColor={COLOR.SECONDARY_COLOR}
                    underlineColor={COLOR.SECONDARY_COLOR}
                    textColor={COLOR.DARK}
                    cursorColor={COLOR.DARK}

                />
                <TextInput
                    label={<Text>Password</Text>}
                    value={data?.password}
                    onChangeText={(val) => handleChange('password', val)}
                    style={styles.input}
                    mode="flat"
                    activeUnderlineColor={COLOR.SECONDARY_COLOR}
                    underlineColor={COLOR.SECONDARY_COLOR}
                    textColor={COLOR.DARK}
                    cursorColor={COLOR.DARK}

                />
                <Button loading={loading} textColor='#fff' dark={true} mode="elevated" style={styles.btn} onPress={handleContinue}>
                    Continue
                </Button>
                <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate(SCREEN.LOGIN)}>
                    <Text variant="labelLarge" >Already have an account? Login</Text>
                </TouchableOpacity>

                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Content>
                            <Text variant="bodyMedium">{error}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </BottomView>
        </Layout>
    )
}

export default Signup

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: COLOR.BG_COLOR,
        borderWidth: 1,
        borderColor: COLOR.SECONDARY_COLOR,
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
        width: width
    }
})