import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { TextInput } from 'react-native-paper';
import { width } from '../../utils/constants';
import { Button } from 'react-native-paper';
import { Text, Dialog, Portal, PaperProvider, } from 'react-native-paper';
import { doPOST } from '../../api/httpUtil';
import { ENDPOINTS } from '../../api/constants';
import { SCREEN } from '../../navigation/utils';
import { useDispatch } from 'react-redux';
import { addDetails } from '../../store/slices/user';




const Signup = ({ navigation }) => {
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
            if (!data.name || !data.email || !data.password) {
                setError('Please fill all the details.')
                return showDialog(true)
            }
            const response = await doPOST(ENDPOINTS.signup, data);
            console.log(response);

            if (response?.data?.status >= 400) {
                setError(response.data?.message)
                showDialog(true)
            }
            navigation.navigate(SCREEN.LOGIN)
            // dispatch(addDetails(response.data.data))

        } catch (error) {

        }
    }

    return (
        <Layout>
            <Text variant="displaySmall">Sign Up!</Text>
            <TextInput
                label="Name"
                value={data?.name}
                onChangeText={(val) => handleChange('name', val)}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Email"
                value={data?.email}
                onChangeText={(val) => handleChange('email', val)}
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
            <Button disabled={!!(!data.name || !data.email || !data.password)} mode="contained" style={styles.btn} onPress={handleContinue}>
                Continue
            </Button>
            <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate(SCREEN.LOGIN)}>
                <Text variant="labelLarge" >Already have an account? Login</Text>
            </TouchableOpacity>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{error}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </Layout>
    )
}

export default Signup

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