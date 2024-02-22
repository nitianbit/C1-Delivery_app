import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, width } from '../../utils/constants'

const TopView = ({ children }) => {
    return (
        <View style={styles.topView}>
            {children}
        </View>
    )
}

export default TopView

const styles = StyleSheet.create({
    topView: {
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.SECONDARY_WHITE,
        height: '35%',
        width: width
    }
})