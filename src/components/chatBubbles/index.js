import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes } from '../../services';
import { ComponentWrapper, Wrapper, RowWrapperBasic } from '../wrappers';
import { RegularText, TinyText } from '../text';
import { Spacer } from '../spacers';
import { LineHorizontal } from '../lines';

export const ChatBubbule = ({ containerStyle, myMessage, message, time, image, audioMessage, isAudioPlaying, onPlayPauseAudio, onPressBubble, onLongPressBubble, isSelected }) => {
    return (
        <ComponentWrapper
            animation={!myMessage ? 'fadeInLeft' : 'fadeInRight'}
            style={[{
                alignItems: !myMessage ? 'flex-start' : 'flex-end',
                //alignItems: 'flex-start',
                //marginTop: 0
            }, containerStyle]}
        >
            {
                image ?
                    <Wrapper>
                        <Image
                            source={{ uri: image }}
                            style={[styles.imageStyle]}
                        />
                        <Spacer height={sizes.smallMargin} />
                    </Wrapper>
                    :
                    null
            }
            <Wrapper>
                <RowWrapperBasic style={{ flexDirection: !myMessage ? 'row' : 'row-reverse', }}>
                    <TouchableOpacity onPress={onPressBubble} activeOpacity={1} onLongPress={onLongPressBubble}>
                        <Wrapper style={{
                            backgroundColor: isSelected ? colors.appColor3 : !myMessage ? 'transparent' : colors.appBgColor2,
                            padding: sizes.smallMargin, borderRadius: sizes.cardRadius, borderWidth: !myMessage ? 0.5 : 0, borderColor: colors.appTextColor5
                        }}>
                            {
                                audioMessage ?
                                    <RowWrapperBasic>
                                        <Icon
                                            name={isAudioPlaying ? "pause" : "play"}
                                            type="material-community"
                                            color={colors.appColor3}
                                            size={sizes.icons.large}
                                            onPress={onPlayPauseAudio}
                                        />
                                        <Spacer width={sizes.smallMargin} />
                                        <LineHorizontal
                                            height={2.5}
                                            width={width(40)}
                                        />
                                    </RowWrapperBasic>
                                    :
                                    <RegularText style={[{ color: isSelected ? colors.appTextColor6 : colors.appTextColor1 }]}>{message}</RegularText>
                            }
                        </Wrapper>
                    </TouchableOpacity>
                    <TinyText style={[appStyles.textLightGray, { margin: sizes.TinyMargin }]}>{time}</TinyText>
                </RowWrapperBasic>
                <Spacer height={sizes.smallMargin} />
            </Wrapper>
        </ComponentWrapper>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: height(25),
        width: width(75),
        borderRadius: 25
    }
})