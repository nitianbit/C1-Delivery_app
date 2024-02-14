import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Button, Card, Text } from 'react-native-paper';
import { SCREEN } from '../../navigation/utils';





const Dashboard = ({ navigation }) => {

    const handleChange = () => navigation.navigate(SCREEN.STOREDETAIL);


    return (
        <Layout style={styles.layout}>
            <Card onPress={handleChange} style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge">ChapatiBasket</Text>
                    <Text variant="bodyMedium" style={styles.desc}>ChapatiBasket is a mobile application that allows users to order and purchase chapati, a traditional Indian flatbread. The app offers a variety of chapati options and allows for easy and convenient ordering and payment</Text>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg' }} />
                <Text variant="titleLarge" style={styles.orderNow}>Order Now</Text>
            </Card>
        </Layout>
    )
}

export default Dashboard

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
    desc: {
        marginBottom: 10
    },
    layout: {
        justifyContent: 'flex-start'
    },
    orderNow: {
        textAlign: 'right',
        padding: 10,
    }
})