import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Button, Card, Text } from 'react-native-paper';
import { AppStyles } from '../../common/styles';





const StoreDetail = () => {

    const handleChange = (key, value) => {
        console.log({ key, value })
    }


    return (
        <Layout>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={[AppStyles.row, styles.cardRow]}>
                        <View style={styles.info}>
                            <Text variant="bodyMedium">  Dal</Text>
                        </View>
                        <Image style={{ width: 80, height: 80, borderRadius: 10 }} resizeMethod='cover' source={{ uri: 'https://picsum.photos/700' }} />
                    </View>
                </Card.Content>
                <View style={styles.btnRow}>
                    <TouchableOpacity style={[styles.btn, styles.startBtn]}>
                        <Text style={styles.btnText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} disabled>
                        <Text style={styles.btnText}>10</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.endBtn]}>
                        <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>
                </View>
            </Card>

        </Layout>
    )
}

export default StoreDetail

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginVertical: 10,
    },
    btnRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 10,
        marginBottom: 5,
        paddingRight: 10
        // position: 'absolute',
        // bottom: -10
    },
    btn: {
        margin: 0,
        paddingVertical: 5,
        backgroundColor: 'red',
        borderRadius: 0,
        color: '#fff',
        paddingHorizontal: 12,

    },
    card: {
        width: '100%',
        marginVertical: 10
    },
    startBtn: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    endBtn: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    btnText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16
    },
    cardRow: {
        width: '100%',
        alignItems: 'center'
    },
    info: {
        display: 'flex',
        flexGrow: 1,
        paddingRight: 10,
        width: '74%',
    }
}) 