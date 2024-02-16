import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text, Card, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ENDPOINTS } from '../../api/constants';
import { doPOST } from '../../api/httpUtil';
import EmptyCart from '../../assets/icons/EmptyCart';
import CartItem from '../../components/CartItem';
import Layout from '../../components/layout';
import { SCREEN } from '../../navigation/utils';
import { emptyCart } from '../../store/slices/items';
import { COLOR, width } from '../../utils/constants';




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
        <Layout>
            <FlatList
                data={cartItems}
                renderItem={({ item, index }) => <CartItem key={index} {...item} />}
                ListEmptyComponent={() => <View style={styles.noItem}>
                    <EmptyCart />
                    <Text style={styles.noItemView}>No Items in cart.</Text>
                </View>}
            />

            {cartItems?.length > 0 ? <TextInput
                label={<Text>Enter Delivery Address</Text>}
                value={address}
                onChangeText={text => setAddress(text)}
                style={styles.card}
                activeUnderlineColor={COLOR.SECONDARY_COLOR}
                underlineColor={COLOR.SECONDARY_COLOR}
            /> : null}
            {cartItems?.length > 0 ? <TextInput
                label={<Text>Enter Phone Number</Text>}
                value={phone}
                onChangeText={text => setPhone(text)}
                style={styles.card}
                keyboardType="number-pad"
                activeUnderlineColor={COLOR.SECONDARY_COLOR}
                underlineColor={COLOR.SECONDARY_COLOR}
            /> : null}

            {cartItems?.length > 0 ? <Card style={styles.card}>
                <Card.Content>
                    <Text variant="bodyLarge">Total Price:      Rs {totalPrice()}</Text>
                </Card.Content>
            </Card> : null}

            <Button buttonColor={COLOR.THEME_COLOR} disabled={!cartItems.length || !address || !phone} style={styles.btn} mode="contained" onPress={handleContinue}>
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

        </Layout>
    )
}

export default Cart

const styles = StyleSheet.create({
    btn: {
        marginBottom: 10,
        width: width - 20
    },
    card: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: COLOR.BG_COLOR,
        borderWidth: 1,
        borderColor: COLOR.SECONDARY_COLOR,
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
    }
}) 