import { StyleSheet } from 'react-native'
import { colors } from '../colors'
import { fontFamily, fontSize } from '../fonts'
import { totalSize, height, width } from 'react-native-dimension'
import { sizes } from '../sizes'

export const appStyles = StyleSheet.create({
    bgContainer: {
        flex: 1,
        height: null,
        width: null,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.appBgColor1
    },
    h1: {
        fontSize: fontSize.h1,
        color: colors.primary,
        fontFamily: fontFamily.appTextBold
    },
    h2: {
        fontSize: fontSize.h2,
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextBold
    },
    h3: {
        fontSize: fontSize.h3,
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextBold
    },
    h4: {
        fontSize: fontSize.h4,
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextBold
    },
    h5: {
        fontSize: fontSize.h5,
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextMedium
    },
    h6: {
        fontSize: fontSize.h6,
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextMedium
    },
    textLarge: {
        fontSize: fontSize.large,
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextRegular
    },
    textMedium: {
        fontSize: fontSize.medium,
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextRegular,
    },
    textRegular: {
        fontSize: fontSize.regular,
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextRegular
    },
    textSmall: {
        fontSize: fontSize.small,
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextRegular
    },
    textTiny: {
        fontSize: fontSize.tiny,
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextRegular
    },
    right: {
        alignItems: 'flex-end', justifyContent: 'center'
    },
    descriptionColor: {
        color: colors.appTextColor5
    },
    inputContainerUnderLined: {
        marginHorizontal: width(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: '#FFFF'
    },
    inputContainerBorderd: {
        marginHorizontal: width(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderWidth: 0.5,
        borderColor: colors.appColor1
    },
    inputContainerColored: {
        marginHorizontal: width(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFFF',
        borderRadius: 2.5
    },
    inputField: {
        height: height(7),
        //width: width(80),
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextLight,
        fontSize: totalSize(1.75),
    },
    inputFieldBorderd: {
        marginHorizontal: width(5),
        height: height(7),
        borderWidth: 0.5,
        borderColor: colors.appColor1,
        fontSize: totalSize(1.75),
        fontFamily: fontFamily.appTextRegular,
        borderRadius: 2.5
    },
    inputFieldColored: {
        marginHorizontal: width(5),
        height: height(7),
        fontSize: totalSize(1.75),
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        elevation: 5,
        backgroundColor: '#FFFF',
        borderRadius: 2.5,
    },
    headingsTitle: {
        fontWeight: '700',
        color: colors.primary,
        marginStart: height(3)
    },
    buttonBorderd: {
        marginHorizontal: width(5),
        height: height(8),
        borderRadius: 2.5,
        borderWidth: 1,
        borderColor: colors.appColor1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonColord: {
        marginHorizontal: width(5),
        height: height(8),
        borderRadius: 2.5,
        backgroundColor: colors.appColor1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    SocialButtonColord: {
        height: height(8),
        marginHorizontal: width(5),
        borderRadius: 2.5,
        backgroundColor: colors.facebook,
        //  alignItems: 'center',
        //  justifyContent: 'center'
    },
    profileImageWrapper: {
        backgroundColor: colors.appBgColor,
        height: width(15),
        width: width(15),
        borderRadius: width(8),
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: totalSize(2),
        color: '#000000',
        fontFamily: fontFamily.appTextMedium
    },
    smallwidthButton:
        { width: width(50) },
    compContainer: {
        marginHorizontal: width(5),
        marginVertical: height(2.5)
    },
    rowCompContainer: {
        marginHorizontal: width(5),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: height(2.5)
    },
    headerStyle: {
        backgroundColor: colors.headerBgColor1,
        elevation: 0,
        shadowColor: 'transparent',
        //borderBottomWidth:0.5,
        height: height(8)
    },
    headerTitleStyle: {
        fontSize: totalSize(2),
        color: colors.appTextColor1,
        fontFamily: fontFamily.appTextBold
    },
    cardView: {
        marginHorizontal: width(5),
        borderRadius: 5,
        backgroundColor: '#FFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    shadowDark: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    shadowModal: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.8,
        shadowRadius: 25.00,

        elevation: 30,
    },
    shadowColored: {
        shadowColor: colors.appColor3,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    textCenter: {
        textAlign: 'center',
    },
    textGray: {
        color: colors.appTextColor4
    },
    textLightGray: {
        color: colors.appTextColor5
    },
    textPrimaryColor: {
        color: colors.appColor1
    },
    textBlue: {
        color: colors.appColor3
    },
    textWhite: {
        color: colors.appTextColor6
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBold: {
        fontFamily: fontFamily.appTextBold
    },
    ButtonTextRegular: {
        fontSize: fontSize.regular,
        color: '#000000',
        fontFamily: fontFamily.appTextMedium
    },
    ButtonTextMedium: {
        fontSize: fontSize.medium,
        color: '#000000',
        fontFamily: fontFamily.appTextMedium
    },
    tabBarStyle: {
        height: sizes.tabBarHeight
    },
    textUnderlined: {
        textDecorationLine: 'underline'
    },
    rowButtonContainer: {
        marginVertical: sizes.baseMargin,
        // marginHorizontal: null,
    },
    rowButton: {
        marginHorizontal: null,
        marginHorizontal: width(3)
    },
    topBarWrapper: {
        backgroundColor: colors.appColor12,
        borderRadius: sizes.ModalRadius,
        height: height(6)
    },
    topBarRowWrapper: {
        marginHorizontal: null,
    }
})