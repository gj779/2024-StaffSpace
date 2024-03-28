import { StyleSheet } from "react-native";
import { width } from "react-native-dimension";
import { sizes, colors, appStyles } from "../../services";

export const styles = StyleSheet.create({
    professionsCard: {
        //borderColor:colors.appBgColor3,
        marginBottom: sizes.marginBottom
    },
    selectedProfessionsCard: {
        // borderColor:colors.appTextColor1,
        backgroundColor: colors.appBgColor2,
        marginBottom: sizes.marginBottom
    },

    ////SwipableModal
    swipableModalFooter: {
        backgroundColor: colors.appBgColor1,
        borderTopLeftRadius: sizes.ModalRadius,
        borderTopRightRadius: sizes.ModalRadius,
        paddingTop: sizes.baseMargin,
        ...appStyles.shadowModal
    },
    barContainer: {
        top: sizes.TinyMargin,
        alignSelf: 'center',
    },

    ////ConfirmationModalPrimary
    confirmationModalPrimaryCard: {
        backgroundColor: colors.appBgColor1,
        borderRadius: sizes.modalRadius,
        paddingVertical: sizes.baseMargin,
        marginHorizontal: sizes.marginHorizontal,
        ...appStyles.shadowDark
    },

    ////EnterValueModalPrimary
    enterValueModalPrimaryCard: {
        backgroundColor: colors.appBgColor1,
        borderRadius: sizes.modalRadius,
        padding: sizes.baseMargin,
        marginHorizontal: sizes.marginHorizontal * 2,
        ...appStyles.shadowDark
    },
    /// fillterModelCard
    fillterModelCard: {
        backgroundColor: colors.appBgColor1,
        borderRadius: sizes.modalRadius,
        padding: sizes.baseMargin,
        marginHorizontal: sizes.marginHorizontal,
        ...appStyles.shadowDark
    },
    modelTextInputRow: {
        marginHorizontal: 0,
        width: width(33)
    },


})