import { StyleSheet, v } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard, Login, Splash } from '../pages';
import { SCREEN } from './utils';

const Stack = createNativeStackNavigator();



const router = () => {
    return (
        <Stack.Navigator initialRouteName={SCREEN.LOGIN}>
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
        </Stack.Navigator>
    )
}

export default router

