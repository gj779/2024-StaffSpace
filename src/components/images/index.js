import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ViewPropTypes,
  ImageBackground,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {height, totalSize, width} from 'react-native-dimension';
import {colors, sizes, appStyles, appImages} from '../../services';
import {
  Wrapper,
  AbsoluteWrapper,
  RowWrapperBasic,
  ComponentWrapper,
} from '../wrappers';
import {IconWithText} from '../icons';

export const ImageRound = props => {
  const {style, size, source, onPress} = props;
  const defaultSize = totalSize(5);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <Image
        source={source}
        style={[
          {
            height: size ? size : defaultSize,
            width: size ? size : defaultSize,
            borderRadius: size ? size / 2 : defaultSize / 2,
          },
          style,
        ]}
      />
    </TouchableOpacity>
  );
};
export const AppLogo1 = ({source, height, width, style}) => {
  const defaultSize = totalSize(20);
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[
        {
          height: height ? height : defaultSize,
          width: width ? width : defaultSize,
          borderRadius: 8,
        },
        style,
      ]}
    />
  );
};
export const CustomizedImage = props => {
  const {
    style,
    height,
    width,
    radius,
    source,
    alignItems,
    justifyContent,
    wrapperstyle,
    isLoading,
    resizeMode,
  } = props;
  const defaultSize = totalSize(30);
  return (
    <Wrapper
      style={[
        {
          height: height ? height : defaultSize,
          width: width ? width : defaultSize,
          alignItems: alignItems ? alignItems : 'center',
          justifyContent: justifyContent ? justifyContent : 'center',
        },
        wrapperstyle,
      ]}>
      <Image
        source={source}
        resizeMode={resizeMode || 'cover'}
        style={[
          {
            height: height ? height : defaultSize,
            width: width ? width : defaultSize,
            borderRadius: radius ? radius : defaultSize / 2,
          },
          style,
        ]}
      />
      {isLoading ? (
        <AbsoluteWrapper
          style={[
            appStyles.center,
            {
              width: '100%',
              backgroundColor: '#ffffff99',
              height: '100%',
              zIndex: 1000,
            },
          ]}>
          <ActivityIndicator color={colors.primary} />
        </AbsoluteWrapper>
      ) : null}
    </Wrapper>
  );
};

export const FeedImage = props => {
  const {style, height, width, source, children, imageStyle} = props;
  const defaultSize = totalSize(5);
  return (
    <ImageBackground
      source={source}
      style={[
        {height: height ? height : 130, width: width ? width : '100%'},
        style,
      ]}
      imageStyle={
        imageStyle ? {borderTopLeftRadius: 10, borderTopRightRadius: 10} : null
      }>
      {children}
    </ImageBackground>
  );
};

export const ImageSqareRound = props => {
  const {style, size, source} = props;
  const defaultSize = totalSize(5);
  return (
    <Image
      source={source}
      style={[
        {
          height: size ? size : defaultSize,
          width: size ? size : defaultSize,
          borderRadius: size ? size / 2 : defaultSize / 2,
        },
        style,
      ]}
    />
  );
};

export const ImageProfile = ({
  imageStyle,
  source,
  size,
  containerStyle,
  animation,
  onPress,
  tapToAdd,
}) => {
  const defaultSize = totalSize(15);
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      {tapToAdd ? (
        <Wrapper
          style={[
            styles.ImageProfile,
            appStyles.center,
            appStyles.shadow,
            {
              backgroundColor: colors.appBgColor3,
              height: size ? size : defaultSize,
              width: size ? size : defaultSize,
            },
            imageStyle,
          ]}>
          <ComponentWrapper>
            <IconWithText
              text="Tap to add profile image"
              direction="column"
              textStyle={[appStyles.textCenter]}
              iconName="camera-outline"
              tintColor={colors.appTextColor4}
              onPress={onPress}
            />
          </ComponentWrapper>
        </Wrapper>
      ) : (
        <Wrapper
          animation={animation ? animation : 'zoomIn'}
          style={[styles.ImageProfileContainer, containerStyle]}>
          <Image
            source={source}
            style={[
              styles.ImageProfile,
              {
                height: size ? size : defaultSize,
                width: size ? size : defaultSize,
              },
              imageStyle,
            ]}
          />
        </Wrapper>
      )}
    </TouchableOpacity>
  );
};

export const ImageBackgroundTop = ({
  animation,
  imageStyle,
  source,
  containerStyle,
}) => {
  return (
    <AbsoluteWrapper
      animation={animation ? animation : 'fadeIn'}
      style={[containerStyle]}>
      <Image
        source={source}
        style={[{width: width(100), height: height(25)}, imageStyle]}
      />
      <AbsoluteWrapper style={{top: 0, right: 0, bottom: 0, left: 0}}>
        {/* <LinearGradient colors={colors.gradiant2} style={{ flex: 1 }} /> */}
      </AbsoluteWrapper>
    </AbsoluteWrapper>
  );
};

export const ImageMarker = props => {
  const {imageStyle, source, containerStyle, animation, onPress} = props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper
        animation={animation ? animation : 'zoomIn'}
        style={[styles.imageMarkerContainer, containerStyle]}>
        <AbsoluteWrapper style={{bottom: -totalSize(1.5), alignSelf: 'center'}}>
          <Icon
            name="location"
            type="ionicon"
            size={sizes.icons.medium}
            color={colors.appTextColor6}
          />
        </AbsoluteWrapper>
        <ImageRound
          source={{uri: source ? source : appImages.noUser}}
          size={totalSize(4)}
        />
      </Wrapper>
    </TouchableOpacity>
  );
};

export const ImageInAbout = ({iconName, source, onPressDelete}) => {
  return (
    <Wrapper>
      <CustomizedImage
        radius={sizes.buttonMiniRadius}
        source={source}
        height={width(100) / 3.6}
        width={width(100) / 3.6}
      />
      {iconName ? (
        <AbsoluteWrapper style={{top: 5, left: 5}}>
          <IconWithText
            onPress={onPressDelete}
            tintColor={colors.appButton5}
            iconName={iconName}
            iconType={'font-awesome'}
          />
        </AbsoluteWrapper>
      ) : null}
    </Wrapper>
  );
};

export const ImageGroup = ({images, size}) => {
  const defaultSize = totalSize(5);
  return (
    <Wrapper>
      <RowWrapperBasic>
        {images.map((item, key) => {
          return (
            <ImageRound
              source={{uri: item.image ? item.image : appImages.noUser}}
              size={size ? size : defaultSize}
              style={[
                {
                  marginLeft: size ? -(size / 3) : -(defaultSize / 3),
                  borderWidth: 2,
                  borderColor: colors.appBgColor1,
                },
              ]}
            />
          );
        })}
      </RowWrapperBasic>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  ImageProfileContainer: {
    ...appStyles.shadowColored,
    // backgroundColor:'transparent',
    borderRadius: 100,
    backgroundColor: colors.appBgColor1,
  },
  ImageProfile: {
    width: totalSize(15),
    height: totalSize(15),
    borderRadius: 100,
    borderWidth: 5,
    borderColor: colors.appBgColor1,
  },
  ImageProfileOverlay: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  ImageCollectionItem: {
    width: width(32.5),
    height: height(20),
    borderRadius: 15,
  },
  imageMarkerContainer: {
    ...appStyles.shadow,
    // backgroundColor:'transparent',
    borderRadius: 100,
    backgroundColor: colors.appBgColor1,
    padding: 3,
  },
});
