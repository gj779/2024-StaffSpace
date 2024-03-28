import { View, Text } from 'react-native'
import React from 'react'
import { ComponentWrapper, MainHeader, MainWrapper, MediumText, RegularText, Spacer, Wrapper } from '../../../components'
import { appStyles, sizes } from '../../../services'
import { totalSize } from 'react-native-dimension'

const AboutUs = ({ navigation, route }) => {
    const { title } = route?.params
    return (
        <MainWrapper>
            <Wrapper flex={1} style={appStyles.mainContainer}>
                <MainHeader buttonSize={totalSize(3)} title={title || 'About Us'}
                    onPressBack={() => navigation.goBack()} />
                <Spacer height={sizes.baseMargin} />
                <ComponentWrapper>
                    <MediumText>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it
                        to make a type specimen book. It has survived not only five centuries
                    </MediumText>
                    <Spacer height={sizes.baseMargin} />
                    <MediumText>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it
                        to make a type specimen book. It has survived not only five centuries
                    </MediumText>
                </ComponentWrapper>

            </Wrapper>
        </MainWrapper>
    )
}

export default AboutUs