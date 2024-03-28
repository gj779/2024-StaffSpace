import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ComponentWrapper, MainWrapper, RowWrapper, Wrapper } from '../wrappers';
import { appStyles, colors, sizes } from '../../services';
import { LargeText, MediumText, RegularText } from '../text';
import { width } from 'react-native-dimension';
import { Spacer } from '../spacers';

export const RatingWithText = ({ title, onFinishRating, isDisabled, defaultRating }) => {
    const [reviewValue, setReviewValue] = useState(null);

    return (
        <RowWrapper>
            {title ?
                <Wrapper style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <RegularText>{title}</RegularText>
                </Wrapper>
                : null}
            <Wrapper style={{ flex: 1 }}>
                <AirbnbRating
                    defaultRating={defaultRating}
                    isDisabled={isDisabled}
                    starContainerStyle={{ justifyContent: 'space-between', width: width(45) }}
                    size={20}
                    showRating={false}
                    type='custom'
                    count={5}
                    containerStyle={{ width: 300 }}
                    tintColor={colors.appBgColor1}
                    startingValue={0}
                    unSelectedColor={colors.appColor2}
                    onFinishRating={onFinishRating}
                />
            </Wrapper>
        </RowWrapper>
    )
}

export const RatingWithBackground = ({ title, onFinishRating }) => {
    const [reviewValue, setReviewValue] = useState(null);

    return (
        <ComponentWrapper>
            {title ?
                <Wrapper style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <LargeText>{title}</LargeText>
                    <Spacer height={sizes.smallMargin} />
                </Wrapper>
                : null
            }
            <Wrapper style={[styles.ratingStarContainer, appStyles.shadow]}>
                <Wrapper flex={1} style={{ justifyContent: 'center' }}>
                    <AirbnbRating
                        starContainerStyle={{ justifyContent: 'space-between', width: width(60) }}
                        size={20}
                        showRating={false}
                        type='custom'
                        count={5}
                        tintColor={colors.appBgColor1}
                        startingValue={0}
                        unSelectedColor={colors.appColor2}
                        onFinishRating={onFinishRating}
                    />
                </Wrapper>
            </Wrapper>
            <Spacer height={sizes.baseMargin} />
        </ComponentWrapper>
    )
}

const styles = StyleSheet.create({
    ratingStarContainer: {
        backgroundColor: colors.appBgColor,
        paddingVertical: 20,
        borderRadius: sizes.inputRadius,
    }
})