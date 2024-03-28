import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import { Icon } from "react-native-elements";
import IconV from "react-native-vector-icons/Ionicons";
import { height, totalSize, width } from "react-native-dimension";
import { colors, appImages, sizes, appStyles, fontSize } from "../../services";
import {
  CardWrapper,
  Wrapper,
  ComponentWrapper,
  RowWrapperBasic,
  RowWrapper,
  AbsoluteWrapper,
} from "../wrappers";
import {
  ImageRound,
  ImageGroup,
  FeedImage,
  ImageSqareRound,
  CustomizedImage,
} from "../images";
import { Spacer } from "../spacers";
import {
  TinyTitle,
  SmallText,
  SmallTitle,
  RegularText,
  TinyText,
  MediumText,
  LargeText,
  MediumTitle,
  ButtonTextMedium,
} from "../text";
import { IconWithText, IconButton, CloseIcon, CheckIcon } from "../icons";
import { TextInputBordered } from "../textInput";
import { LineHorizontal } from "../lines";
import {
  ButtonColored,
  ButtonColoredSmall,
  FilterButton,
  OptionButton,
} from "../buttons";
// import Swipeout from 'react-native-swipeout';
import { styles } from "./styles";
import { CheckBoxFavorite, CheckBoxPrimary } from "../checkBoxs";
import { ResturantFeedApplicants } from "../renders";
import moment from "moment";
import { Menu, Divider } from "react-native-paper";
// import {
//     Menu,
//     MenuOptions,
//     MenuOption,
//     MenuTrigger,
//     renderers,
//     MenuProvider
// } from 'react-native-popup-menu';

const optionsStyles = {
  optionsContainer: {
    // backgroundColor: 'green',
    padding: 5,
    borderRadius: 10,
  },
  optionsWrapper: {
    // backgroundColor: 'purple',
  },
  optionWrapper: {
    // backgroundColor: 'yellow',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: "gold",
    activeOpacity: 70,
  },
  optionText: {
    // color: 'brown',
    alignSelf: "center",
  },
};

export const Card = (props) => {
  const { style, width, height } = props;
  return <CardWrapper></CardWrapper>;
};

