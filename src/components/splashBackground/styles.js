import { StyleSheet } from "react-native";
import { height } from "react-native-dimension";
import { colors } from "../../services";

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: height(18),
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
    }
})