import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text, Card, TextInput } from 'react-native-paper';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { ENDPOINTS } from '../../api/constants';
import { doPOST } from '../../api/httpUtil';
import EmptyCart from '../../assets/icons/EmptyCart';
import { AppStyles } from '../../common/styles';
import BottomView from '../../components/BottomView';
import CartItem from '../../components/CartItem';
import Layout from '../../components/layout';
import TopView from '../../components/TopView';
import { SCREEN } from '../../navigation/utils';
import { emptyCart } from '../../store/slices/items';
import { COLOR, Logo, width } from '../../utils/constants';




const Cart = ({ navigation }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('')
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')


    const handleContinue = async () => {
        try {
            if (!cartItems.length || !address || !phone) {
                return;
            }
            navigation.navigate(SCREEN.PAYMENT, { address, phone });
            return;
            const response = await doPOST(ENDPOINTS.orderCreate, cartItems);

            if (response?.data?.status >= 400) {
                setError(response.data?.message)
                showDialog(true)
            }

            if (response.data.data.status === 200) {
                //remove from localstorage the cartItems
                //empty redux store cartItems
                //move to Tabs page

                //   dispatch(emptyCart())
                //   navigation.navigate(SCREEN.TABS)
            }
        } catch (error) {

        }
    }

    const totalPrice = () => cartItems?.reduce((total, curr) => total + curr.quantity * curr.price, 0)


    return (
        <Layout style={{ justifyContent: 'flex-start' }}>
            <TopView>
                <Image source={Logo} style={styles.logo} />
            </TopView>
            <BottomView>
                <FlatList
                    data={cartItems}
                    renderItem={({ item, index }) => <CartItem key={index} {...item} />}
                    ListEmptyComponent={() => <View style={styles.noItem}>
                        <EmptyCart />
                        <Text style={styles.noItemView}>No Items in cart.</Text>
                    </View>}
                />

                {cartItems?.length > 0 ? <TextInput
                    label={<Text style={{ color: COLOR.textColor }}>Enter Delivery Address</Text>}
                    value={address}
                    onChangeText={text => setAddress(text)}
                    style={styles.card}
                    activeUnderlineColor={COLOR.SECONDARY_COLOR}
                    underlineColor={COLOR.SECONDARY_COLOR}
                    textColor={COLOR.textColor}
                // textColor={COLOR.DARK}
                // cursorColor={COLOR.DARK}
                /> : null}
                {cartItems?.length > 0 ? <TextInput
                    label={<Text style={{ color: COLOR.textColor }}>Enter Phone Number</Text>}
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    style={styles.card}
                    keyboardType="number-pad"
                    activeUnderlineColor={COLOR.SECONDARY_COLOR}
                    underlineColor={COLOR.SECONDARY_COLOR}
                    textColor={COLOR.textColor}
                // textColor={COLOR.DARK}
                // cursorColor={COLOR.DARK}
                /> : null}

                {cartItems?.length > 0 ?
                    <View style={[AppStyles.shadow, { backgroundColor: COLOR.panelBackground, padding: 10, margin: 10, width: width - 45, borderRadius: 10 }]}>
                        <Text style={{ color: COLOR.textColor }} variant="bodyLarge">Total Price:      Rs {totalPrice()}</Text>
                    </View>
                    : null}

                <Button buttonColor={COLOR.DARK} textColor={COLOR.CREAM_WHITE} style={[styles.btn, { opacity: (!cartItems.length || !address || !phone) ? 0.4 : 1 }]} mode="contained" onPress={handleContinue}>
                    Continue for Payment
                </Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Error</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">{error}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </BottomView>

        </Layout>
    )
}

export default Cart

const styles = StyleSheet.create({
    btn: {
        marginBottom: 10,
        width: width - 40,
        borderRadius: 10,
        paddingVertical: 6,
    },
    card: {
        width: '100%',
        marginVertical: 10,
        // backgroundColor: COLOR.BG_COLOR,
        borderWidth: 1,
        borderColor: COLOR.panelBackground,
        backgroundColor: COLOR.panelBackground,
        color: COLOR.textColor
    },
    noItemView: {
        fontSize: 22,
        textAlign: 'center'

    },
    noItem: {
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        marginTop: 200
    },
    logo: {
        height: '100%',
        width: width,
        borderRadius: 10,
        // marginTop: 10
    }
}) 