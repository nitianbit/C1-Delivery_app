import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyles } from '../../common/styles'

const Layout = ({ children, style = {} }) => {
    return (
        <View style={[AppStyles.container, AppStyles.alignItemsCenter, AppStyles.justifyContentCenter, style]}>
            {children}
        </View>
    )
}

export default Layout

const styles = StyleSheet.create({

})