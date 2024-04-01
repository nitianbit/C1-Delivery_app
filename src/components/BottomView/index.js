import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, width } from '../../utils/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppStyles } from '../../common/styles'

const BottomView = ({ children, zeroPadding = false }) => {
    return (
        <View style={[styles.bottomView, { paddingHorizontal: zeroPadding ? 0 : 20 }]}>
            <KeyboardAwareScrollView contentContainerStyle={[styles.scrollView, { width: width - (zeroPadding ? 0 : 40) }]} showsVerticalScrollIndicator={false} bounces={false}>
                {children}
            </KeyboardAwareScrollView>
        </View>
    )
}

export default BottomView

const styles = StyleSheet.create({
    bottomView: {
        backgroundColor: COLOR.WHITE,
        width: width,
        height: '70%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        display: 'flex',
        alignItems: 'center',
        ...AppStyles.shadow
    },
    scrollView: {
        backgroundColor: COLOR.WHITE,
        width: width - 40,
        paddingTop: 20,
        display: 'flex',
        alignItems: 'center'
    }
})
