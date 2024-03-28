import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import {
  AbsoluteWrapper,
  ButtonColored,
  CommonDropdown,
  ComponentWrapper,
  EditClose,
  ImageRound,
  KeyboardAvoidingScrollView,
  LargeText,
  MainHeader,
  MainWrapper,
  SelectionModal,
  Spacer,
  TextInputBordered,
  TextInputColored,
  TinyTitle,
  Wrapper,
} from "../../../components";
import { appStyles, colors, routes, sizes } from "../../../services";
import { height, totalSize, width } from "react-native-dimension";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import {
  saveData,
  uniqueID,
  uploadProfileImage,
} from "../../../backend/utility";
import { signin } from "../../../redux/actions";
import SimpleToast from "react-native-simple-toast";
import {
  getCitybyStateCountry,
  getCountry,
  getStatebyCountry,
} from "../../../backend/api";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user_redux = useSelector((state) => state?.user);
  const [firstname, setFirstName] = useState(user_redux?.firstName);
  const [lastname, setLastName] = useState(user_redux?.lastName);
  const [firstnameError, setfirstNameError] = useState("");
  const [lastnameError, setLastNameError] = useState("");
  const [image, setImage] = useState("");
  const [country, setCountry] = useState(user_redux?.location?.country);
  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setcityData] = useState([]);
  const [state, setState] = useState(user_redux?.location?.state);
  const [city, setCity] = useState(user_redux?.location?.city);
  const [cityError, setCityError] = useState("");
  const [description, setDescription] = useState(user_redux?.description);
  const [descriptionError, setDescriptionError] = useState("");
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { navigate } = navigation;

  const HandleUpdate = () => {
    let address = {
      country: country,
      state: state,
      city: city,
    };

    let Data = {
      firstName: firstname,
      lastName: lastname,
      description: description,
      location: address,
    };
    if (image) {
      setLoading(true);
      uploadProfileImage(
        image.uri,
        `${user_redux.userType}/Images/profileImages/${uniqueID()}${
          image.fileName
        }`
      )
        .then((img) => {
          let user = {
            ...user_redux,
          };
          user.firstName = firstname;
          user.lastName = lastname;
          user.description = description;
          user.location = address;
          user.profilePhoto = img;
          dispatch(signin(user));
          setLoading(false);
          SimpleToast.show("Profile Updated");
          navigation.goBack();
          Data.profilePhoto = img;
          saveData("Users", user_redux.user_id, Data).catch((err) =>
            setLoading(false)
          );
        })
        .catch((err) => setLoading(false));
    } else {
      let user = {
        ...user_redux,
      };
      user.firstName = firstname;
      user.lastName = lastname;
      user.description = description;
      user.location = address;
      dispatch(signin(user));
      SimpleToast.show("Profile Updated");
      navigation.goBack();
      saveData("Users", user_redux.user_id, Data);
    }
  };

  const openImagePicker = async () => {
    try {
      const data = await ImagePicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true,
      }).then((image) => {
        let filename = image.path.substring(image.path.lastIndexOf("/") + 1);
        setImage({ uri: image.path, fileName: filename });
      });
    } catch (error) {}
  };

  const PickPhotoFromGallery = () => {
    setSelectionModalVisible(false);
    setTimeout(async () => {
      try {
        const GALLERY_PERMISSION =
          Platform.OS == "ios"
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

        const cameraPermission = await check(GALLERY_PERMISSION);
        if (cameraPermission === RESULTS.GRANTED) {
          openImagePicker();
        } else if (
          cameraPermission === RESULTS.DENIED ||
          cameraPermission === RESULTS.BLOCKED
        ) {
          const permissionRequest = await request(GALLERY_PERMISSION);
          if (permissionRequest === RESULTS.GRANTED) {
            openImagePicker();
          } else if (permissionRequest === RESULTS.BLOCKED) {
            Alert.alert(
              "Permission Blocked",
              "Please enable gallery access in your app settings to select photos.",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Open Settings",
                  onPress: () => Linking.openSettings(),
                },
              ],
              { cancelable: false }
            );
          }
        } else {
          alert("Gallery Permission " + cameraPermission);
        }
      } catch (e) {
        alert(e);
      }
    }, 1000);
  };

  const openCamera = async () => {
    try {
      const data = await ImagePicker.openCamera({
        width: 1080,
        height: 1080,
        cropping: true,
        compressImageMaxHeight: 500,
        compressImageMaxWidth: 500,
      }).then((image) => {
        let filename = image.path.substring(image.path.lastIndexOf("/") + 1);
        setImage({ uri: image.path, fileName: filename });
      });
    } catch (error) {}
  };

  const takePhotoFromCamera = () => {
    setSelectionModalVisible(false);
    setTimeout(async () => {
      try {
        const CAMERA_PERMISSION =
          Platform.OS == "ios"
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA;

        const cameraPermission = await check(CAMERA_PERMISSION);
        if (cameraPermission === RESULTS.GRANTED) {
          openCamera();
        } else if (
          cameraPermission === RESULTS.DENIED ||
          cameraPermission === RESULTS.BLOCKED
        ) {
          const permissionRequest = await request(CAMERA_PERMISSION);
          if (permissionRequest === RESULTS.GRANTED) {
            openCamera();
          } else if (permissionRequest === RESULTS.BLOCKED) {
            Alert.alert(
              "Permission Blocked",
              "Please enable camera access in your app settings to take photos.",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Open Settings",
                  onPress: () => Linking.openSettings(),
                },
              ],
              { cancelable: false }
            );
          }
        } else {
          alert("Camera Permission " + cameraPermission);
        }
      } catch (e) {
        alert(e);
      }
    }, 1000);
  };
  const HandleChangeImage = () => {
    setSelectionModalVisible(true);
  };

  const getData = async () => {
    try {
      const data = await getCountry();
      setCountryData(data);
    } catch (error) {}
  };

  const getState = async () => {
    try {
      let { states } = await getStatebyCountry(country?.name);
      if (states?.length > 0) {
        setStateData(states || []);
      } else {
        setStateData([country]);
      }
    } catch (error) {
      if (error.msg == "country not found") {
        setStateData([country]);
      }
    }
  };

  const getCity = async () => {
    try {
      let city = await getCitybyStateCountry(country?.name, state?.name);
      if (city?.length > 0) {
        setcityData(city || []);
      } else {
        setcityData([state?.name]);
      }
    } catch (error) {
      if (["country not found", "state not found"].includes(error.msg)) {
        setcityData([state?.name]);
      }
    }
  };

  useEffect(() => {
    getData();
    getState();
    getCity();
  }, []);

  return (
    <MainWrapper>
      <Wrapper flex={1} style={appStyles.mainContainer}>
        <MainHeader
          title="Edit Profile"
          buttonSize={totalSize(3)}
          onPressBack={() => navigation.goBack()}
        />
        <KeyboardAvoidingScrollView>
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <TinyTitle>Personal Information</TinyTitle>
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin} />
          <Wrapper style={[appStyles.center]}>
            <Wrapper style={{ width: totalSize(13), height: totalSize(13) }}>
              <ImageRound
                source={{ uri: image ? image?.uri : user_redux?.profilePhoto }}
                size={totalSize(13)}
              />
              <AbsoluteWrapper style={{ bottom: 5, right: 5 }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={HandleChangeImage}
                >
                  <Wrapper style={[styles.editIconWrapper]}>
                    <EditClose />
                  </Wrapper>
                </TouchableOpacity>
                <SelectionModal
                  isVisible={isSelectionModalVisible}
                  toggleModal={() => setSelectionModalVisible(false)}
                  onPressCamera={takePhotoFromCamera}
                  onPressGallery={PickPhotoFromGallery}
                />
              </AbsoluteWrapper>
            </Wrapper>
          </Wrapper>
          <Spacer height={sizes.smallMargin} />
          <TextInputColored
            value={firstname}
            onChangeText={(text) => {
              setFirstName(text);
              setFirstName("");
            }}
            error={firstnameError}
            inputContainerStyle={styles.textInputContainer}
            inputStyle={styles.textInputText}
            placeholder="First Name"
          />
          <Spacer height={sizes.smallMargin} />
          <TextInputColored
            value={lastname}
            onChangeText={(text) => {
              setLastName(text);
              setLastNameError("");
            }}
            error={lastnameError}
            inputContainerStyle={styles.textInputContainer}
            inputStyle={styles.textInputText}
            placeholder="Last Name"
          />
          <TextInputColored
            value={user_redux?.email}
            editable={false}
            inputContainerStyle={styles.textInputContainer}
            inputStyle={styles.textInputText}
            placeholder="Email"
          />
          <Spacer height={sizes.baseMargin} />

          <CommonDropdown
            data={countryData}
            placeholder={country?.name || "Select country"}
            error={countryError}
            onSelect={async (data) => {
              setcityData([]);
              setState({});
              setCity("");
              setCountryError("");
              setCountry(data);
              try {
                let { states } = await getStatebyCountry(data?.name);
                if (states?.length > 0) {
                  setStateData(states || []);
                } else {
                  setStateData([data]);
                }
              } catch (error) {
                if (error.msg == "country not found") {
                  setStateData([data]);
                }
              }
            }}
            buttonStyle={{
              backgroundColor: colors.appColor8,
              borderColor: colors.appColor8,
            }}
            buttonTextStyle={{ color: colors.primary }}
          />
          <Spacer height={sizes.baseMargin} />

          <CommonDropdown
            placeholder={state?.name || "Select state"}
            data={stateData}
            error={stateError}
            buttonTextAfterSelection={(data) => {
              if (state?.name) {
                return data?.name;
              } else {
                return "Select state";
              }
            }}
            rowTextForSelection={(data) => {
              return data?.name;
            }}
            onSelect={async (data) => {
              setCity("");
              setState(data);
              setStateError("");
              try {
                let city = await getCitybyStateCountry(
                  country?.name,
                  data?.name
                );
                if (city?.length > 0) {
                  setcityData(city || []);
                } else {
                  setcityData([data?.name]);
                }
              } catch (error) {
                if (
                  ["country not found", "state not found"].includes(error.msg)
                ) {
                  setcityData([data?.name]);
                }
              }
            }}
            buttonTextStyle={{ color: colors.primary }}
            buttonStyle={{
              backgroundColor: colors.appColor8,
              borderColor: colors.appColor8,
            }}
          />
          <Spacer height={sizes.baseMargin} />

          <CommonDropdown
            error={cityError}
            placeholder={city || "Select city"}
            data={cityData}
            buttonTextAfterSelection={(data) => {
              if (city) {
                return data;
              } else {
                return "Select city";
              }
            }}
            rowTextForSelection={(data) => {
              return data;
            }}
            onSelect={(data) => {
              setCity(data);
              setCityError("");
            }}
            buttonTextStyle={{ color: colors.primary }}
            buttonStyle={{
              backgroundColor: colors.appColor8,
              borderColor: colors.appColor8,
            }}
          />
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <LargeText style={{ color: colors.appTextColor7 }}>
              Description
            </LargeText>
          </ComponentWrapper>
          <Spacer height={sizes.TinyMargin} />
          <TextInputBordered
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setDescriptionError("");
            }}
            error={descriptionError}
            inputStyle={styles.textInputDescription}
            containerStyle={{ borderColor: colors.appColor8 }}
            multiline
            iconColor={colors.primary}
            iconSize={sizes.icons.large}
          />
          <Spacer height={sizes.doubleBaseMargin} />
          <Wrapper style={[appStyles.center]}>
            <ButtonColored
              onPress={HandleUpdate}
              disabled={isLoading}
              buttonStyle={{ width: width(70) }}
              text={
                isLoading ? (
                  <ActivityIndicator color={colors.appTextColor6} />
                ) : (
                  "Save Changes"
                )
              }
              buttonColor={colors.primary}
            />
          </Wrapper>
          <Spacer height={sizes.baseMargin} />
        </KeyboardAvoidingScrollView>
      </Wrapper>
    </MainWrapper>
  );
};
export default EditProfile;

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: colors.appColor8,
    marginVertical: sizes.TinyMargin,
  },
  textInputText: {
    height: height(7),
    color: colors.primary,
  },
  textInputDescription: {
    height: height(20),
    color: colors.primary,
    textAlignVertical: "top",
    backgroundColor: colors.appColor8,
    borderRadius: totalSize(1),
  },
  editIconWrapper: {
    backgroundColor: "#FFF",
    height: totalSize(3.5),
    width: totalSize(3.5),
    borderRadius: totalSize(2),
    ...appStyles.shadow,
    ...appStyles.center,
  },
});
