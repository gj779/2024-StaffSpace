import { ActivityIndicator, Linking, Platform } from "react-native";
import { StyleSheet, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AbsoluteWrapper, ButtonColored, IconClose } from "../../../components";
import { ButtonSelectableUnderlined, SmallTitle } from "../../../components";
import { ImageRound, CustomizedModel, HomeHeader } from "../../../components";
import { ComponentWrapper, Wrapper, MainHeader } from "../../../components";
import {
  KeyboardAvoidingScrollView,
  LineHorizontal,
} from "../../../components";
import { DatePickerHorizontal, MainWrapper } from "../../../components";
import { Spacer, MediumText, RenderExperiencesData } from "../../../components";
import { RenderSettingsOptions, RegularText } from "../../../components";
import { ButtonSelectablePrimary, RowWrapper } from "../../../components";
import { TinyTitle, IconWithText } from "../../../components";
import { TextwithDescription } from "../../../components";
import { RowWrapperBasic, TextInputBorderUpTitle } from "../../../components";
import { PrivacyPolicy, routes, sizes, SortAlphabets } from "../../../services";
import { appImages, appStyles, colors } from "../../../services";
import { totalSize, width } from "react-native-dimension";
import { useDispatch, useSelector } from "react-redux";
import { addNotification, deleteFCMToken } from "../../../backend/utility";
import { getData, getDocByKeyValue } from "../../../backend/utility";
import { saveData, uniqueID, uploadpdfFile } from "../../../backend/utility";
import SimpleToast from "react-native-simple-toast";
import Pdf from "react-native-pdf";
import DocumentPicker, { types } from "react-native-document-picker";
import { logout, signin } from "../../../redux/actions";
import { DeleteAccount, DeleteUser, Logout } from "../../../backend/auth";
import { sendPushNotification } from "../../../backend/api";

