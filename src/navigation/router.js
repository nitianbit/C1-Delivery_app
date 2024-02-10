import { StyleSheet, v } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard, Login, Splash } from '../pages';
import { SCREEN } from './utils';
import AddtoCart from '../pages/cart/AddtoCart';
import StoreDetail from '../pages/store/StoreDetail';
import Stores from '../pages/store';

const Stack = createNativeStackNavigator();



const router = () => {
    return (
        <Stack.Navigator initialRouteName={SCREEN.STOREDETAIL}>
            <Stack.Screen
                name={SCREEN.SPLASH}
                component={Splash}
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />

            <Stack.Screen
                name={SCREEN.LOGIN}
                component={Login}
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
                name={SCREEN.DASHBOARD}
                component={Dashboard}
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
                name={SCREEN.ADDTOCART}
                component={AddtoCart}
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
                name={SCREEN.STORES}
                component={Stores}
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
                name={SCREEN.STOREDETAIL}
                component={StoreDetail}
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
        </Stack.Navigator>
    )
}

export default router

