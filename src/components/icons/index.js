import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {colors, appStyles, sizes, fontFamily} from '../../services';
import * as Animatable from 'react-native-animatable';
import {LargeText} from '../text';
import {Icon} from 'react-native-elements';
import {AbsoluteWrapper} from '../wrappers';

export const CustomIcon = props => {
  const {icon, size, animation, duration, color, borderRadius} = props;
  const defaulSize = totalSize(5);
  return (
    <Animatable.View animation={animation} duration={duration}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          height: size ? size : defaulSize,
          width: size ? size : defaulSize,
          tintColor: color,
          borderRadius: borderRadius,
        }}
      />
    </Animatable.View>
  );
};

export const IconClose = ({onPress, size, color, top}) => {
  return (
    <AbsoluteWrapper style={{top: top ? top : 10, right: 10, zIndex: 100}}>
      <Icon
        onPress={onPress}
        name={'close'}
        type={'evil-icon'}
        size={size ? size : sizes.icons.xl}
        color={color ? color : colors.appTextColor5}
      />
    </AbsoluteWrapper>
  );
};
export const CloseIcon = ({onPress, size, color}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: totalSize(4),
        width: totalSize(4),
        borderRadius: totalSize(3),
        backgroundColor: colors.appColor8,
        position: 'absolute',
        right: 8,
        top: 16,
      }}>
      <Icon
        name={'close'}
        type={'evil-icon'}
        size={size ? size : sizes.icons.xl}
        color={color ? color : colors.appTextColor4}
      />
    </TouchableOpacity>
  );
};
export const EditClose = ({onPress}) => {
  return (
    <Icon
      onPress={onPress}
      name={'edit'}
      type={'antdesign'}
      size={sizes.icons.small}
      color={colors.appTextColor3}
    />
  );
};
export const AddIcon = ({onPress}) => {
  return (
    <Icon
      onPress={onPress}
      name={'add'}
      type={'material-icon'}
      size={sizes.icons.large}
      color={colors.primary}
    />
  );
};
export const PhotoIcon = ({onPress}) => {
  return (
    <Icon
      onPress={onPress}
      name={'add'}
      type={'material-icon'}
      size={sizes.icons.large}
      color={colors.primary}
    />
  );
};

export const IconWithText = ({
  text,
  containerStyle,
  title,
  customIcon,
  onPress,
  tintColor,
  iconName,
  iconType,
  iconSize,
  textStyle,
  titleStyle,
  direction,
  iconStyle,
  borderRadius,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        {flexDirection: direction ? direction : 'row', alignItems: 'center'},
        containerStyle,
      ]}>
      {customIcon ? (
        <CustomIcon
          icon={customIcon}
          size={iconSize ? iconSize : totalSize(2)}
          borderRadius={borderRadius}
        />
      ) : (
        <Icon
          type={iconType ? iconType : 'ionicon'}
          name={iconName ? iconName : 'person'}
          size={iconSize ? iconSize : totalSize(3)}
          color={tintColor ? tintColor : colors.appTextColor1}
          iconStyle={iconStyle}
        />
      )}
      {text ? (
        <View
          style={
            direction === 'column'
              ? {marginVertical: height(1.5)}
              : {marginHorizontal: width(1)}
          }>
          <LargeText
            style={[
              {color: tintColor ? tintColor : colors.primary},
              textStyle,
            ]}>
            {text}
          </LargeText>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  IconButtonContainer: {
    borderRadius: 100,
    ...appStyles.center,
  },
});
