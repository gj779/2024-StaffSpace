import React from 'react';
import {TouchableOpacity, TextInput, View} from 'react-native';
import {
  ComponentWrapper,
  Wrapper,
  RowWrapperBasic,
  RowWrapper,
} from '../wrappers';
import {
  InputTitle,
  RegularText,
  MediumText,
  SmallText,
  TinyText,
} from '../text';
import {Spacer} from '../spacers';
import Icon from 'react-native-vector-icons/Ionicons';
import {Swipeable} from 'react-native-gesture-handler';
import {styles} from './styles';
import * as Animatable from 'react-native-animatable';
import {appStyles, colors, fontSize, sizes} from '../../services';
import {height, width} from 'react-native-dimension';
import {IconWithText} from '../icons';

export const TextInputColored = ({
  iconName,
  error,
  ref,
  iconType,
  left,
  onPress,
  title,
  isButton,
  titleStyle,
  placeholder,
  editable,
  animation,
  multiline,
  onFocus,
  onBlur,
  onChangeText,
  secureTextEntry,
  value,
  iconColor,
  iconSize,
  containerStyle,
  inputContainerStyle,
  onPressIcon,
  inputStyle,
  right,
  keyboardType,
  iconStyle,
}) => {
  var focused = false;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[containerStyle]}>
      {title ? (
        <ComponentWrapper style={{}}>
          <InputTitle style={[{marginLeft: width(2.5)}, titleStyle]}>
            {title}
          </InputTitle>
          <Spacer height={sizes.TinyMargin} />
        </ComponentWrapper>
      ) : null}
      <Animatable.View
        animation={animation}
        style={[
          appStyles.inputContainerColored,
          {
            borderRadius: sizes.inputRadius,
            backgroundColor: colors.appBgColor1,
          },
          inputContainerStyle,
        ]}>
        {left ? left : null}
        <View style={{flex: 8}}>
          {isButton ? (
            <ComponentWrapper>
              <Spacer height={sizes.baseMargin} />
              <RegularText style={value ? null : appStyles.textGray}>
                {value ? value : placeholder}
              </RegularText>
              <Spacer height={sizes.baseMargin} />
            </ComponentWrapper>
          ) : (
            <TextInput
              ref={ref}
              onChangeText={onChangeText}
              value={value}
              placeholder={placeholder}
              editable={editable}
              multiline={multiline}
              placeholderTextColor={'#21212180'}
              keyboardType={keyboardType}
              onFocus={(() => (focused = true), onFocus)}
              onBlur={(() => (focused = false), onBlur)}
              secureTextEntry={secureTextEntry}
              style={[
                appStyles.inputField,
                {width: null, height: height(6), paddingHorizontal: width(5)},
                inputStyle,
              ]}
            />
          )}
        </View>
        {right ? (
          right
        ) : iconName ? (
          <View style={{alignSelf: 'flex-end', padding: 10}}>
            <Icon
              name={iconName}
              type={iconType}
              size={iconSize ? iconSize : sizes.icons.medium}
              color={iconColor ? iconColor : colors.appTextColor5}
              iconStyle={iconStyle}
              onPress={onPressIcon}
            />
          </View>
        ) : null}
      </Animatable.View>
      {error ? (
        <ComponentWrapper style={{marginLeft: width(7.5)}} animation="shake">
          <Spacer height={sizes.TinyMargin} />
          <IconWithText
            iconName="alert-circle-outline"
            //title="New"
            text={error}
            tintColor={colors.appErrorColor}
            iconSize={sizes.icons.small}
            textStyle={[{fontSize: fontSize.small}]}
          />
        </ComponentWrapper>
      ) : null}
    </TouchableOpacity>
  );
};

