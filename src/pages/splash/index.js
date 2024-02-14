import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import { getLocalStorageItem, removeLocalStorageItem } from '../../storage'
import { STORAGE_KEYS } from '../../storage/constants'
import { doGET } from '../../api/httpUtil'
import { ENDPOINTS } from '../../api/constants'
import { SCREEN } from '../../navigation/utils'
import { useDispatch } from 'react-redux'
import { addDetails } from '../../store/slices/user'
import { width } from '../../utils/constants'

const Splash = ({ navigation }) => {
    const dispatch = useDispatch();
    const fetchUserDetails = async () => {
        try {
            const token = await getLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
            if (!token) {
                return navigation.reset({ index: 0, routes: [{ name: SCREEN.LOGIN }] });
            }
            const response = await doGET(ENDPOINTS.currentUser);
            console.log(response)
            if (response.data.status === 401) {
                return navigation.reset({ index: 0, routes: [{ name: SCREEN.LOGIN }] });
            }
            else if (response.data.status === 200) {
                dispatch(addDetails(response.data.data));
                navigation.navigate(SCREEN.TABS)
            }
            else if (response.data.status === 500) {
                navigation.reset({ index: 0, routes: [{ name: SCREEN.LOGIN }] });
                await removeLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN)
            }
        } catch (error) {
            console.log(error);
            navigation.reset({ index: 0, routes: [{ name: SCREEN.LOGIN }] });
            await removeLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN)
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, [])

    return (
        <Layout style={styles.container}>
            <Text style={styles.text}>Welcome to</Text>
            <Text style={styles.text}>ChapatiBasket</Text>
            <Image style={styles.image} source={require('../../assets/images/Logo.jpeg')} />
        </Layout>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    },
    text: {
        textAlign: 'center',
        color: '#000',
        fontSize: 30,


    },
    image: {
        width: width - 40,
        aspectRatio: 1,
        height: width - 40,
        borderRadius: 20,
        marginTop: 20
    }
})