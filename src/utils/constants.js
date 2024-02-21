import { Dimensions } from "react-native"
import Logo from '../assets/images/Logo.jpeg'
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
    SECONDARY_WHITE: '#d6d6d6',
    CREAM_WHITE: '#f4f4f4',

    textColor: "#42145F",
    panelBackground: "#FAF6FB",
    overtext: "#FAF6FB",
}

export const { height, width } = Dimensions.get('screen');

export {
    Logo,
    Delivery,
    UserLogo
}  