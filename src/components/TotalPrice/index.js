import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { AppStyles } from '../../common/styles';
import { COLOR, width } from '../../utils/constants';
import ArrowRight from '../../assets/icons/ArrowRight';
import BottomModal from '../BottomModal';

const TotalPrice = () => {
    const cartItems = useSelector(state => state.cart.items);
    const [showPriceSplit, setShowPriceSplit] = useState(false);

    const togglePriceSplit = () => setShowPriceSplit(prev => !prev)

    const totalPrice = () => cartItems?.reduce((total, curr) => total + curr.quantity * curr.price, 0);
    const totalGST = () => cartItems?.reduce((total, curr) => total + (curr.quantity * curr.price * (curr?.gst ?? 0) / 100), 0);


    return (
        <>
            {cartItems?.length > 0 ?
                <TouchableOpacity style={[AppStyles.shadow, styles.priceCard]} onPress={togglePriceSplit}>
                    <Text style={{ color: COLOR.textColor, ...AppStyles.fontStyle }} variant="bodyLarge">Total Price:      Rs {totalGST() + totalPrice()}</Text>
                    <ArrowRight />
                </TouchableOpacity>
                : null}

            <BottomModal
                title='Bill Summary'
                closeAble={true}
                visible={showPriceSplit}
                onClose={togglePriceSplit} >
                <View style={{ width: width - 40, height: 150, ...styles.timePicker }}>
                    <View style={styles.row}>
                        <Text style={styles.rowItemKey}>Item total</Text>
                        <Text style={styles.rowItemValue}>Rs {totalPrice()}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.rowItemKey}>GST</Text>
                        <Text style={styles.rowItemValue}>Rs {totalGST()}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.rowItemKey, { fontWeight: '700' }]}>Grand Total</Text>
                        <Text style={[styles.rowItemValue, { fontWeight: '700' }]}>Rs {totalGST() + totalPrice()}</Text>
                    </View>

                </View>

            </BottomModal>
        </>
    )
}

export default TotalPrice

const styles = StyleSheet.create({
    priceCard: {
        backgroundColor: COLOR.panelBackground,
        paddingHorizontal: 10,
        margin: 10,
        width: width - 45,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15
    },
    row: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    rowItemKey: {
        color: COLOR.textColor,
        fontWeight: '500'
    },
    rowItemValue: {
        color: COLOR.textColor,
        fontWeight: '500'
    }
})