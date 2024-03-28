import * as React from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  ChangePassword,
  CheckEmail,
  CurrentJobDetail,
  ForgotPassword,
  OtpVerification,
  PreviousJobDetail,
  Signin,
  Signup,
  Splash,
  Success,
} from "../../screens/authFlow";
import { SplashLoader } from "../../screens/authFlow/splash";
import { Icon, Badge } from "react-native-elements";
import { routes, tabs } from "../constants";
import { appImages, appStyles, colors, sizes } from "../utilities";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  ChatScreen,
  Home,
  ResturantProfile,
  RatingAndReview,
  Chats,
  ContactUs,
  MyProfile,
  MyJobs,
  MyJobReviews,
  Notifications,
  EditProfile,
  AboutUs,
  ResturantHome,
  Applicants,
  Listing,
  EventListing,
  CreateJob,
  Profile,
  Favorites,
} from "../../screens";
import {
  BackArrowSquaredButton,
  ButtonBorderedSmall,
  ButtonColored,
  ButtonwithDualIcon,
  ComponentWrapper,
  CustomizedModel,
  ImageProfile,
  ImageRound,
  MediumText,
  RegularText,
  RowWrapper,
  SmallTitle,
  Spacer,
  Wrapper,
} from "../../components";
import { totalSize, width } from "react-native-dimension";
import { useState } from "react";
import { ResturantSignupInfo } from "../../screens/authFlow/resturantSide";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../backend/auth";
import { logout } from "../../redux/actions";
import { deleteFCMToken } from "../../backend/utility";

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const MyJobStack = createNativeStackNavigator();
const NotificationStack = createNativeStackNavigator();
const ResturantHomeStack = createNativeStackNavigator();
const ResturantProfileStack = createNativeStackNavigator();
const ResturantChatStack = createNativeStackNavigator();

const MianTab = createBottomTabNavigator();
const ResturantTab = createBottomTabNavigator();

const MainDrawer = createDrawerNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={routes.splash} component={Splash} />
        <Stack.Screen name={routes.splashLoading} component={SplashLoader} />
        <Stack.Screen name={routes.signin} component={Signin} />
        <Stack.Screen name={routes.signup} component={Signup} />
        <Stack.Screen
          name={routes.resturantSignupInfo}
          component={ResturantSignupInfo}
        />
        <Stack.Screen
          name={routes.currentJobDetail}
          component={CurrentJobDetail}
        />
        <Stack.Screen
          name={routes.previousJobDetail}
          component={PreviousJobDetail}
        />
        <Stack.Screen name={routes.forgotPassword} component={ForgotPassword} />
        <Stack.Screen name={routes.checkEmail} component={CheckEmail} />
        <Stack.Screen
          name={routes.otpVerification}
          component={OtpVerification}
        />
        <Stack.Screen name={routes.changePassword} component={ChangePassword} />
        <Stack.Screen name={routes.success} component={Success} />
        {/* <Stack.Screen name={routes.homeTab} component={MainBottomTab} />
                <Stack.Screen name={routes.resturantHomeStack} component={ResturantBottomTab} /> */}
        <MainDrawer.Screen name={routes.mainDrawer} component={MyDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainBottomTab = () => {
  const tabIconSize = sizes.icons.large;
  return (
    <MianTab.Navigator screenOptions={tabs.tabBarOptions}>
      <MianTab.Screen
        name={routes.homeStackScreens}
        component={HomeStackScreens}
        options={() => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name="home"
                type="simple-line-icon"
                size={tabIconSize}
                color={color}
              />
            );
          },
        })}
      />
      <MianTab.Screen
        name={routes.myProfileStack}
        component={ProfileStackScreens}
        options={() => ({
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name="account-circle-outline"
                type="material-community"
                size={tabIconSize}
                color={color}
              />
            );
          },
        })}
      />
      <MianTab.Screen
        name={routes.myJobsStack}
        component={MyJobsStackScreens}
        options={() => ({
          tabBarLabel: "MyJobs",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="calendar-outline"
                size={tabIconSize}
                color={color}
              />
            );
          },
        })}
      />
      <MianTab.Screen
        name={routes.notificationsStack}
        params={"Applicant"}
        component={NotificationsStackScreens}
        extraData={"someData"}
        options={() => ({
          tabBarLabel: "notifications",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="notifications-outline"
                size={tabIconSize}
                color={color}
              />
            );
          },
        })}
      />
    </MianTab.Navigator>
  );
};

