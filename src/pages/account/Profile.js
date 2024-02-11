import { Alert, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { TextInput, Button, Text, Dialog, Portal, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { doPOST, doPUT } from '../../api/httpUtil';
import { ENDPOINTS } from '../../api/constants';
import { addDetails } from '../../store/slices/user';

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
        <Layout>
            <TextInput
                label="Name"
                value={data?.name}
                onChangeText={(val) => handleChange('name', val)}
                style={styles.input}
                mode="outlined"
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
                label="Email"
                value={data?.email}
                onChangeText={(val) => handleChange('email', val)}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="New Password (Optional)"
                placeholder='Enter New Password'
                value={data?.password}
                onChangeText={(val) => handleChange('password', val)}
                style={styles.input}
                mode="outlined"
                secureTextEntry={true}
            />
            <Button disabled={!!(!data.name || !data.email)} mode="contained" onPress={updateProfile} style={styles.btn}>
                Save
            </Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Error</Dialog.Title>
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

export default Profile

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
    }
})