const MyProfile = ({ navigation, route }) => {
  const user_redux = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState(user_redux);
  const [experienceData, setExperienceData] = useState("");
  const [sortedId, setSortedId] = useState("");
  const { navigate } = navigation;
  var isResturant = null;
  var Data = false;
  if (route?.params?.isResturant) isResturant = route?.params?.isResturant;
  if (route?.params?.Data) Data = route?.params?.Data;

  let user_id = Data?.applied_by?.user_id || Data?.user_id;
  // jobType

  useEffect(() => {
    setUser(user_redux);
  }, [user_redux]);

  useEffect(() => {
    if (Data) {
      GenerateRoomId();
      getData("Users", user_id).then((res) => {
        setUser(res);
        setJobCategories(res.jobCategories);
      });
    }
  }, [Data]);

  useEffect(() => {
    if (isResturant) {
      getDocByKeyValue("Experiences", "user_id", user_id)
        .then((res) => setExperienceData(res))
        .catch((err) => console.log(err));
    } else {
      getDocByKeyValue("Experiences", "user_id", user_redux.user_id)
        .then((res) => setExperienceData(res))
        .catch((err) => console.log(err));
    }
  }, []);

  const GenerateRoomId = () => {
    let roomID = user_id + user_redux.user_id;
    let roomIdSorted = SortAlphabets(roomID);
    setSortedId(roomIdSorted);
  };
  const [toggle, setToggle] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoading1, setLoading1] = useState(false);
  const [isLoading2, setLoading2] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [jobCategories, setJobCategories] = useState(user?.jobCategories);

  const [experienceTitle, setExperienceTitle] = useState("");
  const [experienceTitleError, setExperienceTitleError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [employementType, setEmployementType] = useState("");
  const [employementTypeError, setEmployementTypeError] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [isEditState, setEditState] = useState(false);
  const [isPDFModalOpen, setPDFModalState] = useState(false);

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

  const HandleReject = () => {
    setLoading1(true);
    let status = { status: "rejected" };
    let notificationFor = {
      _id: uniqueID(),
      id: Data?.applied_by?.user_id,
      image: user_redux?.profilePhoto,
      createdAt: Date.parse(new Date()),
      note:
        user_redux.firstName +
        " has rejected you for " +
        Data?.post_title +
        (Data?.postedBy?.userType === "Resturant" ? " Restaurant" : " Event"),
    };
    let notificationSelf = {
      _id: uniqueID(),
      id: user_redux.user_id,
      image: Data?.applied_by.profilePhoto,
      createdAt: Date.parse(new Date()),
      note:
        Data?.applied_by?.firstName +
        " has rejected for " +
        Data?.post_title +
        (Data?.postedBy?.userType === "Resturant" ? " Restaurant" : " Event"),
    };
    navigate(routes.applicants, { postId: Data.post_id });
    SimpleToast.show("Applicant Rejected");
    saveData("AppliedJobs", Data._id, status)
      .then((res) => {
        if (user?.fcm_token) {
          sendPushNotification(
            user?.fcm_token,
            user_redux.firstName + " has rejected you",
            notificationFor?.note
          );
        }
        addNotification(
          notificationFor?.id,
          notificationFor?._id,
          notificationFor?.image,
          notificationFor?.note,
          notificationFor?.createdAt
        )
          .then((res) => {
            addNotification(
              notificationSelf?.id,
              notificationSelf?._id,
              notificationSelf?.image,
              notificationSelf?.note,
              notificationSelf?.createdAt
            )
              .then((res) => {
                setLoading(false);
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
        setLoading1(false);
      });
  };
  const HandleApprove = () => {
    setLoading(true);
    let status = { status: "approved" };
    let notificationFor = {
      _id: uniqueID(),
      id: Data?.applied_by?.user_id,
      image: user_redux?.profilePhoto,
      createdAt: Date.parse(new Date()),
      note:
        user_redux.firstName +
        " has approved you for " +
        Data?.post_title +
        (Data?.postedBy?.userType === "Resturant" ? " Restaurant" : " Event"),
    };
    let notificationSelf = {
      _id: uniqueID(),
      id: user_redux.user_id,
      image: Data?.applied_by.profilePhoto,
      createdAt: Date.parse(new Date()),
      note:
        Data?.applied_by?.firstName +
        " has approved for " +
        Data?.post_title +
        (Data?.postedBy?.userType === "Resturant" ? " Restaurant" : " Event"),
    };
    navigate(routes.applicants, { postId: Data.post_id });
    SimpleToast.show("Applicant Approved");
    saveData("AppliedJobs", Data._id, status)
      .then((res) => {
        if (user?.fcm_token) {
          sendPushNotification(
            user?.fcm_token,
            user_redux.firstName + " has approved you",
            notificationFor?.note
          );
        }
        addNotification(
          notificationFor?.id,
          notificationFor?._id,
          notificationFor?.image,
          notificationFor?.note,
          notificationFor?.createdAt
        )
          .then((res) => {
            addNotification(
              notificationSelf?.id,
              notificationSelf?._id,
              notificationSelf?.image,
              notificationSelf?.note,
              notificationSelf?.createdAt
            )
              .then((res) => {
                setLoading(false);
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
  };
  const validations = () => {
    !experienceTitle
      ? setExperienceTitleError("It is a required field")
      : setExperienceTitleError("");
    !companyName
      ? setCompanyNameError("It is a required field")
      : setCompanyNameError("");
    !employementType
      ? setEmployementTypeError("It is a required field")
      : setEmployementTypeError("");
    if (experienceTitle && companyName && employementType) {
      return true;
    } else {
      return false;
    }
  };
  const ClearFields = () => {
    setExperienceTitle("");
    setCompanyName("");
    setEmployementType("");
    setEndDate(new Date());
    setStartDate(new Date());
  };
  const HandleAddExperience = () => {
    let id = uniqueID();
    let expData = {
      _id: id,
      user_id: user_redux.user_id,
      title: experienceTitle,
      company_name: companyName,
      employement_type: employementType,
      start_date: startDate,
      end_date: endDate,
    };
    setModalVisible(!isModalVisible);
    if (validations()) {
      SimpleToast.show("Experience Added Successfully");
      ClearFields();
      saveData("Experiences", expData._id, expData)
        .then((res) => {
          getDocByKeyValue("Experiences", "user_id", user_redux.user_id)
            .then((res) => setExperienceData(res))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };
  const HandleEditExperience = () => {
    setModalVisible(!isModalVisible);
    let editExpData = {
      _id: isEditState.item._id,
      user_id: user_redux.user_id,
      title: experienceTitle,
      company_name: companyName,
      employement_type: employementType,
      start_date: startDate,
      end_date: endDate,
    };
    if (validations()) {
      SimpleToast.show("Experience Updated Successfully");
      experienceData[isEditState.index] = editExpData;
      saveData("Experiences", isEditState.item._id, editExpData);
      ClearFields();
      setEditState(false);
    }
  };
  const HandleEdit = (item, index) => {
    setEditState({ item, index });
    setExperienceTitle(item?.title);
    setCompanyName(item?.company_name);
    setEmployementType(item?.employement_type);
    setStartDate(item?.start_date);
    setEndDate(item?.end_date);
    setModalVisible(!isModalVisible);
  };
  const RenderJobCategories = ({ item }) => (
    <ButtonSelectablePrimary text={item.title} isSelected />
  );
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
        type: [types.pdf, types.docx],
      });
      // setFileResponse(response);
      HandleChangeCV(response);
    } catch (err) {}
  }, []);
  const HandleChangeCV = async (response) => {
    let temDoc = "";
    response.map(async (i) => {
      await uploadpdfFile(
        i.uri,
        `${user?.userType}/Documents/${uniqueID()}${i.name}`
      ).then((res) => {
        SimpleToast.show("Resume Updated");
        let usr = {
          ...user_redux,
        };
        usr.resume = res;
        dispatch(signin(usr));
        saveData("Users", user_redux.user_id, { resume: res });
      });
    });
  };

  const About = () => (
    <Wrapper>
      <ComponentWrapper>
        {isResturant ? (
          <Wrapper>
            <Spacer height={sizes.baseMargin} />
            <RowWrapper style={styles.filterButtonWrapper}>
              <Wrapper flex={1}>
                <ButtonColored
                  text={"View Resume"}
                  buttonColor={colors.primary}
                  buttonStyle={styles.filterButton}
                  // onPress={() => navigation.navigate(routes.listing)}
                  onPress={() =>
                    Data ? setPDFModalState(!isPDFModalOpen) : null
                  }
                />
              </Wrapper>
              <Spacer width={sizes.baseMargin} />
              <Wrapper flex={1}>
                <ButtonColored
                  text="Message"
                  buttonColor={colors.appButton10}
                  tintColor={colors.white}
                  buttonStyle={styles.filterButton}
                  // onPress={() => console.log('hoooo', Data)}
                  onPress={() => {
                    let Data = {
                      user_id: user?.user_id,
                      profilePhoto: user?.profilePhoto,
                      firstName: user?.firstName,
                    };
                    navigation.navigate(routes.chatScreen, {
                      receiver: Data,
                      roomId: sortedId,
                    });
                  }}
                />
              </Wrapper>
            </RowWrapper>
          </Wrapper>
        ) : null}
        {/* {isResturant ? (
          <TextwithDescription
            titleStyle={styles.headerColor}
            textStyle={styles.textStyle}
            title="Description"
            text={user?.description}
          />
        ) : null} */}
        <TextwithDescription
          titleStyle={styles.headerColor}
          textStyle={styles.textStyle}
          title="Email"
          text={Data ? user?.email : user_redux.email}
        />
        {/* <Spacer height={sizes.smallMargin} />
        <TinyTitle style={styles.headerColor}>Job Category</TinyTitle>
        <Spacer height={sizes.baseMargin} />
        <FlatList
          data={jobCategories}
          renderItem={RenderJobCategories}
          keyExtractor={item => item.id}
          numColumns={2}
        />
        <Spacer height={sizes.smallMargin} />
        <TinyTitle style={styles.headerColor}>Availability</TinyTitle>
        <Spacer height={sizes.baseMargin} />
        <ButtonSelectablePrimary
          text={user?.jobType}
          buttonStyle={{maxWidth: width(30)}}
          isSelected
        /> */}
        <Spacer height={sizes.smallMargin} />
        <LineHorizontal color={colors.appColor8} width="100%" />
        <Spacer height={sizes.smallMargin} />
      </ComponentWrapper>
      <RowWrapper>
        {experienceData.length > 0 || !isResturant ? (
          <TinyTitle style={styles.headerColor}>Experience</TinyTitle>
        ) : null}
        {!isResturant ? (
          <Wrapper style={{ alignItems: "center", justifyContant: "center" }}>
            <IconWithText
              iconName="add"
              iconSize={sizes.icons.xl}
              onPress={() => setModalVisible(!isModalVisible)}
            />
          </Wrapper>
        ) : null}
        <CustomizedModel
          onBackdropPress={() => {
            setModalVisible(!isModalVisible);
            setEditState(false);
            ClearFields();
          }}
          isVisible={isModalVisible}
        >
          <TextInputBorderUpTitle
            value={experienceTitle}
            error={experienceTitleError}
            title="Name"
            onChangeText={(txt) => {
              setExperienceTitleError("");
              setExperienceTitle(txt);
            }}
            required
          />
          <TextInputBorderUpTitle
            value={companyName}
            error={companyNameError}
            title="Company name"
            onChangeText={(txt) => {
              setCompanyNameError("");
              setCompanyName(txt);
            }}
            required
          />
          <TextInputBorderUpTitle
            title="Employement Type"
            value={employementType}
            error={employementTypeError}
            onChangeText={(txt) => {
              setEmployementTypeError("");
              setEmployementType(txt);
            }}
            required
          />
          <RowWrapper style={{ justifyContent: "space-between" }}>
            <DatePickerHorizontal
              notPicker
              title={"Start Date"}
              onChangeText={setStartDate}
              value={startDate}
              // onPress={() => setOpenStartDate(true)}
              // setOpen={openStartDate}
              // setDate={startDate}
              // onCancel={() => {
              //   setOpenStartDate(false);
              // }}
              // text={startDate}
              // onConfirm={date => {
              //   setOpenStartDate(false);
              //   setStartDate(date);
              // }}
            />
            <DatePickerHorizontal
              notPicker
              title={"End Date"}
              onChangeText={setEndDate}
              value={endDate}
              // onPress={() =>   setOpenEndDate(true)}
              // setOpen={openEndDate}
              // setDate={endDate}
              // onCancel={() => {
              //   setOpenEndDate(false);
              // }}
              // text={endDate}
              // onConfirm={date => {
              //   setOpenEndDate(false);
              //   setEndDate(date);
              // }}
            />
          </RowWrapper>

          <Spacer height={sizes.doubleBaseMargin} />
          <ButtonColored
            text={isEditState ? "Update Info" : "Save Info"}
            buttonColor={colors.primary}
            onPress={isEditState ? HandleEditExperience : HandleAddExperience}
          />
          <Spacer height={sizes.baseMargin} />
        </CustomizedModel>
      </RowWrapper>
      <ComponentWrapper>
        {experienceData.length > 0 ? (
          <RenderExperiencesData
            data={experienceData}
            isEditable={Data}
            onPressEdit={(item, index) => HandleEdit(item, index)}
          />
        ) : null}
        <Spacer height={sizes.smallMargin} />
        {!isResturant ? (
          <TinyTitle style={styles.headerColor}>Resume</TinyTitle>
        ) : null}
        <RowWrapper style={styles.filterButtonWrapper}>
          {!isResturant ? (
            <Wrapper flex={3}>
              <ButtonColored
                text={`${
                  user_redux.resume
                    ? user?.firstName + " Resume.pdf"
                    : "Upload Resume"
                }`}
                iconName={
                  user_redux.resume
                    ? "cloud-download-outline"
                    : "cloud-upload-outline"
                }
                buttonColor={colors.appButton6}
                buttonStyle={styles.filterButton}
                onPress={() =>
                  user_redux.resume
                    ? setPDFModalState(!isPDFModalOpen)
                    : handleDocumentSelection()
                }
                tintColor={colors.primary}
              />
            </Wrapper>
          ) : null}
          <Wrapper flex={1}>
            {!isResturant ? (
              <ButtonColored
                iconName="cloud-download-outline"
                buttonColor={colors.primary}
                onPress={() => {
                  handleDocumentSelection();
                  // setPDFModalState(!isPDFModalOpen);
                }}
                tintColor={colors.white}
                buttonStyle={[styles.filterButton, { marginStart: width(2) }]}
              />
            ) : null}
            <CustomizedModel
              toggleModal={() => {
                setPDFModalState(!isPDFModalOpen);
              }}
              isVisible={isPDFModalOpen}
              innerStyle={{
                borderRadius: 0,
                padding: 0,
                marginHorizontal: 0,
              }}
            >
              <Wrapper style={[appStyles.center]}>
                <IconClose
                  onPress={() => setPDFModalState(!isPDFModalOpen)}
                  top={Platform.OS == "ios" ? 40 : 10}
                />
                <Pdf
                  source={{
                    uri: Data ? user?.resume : user_redux.resume,
                    cache: true,
                  }}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  trustAllCerts={false}
                  onError={(error) => {
                    console.log("error", error);
                  }}
                  onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                  fitWidth={true}
                  scale={1}
                  style={[
                    {
                      height: "100%",
                      width: "100%",
                      backgroundColor: colors.appBgColor,
                    },
                  ]}
                />
              </Wrapper>
            </CustomizedModel>
          </Wrapper>
        </RowWrapper>

        {isResturant ? (
          <Wrapper>
            {Data.status == "pending" ? (
              <Wrapper>
                <Spacer height={sizes.baseMargin} />
                <RowWrapper style={styles.filterButtonWrapper}>
                  <Wrapper flex={1}>
                    <ButtonColored
                      text={
                        isLoading ? (
                          <ActivityIndicator color={colors.white} />
                        ) : (
                          "Approve"
                        )
                      }
                      disabled={isLoading}
                      buttonColor={colors.primary}
                      buttonStyle={styles.filterButton}
                      onPress={HandleApprove}
                    />
                  </Wrapper>
                  <Spacer width={sizes.baseMargin} />
                  <Wrapper flex={1}>
                    <ButtonColored
                      text={
                        isLoading1 ? (
                          <ActivityIndicator color={colors.white} />
                        ) : (
                          "Reject"
                        )
                      }
                      disabled={isLoading1}
                      buttonColor={colors.appButton1}
                      tintColor={colors.white}
                      buttonStyle={styles.filterButton}
                      onPress={HandleReject}
                    />
                  </Wrapper>
                </RowWrapper>
              </Wrapper>
            ) : (
              <Wrapper>
                <Spacer height={sizes.baseMargin * 1.5} />
                <ButtonColored
                  animation={"bounceInRight"}
                  text="Rate Applicant"
                  buttonColor={colors.primary}
                  tintColor={colors.white}
                  buttonStyle={styles.filterButton}
                  onPress={() =>
                    navigation.navigate(routes.myJobReviews, {
                      isResturant: true,
                      item: Data,
                    })
                  }
                />
              </Wrapper>
            )}
          </Wrapper>
        ) : null}
        {/* {Data.status == 'rejected' && <ButtonColored
                    text={'Applicant Rejected'}
                    disabled={true}
                    buttonColor={colors.appButton1}
                    tintColor={colors.white}
                    buttonStyle={styles.filterButton}
                />} */}
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
        {/* <RowWrapper>
                    <CustomizedImage
                        radius={sizes.buttonMiniRadius} source={appImages.feed1}
                        height={width(100) / 3.6} width={width(100) / 3.6} />
                    <CustomizedImage
                        radius={sizes.buttonMiniRadius} source={appImages.feed1}
                        height={width(100) / 3.6} width={width(100) / 3.6} />
                    <ButtonBordered iconName='camera'
                        borderColor={colors.appColor2}
                        iconColor={colors.appTextColor7}
                        onPress={() => requestCameraPermission()}
                        buttonStyle={{ marginHorizontal: 0, height: width(100) / 3.6, width: width(100) / 3.6, borderStyle: 'dashed', }} />
                </RowWrapper> */}
        <Spacer height={sizes.doubleBaseMargin} />
        <Wrapper>
          <ButtonColored
            onPress={() => {
              setLogoutModalVisible(!isLogoutModalVisible);
            }}
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
        {!isResturant ? (
          <HomeHeader
            title="My Profile"
            onPress={() => navigation.toggleDrawer()}
          />
        ) : (
          <MainHeader
            title="My Profile"
            buttonSize={totalSize(3)}
            onPressBack={() => navigation.goBack()}
          />
        )}
        <KeyboardAvoidingScrollView>
          <Wrapper style={appStyles.center}>
            <ImageRound
              source={{ uri: user?.profilePhoto }}
              size={totalSize(10)}
            />
            <MediumText>{user?.firstName}</MediumText>
            {/* {!toggle ? (
              <MediumText style={styles.headerColor}>
                {user?.currentJob?.title} ({user?.jobType})
              </MediumText>
            ) : null} */}
            {isResturant ? (
              <AbsoluteWrapper style={{ right: width(15), top: 10 }}>
                <RowWrapperBasic
                  style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: sizes.ModalRadius,
                  }}
                >
                  <RegularText style={{ color: colors.appBgColor }}>
                    5.0
                  </RegularText>
                  <Spacer width={sizes.smallMargin} />
                  <IconWithText
                    iconName="star"
                    iconType={"ionicon"}
                    tintColor={colors.appBgColor}
                    iconSize={sizes.icons.tiny}
                  />
                </RowWrapperBasic>
              </AbsoluteWrapper>
            ) : null}
          </Wrapper>
          <Spacer height={sizes.baseMargin} />
          {!isResturant ? (
            <Wrapper>
              <Wrapper style={appStyles.center}>
                <RowWrapper style={[{ width: width(50) }]}>
                  <ButtonSelectableUnderlined
                    text="About"
                    isSelected={!toggle}
                    onPress={() => setToggle(false)}
                  />
                  <ButtonSelectableUnderlined
                    text="Settings"
                    isSelected={toggle}
                    onPress={() => setToggle(true)}
                  />
                </RowWrapper>
              </Wrapper>
              {!toggle ? About() : Settings()}
            </Wrapper>
          ) : (
            About()
          )}
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
                      disabled={isLoading2}
                      text={
                        isLoading2 ? (
                          <ActivityIndicator color={colors.white} />
                        ) : (
                          "Log out"
                        )
                      }
                      buttonColor={colors.primary}
                      buttonStyle={appStyles.rowButton}
                      onPress={async () => {
                        try {
                          setLoading2(true);
                          await deleteFCMToken();
                        } catch (error) {
                        } finally {
                          setLogoutModalVisible(!isLogoutModalVisible);
                          Logout();
                          dispatch(logout);
                          setLoading2(false);
                          navigate(routes.signin);
                        }
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

export default MyProfile;

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "justify",
  },
  headerColor: {
    color: colors.appTextColor8,
  },
  filterButtonWrapper: {
    marginVertical: sizes.smallMargin,
    marginHorizontal: null,
  },
  filterButton: {
    marginHorizontal: null,
  },
  settingButtonInner: {
    alignSelf: "flex-start",
    marginStart: width(3),
  },
  settingButtonOuter: {
    shadow: null,
    shadowColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.appBgColor2,
  },
  modelTextInputRow: {
    marginHorizontal: 0,
    width: width(30),
  },
});
