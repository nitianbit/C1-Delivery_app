import { StyleSheet } from "react-native";
import { COLOR } from "../utils/constants";

export const AppStyles = StyleSheet.create({
    flexOne: {
        flex: 1
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: COLOR.SECONDARY_COLOR,
        paddingHorizontal: 10
    },
})