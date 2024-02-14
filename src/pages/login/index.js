import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { TextInput } from 'react-native-paper';
import { width } from '../../utils/constants';
import { Button, Dialog, Portal, } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { SCREEN } from '../../navigation/utils';
import { useDispatch } from 'react-redux';
import { ENDPOINTS } from '../../api/constants';
import { doPOST } from '../../api/httpUtil';
import { setLocalStorageItem } from '../../storage';
import { STORAGE_KEYS } from '../../storage/constants';
import { addDetails } from '../../store/slices/user';




const Login = ({ navigation }) => {
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
            if (!data.email || !data.password) {
                setError('Please fill all the details.')
                return showDialog(true)
            }
            const response = await doPOST(ENDPOINTS.login, data);
            console.log(response)
            if (response?.data?.status >= 400 || response?.status >= 400) {
                setError(response.data?.message)
                showDialog(true);
                return;
            }
            setLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN, response?.data?.data?.token)
            dispatch(addDetails(response?.data?.data?.user))
            navigation.navigate(SCREEN.TABS)
        } catch (error) {

        }
    }


    return (
        <Layout>
            <Text variant="displaySmall">Welcome Back!</Text>
            <TextInput
                label="Email"
                value={data?.email}
                onChangeText={(val) => handleChange('email', val)}
                // keyboardType="numeric"
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Password"
                value={data?.password}
                onChangeText={(val) => handleChange('password', val)}
                style={styles.input}
                mode="outlined"
            />
            <Button mode="contained" onPress={handleContinue} style={styles.btn}>
                Continue
            </Button>

            <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate(SCREEN.SIGNUP)}>
                <Text variant="titleMedium" style={{
                    textDecorationLine: 'underline',
                    textDecorationColor: 'blue'
                }} >New User? signup</Text>
            </TouchableOpacity>
            <Portal >
                <Dialog visible={visible} onDismiss={hideDialog}>
                    {/* <Dialog.Title>Error</Dialog.Title> */}
                    <Dialog.Content>
                        <Text variant="bodyMedium">{error}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </Layout>
    )
}

export default Login

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginVertical: 10,
    },
    btn: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        // position: 'absolute',
        // bottom: 20
    },
    signupBtn: {
        position: 'absolute',
        bottom: 0,
        paddingVertical: 10,

    },
    signupText: {
        fontWeight: '500',

    }
})