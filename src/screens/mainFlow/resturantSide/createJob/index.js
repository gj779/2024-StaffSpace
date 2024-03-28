import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonColored, ButtonSelectablePrimary } from "../../../../components";
import { BorderedTextWithIcon, CommonDropdown } from "../../../../components";
import { ComponentWrapper, DatePickerModal } from "../../../../components";
import { IconWithText, InputTitle, MainHeader } from "../../../../components";
import {
  KeyboardAvoidingScrollView,
  MainWrapper,
} from "../../../../components";
import { Spacer } from "../../../../components";
import { TextInputBorderUpTitle, Wrapper } from "../../../../components";
import {
  RegularText,
  RowWrapper,
  RowWrapperBasic,
} from "../../../../components";
import { fontSize, routes, sizes } from "../../../../services";
import { appImages, appStyles, colors } from "../../../../services";
import { totalSize, width } from "react-native-dimension";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { uniqueID, uploadProfileImage } from "../../../../backend/utility";
import { getDocByKeyValue, saveData } from "../../../../backend/utility";
import { all_jobs } from "../../../../redux/actions";
import { getStatebyCountry } from "../../../../backend/api";
import { getCitybyStateCountry } from "../../../../backend/api";
import { Alert, Linking, Platform } from "react-native";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

const CreateJob = (props) => {
  const { navigation, route } = props;
  const user_redux = useSelector((state) => state.user);
  const dispatch = useDispatch();
  var type = null;
  if (route?.params?.type) type = route?.params?.type;
  let isEvent = type === "Event";
  let isEdit = route?.params?.isEdit === true;
  let isResturant = type === "Resturant";
  var uData = route?.params?.item;
  const jobs_redux = useSelector((state) => state?.allJobs);

  const name = isResturant ? "Restaurant" : "Event";

  // console.log(JSON.stringify(route?.params?.item, null, 2));

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openStartTime, setOpenStartTime] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [openEndTime, setOpenEndTime] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState({ uri: "", fileName: "" });
  const [imageError, setImageError] = useState("");

  const [jobName, setJobName] = useState(user_redux.JobName || "");
  const [jobNameError, setJobNameError] = useState("");

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const [fullAddress, setFullAddress] = useState("");
  const [fullAddressError, setFullAddressError] = useState("");

  const [noOfJobs, setnoOfJobs] = useState("");
  const [noOfJobsError, setnoOfJobsError] = useState("");
  const [selectedJob, setSelectedJob] = useState("Part Time");

  const [stateData, setStateData] = useState([]);
  const [selectState, setSelectState] = useState({});
  const [selectStateError, setSelectStateError] = useState("");
  const [cityData, setcityData] = useState([]);
  const [selectcity, setselectCity] = useState("");
  const [selectcityError, setselectCityError] = useState("");

  useEffect(() => {
    if (isEdit) {
      setStartDate(new Date(isEvent ? uData?.start_date : uData?.date));
      setStartTime(new Date(uData?.start_time));
      setEndDate(new Date(uData?.end_date));
      setEndTime(new Date(uData?.end_time));
      setImage({ uri: uData?.postImage, fileName: uniqueID() });
      setTitle(uData?.position);
      setnoOfJobs(uData?.noOfJobs);
      setSelectedJob(uData?.JobType);
      setSelectState(uData?.address?.state);
      setselectCity(uData?.address?.city);
      setFullAddress(uData?.address?.fullAddress);
      setJobName(uData?.JobName);
    }
  }, [uData]);

  const getStateData = async () => {
    try {
      let { states } = await getStatebyCountry(
        user_redux.location?.country?.name
      );
      if (states?.length > 0) {
        setStateData(states || []);
      } else {
        setStateData([user_redux.location?.country]);
      }
    } catch (error) {
      if (error.msg == "country not found") {
        setStateData([user_redux.location?.country]);
      }
    }
  };

  const getCityData = async (state) => {
    try {
      let city = await getCitybyStateCountry(
        user_redux.location?.country?.name,
        state?.name || user_redux.location?.state?.name
      );
      if (city?.length > 0) {
        setcityData(city || []);
      } else {
        setcityData([state?.name || user_redux.location?.state?.name]);
      }
    } catch (error) {
      if (["country not found", "state not found"].includes(error.msg)) {
        setcityData([state?.name || user_redux.location?.state?.name]);
      }
    }
  };

  useEffect(() => {
    if (user_redux) {
      getStateData();
      if (uData?.address?.state) {
        getCityData(uData?.address?.state);
      } else {
        getCityData();
      }
    }
  }, [user_redux]);

  const PickPhotoFromGallery = async () => {
    setImageError("");
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
    } catch (e) {}
  };

  const openImagePicker = async () => {
    try {
      const data = await ImagePicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true,
      }).then((image) => {
        setImage({ uri: image.path, fileName: uniqueID() });
      });
    } catch (error) {}
  };

  const validations = () => {
    !title ? setTitleError("Title is required field") : setTitleError("");

    Object.keys(selectState).length < 1
      ? setSelectStateError("State is required field")
      : setSelectStateError("");

    !selectcity
      ? setselectCityError("City is required field")
      : setselectCityError("");
    // !noOfJobs
    //   ? setnoOfJobsError("Total number of jobs is required field")
    //   : setnoOfJobsError("");
    !fullAddress
      ? setFullAddressError("Full address is required field")
      : setFullAddressError("");
    !jobName
      ? setJobNameError(name + " name is required field")
      : setJobNameError("");
    // !image.uri ? setImageError('Image is required field') : setImageError('');
    if (
      title &&
      selectcity &&
      Object.keys(selectState).length > 0 &&
      // noOfJobs &&
      fullAddress &&
      jobName
    ) {
      return true;
    } else {
      return false;
    }
  };
  const HandlePressCreateJob = async () => {
    if (validations()) {
      setLoading(true);
      let post = {
        post_id: uniqueID(),
        JobName: jobName,
        position: title,
        address: {
          fullAddress: fullAddress,
          state: selectState,
          city: selectcity,
        },
        noOfJobs: noOfJobs || "0",
        date: Date.parse(new Date(startDate)),
        isActive: true,
        JobType: selectedJob,
        applicants: [],
        favourites: [],
        createdAt: Date.parse(new Date()),
        updatedAt: Date.parse(new Date()),
        user: {
          user_id: user_redux.user_id,
          firstName: user_redux.firstName,
          userType: user_redux.userType,
          profilePhoto: user_redux.profilePhoto,
          description: user_redux.description,
        },
      };
      let eventPost = {
        post_id: uniqueID(),
        JobName: jobName,
        position: title,
        address: {
          fullAddress: fullAddress,
          state: selectState,
          city: selectcity,
        },
        noOfJobs: noOfJobs,
        start_date: Date.parse(new Date(startDate)),
        start_time: Date.parse(new Date(startTime)),
        end_date: Date.parse(new Date(endDate)),
        end_time: Date.parse(new Date(endTime)),
        applicants: [],
        favourites: [],
        isActive: true,
        JobType: selectedJob,
        createdAt: Date.parse(new Date()),
        updatedAt: Date.parse(new Date()),
        user: {
          user_id: user_redux.user_id,
          firstName: user_redux.firstName,
          userType: user_redux.userType,
          profilePhoto: user_redux.profilePhoto,
          description: user_redux.description,
        },
      };
      if (image?.uri) {
        await uploadProfileImage(
          image.uri,
          `${user_redux.userType}/postImages/${uniqueID()}${image.fileName}.png`
        )
          .then(async (res) => {
            isEvent ? (eventPost.postImage = res) : (post.postImage = res);
            await saveData(
              "PostedJobs",
              isEvent ? eventPost.post_id : post.post_id,
              isEvent ? eventPost : post
            )
              .then((res) => {
                getDocByKeyValue(
                  "PostedJobs",
                  "user.user_id",
                  user_redux?.user_id
                )
                  .then((res) => {
                    dispatch(all_jobs(res));
                    setLoading(false);
                    navigation.navigate(routes.eventListing);
                  })
                  .catch((err) => {
                    setLoading(false);
                  });
              })
              .catch((err) => {
                setLoading(false);
              });
          })
          .catch((err) => {
            setLoading(false);
          });
      } else {
        await uploadProfileImage(
          appImages.noImageAvailable,
          `${user_redux.userType}/postImages/${uniqueID()}_noImage.png`
        )
          .then(async (res) => {
            post.postImage = res;
            await saveData(
              "PostedJobs",
              isEvent ? eventPost.post_id : post.post_id,
              isEvent ? eventPost : post
            )
              .then((res) => {
                getDocByKeyValue(
                  "PostedJobs",
                  "user.user_id",
                  user_redux?.user_id
                )
                  .then((res) => {
                    dispatch(all_jobs(res));
                    setLoading(false);
                    navigation.navigate(routes.eventListing);
                  })
                  .catch((err) => {
                    setLoading(false);
                  });
              })
              .catch((err) => {
                setLoading(false);
              });
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    }
  };

  const HandlePressUpdateJob = async () => {
    if (validations()) {
      setLoading(true);
      let post = {
        ...uData,
        updatedAt: Date.parse(new Date()),
      };
      post.position = title;
      (post.JobName = jobName), (post.address.fullAddress = fullAddress);
      post.address.state = selectState;
      post.address.city = selectcity;
      post.noOfJobs = noOfJobs || "0";
      post.JobType = selectedJob;

      let eventPost = {
        ...uData,
        updatedAt: Date.parse(new Date()),
      };
      eventPost.position = title;
      (eventPost.JobName = jobName),
        (eventPost.address.fullAddress = fullAddress);
      eventPost.address.state = selectState;
      eventPost.address.city = selectcity;
      eventPost.noOfJobs = noOfJobs || "0";
      eventPost.JobType = selectedJob;
      eventPost.start_date = Date.parse(new Date(startDate));
      eventPost.start_time = Date.parse(new Date(startTime));
      eventPost.end_date = Date.parse(new Date(endDate));
      eventPost.end_time = Date.parse(new Date(endTime));

      if (image?.uri) {
        await uploadProfileImage(
          image.uri,
          `${user_redux.userType}/postImages/${uniqueID()}${image.fileName}.png`
        )
          .then(async (res) => {
            isEvent ? (eventPost.postImage = res) : (post.postImage = res);
            await saveData(
              "PostedJobs",
              uData.post_id,
              isEvent ? eventPost : post
            )
              .then((res) => {
                getDocByKeyValue(
                  "PostedJobs",
                  "user.user_id",
                  user_redux.user_id
                )
                  .then((res) => {
                    dispatch(all_jobs(res));
                    setLoading(false);
                    navigation.goBack();
                  })
                  .catch((err) => {
                    setLoading(false);
                  });
              })
              .catch((err) => {
                setLoading(false);
              });
          })
          .catch((err) => {
            setLoading(false);
          });
      } else {
        await uploadProfileImage(
          appImages.noImageAvailable,
          `${user_redux.userType}/postImages/${uniqueID()}_noImage.png`
        )
          .then(async (res) => {
            isEvent ? (eventPost.postImage = res) : (post.postImage = res);
            await saveData(
              "PostedJobs",
              uData.post_id,
              isEvent ? eventPost : post
            )
              .then((res) => {
                getDocByKeyValue(
                  "PostedJobs",
                  "user.user_id",
                  user_redux.user_id
                )
                  .then((res) => {
                    dispatch(all_jobs(res));
                    setLoading(false);
                    navigation.goBack();
                  })
                  .catch((err) => {
                    setLoading(false);
                  });
              })
              .catch((err) => {
                setLoading(false);
              });
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    }
  };

  const handleJobSelection = (id) => {
    switch (id) {
      case "1":
        setSelectedJob("Part Time");
        break;
      case "2":
        setSelectedJob("Full Time");
        break;
      case "3":
        setSelectedJob("Both");
        break;
      default:
        break;
    }
  };
  return (
    <MainWrapper>
      <Wrapper flex={1} style={appStyles.mainContainer}>
        <MainHeader
          title={
            (isEdit ? "Update" : "Create") + (isResturant ? " Job" : " Event")
          }
          buttonSize={totalSize(3)}
          onPressBack={() => navigation.goBack()}
        />
        <KeyboardAvoidingScrollView>
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <RegularText style={[styles.textInputTitle, styles.startMargin]}>
              Image
            </RegularText>
          </ComponentWrapper>
          <Spacer height={sizes.smallMargin} />
          <BorderedTextWithIcon
            customIcon={image.uri ? { uri: image?.uri } : null}
            iconName="file-image-plus-outline"
            iconType={"material-community"}
            iconSize={sizes.icons.xl}
            iconColor={colors.primary}
            onPress={() => PickPhotoFromGallery()}
            style={{ color: colors.primary, padding: 0 }}
            // resizeMode={image.uri ? 'stretch' : 'cover'}
          />
          {imageError ? (
            <ComponentWrapper
              style={{ marginLeft: width(7.5) }}
              animation="shake"
            >
              <Spacer height={sizes.TinyMargin} />
              <IconWithText
                iconName="alert-circle-outline"
                text={imageError}
                tintColor={colors.error}
                iconSize={sizes.icons.small}
                textStyle={[{ fontSize: fontSize.small }]}
              />
            </ComponentWrapper>
          ) : null}

          <TextInputBorderUpTitle
            value={jobName}
            error={jobNameError}
            onChangeText={(txt) => {
              setJobName(txt);
              setJobNameError("");
            }}
            title={name + " Name"}
            titleStyle={styles.textInputTitle}
            placeholder={"Enter " + (name + " name").toLowerCase()}
          />

          <TextInputBorderUpTitle
            value={title}
            error={titleError}
            onChangeText={(txt) => {
              setTitle(txt);
              setTitleError("");
            }}
            title={"Position"}
            titleStyle={styles.textInputTitle}
            placeholder="Enter position"
          />

          <InputTitle
            style={[
              styles.textInputTitle,
              {
                marginLeft: width(7),
                marginBottom: width(2),
                marginTop: width(4),
              },
            ]}
          >
            Address
          </InputTitle>
          <TextInputBorderUpTitle
            value={fullAddress}
            error={fullAddressError}
            onChangeText={(txt) => {
              setFullAddress(txt);
              setFullAddressError("");
            }}
            placeholder="Full address"
          />
          <View style={{ marginVertical: 5 }} />
          <RowWrapper>
            <View style={{ flex: 1 }}>
              <CommonDropdown
                placeholder={selectState?.name || "State"}
                error={selectStateError}
                data={stateData}
                buttonTextAfterSelection={(data) => {
                  if (selectState?.name) {
                    return data?.name;
                  } else {
                    return "State";
                  }
                }}
                rowTextForSelection={(data) => {
                  return data?.name;
                }}
                onSelect={async (data) => {
                  setselectCity("");
                  setSelectStateError("");
                  setSelectState(data);
                  getCityData(data);
                }}
                buttonStyle={{ marginHorizontal: 0 }}
                iconStyle={{ marginRight: 5 }}
              />
            </View>
            <View style={{ marginHorizontal: 5 }} />
            <View style={{ flex: 1 }}>
              <CommonDropdown
                data={cityData}
                error={selectcityError}
                buttonTextAfterSelection={(data) => {
                  if (selectcity) {
                    return data;
                  } else {
                    return "City";
                  }
                }}
                rowTextForSelection={(data) => {
                  return data;
                }}
                onSelect={(data) => {
                  setselectCityError("");
                  setselectCity(data);
                }}
                buttonStyle={{ marginHorizontal: 0 }}
                placeholder={selectcity || "City"}
                iconStyle={{ marginRight: 5 }}
              />
            </View>
          </RowWrapper>
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <RegularText style={[styles.textInputTitle, styles.startMargin]}>
              {type !== "Resturant" ? "Event Date and Time" : "Start Date"}
            </RegularText>
            <Spacer height={sizes.smallMargin} />
            <RowWrapperBasic>
              <DatePickerModal
                onPress={() => setOpenStartDate(true)}
                setOpen={openStartDate}
                setDate={startDate}
                onCancel={() => {
                  setOpenStartDate(false);
                }}
                text={startDate}
                onConfirm={(date) => {
                  setOpenStartDate(false);
                  setStartDate(date);
                }}
              />
              {type !== "Resturant" ? (
                <DatePickerModal
                  isTimeModal
                  onPress={() => setOpenStartTime(true)}
                  setOpen={openStartTime}
                  setDate={startTime}
                  onCancel={() => {
                    setOpenStartTime(false);
                  }}
                  text={startTime}
                  onConfirm={(date) => {
                    setOpenStartTime(false);
                    setStartTime(date);
                  }}
                />
              ) : null}
            </RowWrapperBasic>
            <Spacer height={sizes.baseMargin} />
            {type !== "Resturant" ? (
              <Wrapper>
                <RegularText
                  style={[styles.textInputTitle, styles.startMargin]}
                >
                  Last Date and Time to Apply
                </RegularText>
                <Spacer height={sizes.smallMargin} />
                <RowWrapperBasic>
                  <DatePickerModal
                    onPress={() => setOpenEndDate(true)}
                    setOpen={openEndDate}
                    setDate={endDate}
                    onCancel={() => {
                      setOpenEndDate(false);
                    }}
                    text={endDate}
                    onConfirm={(date) => {
                      setOpenEndDate(false);
                      setEndDate(date);
                    }}
                  />
                  <DatePickerModal
                    isTimeModal
                    onPress={() => setOpenEndTime(true)}
                    setOpen={openEndTime}
                    setDate={endTime}
                    onCancel={() => {
                      setOpenEndTime(false);
                    }}
                    text={endTime}
                    onConfirm={(date) => {
                      setOpenEndTime(false);
                      setEndTime(date);
                    }}
                  />
                </RowWrapperBasic>
              </Wrapper>
            ) : null}
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <RegularText style={[styles.textInputTitle, styles.startMargin]}>
              Job Type
            </RegularText>
          </ComponentWrapper>
          <Spacer height={sizes.smallMargin} />
          <RowWrapper style={styles.availabilityWrapper}>
            <Wrapper flex={1}>
              <ButtonSelectablePrimary
                text={"Part Time"}
                isSelected={selectedJob == "Part Time"}
                onPress={() => handleJobSelection("1")}
              />
            </Wrapper>
            <Wrapper flex={1}>
              <ButtonSelectablePrimary
                text={"Full Time"}
                isSelected={selectedJob == "Full Time"}
                onPress={() => handleJobSelection("2")}
              />
            </Wrapper>
            <Wrapper flex={1}>
              <ButtonSelectablePrimary
                text={"Both"}
                isSelected={selectedJob == "Both"}
                onPress={() => handleJobSelection("3")}
              />
            </Wrapper>
          </RowWrapper>
          {/* <TextInputBorderUpTitle
            value={noOfJobs}
            error={noOfJobsError}
            onChangeText={(txt) => {
              setnoOfJobs(txt);
              setnoOfJobsError("");
            }}
            title={"Total Number of Jobs"}
            titleStyle={styles.textInputTitle}
            placeholder="Enter Total Number of Jobs"
          /> */}

          <Spacer height={sizes.doubleBaseMargin} />
          <ButtonColored
            disabled={isLoading}
            text={
              isLoading ? (
                <ActivityIndicator color={colors.appBgColor1} />
              ) : isEdit ? (
                "Update"
              ) : (
                "Create"
              )
            }
            buttonColor={colors.primary}
            onPress={isEdit ? HandlePressUpdateJob : HandlePressCreateJob}
          />
          <Spacer height={sizes.doubleBaseMargin} />
        </KeyboardAvoidingScrollView>
      </Wrapper>
    </MainWrapper>
  );
};

export default CreateJob;
const styles = StyleSheet.create({
  textInputTitle: {
    fontSize: totalSize(2),
    color: colors.black,
  },
  textInputRight: {
    marginEnd: 10,
  },
  TextInputLeftStyle: {
    marginStart: 8,
    marginEnd: -15,
  },
  startMargin: {
    marginStart: 10,
  },
  availabilityWrapper: {
    alignSelf: "center",
  },
  availabilityButton: {
    paddingHorizontal: width(12),
  },
});
