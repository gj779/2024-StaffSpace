import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState } from "react";
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
} from "../../../components";
import { appImages, appStyles, colors, routes, sizes } from "../../../services";
import { width } from "react-native-dimension";
import { ResetPassword } from "../../../backend/auth";

const CheckEmail = ({ navigation, route }) => {
  var isChangePassword = null;
  const { email } = route?.params || null;
  if (route?.params?.isChangePassword)
    isChangePassword = route?.params?.isChangePassword;

  const [isLoading, setLoading] = useState(false);

  // console.log(email)

  const HandleSendEmail = () => {
    setLoading(true);
    ResetPassword(email)
      .then((res) => {
        if (res == true) {
          setLoading(false);
          navigation.navigate(routes.success, {
            isChangePassword: isChangePassword,
          });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <MainWrapper>
      <Wrapper flex={1} animation="fadeInRight">
        <Spacer height={sizes.doubleBaseMargin} />
        <ComponentWrapper>
          <BackArrowButton onPress={() => navigation.goBack()} />
          <Spacer height={sizes.doubleBaseMargin} />
          <MediumTitle>Check your Email</MediumTitle>
          <Spacer height={sizes.baseMargin} />
          <MediumText style={appStyles.descriptionColor}>
            Please check your email. We have sent you an email that contains a
            verification link.
          </MediumText>
          <Spacer height={sizes.baseMargin} />
        </ComponentWrapper>
        <Wrapper style={appStyles.center}>
          <CustomImage source={appImages.checkEmail} style={styles.image} />
        </Wrapper>
        <Spacer height={sizes.doubleBaseMargin} />
        <Wrapper style={appStyles.center}>
          <ButtonColored
            buttonColor={colors.primary}
            onPress={HandleSendEmail}
            disabled={isLoading}
            text={
              isLoading ? (
                <ActivityIndicator color={colors.appButton2} />
              ) : (
                "Send Email"
              )
            }
            buttonStyle={appStyles.smallwidthButton}
          />
        </Wrapper>
        <Spacer height={sizes.baseMargin * 1.5} />
      </Wrapper>
    </MainWrapper>
  );
};

export default CheckEmail;
const styles = StyleSheet.create({
  image: { height: width(80), width: width(80) },
});
