import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BackArrowButton, ButtonColored, ComponentWrapper, CustomImage, ImageWrapper, KeyboardAvoidingScrollView, MainWrapper, MediumText, MediumTitle, Spacer, TextInputSimpleBordered, Wrapper } from '../../../components'
import { appStyles, colors, routes, sizes } from '../../../services'
import { height } from 'react-native-dimension'

const ChangePassword = ({ navigation, route }) => {
    var isChangePassword = null
    if (route?.params?.isChangePassword)
        isChangePassword = route?.params?.isChangePassword

    return (
        <MainWrapper>
            <Wrapper flex={1} animation='fadeInRight'>
                <KeyboardAvoidingScrollView>
                    <Spacer height={sizes.doubleBaseMargin} />
                    <ComponentWrapper>
                        <BackArrowButton onPress={() => navigation.goBack()} />
                        <Spacer height={sizes.doubleBaseMargin} />
                        <MediumTitle>New Passwrod</MediumTitle>
                        <Spacer height={sizes.baseMargin} />
                    </ComponentWrapper>
                    <TextInputSimpleBordered placeholder='New Password' inputStyle={styles.inputText} />
                    <Spacer height={sizes.baseMargin} />
                    <TextInputSimpleBordered placeholder='Confirm New Password' inputStyle={styles.inputText} />
                    <Spacer height={sizes.doubleBaseMargin * 2} />
                    <Wrapper style={appStyles.center}>
                        <ButtonColored buttonColor={colors.primary} text='Update'
                            buttonStyle={appStyles.smallwidthButton}
                            onPress={() => navigation.navigate(routes.success, { isChangePassword: isChangePassword })}
                        />
                    </Wrapper>
                    <Spacer height={sizes.baseMargin * 1.5} />
                </KeyboardAvoidingScrollView>
            </Wrapper>
        </MainWrapper>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    inputText: { height: height(7) }
})