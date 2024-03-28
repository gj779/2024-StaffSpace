import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, fontSize, sizes, fontFamily } from '../../services';
import { ButtonTextRegular, ButtonTextMedium, MediumText } from '../text';
import { Wrapper, RowWrapperBasic, RowWrapper, ComponentWrapper } from '../wrappers';

import { Spacer } from '../spacers';
import { CustomizedImage } from '../images';

export const ButtonColored = props => {
    const { text, animation, onPress, disabled, buttonStyle, textStyle, iconName, iconType, iconSize, innerStyle, buttonColor, iconStyle, tintColor, customIcon } = props
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={.9}>
            <Wrapper animation={animation} style={[appStyles.buttonColord, { borderRadius: sizes.buttonRadius, height: height(7), backgroundColor: buttonColor ? buttonColor : colors.appColor1 }, appStyles.shadow, buttonStyle]}>
                <View style={[{ flexDirection: 'row', alignItems: 'center' }, innerStyle]}>
                    {customIcon ?
                        <Wrapper>
                            <CustomizedImage height={16} width={16} radius={1} source={customIcon}
                                style={[{ marginEnd: width(1) }, iconStyle]} />
                        </Wrapper>
                        :
                        iconName ?
                            <Icon
                                name={iconName ? iconName : "email-outline"}
                                type={iconType ? iconType : "material-community"}
                                size={iconSize ? iconSize : totalSize(3)}
                                color={tintColor ? tintColor : colors.appTextColor6}
                                style={[{ marginEnd: width(1) }, iconStyle]}
                            />
                            :
                            null
                    }
                    <ButtonTextMedium style={[{ color: tintColor ? tintColor : colors.appTextColor6, }, textStyle]}>{text}</ButtonTextMedium>
                </View>
            </Wrapper>
        </TouchableOpacity>
    );
}
export const ButtonwithDualIcon = props => {
    const { text, animation, onPress, buttonStyle, textStyle, leftIconName, rightIconName, iconType, iconSize, buttonColor, iconStyle, tintColor, textFlex } = props
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.9}>
            <Wrapper animation={animation} style={[appStyles.buttonColord, { borderRadius: sizes.buttonRadius, height: height(7), backgroundColor: buttonColor ? buttonColor : colors.appColor1 }, buttonStyle]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: "90%" }}>
                    {
                        leftIconName ?
                            <Wrapper style={[{ flex: 1, alignItems: 'flex-start' }]}>
                                <Icon
                                    name={leftIconName ? leftIconName : "call"}
                                    type={iconType ? iconType : "material-community"}
                                    size={iconSize ? iconSize : totalSize(3)}
                                    color={tintColor ? tintColor : colors.appTextColor6}
                                    style={[iconStyle]}
                                />
                            </Wrapper>
                            :
                            null
                    }
                    <Wrapper style={[{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }]}>
                        <ButtonTextMedium style={[{ color: tintColor ? tintColor : colors.appTextColor6 }, textStyle]}>{text}</ButtonTextMedium>
                    </Wrapper>
                    {
                        rightIconName ?
                            <Wrapper style={[{ flex: 1, alignItems: 'flex-end' }]}>
                                <Icon
                                    name={rightIconName ? rightIconName : "chevron-forward"}
                                    type={iconType ? iconType : "material-community"}
                                    size={iconSize ? iconSize : totalSize(3)}
                                    color={tintColor ? tintColor : colors.appTextColor6}
                                    style={[{}, iconStyle]}
                                />
                            </Wrapper>
                            :
                            null
                    }
                </View>
            </Wrapper>
            <Spacer height={sizes.baseMargin / 1.5} />
        </TouchableOpacity>
    );
}
export const ButtonWithRightIcon = props => {
    const { text, animation, onPress, buttonStyle, textStyle, iconName, iconType, iconSource, iconSize, buttonColor, iconStyle, tintColor } = props
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.9}>
            <Wrapper animation={animation} style={[appStyles.buttonColord, { borderRadius: sizes.buttonRadius, height: height(7), backgroundColor: buttonColor ? buttonColor : colors.appColor1 }, appStyles.shadow, buttonStyle]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ButtonTextMedium style={[{ color: tintColor ? tintColor : colors.appTextColor6, }, textStyle]}>{text}</ButtonTextMedium>
                    {
                        iconName ?
                            <Icon
                                name={iconName ? iconName : "email-outline"}
                                type={iconType ? iconType : "material-community"}
                                size={iconSize ? iconSize : totalSize(3)}
                                color={tintColor ? tintColor : colors.appTextColor6}
                                style={[{ marginStart: width(3) }, iconStyle]}
                            />
                            :
                            null
                    }
                </View>
            </Wrapper>
        </TouchableOpacity>
    );
}
export const ButtonWithIcon = props => {
    const { text, animation, onPress, buttonStyle, textStyle, iconName, iconType, iconSize, buttonColor, iconSource, tintColor } = props
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.9}>
            <Wrapper animation={animation} style={[appStyles.buttonColord, { borderRadius: sizes.buttonRadius, height: height(7.5), backgroundColor: buttonColor ? buttonColor : colors.appColor1 }, appStyles.shadow, buttonStyle]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width(80) }}>
                    {iconSource ?
                        <Image source={iconSource}
                            style={[appStyles.center, { height: 40, width: 38, borderRadius: sizes.ModalRadius }]} />
                        : null
                    }
                    <ButtonTextMedium style={[{ color: tintColor ? tintColor : colors.appTextColor6, }, textStyle]}>{text}</ButtonTextMedium>
                    <View />
                </View>
            </Wrapper>
        </TouchableOpacity>
    );
}