export const TextInputBordered = ({
  iconName,
  error,
  duration,
  iconType,
  required,
  left,
  onPress,
  content,
  keyboardType,
  title,
  isButton,
  titleStyle,
  placeholder,
  editable,
  animation,
  multiline,
  onFocus,
  buttonContentStyle,
  onBlur,
  onChangeText,
  secureTextEntry,
  value,
  iconColor,
  iconSize,
  containerStyle,
  inputContainerStyle,
  onPressIcon,
  inputStyle,
  right,
  iconStyle,
}) => {
  var focused = false;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper
        animation={animation}
        duration={duration}
        style={[styles.textInputBorderedContainer, containerStyle]}>
        {title ? (
          <ComponentWrapper style={{marginHorizontal: sizes.marginHorizontal}}>
            <Spacer height={sizes.smallMargin} />
            <RowWrapperBasic>
              <Icon
                name={iconName}
                type={iconType}
                size={iconSize ? iconSize : sizes.icons.medium}
                color={iconColor ? iconColor : colors.appTextColor5}
                iconStyle={iconStyle}
                onPress={onPressIcon}
              />
              <InputTitle style={[{marginLeft: width(2.5)}, titleStyle]}>
                {title}
                {required ? (
                  <RegularText style={{color: colors.error}}> *</RegularText>
                ) : null}
              </InputTitle>
            </RowWrapperBasic>
          </ComponentWrapper>
        ) : null}
        <RowWrapperBasic
          style={[
            {
              borderRadius: sizes.inputRadius,
              borderWidth: 0,
              borderColor: colors.appTextColor5,
            },
            inputContainerStyle,
          ]}>
          {left ? left : null}
          <View style={{flex: 8}}>
            {isButton ? (
              content ? (
                content
              ) : (
                <ComponentWrapper
                  style={[
                    {paddingVertical: sizes.baseMargin},
                    buttonContentStyle,
                  ]}>
                  <RegularText style={value ? null : appStyles.textGray}>
                    {value ? value : placeholder}
                  </RegularText>
                </ComponentWrapper>
              )
            ) : (
              <TextInput
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                editable={editable}
                keyboardType={keyboardType}
                multiline={multiline}
                placeholderTextColor={'#21212180'}
                // onFocus={() => focused = true, onFocus}
                // onBlur={() => focused = false, onBlur}
                secureTextEntry={secureTextEntry}
                style={[
                  appStyles.inputField,
                  {width: null, height: height(6), paddingHorizontal: width(5)},
                  inputStyle,
                ]}
              />
            )}
          </View>
          {right ? right : iconName ? null : null}
        </RowWrapperBasic>
      </Wrapper>
      {error ? (
        <ComponentWrapper style={{marginLeft: width(7.5)}} animation="shake">
          <Spacer height={sizes.TinyMargin} />
          <IconWithText
            iconName="alert-circle-outline"
            //title="New"
            text={error}
            tintColor={colors.appErrorColor}
            iconSize={sizes.icons.small}
            textStyle={[{fontSize: fontSize.small}]}
          />
        </ComponentWrapper>
      ) : null}
    </TouchableOpacity>
  );
};
export const TextInputBorderUpTitle = ({
  iconName,
  error,
  iconType,
  required,
  left,
  onPress,
  content,
  keyboardType,
  title,
  isButton,
  titleStyle,
  placeholder,
  editable,
  animation,
  multiline,
  onFocus,
  buttonContentStyle,
  onBlur,
  onChangeText,
  secureTextEntry,
  value,
  iconColor,
  iconSize,
  containerStyle,
  inputContainerStyle,
  onPressIcon,
  inputStyle,
  right,
  iconStyle,
}) => {
  var focused = false;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      {title ? (
        <Wrapper style={{marginHorizontal: sizes.marginHorizontal}}>
          <Spacer height={sizes.smallMargin} />
          <RowWrapperBasic>
            <Icon
              name={iconName}
              type={iconType}
              size={iconSize ? iconSize : sizes.icons.medium}
              color={iconColor ? iconColor : colors.appTextColor5}
              iconStyle={iconStyle}
              onPress={onPressIcon}
            />
            <InputTitle style={[{marginLeft: width(2.5)}, titleStyle]}>
              {title}
              {required ? (
                <RegularText style={{color: colors.error}}> *</RegularText>
              ) : null}
            </InputTitle>
          </RowWrapperBasic>
          <Spacer height={sizes.TinyMargin} />
        </Wrapper>
      ) : null}
      <Wrapper
        animation={animation ? animation : 'fadeInUp'}
        style={[styles.textInputBorderedContainer, containerStyle]}>
        <RowWrapperBasic
          style={[
            {
              borderRadius: sizes.inputRadius,
              borderWidth: 0,
              borderColor: colors.appTextColor5,
            },
            inputContainerStyle,
          ]}>
          {left ? left : null}
          <View style={{flex: 8}}>
            {isButton ? (
              content ? (
                content
              ) : (
                <Wrapper
                  style={[
                    {paddingVertical: sizes.baseMargin},
                    buttonContentStyle,
                  ]}>
                  <RegularText style={value ? null : appStyles.textGray}>
                    {value ? value : placeholder}
                  </RegularText>
                </Wrapper>
              )
            ) : (
              <TextInput
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                editable={editable}
                keyboardType={keyboardType}
                multiline={multiline}
                placeholderTextColor={'#21212180'}
                // onFocus={() => focused = true, onFocus}
                // onBlur={() => focused = false, onBlur}
                secureTextEntry={secureTextEntry}
                style={[
                  appStyles.inputField,
                  {width: null, height: height(6), paddingHorizontal: width(5)},
                  inputStyle,
                ]}
              />
            )}
          </View>
          {right ? right : iconName ? null : null}
        </RowWrapperBasic>
      </Wrapper>
      {error ? (
        <ComponentWrapper style={{marginLeft: width(7.5)}} animation="shake">
          <Spacer height={sizes.TinyMargin} />
          <IconWithText
            iconName="alert-circle-outline"
            //title="New"
            text={error}
            tintColor={colors.appErrorColor}
            iconSize={sizes.icons.small}
            textStyle={[{fontSize: fontSize.small}]}
          />
        </ComponentWrapper>
      ) : null}
    </TouchableOpacity>
  );
};