export const FeedCard = ({
  animation,
  duration,
  isResturant,
  isInHistory,
  isJobActive,
  isApplicant,
  applicants,
  isInListing,
  isEventList,
  onPressHeart,
  onPressOptionButton,
  onPressRequests,
  isLiked,
  onPressApplicants,
  containerStyle,
  userImage,
  feedImage,
  detailText,
  title,
  titleDetails,
  locationText,
  isAproved,
  statusButton,
  ratingText,
  onPress,
  isActive,
  onPressAll,
  jobName,
}) => {
  const [visible, setVisible] = useState(false);
  // console.log(isActive);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <Wrapper
        animation={animation}
        duration={duration}
        style={[containerStyle, { paddingVertical: 7 }]}
      >
        <ComponentWrapper
          style={[
            appStyles.shadow,
            {
              backgroundColor: colors.appBgColor,
              borderRadius: sizes.cardRadius,
            },
          ]}
        >
          <FeedImage source={feedImage} imageStyle>
            <Wrapper style={[{ alignSelf: "flex-end", marginEnd: width(3) }]}>
              <Spacer height={sizes.smallMargin} />
              {isApplicant ? (
                <CheckBoxFavorite onPress={onPressHeart} checked={isLiked} />
              ) : null}
              {isEventList ? (
                <Wrapper
                  style={[
                    appStyles.center,
                    {
                      backgroundColor: colors.appColorFaded,
                      borderRadius: sizes.buttonMiniRadius,
                      height: totalSize(3.5),
                      width: totalSize(3.5),
                      padding: 2,
                    },
                  ]}
                >
                  <Menu
                    visible={visible}
                    onDismiss={() => setVisible(!visible)}
                    anchor={
                      <IconWithText
                        onPress={() => setVisible(!visible)}
                        tintColor={colors.white}
                        iconSize={sizes.icons.medium}
                        iconName={"options-vertical"}
                        iconType={"simple-line-icon"}
                      />
                    }
                  >
                    <Menu.Item
                      style={{
                        backgroundColor: isActive
                          ? colors.primary
                          : colors.appBgColor,
                      }}
                      titleStyle={{
                        color: isActive ? colors.white : colors.black,
                      }}
                      onPress={() => {
                        onPressOptionButton(1);
                        setVisible(!visible);
                      }}
                      title="Active"
                    />
                    <Divider />
                    <Menu.Item
                      style={{
                        backgroundColor: !isActive
                          ? colors.primary
                          : colors.appBgColor,
                      }}
                      titleStyle={{
                        color: !isActive ? colors.white : colors.black,
                      }}
                      onPress={() => {
                        onPressOptionButton(2);
                        setVisible(!visible);
                      }}
                      title="InActive"
                    />
                  </Menu>
                  {/* <IconWithText
                                        onPress={value => onPressOptionButton(1)}
                                        tintColor={colors.white}
                                        iconSize={sizes.icons.medium}
                                        iconName={'options-vertical'}
                                        iconType={'simple-line-icon'} /> */}
                  {/* <AbsoluteWrapper style={{ top: 0, right: 0 }}>
                                        Add PopUp Card for edit add etc
                                    </AbsoluteWrapper> */}
                  {/* <Menu
                                        onSelect={value => onPressOptionButton(value)}
                                        renderer={renderers.NotAnimatedContextMenu}>
                                        <MenuTrigger>
                                            <IconV
                                                name={"ellipsis-vertical"}
                                                size={sizes.icons.medium}
                                                color={colors.white}
                                            />
                                        </MenuTrigger>
                                        <MenuOptions customStyles={optionsStyles}>
                                            <MenuOption value={1} text={'Active'} />
                                            <LineHorizontal />
                                            <MenuOption value={2} text={'InActive'} />
                                        </MenuOptions>
                                    </Menu> */}
                </Wrapper>
              ) : null}
            </Wrapper>
            {isResturant ? (
              <Wrapper>
                {applicants?.length > 0 ? (
                  <TouchableOpacity activeOpacity={0.95}>
                    <AbsoluteWrapper style={{ top: 10, left: 10 }}>
                      <Wrapper
                        style={[
                          appStyles.center,
                          appStyles.shadow,
                          {
                            height: 40,
                            backgroundColor: colors.primary,
                            borderRadius: sizes.buttonMiniRadius,
                          },
                        ]}
                      >
                        <ResturantFeedApplicants
                          data={applicants}
                          onPress={(props) => onPressApplicants(props)}
                          onPressAll={(props) => onPressAll(props)}
                        />
                      </Wrapper>
                    </AbsoluteWrapper>
                  </TouchableOpacity>
                ) : null}
                <AbsoluteWrapper style={{ top: 10, right: 10 }}>
                  <Wrapper
                    style={[
                      appStyles.center,
                      appStyles.shadow,
                      {
                        backgroundColor: isJobActive
                          ? colors.appColor11
                          : colors.appColor10,
                        height: 30,
                        borderRadius: sizes.buttonMiniRadius,
                        paddingHorizontal: width(4),
                      },
                    ]}
                  >
                    <RegularText style={{ color: colors.appTextColor6 }}>
                      {isJobActive ? "Active" : "Inactive"}
                    </RegularText>
                  </Wrapper>
                </AbsoluteWrapper>
              </Wrapper>
            ) : null}
          </FeedImage>
          <Spacer height={sizes.smallMargin} />
          <Wrapper style={[{ alignSelf: "flex-end", marginEnd: width(3) }]}>
            {isApplicant || isInListing ? (
              <RowWrapperBasic
                style={{
                  backgroundColor: colors.primary,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: sizes.ModalRadius,
                }}
              >
                <MediumText style={{ color: colors.appBgColor }}>
                  {ratingText}
                </MediumText>
                <Spacer width={sizes.smallMargin} />
                <IconWithText
                  iconName="star"
                  iconType={"ionicon"}
                  tintColor={colors.appBgColor}
                  iconSize={sizes.icons.tiny}
                />
              </RowWrapperBasic>
            ) : (
              <Spacer height={sizes.baseMargin} />
            )}
          </Wrapper>
          <ComponentWrapper>
            <RowWrapperBasic>
              <ImageRound
                style={{ alignSelf: "flex-start" }}
                source={{ uri: userImage ? userImage : appImages.noUser }}
                size={totalSize(7)}
              />
              <Spacer width={sizes.smallMargin} />
              <Wrapper>
                <SmallTitle style={{ maxWidth: width(70) }}>{title}</SmallTitle>
                {/* <RegularText>{titleDetails}</RegularText> */}
                <Spacer height={sizes.smallMargin} />
                <IconWithText
                  text={locationText}
                  iconName="location-outline"
                  tintColor={colors.primary}
                  iconSize={sizes.icons.medium}
                />
              </Wrapper>
            </RowWrapperBasic>
          </ComponentWrapper>
          <Spacer height={sizes.smallMargin} />
          <LineHorizontal />
          <Spacer height={sizes.smallMargin} />
          {jobName ? (
            <ComponentWrapper>
              <MediumText style={{ color: colors.appTextColor7 }}>
                {jobName}
              </MediumText>
            </ComponentWrapper>
          ) : null}
          <Spacer height={sizes.smallMargin} />
          {detailText ? (
            <ComponentWrapper>
              <MediumText style={{ color: colors.appTextColor7 }}>
                {detailText}
              </MediumText>
            </ComponentWrapper>
          ) : null}

          <Spacer height={sizes.smallMargin} />
          {isEventList ? (
            !isInHistory ? (
              <Wrapper style={[appStyles.center]}>
                <Spacer height={sizes.smallMargin} />
                <ButtonColored
                  disabled={applicants.length < 1}
                  onPress={onPressRequests}
                  buttonStyle={{
                    backgroundColor: applicants.length
                      ? colors.primary
                      : colors.appButton10,
                    width: width(70),
                  }}
                  buttonColor={colors.primary}
                  text={`View Requests ${
                    applicants.length ? applicants.length : ""
                  }`}
                />
                <Spacer height={sizes.baseMargin} />
              </Wrapper>
            ) : (
              <Spacer height={sizes.smallMargin} />
            )
          ) : null}
          {statusButton ? (
            <Wrapper
              style={[
                {
                  backgroundColor:
                    isAproved == "pending"
                      ? colors.appButton9
                      : isAproved == "rejected"
                      ? colors.appButton5
                      : colors.appButton8,
                },
                styles.feedCardStatusButton,
              ]}
            >
              <Wrapper
                style={[appStyles.center, { paddingVertical: width(3) }]}
              >
                <ButtonTextMedium style={{ color: colors.appTextColor6 }}>
                  {isAproved == "pending"
                    ? "Pending"
                    : isAproved !== "rejected"
                    ? "Approved"
                    : "Rejected"}
                </ButtonTextMedium>
              </Wrapper>
            </Wrapper>
          ) : null}
        </ComponentWrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

export const ReviewsCard = ({
  containerStyle,
  description,
  title,
  source,
  onPress,
  ratingText,
}) => {
  return (
    <Wrapper style={[styles.reviewsCard, containerStyle]}>
      <RowWrapperBasic>
        <Wrapper style={[appStyles.center, appStyles.profileImageWrapper]}>
          {source ? (
            <ImageSqareRound size={width(14)} source={source} />
          ) : (
            <ImageSqareRound
              size={width(14)}
              source={{ uri: appImages.noUser }}
            />
          )}
        </Wrapper>
        <Wrapper style={{ marginStart: width(3) }}>
          <MediumText>{title}</MediumText>
          <IconWithText
            text={ratingText}
            iconName="star"
            tintColor={colors.appColor5}
            iconSize={sizes.icons.medium}
          />
        </Wrapper>
      </RowWrapperBasic>
      <Spacer height={sizes.smallMargin} />
      <RegularText style={styles.reviewsCardRegularText}>
        {description}
      </RegularText>
    </Wrapper>
  );
};

export const ChatCard = ({
  source,
  title,
  timeStamp,
  message,
  onPress,
  imageSize,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <ComponentWrapper>
        <RowWrapper style={styles.chatCardOuterRowWrapper}>
          <ImageRound source={source} size={imageSize} />
          <Wrapper style={styles.chatCardInnerWrapper}>
            <RowWrapper style={styles.chatCardInnerRowWrapper}>
              <MediumText>{title}</MediumText>
              <SmallText>{timeStamp}</SmallText>
            </RowWrapper>
            <SmallText>{message}</SmallText>
          </Wrapper>
        </RowWrapper>
      </ComponentWrapper>
    </TouchableOpacity>
  );
};

export const UseCurrentLocationCard = ({ animation, onPress, location }) => {
  return (
    <Wrapper animation={animation}>
      <ComponentWrapper>
        <Spacer height={sizes.baseMargin} />
        <IconWithText
          iconName="my-location"
          iconType="material"
          iconSize={sizes.icons.large}
          text={location}
          title="Use my current location"
          tintColor={colors.appColor3}
          textStyle={[appStyles.textSmall]}
          titleStyle={[appStyles.h6, appStyles.textBlue, appStyles.textBold]}
          onPress={onPress}
        />
        <Spacer height={sizes.baseMargin} />
      </ComponentWrapper>
      <LineHorizontal />
    </Wrapper>
  );
};
export const LocationPrimaryCard = ({
  onPress,
  location,
  distance,
  animation,
  duration,
}) => {
  return (
    <Wrapper animation={animation} duration={duration}>
      <ComponentWrapper>
        <Spacer height={sizes.smallMargin} />
        <IconWithText
          iconName="location-pin"
          iconType="simple-line-icon"
          iconSize={sizes.icons.medium}
          text={distance}
          title={location}
          //tintColor={colors.appColor3}
          textStyle={[appStyles.textSmall, appStyles.textGray]}
          // titleStyle={appStyles.h6}
          onPress={onPress}
        />
        <Spacer height={sizes.smallMargin} />
      </ComponentWrapper>
      <LineHorizontal />
    </Wrapper>
  );
};
export const ExpertyPrimaryCard = ({ containerStyle, text, number }) => {
  return (
    <Wrapper style={[styles.expertyPrimaryCardContainer, containerStyle]}>
      <RowWrapperBasic>
        <Wrapper style={[styles.expertyPrimaryCardNumberContainer]}>
          <TinyText style={[appStyles.textGray]}>{number}</TinyText>
        </Wrapper>
        <SmallText style={[{ marginHorizontal: sizes.smallMargin }]}>
          {text}
        </SmallText>
      </RowWrapperBasic>
    </Wrapper>
  );
};

export const UserInfoPrimaryCard = ({
  onPress,
  onPressAdd,
  containerStyle,
  userImage,
  userName,
  address,
  isAdded,
  experties,
  smallCard,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <CardWrapper style={[styles.userInfoPrimaryCard, containerStyle]}>
        <RowWrapperBasic
          style={[{ alignItems: smallCard ? "center" : "flex-start" }]}
        >
          <Wrapper flex={1}>
            <RowWrapperBasic>
              <ImageRound
                source={{ uri: userImage ? userImage : appImages.noUser }}
                size={totalSize(7.5)}
              />
              <Spacer width={sizes.baseMargin} />
              <Wrapper>
                <TinyTitle>{userName}</TinyTitle>
                <RegularText>{address}</RegularText>
              </Wrapper>
            </RowWrapperBasic>
          </Wrapper>
          {isAdded ? (
            <Wrapper animation="fadeInLeft">
              <Icon
                name="check"
                color={colors.appColor1}
                size={sizes.icons.medium}
              />
            </Wrapper>
          ) : (
            <IconButton
              iconName="plus"
              buttonSize={totalSize(4)}
              buttonColor={colors.appColor1}
              iconColor={colors.appTextColor6}
              onPress={onPressAdd}
            />
          )}
        </RowWrapperBasic>
        {experties ? (
          <>
            <Spacer height={sizes.baseMargin} />
            <RowWrapperBasic style={[{ flexWrap: "wrap" }]}>
              {experties.map((item, key) => {
                return (
                  <ExpertyPrimaryCard
                    containerStyle={[{ marginRight: 5, marginBottom: 5 }]}
                    text={item}
                    number={2 * key + 10}
                  />
                );
              })}
            </RowWrapperBasic>
          </>
        ) : null}
      </CardWrapper>
    </TouchableOpacity>
  );
};

export const NotificationPrimaryCard = ({
  onPress,
  source,
  isRead,
  animation,
  duration,
  info,
  time,
}) => {
  return (
    <Pressable onPress={onPress} style={{ opacity: isRead ? 0.3 : 1 }}>
      <Wrapper animation={animation} duration={duration}>
        <Spacer height={sizes.smallMargin} />
        <RowWrapper>
          <Wrapper flex={2}>
            {source ? (
              <ImageRound source={{ uri: source }} size={totalSize(7)} />
            ) : (
              <ImageRound
                source={{ uri: appImages.noUser }}
                size={totalSize(7)}
              />
            )}
          </Wrapper>
          <Wrapper
            flex={8}
            style={{
              justifyContent: "space-between",
              marginStart: sizes.smallMargin,
            }}
          >
            <MediumText>{info}</MediumText>
            <TinyText>{moment(time).fromNow() || time}</TinyText>
          </Wrapper>
        </RowWrapper>
        <ComponentWrapper>
          <Spacer height={sizes.smallMargin} />
          <LineHorizontal width="100%" />
        </ComponentWrapper>
      </Wrapper>
    </Pressable>
  );
};

export const ApplicantCard = ({
  title,
  fullName,
  source,
  locationText,
  rated,
  description,
  onPress,
  isApproved,
}) => {
  return (
    <ComponentWrapper
      style={[
        appStyles.shadow,
        {
          backgroundColor: colors.appBgColor1,
          borderRadius: sizes.inputRadius,
          marginVertical: width(2),
        },
      ]}
    >
      <Spacer height={sizes.baseMargin} />
      <RowWrapper>
        <Wrapper style={{ flex: 2 }}>
          <ImageRound source={source} />
        </Wrapper>
        <Wrapper style={{ flex: 6 }}>
          <SmallTitle>
            {title}{" "}
            {isApproved == "rejected" && (
              <RegularText style={{ color: colors.appButton1 }}>
                {" Rejected"}
              </RegularText>
            )}
            {isApproved == "approved" && (
              <RegularText style={{ color: colors.appButton8 }}>
                {" Approved"}
              </RegularText>
            )}
          </SmallTitle>
          <RegularText>{fullName}</RegularText>
          <IconWithText
            text={locationText}
            iconName="location"
            iconType="evilicon"
            iconSize={sizes.icons.large}
            tintColor={colors.primary}
          />
        </Wrapper>
        <Wrapper
          style={{ flex: 2, alignSelf: "flex-start", alignItems: "flex-end" }}
        >
          {rated ? (
            <IconWithText
              text={rated}
              iconName="star"
              iconType="antdesign"
              iconSize={sizes.icons.medium}
              tintColor={colors.primary}
            />
          ) : null}
        </Wrapper>
      </RowWrapper>
      {description ? (
        <Wrapper>
          <Spacer height={sizes.doubleBaseMargin / 1.5} />
          <ComponentWrapper>
            <RegularText style={{ color: colors.appTextColor8 }}>
              {description}
            </RegularText>
          </ComponentWrapper>
        </Wrapper>
      ) : null}
      <Spacer height={sizes.doubleBaseMargin / 1.5} />
      <Wrapper style={[appStyles.center]}>
        <ButtonColored
          text="View Details"
          buttonStyle={{ width: width(70) }}
          buttonColor={
            isApproved == "rejected"
              ? colors.appButton1
              : isApproved == "pending"
              ? colors.primary
              : colors.appButton8
          }
          onPress={onPress}
        />
      </Wrapper>
      <Spacer height={sizes.baseMargin} />
    </ComponentWrapper>
  );
};
const getTwoImages = (array) => {
  let images = [];
  images = array.filter((item, index) => {
    return index <= 1;
  });
  return images;
};
