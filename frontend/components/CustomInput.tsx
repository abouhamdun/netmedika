import { TextInput } from "react-native-paper";
import { ViewStyle } from "react-native";
import styles from '../constants/Styles';


type CustomInputProps = {
    style?: ViewStyle | ViewStyle[];
    mode?: string;
} & React.ComponentProps<typeof TextInput>;

const CustomedInput = ({ style, mode="outlined",...props}: CustomInputProps) => {
    return (  
        <TextInput
            mode={mode}
            style={ [styles.input, style] }
            {...props}
        />
    );
}
 
export default CustomedInput;