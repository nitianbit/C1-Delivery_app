import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Button, Card, Text } from 'react-native-paper';
import { SCREEN } from '../../navigation/utils';
import { COLOR, Logo, UserLogo, width } from '../../utils/constants';
import Banner from '../../assets/images/Logo.jpeg'
import BottomView from '../../components/BottomView';
import TopView from '../../components/TopView';
import { AppStyles } from '../../common/styles';
import useBackHandler from '../../hooks/useBackHandler';





const Dashboard = ({ navigation }) => {
    useBackHandler(true)
    const handleChange = () => navigation.navigate(SCREEN.STOREDETAIL);


    return (
        <Layout style={styles.layout}>
            {/* <Image source={Banner} style={styles.banner} /> */}
            <TopView>
                <Image source={Logo} style={styles.banner} />

            </TopView>
            <BottomView>
                <TouchableOpacity onPress={handleChange} style={styles.card}>
                    <View style={styles.imageRow}>
                        <Image style={{ height: 80, width: 80, borderRadius: 20 }} source={Logo} />
                        <View style={{ flexShrink: 1, marginLeft: 10 }}>
                            <Text style={{ color: COLOR.textColor, ...AppStyles.fontStyle }} variant="titleLarge">Roti Basket</Text>
                            <Text numberOfLines={2} variant="bodyMedium" style={styles.desc}>{/* ChapatiBasket is a mobile application that allows users to order and purchase chapati, a traditional Indian flatbread. */} The app offers a variety of chapati options and allows for easy and convenient ordering and payment</Text>
                        </View>
                    </View>
                    <Text variant="titleMedium" style={styles.orderNow}>Order Now</Text>
                </TouchableOpacity>

            </BottomView>
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
        width: width - 45,
        marginVertical: 10,
        marginVertical: 10,
        backgroundColor: COLOR.panelBackground,
        ...AppStyles.shadow,
        borderRadius: 10,
        padding: 10
    },
    desc: {
        marginVertical: 10,
        color: COLOR.textColor,
        ...AppStyles.fontStyle
    },
    layout: {
        justifyContent: 'flex-start',
    },
    orderNow: {
        textAlign: 'right',
        padding: 10,
        color: COLOR.textColor,
        ...AppStyles.fontStyle
    },
    imageRow: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    banner: {
        height: '100%',
        width: width,
        borderRadius: 10,
        // marginTop: 10
    }
})