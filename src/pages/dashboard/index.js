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
                    <Text variant="titleLarge">Restaurant Name</Text>
                    <Text variant="bodyMedium" style={styles.desc}>Restaurant Description</Text>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
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
    }
})