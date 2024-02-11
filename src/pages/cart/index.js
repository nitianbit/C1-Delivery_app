import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text, Card, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ENDPOINTS } from '../../api/constants';
import { doPOST } from '../../api/httpUtil';
import CartItem from '../../components/CartItem';
import Layout from '../../components/layout';
import { SCREEN } from '../../navigation/utils';
import { emptyCart } from '../../store/slices/items';
import { width } from '../../utils/constants';




const Cart = ({ navigation }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    console.log(cartItems);

    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('')
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [address, setAddress] = useState('')


    const handleContinue = async () => {
        try {
            navigation.navigate(SCREEN.PAYMENT, { address });
            return;
            const response = await doPOST(ENDPOINTS.orderCreate, cartItems);
            console.log(response);

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
            />

            <TextInput
                label="Enter Delivery Address"
                value={address}
                onChangeText={text => setAddress(text)}
                style={styles.card}
            />

            {cartItems?.length > 0 ? <Card style={styles.card}>
                <Card.Content>
                    <Text variant="bodyLarge">Total Price:      Rs {totalPrice()}</Text>
                </Card.Content>
            </Card> : null}

            <Button disabled={!cartItems.length} style={styles.btn} mode="contained" onPress={handleContinue}>
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
        width: width - 40
    },
    card: {
        width: '100%',
        marginVertical: 10
    }
}) 