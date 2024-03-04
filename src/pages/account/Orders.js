import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { doGET } from '../../api/httpUtil';
import { ENDPOINTS } from '../../api/constants';
import { COLOR, width } from '../../utils/constants';
import { AppStyles } from '../../common/styles';
import { useLoading } from '../../hooks';
import EmptyCart from '../../assets/icons/EmptyCart';


const data = [

]

const Orders = () => {
    const { loading, toggleLoading } = useLoading()

    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            toggleLoading(true);
            const orders = await doGET(ENDPOINTS.orders);
            console.log(orders?.data?.data)
            setData(orders.data?.data)
        } catch (error) {

        } finally {
            toggleLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <Layout>
            <View style={{ display: 'flex', flex: 1, alignItems: 'center', width: width }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={fetchOrders}
                        />
                    }
                    data={data}
                    style={{ width: '100%' }}
                    renderItem={({ item: order, index }) => <View key={index} style={styles.card}>

                        <View style={styles.statusRow}>
                            <Text style={{ color: COLOR.textColor, ...AppStyles.fontStyle }} variant="bodyLarge" > Order Status: </Text>
                            <Text variant="bodyLarge" style={{ fontWeight: 'bold', ...AppStyles.fontStyle, color: COLOR.textColor }}>  {order?.status}</Text>

                        </View>
                        <View style={[styles.statusRow, { marginBottom: 10 }]}>
                            <Text style={{ color: COLOR.textColor, ...AppStyles.fontStyle }} variant="bodyLarge" > Total Amount: </Text>
                            <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: COLOR.textColor, ...AppStyles.fontStyle }}>  Rs.{order?.totalAmount}</Text>

                        </View>

                        {
                            order?.items?.map((item, itemIndex) => <View key={itemIndex} style={[styles.statusRow, { paddingLeft: 5 }]}>
                                <Text style={{ color: COLOR.textColor, ...AppStyles.fontStyle }} variant="bodySmall">{item.name} x {item.quantity}</Text>
                                {item?.price && item?.quantity ? <Text style={{ color: COLOR.textColor, ...AppStyles.fontStyle }} variant="bodySmall">Rs. {item.price * item.quantity}</Text> : null}
                            </View>)
                        }
                        {order?.driverInfo?.name ?
                            <View>
                                <Text style={{ color: COLOR.textColor, paddingTop: 20 }} variant="bodyLarge">Driver Details:</Text>
                                <View style={[styles.statusRow, { marginBottom: 10 }]}>
                                    <Text style={{ color: COLOR.textColor, ...AppStyles.fontStyle }} variant="bodyMedium" >{order?.driverInfo?.name}</Text>
                                    <Text variant="bodyMedium" style={{ fontWeight: 'bold', color: COLOR.textColor, ...AppStyles.fontStyle }}>{order?.driverInfo?.mob_no}</Text>
                                </View>
                            </View>
                            : null}
                        {order?.status === 'Confirm' && order?.deliveryTime ?
                            <View style={[styles.statusRow, { marginTop: 10 }]}>
                                <Text style={{ color: COLOR.textColor, ...AppStyles.fontStyle }} variant="bodyLarge" >Delivery Time: </Text>
                                <Text variant="bodyLarge" style={{ fontWeight: 'bold', color: COLOR.textColor, ...AppStyles.fontStyle }}>{order?.deliveryTime}</Text>
                            </View>
                            : null}


                    </View>}
                    ListEmptyComponent={() => <View style={styles.noItem}>
                        <EmptyCart />
                        <Text style={[styles.noItemView, AppStyles.fontStyle]}>No Recent Orders.</Text>
                    </View>}
                />

                <View style={[styles.card, { paddingVertical: 5, width: width - 20 }]}>
                    <Text style={{ textAlign: 'center', color: COLOR.textColor, ...AppStyles.fontStyle }}>For any query, Please contact us at 9971164333</Text>
                </View>

            </View>
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
        width: width - 20,
        marginVertical: 10,
        ...AppStyles.shadow,
        backgroundColor: COLOR.panelBackground,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noItem: {
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        marginTop: 200
    },
})