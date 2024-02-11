import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard, Login, Splash } from '../pages';
import { SCREEN } from './utils';
import AddtoCart from '../pages/cart/AddtoCart';
import StoreDetail from '../pages/store/StoreDetail';
import Stores from '../pages/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Account, Address, Orders, Profile } from '../pages/account';
import Cart from '../pages/cart';
import Delivery from '../assets/icons/Delivery';
import CartIcon from "../assets/icons/Cart"
import AccountIcon from "../assets/icons/Account"
import Signup from '../pages/signup';
import Payment from '../pages/payment';

const Stack = createNativeStackNavigator();
const BottomStack = createNativeStackNavigator();
const StoreStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const AccountRouter = () => {
    return (
        <BottomStack.Navigator initialRouteName={SCREEN.ACCOUNT}>
            <BottomStack.Screen
                name={SCREEN.ACCOUNT}
                component={Account}
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />

            <BottomStack.Screen
                name={SCREEN.PROFILE}
                component={Profile}
                options={{
                    // headerShown: false,
                    gestureEnabled: false,
                    title: "Edit Profile"
                }}
            />
            <BottomStack.Screen
                name={SCREEN.ADDRESS}
                component={Address}
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <BottomStack.Screen
                name={SCREEN.ORDERS}
                component={Orders}
                options={{
                    // headerShown: false,
                    gestureEnabled: false,
                    title: 'My Orders'
                }}
            />

        </BottomStack.Navigator>
    )
}
const StoreStackRouter = () => {
    return (
        <StoreStack.Navigator initialRouteName={SCREEN.DASHBOARD}>
            <StoreStack.Screen
                name={SCREEN.DASHBOARD}
                component={Dashboard}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />

            <StoreStack.Screen
                name={SCREEN.STOREDETAIL}
                component={StoreDetail}
                options={{
                    // headerShown: false,
                    title: 'Restaurant Name',
                    gestureEnabled: false
                }}
            />

        </StoreStack.Navigator>
    )
}

function Tabs() {
    return (
        <Tab.Navigator initialRouteName={SCREEN.STORESTACKSCREEN}>
            <Tab.Screen
                name={SCREEN.STORESTACKSCREEN}
                component={StoreStackRouter}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    tabBarLabel: 'Delivery',
                    tabBarIcon: (({ focused, color, size }) => <Delivery color={focused ? color : '#999'} />)
                }}
            />
            <Tab.Screen
                name={SCREEN.CART}
                component={Cart}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    tabBarLabel: 'Cart',
                    tabBarIcon: (({ focused, color, size }) => <CartIcon color={focused ? color : '#999'} />)
                }}
            />
            <Tab.Screen
                name={SCREEN.ACCOUNTSTACKSCREEN}
                component={AccountRouter}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                    tabBarLabel: 'Account',
                    tabBarIcon: (({ focused, color, size }) => <AccountIcon color={focused ? color : '#999'} />)
                }}
            />


        </Tab.Navigator>
    );
}

const router = () => {
    return (
        <Stack.Navigator initialRouteName={SCREEN.SPLASH}>
            <Stack.Screen
                name={SCREEN.SPLASH}
                component={Splash}
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />

            <Stack.Screen
                name={SCREEN.SIGNUP}
                component={Signup}
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
                name={SCREEN.TABS}
                component={Tabs}
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
                name={SCREEN.PAYMENT}
                component={Payment}
                options={{
                    // headerShown: false,
                    gestureEnabled: false,
                    title: 'Payment'
                }}
            />

        </Stack.Navigator>
    )
}

export default router

