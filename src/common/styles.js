import { Platform, StyleSheet } from "react-native";
import { COLOR, FONT } from "../utils/constants";

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
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: 10
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    fontStyle: {
        fontFamily: FONT.HELVETICA_MEDIUM[Platform.OS]
    }
})