export const ButtonColoredSmall = props => {
    const { text, onPress, buttonStyle, customIcon, direction, textStyle, iconName, iconType, iconSize, iconColor, iconStyle } = props
    return (
        <TouchableOpacity onPress={onPress} style={[{ borderRadius: sizes.buttonSmallRadius, paddingHorizontal: width(5), paddingVertical: height(1), backgroundColor: colors.appColor1 }, buttonStyle]}>
            <View style={{ flexDirection: direction ? direction : 'row', alignItems: 'center' }}>
                {
                    customIcon ?
                        <CustomIcon
                            icon={customIcon}
                            size={iconSize ? iconSize : totalSize(2)}
                            color={iconColor ? iconColor : colors.appTextColor6}
                        />
                        :
                        iconName ?
                            <Icon
                                name={iconName ? iconName : "email-outline"}
                                type={iconType ? iconType : "material-community"}
                                size={iconSize ? iconSize : totalSize(2)}
                                color={iconColor ? iconColor : colors.appTextColor6}
                                iconStyle={[{}, iconStyle]}
                            />
                            :
                            null
                }
                <ButtonTextRegular style={[{ color: colors.appTextColor6, }, textStyle]}>  {text}  </ButtonTextRegular>
            </View>
        </TouchableOpacity>
    );
}

export const ButtonBordered = props => {
    const { text, onPress, buttonStyle, textStyle, iconName, customIcon, iconType, iconSize, iconColor, iconStyle, tintColor, borderColor } = props
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.8} style={[appStyles.buttonBorderd, { borderRadius: sizes.buttonRadius, height: height(7), borderColor: borderColor ? borderColor : colors.appColor1 }, buttonStyle]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    customIcon ?
                        <CustomIcon
                            icon={customIcon}
                            size={iconSize ? iconSize : totalSize(3)}
                            color={iconColor ? iconColor : null}
                            style={[{ marginRight: width(5) }, iconStyle]}
                        />
                        :
                        iconName ?
                            <Icon
                                name={iconName ? iconName : "email-outline"}
                                type={iconType ? iconType : "material-community"}
                                size={iconSize ? iconSize : totalSize(3)}
                                color={iconColor ? iconColor : tintColor ? tintColor : colors.appColor1}
                                iconStyle={[{ marginRight: width(5) }, iconStyle]}

                            />
                            :
                            null
                }
                <ButtonTextMedium style={[{ color: tintColor ? tintColor : colors.appColor1, }, textStyle]}>{text}</ButtonTextMedium>
            </View>
        </TouchableOpacity>
    );
}