export const TextInputBorderedPassword = ({
  iconName,
  error,
  iconType,
  required,
  left,
  onPress,
  content,
  keyboardType,
  title,
  isButton,
  titleStyle,
  placeholder,
  editable,
  animation,
  multiline,
  onFocus,
  buttonContentStyle,
  onBlur,
  onChangeText,
  secureTextEntry,
  value,
  iconColor,
  iconSize,
  containerStyle,
  inputContainerStyle,
  onPressIcon,
  inputStyle,
  right,
  iconStyle,
}) => {
  var focused = false;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper
        animation={animation}
        style={[styles.textInputBorderedContainer, containerStyle]}>
        <RowWrapper>
          <View style={{flex: 1}}>
            {title ? (
              <ComponentWrapper style={{marginHorizontal: null}}>
                <Spacer height={sizes.smallMargin} />
                <RowWrapperBasic>
                  <Icon
                    name={iconName}
                    type={iconType}
                    size={iconSize ? iconSize : sizes.icons.medium}
                    color={iconColor ? iconColor : colors.appTextColor5}
                    iconStyle={iconStyle}
                    onPress={onPressIcon}
                  />
                  <InputTitle style={[{marginLeft: width(2)}]}>
                    {title}
                    {required ? (
                      <RegularText style={{color: colors.error}}>
                        {' '}
                        *
                      </RegularText>
                    ) : null}
                  </InputTitle>
                </RowWrapperBasic>
              </ComponentWrapper>
            ) : null}
            <View style={{flex: 8, marginLeft: 0}}>
              {isButton ? (
                content ? (
                  content
                ) : (
                  <ComponentWrapper
                    style={[
                      {paddingVertical: sizes.baseMargin},
                      buttonContentStyle,
                    ]}>
                    <RegularText style={value ? null : appStyles.textGray}>
                      {value ? value : placeholder}
                    </RegularText>
                  </ComponentWrapper>
                )
              ) : (
                <TextInput
                  onChangeText={onChangeText}
                  value={value}
                  placeholder={placeholder}
                  editable={editable}
                  keyboardType={keyboardType}
                  multiline={multiline}
                  placeholderTextColor={'#21212180'}
                  onFocus={(() => (focused = true), onFocus)}
                  onBlur={(() => (focused = false), onBlur)}
                  secureTextEntry={secureTextEntry}
                  style={[
                    appStyles.inputField,
                    {width: null, height: height(6), paddingEnd: width(5)},
                    inputStyle,
                  ]}
                />
              )}
            </View>
          </View>
          <View>{right ? right : iconName ? null : null}</View>
        </RowWrapper>
      </Wrapper>
      {error ? (
        <ComponentWrapper style={{marginLeft: width(7.5)}} animation="shake">
          <Spacer height={sizes.TinyMargin} />
          <IconWithText
            iconName="alert-circle-outline"
            //title="New"
            text={error}
            tintColor={colors.appErrorColor}
            iconSize={sizes.icons.small}
            textStyle={[{fontSize: fontSize.small}]}
          />
        </ComponentWrapper>
      ) : null}
    </TouchableOpacity>
  );
};

export const TextInputSimpleBordered = ({
  onChangeText,
  autoFocus,
  value,
  error,
  placeholder,
  editable,
  keyboardType,
  multiline,
  onFocus,
  onBlur,
  secureTextEntry,
  inputStyle,
}) => {
  return (
    <Wrapper>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholderTextColor={'#21212180'}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        style={[
          appStyles.inputField,
          {
            paddingHorizontal: width(3),
            width: null,
            height: height(6),
            marginHorizontal: sizes.marginHorizontal,
            borderWidth: 1,
            borderColor: colors.appBgColor3,
            borderRadius: sizes.inputRadius,
          },
          inputStyle,
        ]}
      />
      {error ? (
        <ComponentWrapper style={{marginLeft: width(5)}} animation="shake">
          <Spacer height={sizes.TinyMargin} />
          <IconWithText
            iconName="alert-circle-outline"
            //title="New"
            text={error}
            tintColor={colors.appErrorColor}
            iconSize={sizes.icons.small}
            textStyle={[{fontSize: 12}]}
          />
        </ComponentWrapper>
      ) : null}
    </Wrapper>
  );
};

export const TextInputSearch = ({
  placeholder,
  onChangeText,
  value,
  onPressSearch,
  animation,
  iconSize,
  width,
}) => {
  return (
    <TextInputBordered
      placeholder={placeholder ? placeholder : 'Search'}
      onChangeText={onChangeText}
      value={value}
      animation={animation}
      containerStyle={[
        appStyles.shadow,
        {
          backgroundColor: '#FFF',
          width: width,
          marginHorizontal: 0,
          borderWidth: 0,
        },
      ]}
      left={
        <Icon
          name="search"
          color={colors.primary}
          size={iconSize ? iconSize : sizes.icons.large}
          style={{marginLeft: sizes.marginHorizontal}}
          onPress={onPressSearch}
        />
      }
    />
  );
};
