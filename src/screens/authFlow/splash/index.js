import { StackActions } from "@react-navigation/native";
import React, { useEffect } from "react";
import { height, totalSize, width } from "react-native-dimension";
import { useDispatch, useSelector } from "react-redux";
import {
  Logout,
  getCurrentUserId,
  isEmailVerified,
} from "../../../backend/auth";
import {
  getAllOfCollection,
  getData,
  getDocByKeyValue,
  getFavoritesList,
  storeFCMToken,
} from "../../../backend/utility";
import {
  AppLogo1,
  ButtonColored,
  ComponentWrapper,
  LoaderPrimary,
} from "../../../components";
import SplashBackground from "../../../components/splashBackground";
import { XXLTitle } from "../../../components/text";
import { MainWrapper, Wrapper } from "../../../components/wrappers";
import { addFavorites, all_jobs, signin } from "../../../redux/actions";
import { appImages, appStyles, colors, routes } from "../../../services";
import SimpleToast from "react-native-simple-toast";

const Splash = ({ navigation }) => {
  return (
    <MainWrapper>
      {/* <ImageBackgroundWrapper
                source={require('../../../assets/images/splash-background.jpg')}> */}
      <SplashBackground>
        <Wrapper style={[appStyles.center]}>
          <XXLTitle>Welcome</XXLTitle>
          <AppLogo1
            height={totalSize(15)}
            width={totalSize(25)}
            source={appImages.logo}
          />
        </Wrapper>
        <Wrapper style={{ marginTop: 50 }}>
          <ButtonColored
            text="Get Started"
            buttonColor={colors.primary}
            buttonStyle={{ width: width(80) }}
            onPress={() => navigation.replace("splashLoading")}
          />
        </Wrapper>
      </SplashBackground>
      {/* </ImageBackgroundWrapper> */}
    </MainWrapper>
  );
};
export default Splash;

export const SplashLoader = ({ navigation }) => {
  const dispatch = useDispatch();
  const fcm_token = useSelector((state) => state.fcm_token);

  const getAllData = async () => {
    try {
      let token = getCurrentUserId();
      if (token && isEmailVerified("splash")) {
        if (fcm_token) {
          storeFCMToken(fcm_token);
        }
        getData("Users", token)
          .then(async (user) => {
            if (user?.isBlocked) {
              Logout();
              SimpleToast.show("You are blocked by admin.");
              navigation.replace("signin");
            } else {
              dispatch(signin(user));
              if (user?.userType == "Applicant") {
                await getAllOfCollection("PostedJobs").then((res) => {
                  dispatch(all_jobs(res));
                });
              } else {
                getDocByKeyValue(
                  "PostedJobs",
                  "user.user_id",
                  user.user_id
                ).then((res) => {
                  dispatch(all_jobs(res));
                });
              }
              await getFavoritesList("Favorites", "likes", user.user_id).then(
                (res) => {
                  dispatch(addFavorites(res));
                }
              );
              navigation.dispatch(
                StackActions.replace(routes.mainDrawer, { type: user.userType })
              );
            }
          })
          .catch(() => {
            SimpleToast.show("User not found.");
            Logout();
            navigation.replace("signin");
          });
      } else {
        navigation.replace("signin");
      }
    } catch (error) {
      navigation.replace("signin");
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <MainWrapper>
      <ComponentWrapper flex={1}>
        <Wrapper style={[appStyles.center, { marginVertical: height(15) }]}>
          <Wrapper>
            <AppLogo1
              height={totalSize(20)}
              width={totalSize(25)}
              source={appImages.logo}
            />
            <LoaderPrimary />
          </Wrapper>
        </Wrapper>
      </ComponentWrapper>
    </MainWrapper>
  );
};
