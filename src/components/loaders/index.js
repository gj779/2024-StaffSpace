import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes } from '../../services';
import { AbsoluteWrapper, Wrapper, MainWrapper } from '../wrappers';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
import { RegularText } from '../text';
import { Spacer } from '../spacers';


export const LoaderPrimary = ({ }) => {
    return (
        <MainWrapper>
            <Wrapper flex={1} style={[{ justifyContent: 'flex-end', backgroundColor: 'transparent' }]}>
                <Wrapper style={[appStyles.center, { backgroundColor: 'transparent' }]}>
                    <WaveIndicator color={colors.appColor1} size={sizes.icons.xxl} />
                    <Spacer height={sizes.baseMargin} />
                    <RegularText style={[appStyles.textLightGray]}>Loading</RegularText>
                </Wrapper>
            </Wrapper>
        </MainWrapper>
    );
}

export const LoaderAbsolute = props => {
    const { isVisible } = props
    return (
        <>
            {
                isVisible ?
                    <AbsoluteWrapper animation="fadeIn" style={[{ justifyContent: 'center', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: colors.appBgColor1 + 'BF' }]}>
                        <Wrapper style={[appStyles.center, { backgroundColor: 'transparent' }]}>
                            <DotIndicator color={colors.appColor1} size={sizes.icons.tiny} />
                            <Spacer height={sizes.baseMargin} />
                            <RegularText style={[appStyles.textLightGray]}>Loading</RegularText>
                        </Wrapper>
                    </AbsoluteWrapper>
                    :
                    null
            }
        </>
    );
}