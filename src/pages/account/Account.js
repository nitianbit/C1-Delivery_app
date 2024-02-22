import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Layout from '../../components/layout'
import { SCREEN } from '../../navigation/utils'
import { Card, Text, Icon, MD3Colors, Avatar } from 'react-native-paper'
import { COLOR, width } from '../../utils/constants'
import ArrowRight from '../../assets/icons/ArrowRight'
import { useSelector } from 'react-redux'
import { removeLocalStorageItem } from '../../storage'
import { STORAGE_KEYS } from '../../storage/constants'
import User from '../../assets/icons/User'
import { UserLogo } from '../../utils/constants'
import BottomView from '../../components/BottomView'
import TopView from '../../components/TopView'



const data = [
    { screen: 'Profile', key: SCREEN.PROFILE },
    { screen: 'My Orders', key: SCREEN.ORDERS },
]

const Account = ({ navigation }) => {
    const user = useSelector(state => state.user.details);

    return (
        <Layout style={{ justifyContent: 'flex-start', }}>

            <TopView>
                <Image style={{ height: 100, width: 100 }} source={UserLogo} />
                <Text variant="titleLarge" style={{ color: COLOR.DARK, fontWeight: 'bold' }}>Hello {user?.name}!</Text>
                <Text variant="bodyMedium" style={{ color: COLOR.DARK }}> {user?.email}</Text>
            </TopView>


            <BottomView>
                <FlatList
                    data={data}
                    style={styles.flatlist}
                    renderItem={({ item, index }) => <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.key)}>
                        <Text style={styles.item}>{item.screen}</Text>
                        <ArrowRight fill={COLOR.textColor} />

                    </TouchableOpacity>
                    }
                />
                <TouchableOpacity style={styles.card} onPress={async () => {
                    await removeLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN)
                    navigation.reset({ index: 0, routes: [{ name: SCREEN.LOGIN }] })
                }}>
                    <Text style={[styles.item, { fontWeight: 'bold' }]}>Log Out</Text>
                    <ArrowRight fill={COLOR.textColor} />
                </TouchableOpacity>
            </BottomView>
        </Layout>
    )
}

export default Account

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        width: width - 40,
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: COLOR.panelBackground,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center'
    },
    flatlist: {
        marginTop: 50
    },
    item: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLOR.textColor
    },
    user: {
        width: '100%',
        marginTop: 50
    },
    userIcon: {
        borderWidth: 1,
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: '#ddd',
    },
    topView: {
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.SECONDARY_WHITE,
        height: '35%',
        width: width
    }
})