export const ButtonBorderedSmall = props => {
    const { text, onPress, buttonStyle, rowReverse, textStyle, iconName, iconType, iconSize, iconColor, iconStyle, tintColor } = props
    return (
        <TouchableOpacity onPress={onPress} style={[{ borderRadius: sizes.buttonSmallRadius, paddingHorizontal: width(5), paddingVertical: height(1), borderColor: tintColor ? tintColor : colors.appColor1, borderWidth: 1 }, buttonStyle]}>
            <View style={{ flexDirection: rowReverse ? 'row-reverse' : 'row', alignItems: 'center' }}>
                {
                    iconName ?
                        <Icon
                            name={iconName ? iconName : "email-outline"}
                            type={iconType ? iconType : "material-community"}
                            size={iconSize ? iconSize : totalSize(2)}
                            color={tintColor ? tintColor : colors.appColor1}
                            iconStyle={[{ marginHorizontal: width(2) }, iconStyle]}
                        />
                        :
                        null
                }
                <Text style={[appStyles.ButtonTextRegular, { color: tintColor ? tintColor : colors.appColor1, fontSize: fontSize.regular }, textStyle]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}
export const ButtonArrowSimple = ({ text, onPress, animation, buttonStyle, duration, textStyle, iconName, iconType, iconSize, iconStyle, tintColor, right }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Wrapper animation={animation} duration={duration} style={[buttonStyle]} >
                <Spacer height={sizes.baseMargin} />
                <RowWrapper >
                    <Wrapper flex={1}>
                        <MediumText style={[{ color: tintColor ? tintColor : colors.appColor1, }, textStyle]}>{text}</MediumText>
                    </Wrapper>
                    <Wrapper style={[{ marginLeft: sizes.marginHorizontal }]}>
                        {
                            right ? right :
                                <Icon
                                    name={iconName ? iconName : "chevron-right"}
                                    type={iconType ? iconType : "material-community"}
                                    size={iconSize ? iconSize : sizes.icons.large}
                                    color={tintColor ? tintColor : colors.appTextColor5}
                                    iconStyle={[{}, iconStyle]}
                                />
                        }
                    </Wrapper>
                </RowWrapper>
                <Spacer height={sizes.baseMargin} />
            </Wrapper>
        </TouchableOpacity>
    );
}
export const ButtonArrowColored = props => {
    const { text, onPress, animation, buttonStyle, textStyle, iconName, iconType, iconSize, buttonColor, iconStyle, tintColor } = props
    return (
        <TouchableOpacity onPress={onPress}>
            <ComponentWrapper animation={animation} style={[{ borderRadius: sizes.buttonRadius, backgroundColor: buttonColor ? buttonColor : colors.appColor1, paddingVertical: height(1.25) }, appStyles.shadow, buttonStyle]}>
                <RowWrapper>
                    <ButtonTextMedium style={[{ color: tintColor ? tintColor : colors.appTextColor6, }, textStyle]}>{text}</ButtonTextMedium>
                    <Icon
                        name={iconName ? iconName : "chevron-right"}
                        type={iconType ? iconType : "material-community"}
                        size={iconSize ? iconSize : sizes.icons.medium}
                        color={tintColor ? tintColor : colors.appTextColor6}
                        iconStyle={[{}, iconStyle]}
                    />
                </RowWrapper>
            </ComponentWrapper>
        </TouchableOpacity>
    );
}

export const SharePostButton = ({ onPress, animation }) => {
    return (
        <TextInputBordered
            placeholder="Share a post"
            isButton
            iconName="attach-file"
            iconType="material"
            onPress={onPress}
            inputContainerStyle={{ borderColor: colors.appTextColor3 }}
            animation={animation}
        />
    )
}

export const AddButton = ({ onPress, style, size }) => {
    const defaultSize = totalSize(6)
    return (
        <TouchableOpacity onPress={onPress} style={[appStyles.center, appStyles.shadow, {
            borderRadius: defaultSize / 2,
            backgroundColor: colors.appBgColor2, height: defaultSize, width: defaultSize
        }, style]}>
            <Icon
                name="add-circle"
                type="ionicon"
                size={size ? size : sizes.icons.large}
                color={colors.primary}
            />
        </TouchableOpacity>
    )
}
export const OptionButton = ({ onPress, style, iconName, iconSize, iconColor }) => {

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.9}
            style={[appStyles.center, appStyles.shadow, { borderRadius: sizes.buttonMiniRadius, backgroundColor: colors.appBgColor, height: totalSize(4), width: totalSize(4) }, style]}>
            <Icon
                name={iconName}
                size={iconSize ? iconSize : sizes.icons.xl}
                color={iconColor ? iconColor : colors.appTextColor4}
            />
        </TouchableOpacity>
    )
}
export const FilterButton = ({ onPress, style, iconName, iconSize, iconColor }) => {

    return (
        <Wrapper onPress={onPress} activeOpacity={.9}
            style={[appStyles.center, appStyles.shadow, { borderRadius: sizes.buttonMiniRadius, backgroundColor: colors.appBgColor, height: totalSize(5), width: totalSize(5) }, style]}>
            <Icon
                name={iconName}
                size={iconSize ? iconSize : sizes.icons.xl}
                color={iconColor ? iconColor : colors.appTextColor4}
            />
        </Wrapper>
    )
}

