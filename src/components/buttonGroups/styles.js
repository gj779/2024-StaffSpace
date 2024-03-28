import { StyleSheet } from "react-native";
import { colors } from "../../services";
import { height } from "react-native-dimension";

export const styles = StyleSheet.create({
    topTabContainer: {
        borderWidth: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        height: height(6)
    },
    tabText: {
        fontWeight: 'normal',
    },
    selectedTopTab: {
        backgroundColor: 'transparent',
        borderBottomColor: colors.appColor3,
        borderBottomWidth: 3
    },
    unselectedTopTab: {
        borderBottomColor: colors.appTextColor5,
        // borderBottomWidth: 0.5
    }
    , selectedBtnTab: {
        backgroundColor: 'transparent',
        // borderBottomColor: colors.appColor3,
        // borderBottomWidth: 3
    },
})