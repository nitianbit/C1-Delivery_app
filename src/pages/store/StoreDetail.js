import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ENDPOINTS } from '../../api/constants';
import { doGET } from '../../api/httpUtil';
import { AppStyles } from '../../common/styles';
import BottomView from '../../components/BottomView';
import CartItem from '../../components/CartItem';
import Layout from '../../components/layout';
import TopView from '../../components/TopView';
import { SCREEN } from '../../navigation/utils';
import { COLOR, Logo, width } from '../../utils/constants';


const data = [
    { title: 'Dal', description: 'This is simple and special Dal. ' },
    { title: 'Roti', description: 'This is simple and special Roti. ' },
    { title: 'Butter Roti', description: 'This is simple and special Butter Roti. ' },
    { title: 'Kadhai Paneer', description: 'This is simple and special dhai Paneer. ' },
    { title: 'Frid Rice', description: 'This is simple and special Frid Rice. ' }
]



const StoreDetail = ({ navigation }) => {
    const cartItems = useSelector((state) => state.cart.items)
    const [data, setData] = useState([]);

    const fetchMenu = async () => {
        try {
            const menu = await doGET(ENDPOINTS.menu);
            setData(menu.data?.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchMenu();
    }, [])

    const totalPrice = () => cartItems?.reduce((total, curr) => total + curr.quantity * curr.price, 0)


    return (
        <Layout style={{ justifyContent: 'flex-start' }}>
            <TopView>
                <Image source={Logo} style={styles.logo} />
            </TopView>
            <BottomView>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => <CartItem key={index} {...item} />}
                />
                {cartItems?.length > 0 ?
                    <View style={[AppStyles.shadow, { backgroundColor: COLOR.panelBackground, padding: 10, margin: 10, width: width - 45, borderRadius: 10 }]}>
                        <Text style={{ color: COLOR.textColor }} variant="bodyLarge">Total Price:      Rs {totalPrice()}</Text>
                    </View>
                    : null}

                <Button textColor='#fff' buttonColor={COLOR.THEME_COLOR} disabled={!cartItems.length} style={styles.btn} mode="contained" onPress={() => navigation.navigate(SCREEN.CART)}>
                    Checkout
                </Button>
            </BottomView>

        </Layout>
    )
}

export default StoreDetail

const styles = StyleSheet.create({
    btn: {
        marginBottom: 10,
        width: width - 40,
        borderRadius: 10,
        paddingVertical: 6
    },
    card: {
        width: '100%',
        marginVertical: 10
    },
    logo: {
        height: '100%',
        width: width,
        borderRadius: 10,
        // marginTop: 10
    }
}) 