export const BackArrowButton = ({ onPress, style, size }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[appStyles.center, { borderRadius: sizes.CamBgRadius, height: totalSize(5), width: totalSize(5) }, style]}>
            <Icon
                name="chevron-back-circle"
                type="ionicon"
                size={size ? size : totalSize(4)}
                color={colors.primary}
            />
        </TouchableOpacity>
    )
}
export const SendButton = ({ onPress, style, size, color }) => {
    return (
        <Wrapper style={[appStyles.center, { borderRadius: sizes.CamBgRadius, }, style]}>
            <Wrapper style={[appStyles.center, appStyles.profileImageWrapper,
            { backgroundColor: colors.primary, height: 34, width: 34, margin: sizes.smallMargin / 1.5 }]}>
                <Icon
                    name="send"
                    size={size ? size : totalSize(4)}
                    color={color ? color : colors.appColor2}
                />
            </Wrapper>
        </Wrapper>
    )
}

export const BackArrowSquaredButton = ({ onPress, style, size, iconColor, backgroundColor }) => {
    const defaultSize = totalSize(4)
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.8} style={[appStyles.center,
        {
            backgroundColor: backgroundColor ? backgroundColor : colors.appColorFaded,
            borderRadius: sizes.buttonMiniRadius,
            height: size ? size : defaultSize,
            width: size ? size : defaultSize
        }, style]}>
            <Icon
                name="chevron-back"
                type="ionicon"
                size={size ? size / 1.5 : defaultSize / 1.5}
                color={iconColor ? iconColor : colors.appBgColor}
            />
        </TouchableOpacity>
    )
}

export const ButtonSelectablePrimary = ({ animation, text, duration, isSelected, onPress, buttonStyle, tintColor }) => {
    return (
        <Wrapper animation={animation} duration={duration}>
            <ButtonBordered
                text={text}
                onPress={onPress}
                buttonStyle={[styles.buttonSelectableBasic, isSelected ? styles.selectedButtonSelectablePrimary : styles.buttonSelectablePrimary, buttonStyle]}
                tintColor={isSelected ? colors.appTextColor6 : colors.appBgColor3}
                textStyle={[{ fontFamily: fontFamily.appTextRegular }]}
            />
        </Wrapper>
    )
}

export const ButtonSelectableTopBar = ({ animation, text, duration, isSelected, onPress, buttonStyle, tintColor }) => {
    return (
        <Wrapper animation={animation} duration={duration}>
            <ButtonBordered
                text={text}
                onPress={onPress}
                buttonStyle={[isSelected ? styles.selectedButtonSelectablePrimary : styles.buttonSelectablePrimary, styles.buttonSelectableTopBarBasic, buttonStyle]}
                tintColor={isSelected ? colors.appTextColor6 : colors.appTextColor6}
                textStyle={[{ fontFamily: fontFamily.appTextRegular }]}
            />
        </Wrapper>
    )
}

export const ButtonSelectableUnderlined = ({ animation, text, duration, isSelected, onPress, buttonStyle }) => {
    return (
        <Wrapper animation={animation} duration={duration}>
            <ButtonBordered
                text={text}
                onPress={onPress}
                buttonStyle={[styles.buttonSelectableBasicUnderLined, isSelected ? styles.selectedButtonSelectableUnderLined : styles.buttonSelectableBasicUnderLined, buttonStyle]}
                tintColor={isSelected ? colors.appTextColor2 : colors.appTextColor8}
                textStyle={[{ fontFamily: fontFamily.appTextMedium }]}
            />
        </Wrapper>
    )
}


const styles = StyleSheet.create({
    //ButtonSelectablePrimary
    buttonSelectablePrimary: {
        //borderColor:colors.appBgColor3,
        marginBottom: sizes.marginBottom / 2
    },
    buttonSelectableBasic: {
        paddingHorizontal: Platform.OS === 'android' ? width(4) : width(2),
        borderRadius: sizes.ModalRadius,
        marginHorizontal: Platform.OS === 'android' ? width(2) : width(2),
        paddingVertical: 0,
        height: height(5),
        borderColor: colors.appColor3,
    },
    selectedButtonSelectablePrimary: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
        marginBottom: sizes.marginBottom / 2
    },
    buttonSelectableBasicUnderLined: {
        paddingHorizontal: width(3),
        marginHorizontal: width(1),
        paddingVertical: 0,
        height: height(5),
        borderWidth: 0,
    },
    selectedButtonSelectableUnderLined: {
        borderBottomWidth: 1,
        borderBottomColor: colors.appTextColor2,
        borderRadius: 0
    },
    buttonSelectableTopBarBasic: {
        // width: width(30),
        height: height(6),
        marginHorizontal: 0,
        marginBottom: 0,
        borderColor: colors.transparent,
        paddingHorizontal: width(4),
        borderRadius: sizes.ModalRadius,
        paddingVertical: 0,
    }
})