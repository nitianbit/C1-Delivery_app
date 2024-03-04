import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View, TextInput as Input } from 'react-native';
import { Button, Dialog, Portal, Text, Card, TextInput, Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ENDPOINTS } from '../../api/constants';
import { doGET, doPOST } from '../../api/httpUtil';
import EmptyCart from '../../assets/icons/EmptyCart';
import { AppStyles } from '../../common/styles';
import BottomModal from '../../components/BottomModal';
import BottomView from '../../components/BottomView';
import CartItem from '../../components/CartItem';
import Layout from '../../components/layout';
import TopView from '../../components/TopView';
import { SCREEN } from '../../navigation/utils';
import { emptyCart } from '../../store/slices/items';
import { COLOR, Logo, width } from '../../utils/constants';
import ArrowRight from '../../assets/icons/ArrowRight'
import { formatDateTime, getCurrentDate, getCurrentTime, getLatestInterval, getNext10Days, getOrderTimeIntervals } from '../../utils/helper';
import TotalPrice from '../../components/TotalPrice';
import moment from 'moment';

const phoneRegex = /^[6-9]\d{9}$/

// const data = [110041, 110053, 110041, 110053, 110041, 110053, 110041, 110053]

const Cart = ({ navigation }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('')
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [dateSelectVisible, setDateSelectVisible] = useState(false);
    const [addressDetails, setAddressDetails] = useState({
        number: null,
        area: '',
        pinCode: null,
        showPincode: false
    });
    const [data, setData] = useState([]);
    const pincodeDataRef = useRef(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [dates, setDates] = useState(getNext10Days());
    const [timeIntervals, setTimeIntervals] = useState(getOrderTimeIntervals());
    const [orderTime, setOrderTime] = useState({
        date: getCurrentDate(),
        time: getOrderTimeIntervals().currentIntervals[0]
    });

    const isNextDisabled = () => (!addressDetails?.number || !addressDetails?.area || !addressDetails?.pinCode || !phone)

    const fetchPincodes = async () => {
        try {
            const pincodes = await doGET(ENDPOINTS.pincodes);
            pincodeDataRef.current = pincodes?.data?.data
            setData(pincodes?.data?.data ?? []);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchPincodes()
    }, [])

    useEffect(() => {
        if (searchQuery) {
            const filteredData = pincodeDataRef.current?.filter(pincode => pincode?.toString()?.includes(searchQuery));
            setData(filteredData);
        }
    }, [searchQuery])

    useEffect(() => {
        if (phone && !phoneRegex.test(phone)) {
            setError('Please Enter Valid Phone Number')
        } else {
            setError('');
        }
    }, [phone])

    useEffect(() => {
        setTimeIntervals(getOrderTimeIntervals());
        // setOrderTime((prev) => ({
        //     ...prev,
        //     time: prev?.date === getCurrentDate() ? getOrderTimeIntervals().currentIntervals[0] : getOrderTimeIntervals().futureIntervals[0]
        // }))
    }, [orderTime?.date, dateSelectVisible]);



    const handleContinue = async () => {
        try {
            if (!cartItems.length || isNextDisabled() /* !address || !phone */) {
                console.log("===", isNextDisabled())
                return;
            }
            const addr = addressDetails?.number + ", " + addressDetails?.area + ", " + addressDetails?.pinCode
            navigation.navigate(SCREEN.PAYMENT, { address: addr, phone, orderDate: moment(`${orderTime?.date},${orderTime.time}`, 'YYYYMMDD,HH:mm').unix() });
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
            console.log(error)
        }
    }


    const toggleDetailModalVisible = () => {
        setDetailsModalVisible(prev => !prev)
    }

    const setAddressData = (key, value) => {
        setAddressDetails(prev => ({ ...prev, [key]: value }))
    }


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

                <TotalPrice />
                {cartItems?.length > 0 ? <TouchableOpacity style={styles.orderDateSelectorView} onPress={() => setDateSelectVisible(true)}>
                    <Text style={styles.orderDateSelector}>Select Order Date & Time</Text>
                    <View style={styles.orderDateView}>
                        <View style={styles.orderDateItem}  /* onPresss={() => setDateSelectVisible(true)} */>
                            <Text style={styles.orderItemText}>{formatDateTime(orderTime?.date, 'YYYYMMDD', 'DD/MM/YY')}</Text>
                        </View>
                        <View style={styles.orderDateItem}>
                            <Text style={styles.orderItemText}>{orderTime?.time}</Text>
                        </View>
                    </View>
                    {/* <Input
                        style={styles.orderDateSelector}
                        placeholder="Select Order Date"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        placeholderTextColor={COLOR.textColor}
                        keyboardType="number-pad"
                        pointerEvents='none'
                    /> */}
                </TouchableOpacity> : null}

                {cartItems?.length > 0 ? <Button buttonColor={COLOR.DARK} textColor={COLOR.CREAM_WHITE} style={[styles.btn, { opacity: (!cartItems.length /* || !address || !phone */) ? 0.4 : 1 }]} mode="contained" onPress={toggleDetailModalVisible/* handleContinue */}>
                    Enter Details
                </Button> : null}
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
            <BottomModal
                title='Enter Details'
                closeAble={true}
                visible={detailsModalVisible}
                onClose={toggleDetailModalVisible} >
                <View style={[{ /* height: (250),  */width: width - 40 }]}>
                    <TextInput
                        label={<Text style={{ color: COLOR.textColor }}>Flat / House no / Floor</Text>}
                        value={addressDetails.number}
                        onChangeText={text => setAddressData('number', text)}
                        style={styles.card}
                        activeUnderlineColor={COLOR.SECONDARY_COLOR}
                        underlineColor={COLOR.SECONDARY_COLOR}
                        textColor={COLOR.textColor}
                        keyboardType="numeric"
                    />
                    <TextInput
                        label={<Text style={{ color: COLOR.textColor }}>Area / Sector / Locality</Text>}
                        value={addressDetails.area}
                        onChangeText={text => setAddressData('area', text)}
                        style={styles.card}
                        activeUnderlineColor={COLOR.SECONDARY_COLOR}
                        underlineColor={COLOR.SECONDARY_COLOR}
                        textColor={COLOR.textColor}
                    />
                    {/* This will be dropdown */}
                    {/* <TextInput
                        label={<Text style={{ color: COLOR.textColor }}>Enter Pin Code</Text>}
                        value={addressDetails.pinCode}
                        onChangeText={text => setAddressData('pinCode', text)}
                        style={styles.card}
                        activeUnderlineColor={COLOR.SECONDARY_COLOR}
                        underlineColor={COLOR.SECONDARY_COLOR}
                        textColor={COLOR.textColor}
                    /> */}
                    <TouchableOpacity style={styles.pincodeSelect} onPress={() => setAddressData('showPincode', true)}>
                        <Text style={styles.pincodeText}>{addressDetails?.pinCode ? addressDetails?.pinCode : 'Select Pin Code'}</Text>
                    </TouchableOpacity>
                    <TextInput
                        label={<Text style={{ color: COLOR.textColor }}>Enter Phone Number</Text>}
                        value={phone}
                        onChangeText={text => setPhone(text)}
                        style={styles.card}
                        keyboardType="number-pad"
                        activeUnderlineColor={COLOR.SECONDARY_COLOR}
                        underlineColor={COLOR.SECONDARY_COLOR}
                        textColor={COLOR.textColor}
                        error={!!error}
                    />
                    {error ? <Text style={styles.error}>Please Enter Valid Phone Number</Text> : null}

                    <Button buttonColor={COLOR.DARK} textColor={COLOR.CREAM_WHITE} style={[styles.btn, { opacity: (isNextDisabled()) ? 0.4 : 1 }]} mode="contained" onPress={handleContinue}>
                        Continue
                    </Button>
                </View>
            </BottomModal>
            {/* pincode modal */}
            <BottomModal
                title='Select Pincode'
                closeAble={true}
                visible={addressDetails.showPincode}
                onClose={() => setAddressData('showPincode', false)} >
                <View style={{ width: width - 40, height: 250 }}>
                    {/* <Searchbar
                        placeholder="Search Pincode"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                    /> */}
                    <Input
                        style={styles.searchInput}
                        placeholder="Search Pincode"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        placeholderTextColor={COLOR.textColor}
                        keyboardType="number-pad"
                    />
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity key={index} style={styles.pincodes} onPress={() => {
                                setAddressData('pinCode', item);
                                setAddressData('showPincode', false)
                            }}>
                                <Text style={styles.pincodeText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </BottomModal>
            <BottomModal
                title='Select Order Date'
                closeAble={true}
                visible={dateSelectVisible}
                onClose={() => setDateSelectVisible(false)} >
                <View style={{ width: width - 40, height: 300, ...styles.timePicker }}>
                    <View style={styles.timePickerCol}>
                        <Text style={styles.orderDateHeader}>Select Date</Text>
                        <FlatList
                            data={dates}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity key={index} style={[styles.pincodes, { borderColor: item.value === orderTime?.date ? COLOR.textColor : COLOR.panelBackground, borderWidth: 1 }]} onPress={() => {
                                    setOrderTime(prev => ({ ...prev, date: item.value }))
                                }}>
                                    <Text style={styles.pincodeText}>{item?.key}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={styles.timePickerCol}>
                        <Text style={styles.orderDateHeader}>Select Time</Text>
                        <FlatList
                            data={orderTime?.date === getCurrentDate() ? timeIntervals.currentIntervals : timeIntervals.futureIntervals}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity key={index} style={[styles.pincodes, { borderColor: item === orderTime?.time ? COLOR.textColor : COLOR.panelBackground, borderWidth: 1 }]} onPress={() => {
                                    setOrderTime(prev => ({ ...prev, time: item }));

                                }}>
                                    <Text style={styles.pincodeText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
                <Button buttonColor={COLOR.DARK} textColor={COLOR.CREAM_WHITE} style={[styles.btn]} mode="contained" onPress={() => setDateSelectVisible(false)}>
                    Select
                </Button>
            </BottomModal>

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
        , ...AppStyles.fontStyle

    },
    noItem: {
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        // marginTop: 200
    },
    logo: {
        height: '100%',
        width: width,
        borderRadius: 10,
        // marginTop: 10
    },
    error: {
        color: 'red',
        fontWeight: '600',
        margin: 0,
        padding: 0,
        marginTop: -10,
        textAlign: 'center'
    },
    pincodes: {
        backgroundColor: COLOR.panelBackground,
        color: COLOR.textColor,
        paddingVertical: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    pincodeSelect: {
        backgroundColor: COLOR.panelBackground,
        color: COLOR.textColor,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    pincodeText: {
        color: COLOR.textColor
    },
    searchInput: {
        color: COLOR.textColor,
        backgroundColor: COLOR.panelBackground,
        borderRadius: 25,
        paddingHorizontal: 10,
        fontWeight: '500'
    },
    orderDateSelector: {
        fontWeight: '500',
        color: COLOR.textColor,
        fontSize: 15
    },
    orderDateSelectorView: {
        ...AppStyles.shadow,
        backgroundColor: COLOR.panelBackground,
        borderRadius: 10,
        paddingHorizontal: 5,
        width: width - 45,
        marginBottom: 10,
        paddingVertical: 10
    },
    orderDateView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
    },
    orderDateItem: {
        borderWidth: 1,
        width: '48%',
        borderRadius: 5,
        paddingVertical: 5,
        borderColor: COLOR.textColor
    },
    orderItemText: {
        textAlign: 'center',
        color: COLOR.textColor,
        fontWeight: '500'
    },
    timePicker: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    timePickerCol: {
        width: '49%'
    },
    orderDateHeader: {
        color: COLOR.textColor,
        fontWeight: '600',
        textAlign: 'center'
    }
}) 