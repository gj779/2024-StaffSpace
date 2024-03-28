import React from 'react'
import { Image, ImageBackground, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { appStyles, colors, sizes } from "../../services";
import * as Animatable from 'react-native-animatable'

export const MainWrapper = props => {
    const { children, style, animation } = props
    return (
        <Animatable.View animation={animation} style={[appStyles.mainContainer, style]}>
            {children}
        </Animatable.View>
    );
}

export const HideKeyboard = props => {
    const { children, accessible } = props
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={accessible || false}>
            <View style={{ flex: 1 }}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    );
}

export const ComponentWrapper = props => {
    const { children, style, animation } = props
    return (
        <Animatable.View animation={animation} style={[appStyles.compContainer, styles.removerMarginVertical, style]}>
            {children}
        </Animatable.View>
    );
}

export const ImageBackgroundWrapper = props => {
    const { children, style, source } = props
    return (
        <ImageBackground source={source} style={[appStyles.bgContainer, style]}>
            {children}
        </ImageBackground>
    );
}

export const CustomImage = props => {
    const { source, style } = props
    return (
        <Image source={source} style={style} />
    );
}
export const Wrapper = ({ children, style, animation, flex, duration, iterationCount, direction }) => {
    return (
        <Animatable.View
            iterationCount={iterationCount}
            direction={direction}
            animation={animation}
            duration={duration} style={[{ flex: flex, }, style]}>
            {children}
        </Animatable.View>
    );
}

export const RowWrapperBasic = props => {
    const { children, style, animation } = props
    return (
        <Animatable.View animation={animation} style={[appStyles.rowView, style]}>
            {children}
        </Animatable.View>
    );
}
export const RowWrapper = props => {
    const { children, style, animation } = props
    return (
        <Animatable.View animation={animation} style={[appStyles.rowCompContainer, styles.removerMarginVertical, style]}>
            {children}
        </Animatable.View>
    );
}

export const AbsoluteWrapper = props => {
    const { children, style, animation } = props
    return (
        <Animatable.View animation={animation} style={[{ position: 'absolute', }, style]}>
            {children}
        </Animatable.View>
    );
}
export const RoundedWrapper = props => {
    const { children, style, animation, onPress } = props
    return (
        <Animatable.View animation={animation} style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
            {children}
        </Animatable.View>
    );
}
export const CardWrapper = props => {
    const { children, style, animation } = props
    return (
        <Animatable.View animation={animation} style={[appStyles.cardView, { borderRadius: sizes.cardRadius }, style]}>
            {children}
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    mainWrapperPrimary: {
        ...appStyles.mainContainer,
        backgroundColor: colors.appBgColorPrimary
    },
    removerMarginVertical: {
        marginVertical: null
    },
    footerWrapperPrimary: {
        ...appStyles.mainContainer,
        // borderTopLeftRadius: sizes.wrapperRadius,
        // borderTopRightRadius: sizes.wrapperRadius
    },
    headerWrapperPrimary: {
        // ...appStyles.mainContainer,
        // borderTopLeftRadius:sizes.wrapperRadius,
        // borderTopRightRadius:sizes.wrapperRadius
    }
})