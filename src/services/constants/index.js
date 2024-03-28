import { appStyles, colors } from "../utilities"

export const routes = {

    //Main Stack Applicant Side
    splash: 'splash',
    splashLoading: 'splashLoading',
    signin: 'signin',
    signup: 'signup',
    currentJobDetail: 'currentJobDetail',
    previousJobDetail: 'previousJobDetail',
    forgotPassword: 'forgotPassword',
    checkEmail: 'checkEmail',
    otpVerification: 'otpVerification',
    changePassword: 'changePassword',
    success: 'success',

    //Resturant Side
    resturantSignupInfo: 'resturantSignupInfo',

    mainBottomtab: 'mainBottomtab',
    resturantBottomtab: 'resturantBottomtab',

    //Home Stack
    homeStackScreens: 'homeStackScreens',
    homeTab: 'homeTab',
    home: 'home',
    resturantProfile: 'resturantProfile',
    chatScreen: 'chatScreen',

    //resturant Home Stack
    resturantHomeStack: 'resturantHomeStack',
    resturantHome: 'resturantHome',
    applicants: 'applicants',
    listing: 'listing',
    eventListing: "eventListing",
    createJob: "createJob",
    profile: "profile",

    chatStack: 'chatStack',

    //rerturantProfileStack
    resturantProfileStack: 'resturantProfileStack',

    //Profile Stack
    myProfileStack: 'myProfileStack',
    myProfile: 'myProfile',
    editProfile: 'editProfile',
    aboutUs: 'aboutUs',

    //My Jobs Stack
    myJobsStack: 'myJobsStack',
    myJobs: 'myJobs',
    myJobReviews: 'myJobReviews',

    //Notifications stack
    notificationsStack: "notificationsStack",
    notifications: "notifications",

    //Drawer Screens
    mainDrawer: 'mainDrawer',
    ratingAndReview: 'ratingAndReview',
    contactUs: 'contactUs',
    chats: 'chats',
    favorites: 'favorites',
}


export const tabs = {
    tabBarOptions: {
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.appBgColor3,
        tabBarAllowFontScaling: true,
        tabBarStyle: appStyles.tabBarStyle,
        keyboardHidesTabBar: true,
        tabBarShowLabel: false,
    },
    // topTabBarOptions: {
    //     //showLabel: false,
    //     activeTintColor: colors.appColor1,
    //     inactiveTintColor: colors.appColor1,
    //     allowFontScaling: true,
    //     style: appStyles.searchTopTabBarStyle,
    //     showIcon: true,
    //     indicatorStyle: { backgroundColor: colors.appColor1 },
    //     tabStyle: { flexDirection: 'row' },
    //     labelStyle: [appStyles.textRegular, appStyles.textPrimaryColor]
    //     // activeBackgroundColor:'#FFFFFF40',
    //     //tabStyle:{borderRadius:20,marginHorizontal:7.5,marginVertical:2}
    // }
}

export const PrivacyPolicy = {
    url:'https://www.privacypolicies.com/live/0d9a437e-983f-45c4-b264-a22500f192b1'
}