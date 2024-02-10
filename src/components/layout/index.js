import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyles } from '../../common/styles'

const Layout = ({ children }) => {
    return (
        <View style={[AppStyles.container, AppStyles.alignItemsCenter, AppStyles.justifyContentCenter]}>
            {children}
        </View>
    )
}

export default Layout

const styles = StyleSheet.create({

})