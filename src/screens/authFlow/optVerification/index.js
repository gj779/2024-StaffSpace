import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  BackArrowButton,
  ButtonColored,
  ComponentWrapper,
  CustomImage,
  ImageWrapper,
  MainWrapper,
  MediumText,
  MediumTitle,
  Spacer,
  Wrapper,
} from '../../../components';
import {appImages, appStyles, colors, routes, sizes} from '../../../services';
import SMSVerifyCode from 'react-native-sms-verifycode';
import {color} from 'react-native-elements/dist/helpers';

const OtpVerification = ({navigation, route}) => {
  var isChangePassword = null;
  if (route?.params?.isChangePassword)
    isChangePassword = route?.params?.isChangePassword;

  const [otp, setOTP] = useState(false);
  return (
    <MainWrapper>
      <Wrapper flex={1} animation="fadeInRight">
        <Spacer height={sizes.doubleBaseMargin} />
        <ComponentWrapper>
          <BackArrowButton onPress={() => navigation.goBack()} />
          <Spacer height={sizes.doubleBaseMargin} />
          <MediumTitle>Verification Code</MediumTitle>
          <Spacer height={sizes.baseMargin} />
          <MediumText style={appStyles.descriptionColor}>
            Enter the verification code we just send you to your email address
          </MediumText>
          <Spacer height={sizes.baseMargin} />
        </ComponentWrapper>
        <SMSVerifyCode
          verifyCodeLength={6}
          autoFocus
          initialCodes={[' ', ' ', ' ', ' ', ' ', ' ']}
          containerPaddingHorizontal={20}
          codeViewBorderColor={colors.appBgColor3}
          focusedCodeViewBorderColor={colors.primary}
          codeViewWidth={45}
          codeViewHeight={45}
          codeViewBorderWidth={0.5}
          codeViewBorderRadius={10}
          codeFontSize={20}
          codeColor={colors.appTextColor4}
          onInputCompleted={text => {}}
          onInputChangeText={text => setOTP(text)}
        />
        <Spacer height={sizes.doubleBaseMargin * 1.5} />
        <Wrapper style={appStyles.center}>
          <ButtonColored
            buttonColor={colors.primary}
            text="Verify"
            buttonStyle={appStyles.smallwidthButton}
            onPress={() =>
              navigation.navigate(routes.changePassword, {
                isChangePassword: isChangePassword,
              })
            }
          />
        </Wrapper>
        <Spacer height={sizes.baseMargin * 1.5} />
      </Wrapper>
    </MainWrapper>
  );
};

export default OtpVerification;
