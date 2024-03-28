import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AbsoluteWrapper,
  ButtonBordered,
  ButtonColored,
  ButtonSelectableUnderlined,
  ComponentWrapper,
  CustomizedImage,
  CustomizedModel,
  HomeHeader,
  IconWithText,
  ImageInAbout,
  ImageRound,
  KeyboardAvoidingScrollView,
  LineHorizontal,
  MainWrapper,
  RegularText,
  RenderImages,
  RenderSettingsOptions,
  RowWrapper,
  SelectionModal,
  SmallText,
  SmallTitle,
  Spacer,
  TextwithDescription,
  TinyText,
  TinyTitle,
  Wrapper,
} from "../../../../components";
import {
  appImages,
  appStyles,
  colors,
  PickPhotoFromGallery,
  PrivacyPolicy,
  routes,
  sizes,
  takePhotoFromCamera,
} from "../../../../services";
import { totalSize, width } from "react-native-dimension";
import ImagePicker from "react-native-image-crop-picker";
import RatingAndReview from "../../ratingAndReview";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFCMToken,
  saveData,
  uploadChatImage,
} from "../../../../backend/utility";
import { logout, signin } from "../../../../redux/actions";
import { DeleteAccount, DeleteUser, Logout } from "../../../../backend/auth";
import { ActivityIndicator } from "react-native";

