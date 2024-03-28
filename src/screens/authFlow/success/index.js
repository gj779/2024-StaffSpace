import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BackArrowButton, ButtonColored, ComponentWrapper, CustomImage, ImageWrapper, MainWrapper, MediumText, MediumTitle, Spacer, TextInputSimpleBordered, Wrapper } from '../../../components'
import { appImages, appStyles, colors, routes, sizes } from '../../../services'
import { totalSize, width } from 'react-native-dimension'

const Success = (props) => {
    const { navigation, route } = props
    var isChangePassword = null
    if (route?.params?.isChangePassword)
        isChangePassword = route?.params?.isChangePassword
    return (
        <MainWrapper>
            <Wrapper flex={1} animation='fadeInRight'>
                <Spacer height={sizes.doubleBaseMargin * 2} />
                <ComponentWrapper>
                    <Wrapper style={appStyles.center}>
                        <CustomImage source={appImages.success} style={styles.image} />
                    </Wrapper>
                    <Spacer height={sizes.doubleBaseMargin * 1.5} />
                    <Wrapper style={appStyles.center}>
                        <MediumText style={[appStyles.descriptionColor, styles.mediumText]}>
                            Please Check your email
                            {/* Your Password has been reset sucessfully */}
                        </MediumText>
                    </Wrapper>
                </ComponentWrapper>
                <Spacer height={sizes.doubleBaseMargin} />
                <Wrapper style={appStyles.center}>
                    {isChangePassword ?
                        <ButtonColored buttonColor={colors.primary} text='Go To Profile'
                            buttonStyle={appStyles.smallwidthButton}
                            onPress={() => navigation.popToTop()}
                        />
                        : <ButtonColored buttonColor={colors.primary} text='Back To Login Page'
                            buttonStyle={appStyles.smallwidthButton} iconName='arrow-back' iconSize={totalSize(2)}
                            onPress={() => navigation.navigate(routes.signin)}
                        />
                    }
                </Wrapper>
                <Spacer height={sizes.baseMargin * 1.5} />
            </Wrapper>
        </MainWrapper>
    )
}

export default Success
const styles = StyleSheet.create({
    image:
        { height: width(65), width: width(70) },
    mediumText: {
        width: width(50), textAlign: 'center'
    }
})