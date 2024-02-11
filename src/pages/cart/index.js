import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CartItem from '../../components/CartItem';
import Layout from '../../components/layout';
import { width } from '../../utils/constants';


const data = [
    { title: 'Dal', description: 'This is simple and special Dal. ' },
    { title: 'Roti', description: 'This is simple and special Roti. ' },
    { title: 'Butter Roti', description: 'This is simple and special Butter Roti. ' },
    { title: 'Kadhai Paneer', description: 'This is simple and special dhai Paneer. ' },
    { title: 'Frid Rice', description: 'This is simple and special Frid Rice. ' },
]



const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    console.log(cartItems)

    return (
        <Layout>
            <FlatList
                data={cartItems}
                renderItem={({ item, index }) => <CartItem key={index} {...item} />}
            />
            <Button disabled={!cartItems.length} style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
                Checkout
            </Button>

        </Layout>
    )
}

export default Cart

const styles = StyleSheet.create({
    btn: {
        marginBottom: 10,
        width: width - 40
    }
}) 