const Profile = ({ navigation }) => {
  const user_redux = useSelector((state) => state.user);
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const [user, setUser] = useState(user_redux);
  const [image, setImage] = useState("");
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState("1");
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [TopSettingsButtons, setTopSettingsButtons] = useState([
    {
      id: "1",
      title: "Edit profile",
      iconName: "person-circle-outline",
      route: routes.editProfile,
    },
    {
      id: "2",
      title: "Change password",
      iconName: "key-outline",
      route: routes.checkEmail,
      isChangePassword: true,
    },
  ]);
  const [bottomSettingsButtons, setBottomSettingsButtons] = useState([
    // { id: '1', title: 'About Us', iconName: 'alert-circle-outline', route: routes.aboutUs, url: null },
    {
      id: "2",
      title: "Privacy Policy",
      iconName: "shield-outline",
      route: routes.aboutUs,
      url: PrivacyPolicy?.url,
    },
    {
      id: "3",
      title: "Terms and Conditions",
      iconName: "book-outline",
      route: routes.aboutUs,
      url: PrivacyPolicy?.url,
    },
    {
      id: "4",
      title: "Delete Account",
      iconName: "trash-outline",
      route: routes.aboutUs,
      url: null,
    },
  ]);
  const [images, setImages] = useState([...user?.photos, { id: "1" }]);

  useEffect(() => {
    setUser(user_redux);
  }, [user_redux]);

  const handlePressTopButton = (props) => {
    switch (props) {
      case "1":
        setSelectedButton(props);
        break;
      case "2":
        setSelectedButton(props);
        break;
      case "3":
        setSelectedButton(props);
        break;
      default:
        setSelectedButton("1");
        break;
    }
  };
  const selectedTab = () => {
    switch (selectedButton) {
      case "1":
        return About();
      case "2":
        return Settings();
      case "3":
        return <RatingAndReview isType={"Resturant"} />;
      default:
        return About();
    }
  };
  const AddfromCamera = async () => {
    try {
      let img = await takePhotoFromCamera();
      setSelectionModalVisible(false);
      if (img) {
        let filename = img.path.substring(img?.path?.lastIndexOf("/") + 1);
        setImage({ uri: img.path, fileName: filename });
        HandleUploadImage(img?.path, filename);
      }
    } catch (error) {}
  };
  const PickFromGalllary = async () => {
    try {
      let img = await PickPhotoFromGallery();
      setSelectionModalVisible(false);
      if (img) {
        let filename = img?.path.substring(img?.path?.lastIndexOf("/") + 1);
        setImage({ uri: img?.path, fileName: filename });
        HandleUploadImage(img?.path, filename);
      }
    } catch (error) {}
  };
  const HandleDelete = (item, index) => {
    let tempImages = [...images];
    if (index != -1) {
      tempImages.splice(index, 1);
      setImages(tempImages);
      let filtered = tempImages.filter((img) => img.id != "1");
      user.photos = filtered;
      dispatch(signin(user));
      saveData("Users", user.user_id, { photos: filtered }).catch((er) => {});
    }
  };
  const HandleUploadImage = (uri, fileName) => {
    let tempData = [...images];
    tempData.unshift(uri);
    setImages(tempData);
    setUploading(true);
    uploadChatImage(uri, fileName, setProgress)
      .then((img) => {
        tempData[0] = img;
        setImage(tempData);
        let filtered = tempData.filter((img) => img.id != "1");
        user.photos = filtered;
        dispatch(signin(user));
        saveData("Users", user.user_id, { photos: filtered })
          .then(() => {
            setUploading(false);
          })
          .catch(() => {
            setUploading(false);
          });
      })
      .catch(() => {
        setUploading(false);
      });
  };

  const About = () => (
    <Wrapper>
      <Spacer height={sizes.baseMargin} />
      <ComponentWrapper>
        <TextwithDescription
          titleStyle={styles.headerColor}
          textStyle={styles.textStyle}
          title="Description"
          text={user_redux?.description}
        />
        <TextwithDescription
          titleStyle={styles.headerColor}
          textStyle={styles.textStyle}
          title="Email"
          text={user_redux?.email}
        />
        <TinyTitle style={styles.headerColor}>Location</TinyTitle>
        <Spacer height={sizes.smallMargin} />
        <IconWithText
          textStyle={appStyles.textRegular}
          iconName={"location-outline"}
          text={` ${user_redux?.location?.city}, ${user_redux?.location?.state?.name}, ${user_redux?.location?.country?.name}`}
          iconSize={sizes.icons.small}
        />
        <Spacer height={sizes.smallMargin} />
        <TinyTitle style={styles.headerColor}>Images</TinyTitle>
        <Spacer height={sizes.smallMargin} />
        <RenderImages
          isUploading={isUploading}
          iconName={"trash"}
          iconType={"ionicon"}
          data={images}
          onPressDelete={(item, index) => HandleDelete(item, index)}
          onPress={() => setSelectionModalVisible(true)}
        />
        <SelectionModal
          isVisible={isSelectionModalVisible}
          toggleModal={() => setSelectionModalVisible(false)}
          onPressCamera={AddfromCamera}
          onPressGallery={PickFromGalllary}
        />
      </ComponentWrapper>
      {/* <RowWrapper>
        <ImageInAbout iconName={"trash"} source={appImages.feed1} />
        <ImageInAbout iconName={"trash"} source={appImages.feed1} />
        <ButtonBordered
          iconName="camera"
          borderColor={colors.appColor2}
          iconColor={colors.appTextColor7}
          onPress={() => requestCameraPermission()}
          buttonStyle={{
            marginHorizontal: 0,
            height: width(100) / 3.6,
            width: width(100) / 3.6,
            borderStyle: "dashed",
          }}
        />
      </RowWrapper> */}
      <ComponentWrapper style={appStyles.right}>
        <Spacer height={sizes.TinyMargin} />
        <SmallText>Add upto 5</SmallText>
      </ComponentWrapper>
      <Spacer height={sizes.baseMargin} />
    </Wrapper>
  );
  const Settings = () => (
    <Wrapper>
      <Spacer height={sizes.baseMargin} />
      <RenderSettingsOptions
        data={TopSettingsButtons}
        onPress={(item, index) =>
          navigate(item.route, {
            isChangePassword: item.isChangePassword,
            email: user_redux.email,
          })
        }
      />
      <ComponentWrapper>
        <Spacer height={sizes.baseMargin} />
        <TinyTitle style={styles.headerColor}>Prefrences</TinyTitle>
        <Spacer height={sizes.baseMargin} />
        <LineHorizontal color={colors.appColor8} width="100%" />
        <Spacer height={sizes.baseMargin} />
      </ComponentWrapper>
      <RenderSettingsOptions
        data={bottomSettingsButtons}
        onPress={(item, index) => {
          if (item?.url !== null) {
            Linking.openURL(item?.url);
          } else {
            // navigate(item.route, { title: item?.title })
            setDeleteModalVisible(!isDeleteModalVisible);
          }
        }}
      />
      <Wrapper>
        <Spacer height={sizes.smallMargin} />
        <Spacer height={sizes.doubleBaseMargin} />
        <Wrapper>
          <ButtonColored
            onPress={() => setLogoutModalVisible(!isLogoutModalVisible)}
            buttonStyle={{ width: width(35), alignSelf: "flex-end" }}
            customIcon={appImages.logoutIcon}
            text="Log out"
            textStyle={{ fontSize: 18 }}
            buttonColor={colors.appButton5}
          />
        </Wrapper>
        <Spacer height={sizes.baseMargin} />
      </Wrapper>
    </Wrapper>
  );
  return (
    <MainWrapper>
      <Wrapper flex={1} style={appStyles.mainContainer}>
        <HomeHeader
          onPress={() => navigation.openDrawer()}
          title={"My Profile"}
        />
        <Wrapper style={[appStyles.center]}>
          <Wrapper style={styles.profileImageWrapper}>
            <ImageRound
              style={[styles.profileImage]}
              source={{ uri: user_redux?.profilePhoto }}
              size={totalSize(12)}
            />
            {/* <AbsoluteWrapper style={styles.profileAbsoluteWrapper}>
              <Wrapper style={[styles.imageIconWrapper]}>
                <IconWithText
                  onPress={() => console.log('press')}
                  iconSize={sizes.icons.small}
                  iconName={'camerao'}
                  iconType={'antdesign'}
                />
              </Wrapper>
            </AbsoluteWrapper> */}
          </Wrapper>
        </Wrapper>
        <Spacer height={sizes.doubleBaseMargin} />
        <RowWrapper>
          <ButtonSelectableUnderlined
            text="About"
            isSelected={selectedButton == "1"}
            onPress={() => handlePressTopButton("1")}
          />
          <ButtonSelectableUnderlined
            text="Settings"
            isSelected={selectedButton == "2"}
            onPress={() => handlePressTopButton("2")}
          />
          <ButtonSelectableUnderlined
            text="Reviews"
            isSelected={selectedButton == "3"}
            onPress={() => handlePressTopButton("3")}
          />
        </RowWrapper>
        <KeyboardAvoidingScrollView>
          <Spacer height={sizes.smallMargin} />
          {selectedTab()}

          <CustomizedModel isVisible={isLogoutModalVisible}>
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
                      onPress={() =>
                        setLogoutModalVisible(!isLogoutModalVisible)
                      }
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
                      onPress={async () => {
                        setLoading(true);
                        await deleteFCMToken();
                        setLogoutModalVisible(!isLogoutModalVisible);
                        Logout();
                        dispatch(logout);
                        setLoading(false);
                        navigate(routes.signin);
                      }}
                    />
                  </Wrapper>
                </RowWrapper>
              </Wrapper>
            </Wrapper>
          </CustomizedModel>

          <CustomizedModel isVisible={isDeleteModalVisible}>
            <Wrapper style={appStyles.center}>
              <SmallTitle>Delete Account</SmallTitle>
              <Spacer height={sizes.baseMargin} />
              <Wrapper style={{ width: width(70) }}>
                <RegularText style={{ textAlign: "center" }}>
                  Are you sure to delete your account from StaffSpace?
                </RegularText>
                <Spacer height={sizes.smallMargin} />
                <RowWrapper style={appStyles.rowButtonContainer}>
                  <Wrapper flex={1}>
                    <ButtonColored
                      text="Cancel"
                      buttonColor={colors.appButton2}
                      tintColor={colors.appButton5}
                      buttonStyle={appStyles.rowButton}
                      onPress={() =>
                        setDeleteModalVisible(!isDeleteModalVisible)
                      }
                    />
                  </Wrapper>
                  <Wrapper flex={1}>
                    <ButtonColored
                      text={"Delete"}
                      buttonColor={colors.primary}
                      buttonStyle={appStyles.rowButton}
                      onPress={() => {
                        setDeleteModalVisible(!isDeleteModalVisible);
                        DeleteUser();
                        DeleteAccount();
                        dispatch(logout);
                        navigate(routes.signin);
                      }}
                    />
                  </Wrapper>
                </RowWrapper>
              </Wrapper>
            </Wrapper>
          </CustomizedModel>
        </KeyboardAvoidingScrollView>
      </Wrapper>
    </MainWrapper>
  );
};

export default Profile;
const styles = StyleSheet.create({
  profileImageWrapper: {
    width: totalSize(12),
    height: totalSize(12),
  },
  profileAbsoluteWrapper: {
    bottom: 5,
    right: 5,
  },
  profileImage: {
    ...appStyles.shadow,
    backgroundColor: "white",
  },
  imageIconWrapper: {
    ...appStyles.shadow,
    ...appStyles.center,
    backgroundColor: "#FFF",
    height: totalSize(3),
    width: totalSize(3),
    borderRadius: totalSize(2),
  },
  textStyle: {
    textAlign: "justify",
  },
  headerColor: {
    color: colors.appTextColor8,
  },
});