const ResturantBottomTab = () => {
  const tabIconSize = sizes.icons.large;
  return (
    <ResturantTab.Navigator screenOptions={tabs.tabBarOptions}>
      <ResturantTab.Screen
        name={routes.resturantHomeStack}
        component={ResturantHomeStackScreens}
        options={() => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name="home"
                type="simple-line-icon"
                size={tabIconSize}
                color={color}
              />
            );
          },
        })}
      />
      <ResturantTab.Screen
        name={routes.chatStack}
        component={ResturantChatStackScreens}
        options={() => ({
          tabBarLabel: "Chats",
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name="chatbubble-outline"
                type="ionicon"
                size={tabIconSize}
                color={color}
              />
            );
          },
        })}
      />
      <ResturantTab.Screen
        name={routes.notificationsStack}
        component={NotificationsStackScreens}
        options={() => ({
          tabBarLabel: "MyJobs",
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon
                name="notifications-outline"
                type="ionicon"
                size={tabIconSize}
                color={color}
              />
            );
          },
        })}
      />
    </ResturantTab.Navigator>
  );
};

const MyDrawer = (props) => {
  const type = useSelector((state) => state.user.userType);
  // const { type } = props.route.params
  const HandleComponent = () => {
    switch (type) {
      case "Applicant":
        return MainBottomTab;
      case "Resturant":
        return ResturantBottomTab;
      case "Event":
        return ResturantBottomTab;
      default:
        return MainBottomTab;
    }
  };
  const HandleRoute = () => {
    switch (type) {
      case "Applicant":
        return routes.mainBottomtab;
      case "Resturant":
        return routes.resturantBottomtab;
      case "Event":
        return routes.resturantBottomtab;
      default:
        return routes.mainBottomtab;
    }
  };
  return (
    <MainDrawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} type={type} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -22,
          fontFamily: "Roboto-Medium",
          fontSize: 15,
        },
      }}
    >
      <MainDrawer.Screen name={HandleRoute()} component={HandleComponent()} />
      {/* component={type == 'Resturant' || 'Event' ? ResturantBottomTab : MainBottomTab} /> */}
    </MainDrawer.Navigator>
  );
};

const ApplicantDrawerScreens = [
  { screen: "Favorites", iconName: "heart", route: routes.favorites },
  { screen: "Chats", iconName: "chatbubble", route: routes.chats },
  { screen: "My Job List", iconName: "card", route: routes.myJobsStack },
  {
    screen: "Ratings and Reviews",
    iconName: "star",
    route: routes.ratingAndReview,
    type: "Applicant",
  },
  { screen: "Contact Us", iconName: "mail", route: routes.contactUs },
];
const ResturantDrawerScreens = [
  { screen: "Chats", iconName: "chatbubble", route: routes.chatStack },
  {
    screen: "My Job Listing",
    iconName: "card",
    route: routes.eventListing,
    type: "Resturant",
  },
  // { screen: 'My Job List', iconName: 'card', route: routes.resturantHomeStack },
  {
    screen: "Ratings and Reviews",
    iconName: "star",
    route: routes.ratingAndReview,
    type: "Resturant",
  },
  { screen: "Contact Us", iconName: "mail", route: routes.contactUs },
];
const EventDrawerScreens = [
  { screen: "Chats", iconName: "chatbubble", route: routes.chatStack },
  {
    screen: "My Event Listing",
    iconName: "card",
    route: routes.eventListing,
    type: "Event",
  },
  // { screen: 'My Job List', iconName: 'card', route: routes.resturantHomeStack },
  {
    screen: "Ratings and Reviews",
    iconName: "star",
    route: routes.ratingAndReview,
    type: "Resturant",
  },
  { screen: "Contact Us", iconName: "mail", route: routes.contactUs },
];

