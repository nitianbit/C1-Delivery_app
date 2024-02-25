import { Text, TextInput } from "react-native-paper";
import { Platform } from "react-native";
import { FONT } from "../../utils/constants";




const MyText = props => <Text {...props} style={[{ fontFamily: FONT.HELVETICA_MEDIUM[Platform.OS] }, props.style]}>{props.children}</Text>
const MyTextInput = props => <TextInput {...props} style={[{ fontFamily: FONT.HELVETICA_MEDIUM[Platform.OS] }, props.style]}>{props.children}</TextInput>

export {
    MyText,
    MyTextInput
}