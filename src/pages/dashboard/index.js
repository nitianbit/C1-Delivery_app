import { Image, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Button, Card, Text } from 'react-native-paper';
import { SCREEN } from '../../navigation/utils';
import { width } from '../../utils/constants';
import Banner from '../../assets/images/Logo.jpeg'





const Dashboard = ({ navigation }) => {

    const handleChange = () => navigation.navigate(SCREEN.STOREDETAIL);


    return (
        <Layout style={styles.layout}>
            <Image source={Banner} style={styles.banner} />
            <Card onPress={handleChange} style={styles.card}>
                <Card.Content style={styles.imageRow}>
                    <Image style={{ height: 80, width: 80, borderRadius: 20 }} source={{ uri: 'https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg' }} />
                    <View style={{ flexShrink: 1, marginLeft: 10 }}>
                        <Text variant="titleLarge">ChapatiBasket</Text>
                        <Text numberOfLines={2} variant="bodyMedium" style={styles.desc}>{/* ChapatiBasket is a mobile application that allows users to order and purchase chapati, a traditional Indian flatbread. */} The app offers a variety of chapati options and allows for easy and convenient ordering and payment</Text>
                    </View>
                </Card.Content>
                <Text variant="titleMedium" style={styles.orderNow}>Order Now</Text>
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
        marginVertical: 10,
    },
    layout: {
        justifyContent: 'flex-start',
    },
    orderNow: {
        textAlign: 'right',
        padding: 10,
    },
    imageRow: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    banner: {
        height: 200,
        width: width - 20,
        borderRadius: 10,
        marginTop: 10
    }
})