const CustomDrawerContent = (props) => {
  // const type = (props?.type)
  const type = useSelector((state) => state.user.userType);
  const { navigate } = props.navigation;
  const user_redux = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const HandleData = () => {
    switch (type) {
      case "Applicant":
        return ApplicantDrawerScreens;
      case "Resturant":
        return ResturantDrawerScreens;
      case "Event":
        return EventDrawerScreens;
      default:
        return ApplicantDrawerScreens;
    }
  };
  const HandleLogout = async () => {
    try {
      setLoading(true);
      await deleteFCMToken();
    } catch (error) {
    } finally {
      setModalVisible(!isModalVisible);
      props.navigation.toggleDrawer();
      Logout();
      dispatch(logout);
      setLoading(false);
      props.navigation.navigate(routes.signin);
    }
  };
  return (
    <Wrapper flex={1}>
      <Wrapper flex={2.5} style={[appStyles.center]}>
        <RowWrapper style={{ width: "90%" }}>
          <Wrapper flex={1}>
            <BackArrowSquaredButton
              size={totalSize(3)}
              backgroundColor={colors.appColor4}
              onPress={() => {
                props.navigation.toggleDrawer();
                // if (user_redux?.userType == 'Applicant') {
                //   props.navigation.navigate(routes.homeStackScreens);
                // } else {
                //   props.navigation.navigate(routes.resturantHomeStack);
                // }
              }}
            />
          </Wrapper>
          <Wrapper flex={1}>
            <ImageRound
              onPress={() =>
                navigate(
                  type == "Applicant" ? routes.myProfileStack : routes.profile
                )
              }
              // onPress={() => console.log(type)}
              source={{ uri: user_redux?.profilePhoto }}
              size={totalSize(10)}
            />
          </Wrapper>
          <View style={{ flex: 1 }} />
        </RowWrapper>
        <Spacer height={sizes.TinyMargin} />
        <SmallTitle>{user_redux?.firstName}</SmallTitle>
      </Wrapper>
      <Wrapper flex={5}>
        <FlatList
          data={HandleData()}
          renderItem={({ item, index }) => {
            return (
              <ButtonwithDualIcon
                onPress={() => navigate(item.route, { type: item.type })}
                buttonStyle={{ marginHorizontal: 10 }}
                tintColor={colors.primary}
                text={item.screen}
                leftIconName={item.iconName}
                rightIconName="chevron-forward"
                buttonColor={colors.appButton4}
              />
            );
          }}
        />
      </Wrapper>
      <Wrapper flex={1}>
        <ButtonColored
          buttonStyle={{ width: width(35) }}
          customIcon={appImages.logoutIcon}
          text="Log out"
          textStyle={{ fontSize: 18 }}
          buttonColor={colors.appButton5}
          onPress={() => setModalVisible(!isModalVisible)}
        />
      </Wrapper>
      <CustomizedModel isVisible={isModalVisible}>
        <Wrapper style={appStyles.center}>
          <SmallTitle>Log out</SmallTitle>
          <Spacer height={sizes.baseMargin} />
          <Wrapper style={{ width: width(70) }}>
            <RegularText style={{ textAlign: "center" }}>
              Are you sure to log out your account from StaffSpace?
            </RegularText>
            <Spacer height={sizes.smallMargin} />
            <RowWrapper style={appStyles.rowButtonContainer}>
              <Wrapper flex={1}>
                <ButtonColored
                  text="Cancel"
                  buttonColor={colors.appButton2}
                  tintColor={colors.appButton5}
                  buttonStyle={appStyles.rowButton}
                  onPress={() => setModalVisible(!isModalVisible)}
                />
              </Wrapper>
              <Wrapper flex={1}>
                <ButtonColored
                  disabled={isLoading}
                  text={
                    isLoading ? (
                      <ActivityIndicator color={colors.white} />
                    ) : (
                      "Log out"
                    )
                  }
                  buttonColor={colors.primary}
                  buttonStyle={appStyles.rowButton}
                  onPress={HandleLogout}
                />
              </Wrapper>
            </RowWrapper>
          </Wrapper>
        </Wrapper>
      </CustomizedModel>
    </Wrapper>
  );
};
const ProfileStackScreens = ({ navigation, route }) => {
  const tabHiddenRoutes = [
    routes.editProfile,
    routes.checkEmail,
    routes.changePassword,
    routes.otpVerification,
    routes.success,
    routes.aboutUs,
  ];
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: { display: "flex" },
      });
    }
  }, [navigation, route]);
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name={routes.myProfile} component={MyProfile} />
      <ProfileStack.Screen name={routes.editProfile} component={EditProfile} />
      <ProfileStack.Screen name={routes.checkEmail} component={CheckEmail} />
      <ProfileStack.Screen
        name={routes.changePassword}
        component={ChangePassword}
      />
      <ProfileStack.Screen
        name={routes.otpVerification}
        component={OtpVerification}
      />
      <ProfileStack.Screen name={routes.success} component={Success} />
      <ProfileStack.Screen name={routes.aboutUs} component={AboutUs} />
    </ProfileStack.Navigator>
  );
};
const MyJobsStackScreens = ({ navigation, route }) => {
  const tabHiddenRoutes = [routes.myJobReviews, routes.resturantProfile];
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: { display: "flex" },
      });
    }
  }, [navigation, route]);
  return (
    <MyJobStack.Navigator screenOptions={{ headerShown: false }}>
      <MyJobStack.Screen name={routes.myJobs} component={MyJobs} />
      <MyJobStack.Screen
        name={routes.resturantProfile}
        component={ResturantProfile}
      />
      <MyJobStack.Screen name={routes.myJobReviews} component={MyJobReviews} />
    </MyJobStack.Navigator>
  );
};
const HomeStackScreens = ({ navigation, route }) => {
  // const tabHiddenRoutes = [routes.resturantProfile, routes.chatScreen, routes.ratingAndReview,
  // routes.contactUs, routes.chats];
  const tabHiddenRoutes = [
    routes.resturantProfile,
    routes.chatScreen,
    routes.ratingAndReview,
    routes.contactUs,
  ];
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: { display: "flex" },
        // tabBarStyle: { position: 'absolute', paddingVertical: 3, height: 45 },
      });
    }
  }, [navigation, route]);
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name={routes.home} component={Home} />
      <HomeStack.Screen name={routes.favorites} component={Favorites} />
      <HomeStack.Screen
        name={routes.resturantProfile}
        component={ResturantProfile}
      />
      <HomeStack.Screen name={routes.chats} component={Chats} />
      <HomeStack.Screen
        name={routes.ratingAndReview}
        component={RatingAndReview}
      />
      <HomeStack.Screen name={routes.contactUs} component={ContactUs} />
      <HomeStack.Screen name={routes.chatScreen} component={ChatScreen} />
    </HomeStack.Navigator>
  );
};
const NotificationsStackScreens = ({ navigation, route }) => {
  const tabHiddenRoutes = [];
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: { display: "flex" },
        // tabBarStyle: { position: 'absolute', paddingVertical: 3, height: 45 },
      });
    }
  }, [navigation, route]);
  return (
    <NotificationStack.Navigator screenOptions={{ headerShown: false }}>
      <NotificationStack.Screen
        name={routes.notifications}
        component={Notifications}
      />
    </NotificationStack.Navigator>
  );
};
//Resturant Side Stacks Start
const ResturantHomeStackScreens = (props) => {
  const { navigation, route } = props;

  const tabHiddenRoutes = [
    routes.resturantProfile,
    routes.applicants,
    routes.myProfile,
    routes.myJobReviews,
    routes.listing,
    routes.createJob,
    routes.profile,
    routes.ratingAndReview,
    routes.contactUs,
    routes.chatScreen,
    routes.eventListing,
    routes.editProfile,
    routes.aboutUs,
    routes.checkEmail,
    routes.changePassword,
    routes.otpVerification,
    routes.success,
    routes.aboutUs,
  ];
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: { display: "flex" },
      });
    }
  }, [navigation, route]);
  return (
    <ResturantHomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={route.resturantHome}
    >
      <ResturantHomeStack.Screen
        name={routes.resturantHome}
        component={ResturantHome}
      />
      <ResturantHomeStack.Screen name={routes.chats} component={Chats} />
      <ResturantHomeStack.Screen
        name={routes.resturantProfile}
        component={ResturantProfile}
      />
      <ResturantHomeStack.Screen
        name={routes.applicants}
        component={Applicants}
      />
      <ResturantHomeStack.Screen
        name={routes.myProfile}
        component={MyProfile}
      />
      <ResturantHomeStack.Screen
        name={routes.myJobReviews}
        component={MyJobReviews}
      />
      <ResturantHomeStack.Screen name={routes.listing} component={Listing} />
      <ResturantHomeStack.Screen
        name={routes.ratingAndReview}
        component={RatingAndReview}
      />
      <ResturantHomeStack.Screen
        name={routes.contactUs}
        component={ContactUs}
      />
      <ResturantHomeStack.Screen
        name={routes.chatScreen}
        component={ChatScreen}
      />
      <ResturantHomeStack.Screen
        name={routes.eventListing}
        component={EventListing}
      />
      <ResturantHomeStack.Screen
        name={routes.createJob}
        component={CreateJob}
      />
      {/* <ResturantProfileStack.Screen
                name={routes.ResturantProfileStackScreens}
                component={ResturantProfileStackScreens} /> */}
      <ResturantProfileStack.Screen name={routes.profile} component={Profile} />
      <ResturantProfileStack.Screen
        name={routes.editProfile}
        component={EditProfile}
      />
      <ResturantProfileStack.Screen
        name={routes.checkEmail}
        component={CheckEmail}
      />
      <ResturantProfileStack.Screen
        name={routes.changePassword}
        component={ChangePassword}
      />
      <ResturantProfileStack.Screen
        name={routes.otpVerification}
        component={OtpVerification}
      />
      <ResturantProfileStack.Screen name={routes.success} component={Success} />
      <ResturantProfileStack.Screen name={routes.aboutUs} component={AboutUs} />
    </ResturantHomeStack.Navigator>
  );
};
const ResturantProfileStackScreens = (props) => {
  const { navigation, route } = props;
  const tabHiddenRoutes = [
    routes.editProfile,
    routes.profile,
    routes.checkEmail,
    routes.changePassword,
    routes.otpVerification,
    routes.success,
  ];
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: { display: "flex" },
      });
    }
  }, [navigation, route]);
  return (
    <ResturantHomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={route.resturantHome}
    >
      <ResturantProfileStack.Screen name={routes.profile} component={Profile} />
      <ResturantProfileStack.Screen
        name={routes.editProfile}
        component={EditProfile}
      />
      <ResturantProfileStack.Screen
        name={routes.checkEmail}
        component={CheckEmail}
      />
      <ResturantProfileStack.Screen
        name={routes.changePassword}
        component={ChangePassword}
      />
      <ResturantProfileStack.Screen
        name={routes.otpVerification}
        component={OtpVerification}
      />
      <ResturantProfileStack.Screen name={routes.success} component={Success} />
      <ResturantProfileStack.Screen name={routes.aboutUs} component={AboutUs} />
    </ResturantHomeStack.Navigator>
  );
};
const ResturantChatStackScreens = ({ navigation, route }) => {
  const tabHiddenRoutes = [routes.chatScreen];
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: { display: "flex" },
        // tabBarStyle: { position: 'absolute', paddingVertical: 3, height: 45 },
      });
    }
  }, [navigation, route]);
  return (
    <ResturantChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ResturantChatStack.Screen name={routes.chats} component={Chats} />
      <ResturantChatStack.Screen
        name={routes.chatScreen}
        component={ChatScreen}
      />
    </ResturantChatStack.Navigator>
  );
};
//Resturant Side Stacks Ends

export default Navigations;
