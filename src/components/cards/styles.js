import { sizes, colors, appStyles } from "../../services";
import { height, totalSize, width } from "react-native-dimension";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    //UserInfoPrimaryCard
    userInfoPrimaryCard: {
        padding: sizes.smallMargin * 1.5
    },

    //UserInfoSecondaryCard
    userInfoSecondaryCard: {
        // padding: sizes.smallMargin * 1.5
        marginVertical: sizes.marginVertical
    },

    //ExpertyPrimaryCard
    expertyPrimaryCardContainer: {
        backgroundColor: colors.appBgColor3 + '40',
        borderRadius: 25
    },
    expertyPrimaryCardNumberContainer: {
        // padding: sizes.TinyMargin,
        height: totalSize(2.5),
        width: totalSize(2.5),
        ...appStyles.center,
        backgroundColor: colors.appBgColor3 + '80',
        borderRadius: 100
    },
    selectedUserImageOverlay: {
        top: 0, right: 0, left: 0, bottom: 0,
        borderRadius: 100,
        backgroundColor: colors.appColor1 + '80',
        ...appStyles.center
    },
    reviewsCard: {
        backgroundColor: colors.appColor3,
        padding: height(2),
        width: width(75),
        borderRadius: sizes.buttonRadius,
        marginHorizontal: width(2)

    },
    reviewsCardRegularText: {
        color: colors.appTextColor5,
        textAlign: 'justify'
    },
    chatCardInnerRowWrapper: {
        marginHorizontal: 0,
        marginBottom: 8
    }, chatCardInnerWrapper: {
        flex: 1,
        marginStart: 10
    },
    chatCardOuterRowWrapper: {
        marginHorizontal: 0,
        marginVertical: 8,
    },

    //Feed Card Status Button
    feedCardStatusButton: {
        borderBottomStartRadius: sizes.cardRadius,
        borderBottomEndRadius: sizes.cardRadius,
    }
})