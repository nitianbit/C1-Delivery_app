import { Dimensions } from "react-native"
import Logo from '../assets/images/newLogoSquare.jpeg'
import Delivery from '../assets/images/Delivery.png'
import UserLogo from '../assets/images/user-logo.png'

export const COLOR = {
    BG_COLOR: '#FFF',
    DARK: '#000',
    DANGER: 'red',
    THEME_COLOR: '#222325',
    SECONDARY_COLOR: '#f6f0ea',
    INPUT_COLOR: '#f7e4c4',
    WHITE: '#FFF',
    SECONDARY_WHITE: '#F8F8FF',
    CREAM_WHITE: '#f4f4f4',

    textColor: "#42145F",
    panelBackground: "#FAF6FB",
    overtext: "#FAF6FB",
}

export const { height, width } = Dimensions.get('screen');

const FONT = {
    FONT_BOLD: {
        android: 'owners-wide-bold',
        ios: 'OwnersWide-Bold'
    },
    FONT_LIGHT: {
        android: 'owners-wide-xlight',
        ios: 'OwnersWide-XLight'
    },
    FONT_BLACK: {
        android: 'owners-wide-xblack',
        ios: 'OwnersWide-XBlack'
    },
    HELVETICA_BOLD: {
        android: 'HelveticaNeue-Bold',
        ios: 'HelveticaNeue-Bold'
    },
    HELVETICA: {
        android: 'HelveticaNeue',
        ios: 'HelveticaNeue'
    },
    HELVETICA_CONDENSED_BOLD: {
        android: 'HelveticaNeue-CondensedBold',
        ios: 'HelveticaNeue-CondensedBold'
    },
    HELVETICA_MEDIUM: {
        android: 'HelveticaNeue-Medium',
        ios: 'HelveticaNeue-Medium'
    },
}

export {
    Logo,
    Delivery,
    UserLogo,
    FONT
}  