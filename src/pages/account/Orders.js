import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { TextInput, Button, Text, Card } from 'react-native-paper';


const data = [

]

const Orders = () => {

    const [data, setData] = useState({
        phone: null,
        password: null,
        email: null,
        name: ''
    });


    return (
        <Layout>
            <FlatList
                data={data}
                renderItem={({ item, index }) => <Card key={index}   >

                </Card>}
            />


        </Layout>
    )
}

export default Orders

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