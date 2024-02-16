import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles } from '../../common/styles'
import { Button, Card, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/slices/items';
import { COLOR } from '../../utils/constants';


const CartItem = ({ name, description, _id, price }) => {
    const cartItems = useSelector((state) => state.cart.items)
    const dispatch = useDispatch();

    const [item, setItem] = useState(null);

    useEffect(() => {
        if (_id) {
            const cartItem = cartItems.find(item => item._id === _id);
            if (cartItem) {
                setItem(cartItem)
            } else {
                setItem(null)
            }
        }
    }, [cartItems, _id])


    return (
        <Card style={styles.card}>
            <Card.Content style={[AppStyles.row, styles.cardRow]}>
                <View style={[AppStyles.row, styles.cardRow]}>
                    <View style={styles.info}>
                        <Text variant="bodyMedium">{name}</Text>
                        <Text variant="bodySmall">{description}</Text>
                    </View>
                    {/* <Image style={{ width: 80, height: 80, borderRadius: 10 }} resizeMethod='cover' source={{ uri: 'https://picsum.photos/700' }} /> */}

                    <View style={styles.btnRow}>
                        {item?.quantity > 0 ? <>
                            <TouchableOpacity onPress={() => dispatch(removeFromCart({ name, description, _id, price }))} style={[styles.btn, styles.startBtn,]}>
                                <Text style={styles.btnText}>-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} disabled>
                                <Text style={styles.btnText}>{item?.quantity}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatch(addToCart({ name, description, _id, price }))} style={[styles.btn, styles.endBtn]}>
                                <Text style={styles.btnText}>+</Text>
                            </TouchableOpacity>
                        </> :
                            <TouchableOpacity onPress={() => dispatch(addToCart({ name, description, _id, price }))} style={[styles.btn, styles.endBtn, styles.startBtn, { paddingHorizontal: 20 }]}>
                                <Text style={styles.btnText}>Add</Text>
                            </TouchableOpacity>}
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}

export default CartItem

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginVertical: 10,
    },
    btnRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // width: '100%',
        marginTop: 10,
        marginBottom: 5,
        paddingRight: 10
        // position: 'absolute',
        // bottom: -10
    },
    btn: {
        margin: 0,
        paddingVertical: 5,
        // backgroundColor: '#543488',
        backgroundColor: COLOR.THEME_COLOR,
        borderRadius: 0,
        color: '#fff',
        paddingHorizontal: 12,

    },
    card: {
        width: '100%',
        marginVertical: 10
    },
    startBtn: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    endBtn: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    btnText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16
    },
    cardRow: {
        width: '100%',
        alignItems: 'center'
    },
    info: {
        display: 'flex',
        flexGrow: 1,
        paddingRight: 10,
        // width: 100
        width: '65%',
    }
})