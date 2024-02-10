import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { TextInput } from 'react-native-paper';
import { width } from '../../utils/constants';
import { Button } from 'react-native-paper';
import { Text } from 'react-native-paper';




const Login = () => {
    const [data, setData] = useState({
        phone: null,
        password: null,
        email: null
    })

    const handleChange = (key, value) => {
        console.log({ key, value })
    }
    return (
        <Layout>
            <Text variant="displaySmall">Welcome Back!</Text>
            <TextInput
                label="Phone"
                value={data?.phone}
                onChangeText={(val) => handleChange('phone', val)}
                keyboardType="numeric"
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
            <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.btn}>
                Continue
            </Button>
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
    }
})