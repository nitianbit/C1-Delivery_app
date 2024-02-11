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
            console.log(JSON.stringify(orders.data))
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
                style={{ width: '100%' }}
                renderItem={({ item: order, index }) => <Card key={index} style={styles.card}>
                    <Card.Content>
                        <View style={styles.statusRow}>
                            <Text variant="bodyLarge" > Order Status: </Text>
                            <Text variant="bodyLarge" style={{}}>  {order?.status}</Text>

                        </View>
                        <View style={[styles.statusRow, { marginBottom: 10 }]}>
                            <Text variant="bodyLarge" > Total Amount: </Text>
                            <Text variant="bodyLarge" style={{}}>  Rs.{order?.totalAmount}</Text>

                        </View>

                        {
                            order?.items?.map((item, itemIndex) => <Text key={itemIndex} variant="bodySmall">{item.name} x {item.quantity}</Text>)
                        }

                    </Card.Content>
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
    },
    card: {
        width: '100%',
        marginVertical: 10
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})