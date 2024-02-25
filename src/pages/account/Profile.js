import { Alert, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { TextInput, Button, Text, Dialog, Portal, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { doPOST, doPUT } from '../../api/httpUtil';
import { ENDPOINTS } from '../../api/constants';
import { addDetails } from '../../store/slices/user';
import { COLOR, Logo, UserLogo, width } from '../../utils/constants';
import TopView from '../../components/TopView';
import BottomView from '../../components/BottomView';
import { AppStyles } from '../../common/styles';

const Profile = ({ navigation }) => {
    const user = useSelector(state => state.user.details);
    const dispatch = useDispatch();

    const [visible, setVisible] = React.useState(false);
    const [error, setError] = useState('')
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);


    const [data, setData] = useState({
        phone: null,
        password: null,
        email: null,
        name: ''
    });

    useEffect(() => {
        if (user) {
            setData(user)
        }
    }, [user])

    const handleChange = (key, value) => setData(prev => ({ ...prev, [key]: value }))

    const updateProfile = async () => {
        try {
            if (!data.email || !data.name) {
                setError('Please fill all the details.')
                return showDialog(true)
            }
            const response = await doPUT(ENDPOINTS.userUpdate, data);


            if (response?.data?.status >= 400) {
                setError(response.data?.message)
                showDialog(true);
                return
            }
            console.log("profile updated")

            Alert.alert('Profile Updated')
            dispatch(addDetails(response?.data?.data))
            navigation.goBack()
        } catch (error) {

        }
    }

    return (
        <Layout style={{ justifyContent: 'flex-start' }}>
            <TopView>
                <Image source={UserLogo} style={{ height: 150, width: 150 }} />
            </TopView>
            <BottomView>


                <TextInput
                    label={<Text style={{ color: COLOR.textColor, ...AppStyles.fontStyle }}>Name</Text>}
                    value={data?.name}
                    onChangeText={(val) => handleChange('name', val)}
                    style={styles.input}
                    mode="flat"
                    activeUnderlineColor={COLOR.SECONDARY_COLOR}
                    underlineColor={COLOR.SECONDARY_COLOR}
                    textColor={COLOR.textColor}
                    placeholderTextColor='#999'
                />
                {/* <TextInput
                label="Phone"
                value={data?.phone}
                onChangeText={(val) => handleChange('phone', val)}
                style={styles.input}
                keyboardType={"number-pad"}
                mode="outlined"
            /> */}
                <TextInput
                    label={<Text style={{ color: COLOR.textColor, ...AppStyles.fontStyle }}>Email</Text>}
                    value={data?.email}
                    onChangeText={(val) => handleChange('email', val)}
                    style={styles.input}
                    mode="flat"
                    activeUnderlineColor={COLOR.SECONDARY_COLOR}
                    underlineColor={COLOR.SECONDARY_COLOR}
                    textColor={COLOR.textColor}
                    placeholderTextColor='#999'
                />
                <TextInput
                    label={<Text style={{ color: COLOR.textColor, ...AppStyles.fontStyle }}>New Password (Optional)</Text>}
                    placeholder='Enter New Password'
                    value={data?.password}
                    onChangeText={(val) => handleChange('password', val)}
                    style={styles.input}
                    mode="flat"
                    secureTextEntry={true}
                    activeUnderlineColor={COLOR.SECONDARY_COLOR}
                    underlineColor={COLOR.SECONDARY_COLOR}
                    textColor={COLOR.textColor}
                    placeholderTextColor='#999'

                />
                <Button textColor='#FFF' buttonColor={COLOR.THEME_COLOR} disabled={!!(!data.name || !data.email)} mode="contained" onPress={updateProfile} style={styles.btn}>
                    Save
                </Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Content>
                            <Text style={AppStyles.fontStyle} variant="bodyMedium">{error}</Text>
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

export default Profile

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
        // position: 'absolute',
        // bottom: 20
    },
    banner: {
        height: '100%',
        width: width,
        borderRadius: 10,
    }
})