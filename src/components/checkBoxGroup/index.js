import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ViewPropTypes } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, sizes, appStyles } from '../../services';
import { IconWithText } from '../icons';
import { RegularText } from '../text';
import { Spacer } from '../spacers';
import { RowWrapper } from '..';

export const CheckBoxSelector = props => {
    const { textStyle, containerStyle, text, checked, onPress } = props

    const [checkedVal, setChecked] = React.useState('')
    
    // const checkedIconName = 'ellipse'
    const checkedIconName = 'checkmark-circle'
    const uncheckedIconName = 'ellipse-outline'
    const checkboxIconType = 'ionicon'
    const checkboxappIconsize = sizes.icons.large
    const checkIconColor = colors.primary
    const uncheckIconColor = colors.gray
    return (
        <RowWrapper>
            <IconWithText
                text='Applicant'
                iconName={checked == 'Applicant' ? checkedIconName : uncheckedIconName}
                iconType={checkboxIconType}
                iconSize={checkboxappIconsize}
                tintColor={checked == 'Applicant' ? checkIconColor : uncheckIconColor}
                onPress={() => onPress('Applicant')}
                textStyle={[styles.checkboxText, textStyle]}
                containerStyle={containerStyle}
            />
            <IconWithText
                text='Restaurant'
                iconName={checked == 'Resturant' ? checkedIconName : uncheckedIconName}
                iconType={checkboxIconType}
                iconSize={checkboxappIconsize}
                tintColor={checked == 'Resturant' ? checkIconColor : uncheckIconColor}
                onPress={() => onPress('Resturant')}
                textStyle={[styles.checkboxText, textStyle]}
                containerStyle={containerStyle}
            />
            <IconWithText
                text='Event'
                iconName={checked == 'Event' ? checkedIconName : uncheckedIconName}
                iconType={checkboxIconType}
                iconSize={checkboxappIconsize}
                tintColor={checked == 'Event' ? checkIconColor : uncheckIconColor}
                onPress={() => onPress('Event')}
                textStyle={[styles.checkboxText, textStyle]}
                containerStyle={containerStyle}
            />
        </RowWrapper>
    );
}
const styles = StyleSheet.create({
    checkboxText: {
        ...appStyles.textRegular,
        // ...appStyles.textGray
    }
})