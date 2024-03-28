import { StyleSheet } from "react-native";
import { sizes, colors, appStyles } from "../../services";

export const styles = StyleSheet.create({
    //TextInputBorderd
    textInputBorderedContainer: {
        borderRadius: sizes.inputRadius,
        borderWidth: 1,
        borderColor: colors.appTextColor5,
        marginHorizontal: sizes.marginHorizontal
    }

})