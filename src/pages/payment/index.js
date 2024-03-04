import React, { useState } from 'react';
import { Alert, FlatList, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Portal, Text, Card, Checkbox, Switch, Snackbar, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ENDPOINTS } from '../../api/constants';
import { doPOST } from '../../api/httpUtil';
import CartItem from '../../components/CartItem';
import Layout from '../../components/layout';
import { emptyCart } from '../../store/slices/items';
import { COLOR, width } from '../../utils/constants';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import CopyIcon from '../../assets/icons/CopyIcon';
import ArrowRight from '../../assets/icons/ArrowRight';
import { SCREEN } from '../../navigation/utils';
import { useLoading } from '../../hooks';
import { AppStyles } from '../../common/styles';



const Payment = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { loading: snackVisible, toggleLoading: toggleSnackVisible } = useLoading()
    const { loading, toggleLoading } = useLoading()
    const cartItems = useSelector(state => state.cart.items);

    const onToggleSnackBar = () => toggleSnackVisible(true);

    const onDismissSnackBar = () => toggleSnackVisible(false);


    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('')
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [upi, setUpi] = useState('9971164333@paytm');
    const [paymentDone, setpaymentDone] = React.useState(false);

    let phoneNumber = '919971164333'
    const whatsAppUrl = `https://wa.me/${phoneNumber}`;


    const copyToClipboard = () => {
        Clipboard.setString(upi);
        // Alert.alert('UPI Copied!')
        onToggleSnackBar()
    };


    const sendWhatsApp = () => {
        Linking.openURL(whatsAppUrl)
    }



    const handleContinue = async () => {
        try {
            if (loading) {
                return;
            }
            if (!paymentDone) {
                return;
            }
            toggleLoading(true)
            const items = cartItems?.map(item => ({ menuItemId: item._id, quantity: item.quantity, name: item.name }));
            const response = await doPOST(ENDPOINTS.orderCreate, { items, address: route?.params?.address, phoneNo: route?.params?.phone, orderDate: route?.params?.orderDate });

            if (response?.data?.status >= 400) {
                setError(response.data?.message)
                showDialog(true)
            }

            if (response.data.status === 200 || response.data.status === 201) {
                //remove from localstorage the cartItems
                //empty redux store cartItems
                //move to Tabs page

                dispatch(emptyCart())
                navigation.navigate(SCREEN.TABS, {
                    screen: SCREEN.STORESTACKSCREEN,
                    params: {
                        screen: SCREEN.DASHBOARD
                    }
                })
            }
        } catch (error) {

        } finally {
            toggleLoading(false)
        }
    }
    return (
        <Layout style={styles.container}>
            <ScrollView bounces={false} contentContainerStyle={styles.ScrollView} showsVerticalScrollIndicator={false}>
                <Text style={{ textAlign: 'center', color: COLOR.textColor, ...AppStyles.fontStyle }} variant="titleMedium">Scan this QR code or copy the UPI for payment. After successful payment, send the screenshot to the WhatsApp number below.</Text>
                <View style={{ marginTop: 20 }} />
                <QRCode
                    value={upi}
                    size={120}
                    logoBackgroundColor='transparent'

                />
                <View style={{ marginBottom: 20 }} />
                <Text style={{ color: '#000', ...AppStyles.fontStyle }} variant="bodyLarge">OR </Text>
                <TouchableOpacity style={styles.card} onPress={copyToClipboard}>
                    <View style={styles.content}>
                        <Text style={styles.text} variant="bodyLarge">UPI ID: {upi} </Text>
                        <CopyIcon fill={COLOR.textColor} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={sendWhatsApp}>
                    <View style={styles.content}>
                        <Text style={styles.text} variant="bodyLarge">Send Screenshot to Whatsapp </Text>
                        <ArrowRight />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} >
                    <View style={styles.content}>
                        <Text style={styles.text} variant="bodyLarge">Payment Done </Text>
                        <Switch
                            color={COLOR.textColor}
                            value={paymentDone}
                            onValueChange={() => {
                                setpaymentDone(prev => !prev);
                            }}
                        />
                    </View>
                </TouchableOpacity>


                <Button loading={loading} textColor='#FFF' buttonColor={COLOR.DARK} style={[styles.btn, { opacity: paymentDone ? 1 : 0.4 }]} mode="contained" onPress={handleContinue}>
                    Order
                </Button>
            </ScrollView>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Content>
                        <Text variant="bodyMedium">{error}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Snackbar
                visible={snackVisible}
                onDismiss={onDismissSnackBar}
                duration={3000}
            >
                UPI Copied!
            </Snackbar>

        </Layout>
    )
}

export default Payment

const styles = StyleSheet.create({
    card: {
        width: width - 40,
        marginVertical: 10,
        backgroundColor: COLOR.panelBackground,
        ...AppStyles.shadow,
        padding: 10,
        paddingVertical: 15,
        borderRadius: 10

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
        width: width - 30,
        paddingVertical: 5,
        borderRadius: 10
    },
    text: {
        color: COLOR.textColor, ...AppStyles.fontStyle
    }
})