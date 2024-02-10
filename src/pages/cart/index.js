import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CartItem from '../../components/CartItem';
import Layout from '../../components/layout';


const data = [
    { title: 'Dal', description: 'This is simple and special Dal. ' },
    { title: 'Roti', description: 'This is simple and special Roti. ' },
    { title: 'Butter Roti', description: 'This is simple and special Butter Roti. ' },
    { title: 'Kadhai Paneer', description: 'This is simple and special dhai Paneer. ' },
    { title: 'Frid Rice', description: 'This is simple and special Frid Rice. ' }
]



const Cart = () => {

    return (
        <Layout>
            <FlatList
                data={data}
                renderItem={({ item, index }) => <CartItem key={index} {...item} />}
            />

        </Layout>
    )
}

export default Cart

const styles = StyleSheet.create({

}) 