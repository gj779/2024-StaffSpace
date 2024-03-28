import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  appStyles,
  colors,
  fontFamily,
  sizes,
  appIcons,
  fontSize,
} from '../../services';
import {
  RowWrapperBasic,
  Wrapper,
  RowWrapper,
  ComponentWrapper,
} from '../wrappers';
import {width, height, totalSize} from 'react-native-dimension';
import {IconWithText} from '../icons';
import {Spacer} from '../spacers';
import {CustomizedImage} from '../images';

// Title Texts
export const XXLTitle = props => {
  return (
    <Text style={[styles.xxlTitleStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const XLTitle = props => {
  return (
    <Text style={[styles.xlTitleStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const LargeTitle = props => {
  return (
    <Text style={[styles.largeTitleStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const MediumTitle = props => {
  return (
    <Text
      style={[styles.mediumTitleStyle, props.style]}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const SmallTitle = props => {
  return (
    <Text style={[styles.smallTitleStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const TinyTitle = props => {
  return (
    <Text style={[styles.tinyTitleStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
// Normal Texts
export const LargeText = props => {
  return (
    <Text style={[styles.largeTextStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const MediumText = props => {
  return (
    <Text style={[styles.mediumTextStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const RegularText = props => {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      style={[styles.regularTextStyle, props.style]}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const SmallText = props => {
  return (
    <Text
      style={[styles.smallTextStyle, props.style]}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}>
      {props.children}
    </Text>
  );
};
export const TinyText = props => {
  return (
    <Text style={[styles.tinyTextStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const InputTitle = props => {
  return (
    <Text style={[styles.inputTitleStyle, props.style]}>{props.children}</Text>
  );
};

export const ButtonTextRegular = props => {
  return (
    <Text style={[styles.ButtonTextRegularStyle, props.style]}>
      {props.children}
    </Text>
  );
};
export const ButtonTextMedium = props => {
  return (
    <Text style={[styles.ButtonTextMediumStyle, props.style]}>
      {props.children}
    </Text>
  );
};

export const TitleWithText = ({
  title,
  titleStyle,
  text,
  onPressText,
  right,
  require,
}) => {
  return (
    <RowWrapper>
      <TinyTitle style={[{fontSize: fontSize.medium}, titleStyle]}>
        {title}
        {require ? (
          <MediumText style={{color: colors.error}}> *</MediumText>
        ) : null}
      </TinyTitle>
      {right ? (
        right
      ) : (
        <RegularText onPress={onPressText} style={[appStyles.textBlue]}>
          {text}
        </RegularText>
      )}
    </RowWrapper>
  );
};

export const BorderedTextWithIcon = props => {
  const {
    style,
    iconName,
    text,
    iconSize,
    iconColor,
    onPress,
    iconType,
    customIcon,
    resizeMode,
  } = props;
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <ComponentWrapper>
        {customIcon ? (
          <CustomizedImage
            style={{borderRadius: 10}}
            height={width(20)}
            width={width(90)}
            radius={null}
            source={customIcon}
            resizeMode={resizeMode}
          />
        ) : (
          <RowWrapperBasic
            style={[
              text ? styles.fileSelector : styles.fileSelectorwithOutText,
              style,
              appStyles.center,
            ]}>
            <IconWithText
              onPress={onPress}
              iconName={iconName}
              iconType={iconType}
              iconSize={iconSize ? iconSize : sizes.icons.medium}
              tintColor={iconColor}
            />
            <SmallTitle style={[styles.BorderedTextWithIconsText, props.style]}>
              {' '}
              {text}{' '}
            </SmallTitle>
          </RowWrapperBasic>
        )}
      </ComponentWrapper>
    </TouchableOpacity>
  );
};
export const TextwithDescription = props => {
  const {iconName, title, text, onPress, titleStyle, textStyle} = props;
  return (
    <Wrapper>
      <Spacer height={sizes.smallMargin} />
      <TinyTitle style={titleStyle}>{title}</TinyTitle>
      <Spacer height={sizes.smallMargin} />
      <RegularText style={textStyle}>{text}</RegularText>
      <Spacer height={sizes.smallMargin} />
    </Wrapper>
  );
};
export const TextProfileExperience = props => {
  const {
    iconName,
    isEditable,
    title,
    companyName,
    employementType,
    onPressEdit,
    startDate,
    endDate,
    onPress,
    titleStyle,
    textStyle,
  } = props;
  return (
    <RowWrapperBasic style={{justifyContent: 'space-between'}}>
      <Wrapper>
        <Spacer height={sizes.TinyMargin} />
        <RegularText style={titleStyle}>{title}</RegularText>
        <Spacer height={sizes.TinyMargin} />
        <SmallText
          style={textStyle}>{`${companyName} - ${employementType}`}</SmallText>
        <Spacer height={sizes.TinyMargin} />
        <SmallText style={textStyle}>{`${startDate} - ${endDate}`}</SmallText>
        <Spacer height={sizes.TinyMargin} />
      </Wrapper>
      {!isEditable ? (
        <Wrapper>
          <IconWithText
            onPress={onPressEdit}
            tintColor={colors.appColor2}
            iconName="create-outline"
            co
            iconSize={sizes.icons.medium}
          />
        </Wrapper>
      ) : null}
    </RowWrapperBasic>
  );
};

const styles = StyleSheet.create({
  xxlTitleStyle: {
    ...appStyles.h1,
  },
  xlTitleStyle: {
    ...appStyles.h2,
  },
  largeTitleStyle: {
    ...appStyles.h3,
  },
  mediumTitleStyle: {
    ...appStyles.h4,
  },
  smallTitleStyle: {
    ...appStyles.h5,
  },
  tinyTitleStyle: {
    ...appStyles.h6,
    fontFamily: fontFamily.appTextBold,
  },
  largeTextStyle: {
    ...appStyles.textLarge,
  },
  mediumTextStyle: {
    ...appStyles.textMedium,
  },
  regularTextStyle: {
    ...appStyles.textRegular,
  },
  smallTextStyle: {
    ...appStyles.textSmall,
  },
  tinyTextStyle: {
    ...appStyles.textTiny,
  },
  inputTitleStyle: {
    ...appStyles.textRegular,
    ...appStyles.textGray,
  },
  ButtonTextRegularStyle: {
    ...appStyles.ButtonTextRegular,
    //color: colors.appColor1
  },
  ButtonTextMediumStyle: {
    ...appStyles.ButtonTextMedium,
    color: colors.appColor1,
  },
  fileSelector: {
    borderWidth: 1,
    padding: 10,
    borderRadius: sizes.inputRadius,
    borderColor: colors.appBgColor3,
    borderStyle: 'dashed',
    height: height(12),
  },
  fileSelectorwithOutText: {
    borderWidth: 1,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes.inputRadius,
    borderColor: colors.appBgColor3,
    borderStyle: 'dotted',
    height: height(10),
    borderColor: colors.primary,
  },
  BorderedTextWithIconsText: {
    marginStart: totalSize(2),
  },
});
