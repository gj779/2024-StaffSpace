import React from 'react'
import { Text, View, StatusBar } from 'react-native'
import { totalSize, width } from 'react-native-dimension'
import { appImages, colors, sizes } from '../../services'
import { BackArrowSquaredButton, OptionButton } from "../buttons"
import { IconWithText } from '../icons'
import { ImageRound, ImageSqareRound } from '../images'
import { Spacer } from '../spacers'
import { MediumText, SmallTitle, TinyTitle } from '../text'
import { ComponentWrapper, RowWrapper, RowWrapperBasic, Wrapper } from "../wrappers"

export const ChatHeader = ({ source, onPressBack, title, ratings }) => {
    return (
        <Wrapper style={{
            backgroundColor: colors.primary,
            borderBottomStartRadius: sizes.buttonRadius,
            borderBottomEndRadius: sizes.buttonRadius,
        }}>
            <Spacer height={sizes.baseMargin * 1.5} />
            <ComponentWrapper>
                <RowWrapperBasic>
                    <BackArrowSquaredButton size={totalSize(3.5)} onPress={onPressBack} />
                    <Spacer width={sizes.doubleBaseMargin / 1.5} />
                    {source ?
                        <ImageSqareRound size={width(13)} source={source} />
                        :
                        <ImageSqareRound size={width(13)} source={{ uri: appImages.noUser }} />
                    }
                    <Spacer width={sizes.smallMargin} />
                    <Wrapper>
                        <SmallTitle style={{ color: colors.appTextColor6 }}>{title}</SmallTitle>
                        {ratings ?
                            <IconWithText iconName='star' text={ratings} tintColor={colors.appBgColor} />
                            : null}
                    </Wrapper>
                </RowWrapperBasic>
            </ComponentWrapper>
            <Spacer height={sizes.baseMargin} />
        </Wrapper>
    )
}

export const MainHeader = ({ buttonSize, onPressBack, title, statusBarBgColor }) => {
    return (
        <Wrapper>
            <StatusBar backgroundColor={statusBarBgColor} />
            <Spacer height={sizes.smallMargin} />
            <RowWrapper>
                <BackArrowSquaredButton
                    onPress={onPressBack}
                    backgroundColor={colors.appColor4}
                    size={buttonSize} />
                <TinyTitle>{title}</TinyTitle>
                <View />
            </RowWrapper>
            <Spacer height={sizes.smallMargin} />
        </Wrapper>

    )
}

export const HomeHeader = ({ onPress, iconName, onPressProfile, source, title, imageSize }) => {
    return (
        <Wrapper>
            <Spacer height={sizes.doubleBaseMargin} />
            <RowWrapper>
                <OptionButton
                    onPress={onPress}
                    iconName={iconName ? iconName : 'menu-outline'}
                    iconSize={sizes.icons.large}
                    iconColor={colors.primary}
                />
                {title ? <TinyTitle>{title}</TinyTitle> : null}
                <ImageRound onPress={onPressProfile} source={source} size={imageSize ? imageSize : totalSize(6)} />
            </RowWrapper>
            <Spacer height={sizes.smallMargin} />
        </Wrapper>
    )
}

export const ProfileHeader = ({ iconName, title, onPress }) => {
    return (
        <Wrapper>
            <Spacer height={sizes.doubleBaseMargin} />
            <RowWrapper>
                <Wrapper style={{ flex: 1 }}>
                    <OptionButton
                        iconName={iconName ? iconName : 'menu-outline'}
                        iconSize={sizes.icons.large}
                        iconColor={colors.primary}
                        onPress={onPress}
                    />
                </Wrapper>
                {title ?
                    <Wrapper style={{ flex: 1, alignItems: 'center' }}>
                        <TinyTitle>{title}</TinyTitle>
                    </Wrapper>
                    : null}
                <View style={{ flex: 1 }} />
            </RowWrapper>
            <Spacer height={sizes.smallMargin} />
        </Wrapper>
    )
}

export const EventListingHeader = ({ onPressProfile, onPress, iconName, source, title, imageSize }) => {
    return (
        <Wrapper style={{
            backgroundColor: colors.primary,
            borderBottomStartRadius: sizes.buttonRadius,
            borderBottomEndRadius: sizes.buttonRadius,
        }}>
            <Spacer height={sizes.baseMargin * 1.3} />
            <Spacer height={sizes.doubleBaseMargin} />
            <RowWrapper>
                <OptionButton
                    onPress={onPress}
                    iconName={iconName ? iconName : 'menu-outline'}
                    iconSize={sizes.icons.medium}
                    iconColor={colors.primary}
                />
                {title ? <TinyTitle style={{ color: colors.appTextColor6 }}>{title}</TinyTitle> : null}
                <ImageRound onPress={onPressProfile} source={source} size={imageSize ? imageSize : totalSize(6)} />
            </RowWrapper>
            <Spacer height={sizes.baseMargin} />
        </Wrapper>
    )
}