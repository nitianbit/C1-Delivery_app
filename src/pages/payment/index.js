import React, { useState } from 'react';
import { Alert, FlatList, Linking, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text, Card, Checkbox, Switch, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ENDPOINTS } from '../../api/constants';
import { doPOST } from '../../api/httpUtil';
import CartItem from '../../components/CartItem';
import Layout from '../../components/layout';
import { emptyCart } from '../../store/slices/items';
import { width } from '../../utils/constants';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import CopyIcon from '../../assets/icons/CopyIcon';
import ArrowRight from '../../assets/icons/ArrowRight';



const Payment = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);


    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('')
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [upi, setUpi] = useState('test@paytm.com');
    const [paymentDone, setpaymentDone] = React.useState(false);

    let phoneNumber = '999999999'
    const whatsAppUrl = `https://wa.me/${phoneNumber}`;


    const copyToClipboard = () => {
        Clipboard.setString(upi);
        Alert.alert('UPI Copied!')
    };


    const sendWhatsApp = () => {
        Linking.openURL(whatsAppUrl)
    }



    const handleContinue = async () => {
        try {
            const items = cartItems?.map(item => ({ menuItemId: item._id, quantity: item.quantity, name: item.name }));
            console.log(items)
            const response = await doPOST(ENDPOINTS.orderCreate, { items, address: route?.params?.address });

            if (response?.data?.status >= 400) {
                setError(response.data?.message)
                showDialog(true)
            }

            if (response.data.status === 200 || response.data.status === 201) {
                //remove from localstorage the cartItems
                //empty redux store cartItems
                //move to Tabs page

                dispatch(emptyCart())
                navigation.navigate(SCREEN.TABS)
            }
        } catch (error) {

        }
    }
    return (
        <Layout style={styles.container}>
            <ScrollView bounces={false} contentContainerStyle={styles.ScrollView} showsVerticalScrollIndicator={false}>
                <Text style={{ textAlign: 'center' }} variant="titleMedium">Scan this QR code or copy the UPI for payment. After successful payment, send the screenshot to the WhatsApp number below.</Text>
                <View style={{ marginTop: 50 }} />
                <QRCode
                    value={upi}
                    size={200}
                    logoBackgroundColor='transparent'

                />
                <View style={{ marginBottom: 20 }} />
                <Text variant="bodyLarge">OR </Text>
                <Card style={styles.card} onPress={copyToClipboard}>
                    <Card.Content style={styles.content}>
                        <Text variant="bodyLarge">UPI ID: {upi} </Text>
                        <CopyIcon />
                    </Card.Content>
                </Card>
                <Card style={styles.card} onPress={sendWhatsApp}>
                    <Card.Content style={styles.content}>
                        <Text variant="bodyLarge">Send Screenshot to Whatsapp </Text>
                        <ArrowRight />
                    </Card.Content>
                </Card>
                <Card style={styles.card} onPress={sendWhatsApp}>
                    <Card.Content style={styles.content}>
                        <Text variant="bodyLarge">Payment Done </Text>
                        <Switch
                            value={paymentDone}
                            onValueChange={() => {
                                setpaymentDone(prev => !prev);
                            }}
                        />
                    </Card.Content>
                </Card>


                <Button disabled={!paymentDone} style={styles.btn} mode="contained" onPress={handleContinue}>
                    Order
                </Button>
            </ScrollView>
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

export default Payment

const styles = StyleSheet.create({
    card: {
        width: '100%',
        marginVertical: 10
    },
    container: {
        justifyContent: 'flex-start'
    },
    ScrollView: {
        flexGrow: 1,
        alignItems: 'center'
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        marginVertical: 10,
        width: width - 40,
        paddingVertical: 5
    },
})