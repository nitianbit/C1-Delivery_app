import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import { getLocalStorageItem } from '../../storage'
import { STORAGE_KEYS } from '../../storage/constants'
import { doGET } from '../../api/httpUtil'
import { ENDPOINTS } from '../../api/constants'
import { SCREEN } from '../../navigation/utils'
import { useDispatch } from 'react-redux'
import { addDetails } from '../../store/slices/user'

const Splash = ({ navigation }) => {
    const dispatch = useDispatch();
    const fetchUserDetails = async () => {
        try {
            const token = await getLocalStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
            console.log(token)
            if (!token) {
                return navigation.reset({ index: 0, routes: [{ name: SCREEN.LOGIN }] });
            }
            const response = await doGET(ENDPOINTS.currentUser);
            console.log(response);
            if (response.data.status === 401) {
                return navigation.reset({ index: 0, routes: [{ name: SCREEN.LOGIN }] });
            }
            if (response.data.status === 200) {
                dispatch(addDetails(response.data.data));
                navigation.navigate(SCREEN.TABS)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, [])

    return (
        <Layout style={styles.container}>
            <Text style={styles.text}>Welcome</Text>
            <Text style={styles.text}>Delivery App</Text>
        </Layout>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000'
    },
    text: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 30,

    }
})