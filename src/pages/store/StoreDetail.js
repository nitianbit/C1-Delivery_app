import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ENDPOINTS } from '../../api/constants';
import { doGET } from '../../api/httpUtil';
import CartItem from '../../components/CartItem';
import Layout from '../../components/layout';
import { SCREEN } from '../../navigation/utils';
import { width } from '../../utils/constants';


const data = [
    { title: 'Dal', description: 'This is simple and special Dal. ' },
    { title: 'Roti', description: 'This is simple and special Roti. ' },
    { title: 'Butter Roti', description: 'This is simple and special Butter Roti. ' },
    { title: 'Kadhai Paneer', description: 'This is simple and special dhai Paneer. ' },
    { title: 'Frid Rice', description: 'This is simple and special Frid Rice. ' }
]



const StoreDetail = ({ navigation }) => {
    const cartItems = useSelector((state) => state.cart.items)
    const [data, setData] = useState([]);

    const fetchMenu = async () => {
        try {
            const menu = await doGET(ENDPOINTS.menu);
            setData(menu.data?.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchMenu();
    }, [])

    const totalPrice = () => cartItems?.reduce((total, curr) => total + curr.quantity * curr.price, 0)


    return (
        <Layout>
            <FlatList
                data={data}
                renderItem={({ item, index }) => <CartItem key={index} {...item} />}
            />
            {cartItems?.length > 0 ? <Card style={styles.card}>
                <Card.Content>
                    <Text variant="bodyLarge">Total Price:     Rs {totalPrice()}</Text>
                </Card.Content>
            </Card> : null}

            <Button disabled={!cartItems.length} style={styles.btn} mode="contained" onPress={() => navigation.navigate(SCREEN.CART)}>
                Checkout
            </Button>

        </Layout>
    )
}

export default StoreDetail

const styles = StyleSheet.create({
    btn: {
        marginBottom: 10,
        width: width - 40
    },
    card: {
        width: '100%',
        marginVertical: 10
    }
}) 