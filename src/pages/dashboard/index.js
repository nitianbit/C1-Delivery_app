import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Button, Card, Text } from 'react-native-paper';





const Dashboard = () => {

    const handleChange = (key, value) => {
        console.log({ key, value })
    }


    return (
        <Layout>
            <Card onPress={handleChange} style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge">  title</Text>
                    <Text variant="bodyMedium">  content</Text>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
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
    }
})