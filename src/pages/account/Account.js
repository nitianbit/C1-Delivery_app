import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Layout from '../../components/layout'
import { SCREEN } from '../../navigation/utils'
import { Card, Text, Icon, MD3Colors } from 'react-native-paper'
import { width } from '../../utils/constants'
import ArrowRight from '../../assets/icons/ArrowRight'
import { useSelector } from 'react-redux'



const data = [
    { screen: 'Profile', key: SCREEN.PROFILE },
    { screen: 'My Orders', key: SCREEN.ORDERS },
]

const Account = ({ navigation }) => {
    const user = useSelector(state => state.user.details);

    return (
        <Layout>
            <View style={styles.user}>
                <Text variant="headlineMedium">Hello {user?.name}!</Text>
                <Text variant="bodyMedium"> {user?.email}</Text>
            </View>
            <FlatList
                data={data}
                style={styles.flatlist}
                renderItem={({ item, index }) => <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.key)}>
                    <Text style={styles.item}>{item.screen}</Text>
                    <ArrowRight />

                </TouchableOpacity>
                }
            />
        </Layout>
    )
}

export default Account

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        width: width - 40,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        alignItems: 'center'
    },
    flatlist: {
        marginTop: 50
    },
    item: {
        fontSize: 18,
        fontWeight: '500'
    },
    user: {
        width: '100%',
        marginTop: 50
    }
})