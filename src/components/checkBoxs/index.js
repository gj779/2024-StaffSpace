import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors, sizes, appStyles } from '../../services';
import { IconWithText } from '../icons';
import { Wrapper } from '../wrappers';

export const CheckBoxPrimary = props => {
    const { textStyle, containerStyle, text, checked, onPress, title } = props
    const checkedIconName = 'checkmark-circle'
    const uncheckedIconName = 'ellipse-outline'
    const checkboxIconType = 'ionicon'
    const checkboxappIconsize = sizes.icons.large
    const checkIconColor = colors.primary
    const uncheckIconColor = colors.gray
    return (
        <IconWithText
            text={text}
            iconName={checked ? checkedIconName : uncheckedIconName}
            iconType={checkboxIconType}
            iconSize={checkboxappIconsize}
            tintColor={checked ? checkIconColor : uncheckIconColor}
            onPress={onPress}
            textStyle={[styles.checkboxText, textStyle]}
            containerStyle={containerStyle}
        />
    );
}

export const CheckBoxFavorite = props => {
    const { textStyle, containerStyle, text, checked, onPress, title, buttonBackground } = props
    const checkedIconName = 'heart'
    const uncheckedIconName = 'heart-outline'
    const checkboxIconType = 'ionicon'
    const checkboxappIconsize = sizes.icons.large
    const checkIconColor = colors.white
    const uncheckIconColor = colors.white
    return (
        <TouchableOpacity activeOpacity={.6} onPress={onPress}>
            <Wrapper style={{ backgroundColor: buttonBackground ? buttonBackground : colors.appColorFaded, borderRadius: sizes.buttonMiniRadius, padding: 3 }}>
                <IconWithText
                    text={text}
                    iconName={checked ? checkedIconName : uncheckedIconName}
                    iconType={checkboxIconType}
                    iconSize={checkboxappIconsize}
                    onPress={onPress}
                    tintColor={checked ? checkIconColor : uncheckIconColor}
                    textStyle={[styles.checkboxText, textStyle]}
                    containerStyle={containerStyle}
                />
            </Wrapper>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    checkboxText: {
        ...appStyles.textRegular,
        // ...appStyles.textGray
    }
})
