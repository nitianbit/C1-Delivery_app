import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { TextInput, Button, Text } from 'react-native-paper';

const Profile = () => {

    const [data, setData] = useState({
        phone: null,
        password: null,
        email: null,
        name: ''
    });

    const handleChange = (key, value) => setData(prev => ({ ...prev, [key]: value }))

    return (
        <Layout>
            <TextInput
                label="Name"
                value={data?.name}
                onChangeText={(val) => handleChange('name', val)}
                style={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Phone"
                value={data?.phone}
                onChangeText={(val) => handleChange('phone', val)}
                style={styles.input}
                keyboardType={"number-pad"}
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
                secureTextEntry={true}
            />
            <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.btn}>
                Save
            </Button>
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