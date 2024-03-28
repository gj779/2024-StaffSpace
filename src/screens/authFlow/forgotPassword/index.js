import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { BackArrowButton, ButtonColored, ComponentWrapper, ErrorModalPrimary, KeyboardAvoidingScrollView, MainWrapper, MediumText, MediumTitle, Spacer, TextInputSimpleBordered, Wrapper } from '../../../components'
import { appStyles, colors, routes, sizes } from '../../../services'
import { width } from 'react-native-dimension'
import Validations from '../../../services/validations'
import { checkEmailAlreadyInUse } from '../../../backend/auth'

const ForgotPassword = ({ navigation }) => {
    const { navigate } = navigation
    const [isModalVisible, setModelVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [isLoading, setLoading] = useState(false)

    const validations = () => {
        !email ? setEmailError('Please enter your email, it is a required field') : !Validations.validateEmail(email) ? setEmailError('Email format is invalid') : setEmailError('')
        if (Validations.validateEmail(email)) {
            return true
        } else {
            return false
        }
    }
    const HandlePressCheckEmail = async () => {
        setLoading(true)
        if (validations()) {
            await checkEmailAlreadyInUse(email.trim(), ((response) => {
                if (response) {
                    setLoading(false)
                    navigate(routes.checkEmail, { email: email })
                }
                else {
                    setModelVisible(!isModalVisible)
                    setLoading(false)
                }
            }))
        }
        else { setLoading(false) }
    }
    return (
        <MainWrapper>
            <Wrapper flex={1} animation='fadeInRight'>
                <KeyboardAvoidingScrollView>
                    <Spacer height={sizes.doubleBaseMargin} />
                    <ComponentWrapper>
                        <BackArrowButton onPress={() => navigation.goBack()} />
                        <Spacer height={sizes.doubleBaseMargin} />
                        <MediumTitle>Forgot Password</MediumTitle>
                        <Spacer height={sizes.baseMargin} />
                        <MediumText style={appStyles.descriptionColor}>
                            Enter the email address associated with your account
                        </MediumText>
                        <Spacer height={sizes.doubleBaseMargin / 1.5} />
                        <TextInputSimpleBordered
                            value={email}
                            onChangeText={txt => {
                                setEmail(txt)
                                setEmailError('')
                            }}
                            error={emailError}
                            placeholder='Email ID'
                            keyboardType='email-address'
                            inputStyle={{ marginHorizontal: 0 }} />
                    </ComponentWrapper>
                    <Spacer height={sizes.doubleBaseMargin * 3} />
                    <Wrapper style={appStyles.center}>
                        <ButtonColored buttonColor={colors.primary}
                            disabled={isLoading}
                            text={isLoading ? <ActivityIndicator color={colors.appColor8} /> : 'Continue'}
                            buttonStyle={appStyles.smallwidthButton}
                            onPress={HandlePressCheckEmail}
                        />
                        <ErrorModalPrimary isVisible={isModalVisible}
                            title='Error' tintColor={colors.appErrorColor}
                            iconSize={sizes.icons.xl}
                            iconName='warning-outline'
                            detail='This email is not registerd!' >
                            <Wrapper style={appStyles.center}>
                                <Spacer height={sizes.doubleBaseMargin} />
                                <ButtonColored buttonColor={colors.primary}
                                    text='Enter Again'
                                    buttonStyle={appStyles.smallwidthButton}
                                    onPress={() => {
                                        setModelVisible(!isModalVisible)
                                        setEmail('')
                                        setEmailError('')
                                    }}
                                />
                            </Wrapper>
                        </ErrorModalPrimary>
                    </Wrapper>
                    <Spacer height={sizes.baseMargin * 1.5} />
                </KeyboardAvoidingScrollView>
            </Wrapper>
        </MainWrapper>
    )
}

export default ForgotPassword
const styles = StyleSheet.create({
    smallwidthButton:
        { width: width(50) }
})