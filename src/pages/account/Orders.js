import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { doGET } from '../../api/httpUtil';
import { ENDPOINTS } from '../../api/constants';


const data = [

]

const Orders = () => {

    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const orders = await doGET(ENDPOINTS.orders);
            console.log(orders)
            setData(orders.data?.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])


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