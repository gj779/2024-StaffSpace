import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ApplicantCard,
  ChatCard,
  FeedCard,
  NotificationPrimaryCard,
  ReviewsCard,
} from "../cards";
import { appImages, appStyles, colors, IsLiked, sizes } from "../../services";
import { Spacer } from "../spacers";
import { totalSize, width } from "react-native-dimension";
import { CustomizedImage } from "../images";
import { MediumText, TextProfileExperience } from "../text";
import {
  AbsoluteWrapper,
  ComponentWrapper,
  RowWrapper,
  Wrapper,
} from "../wrappers";
import { ButtonBordered, ButtonColored } from "../buttons";
import { removeItemfromArray } from "../../backend/utility";
import moment from "moment";
import { useSelector } from "react-redux";
import { IconWithText } from "../icons";

export const RenderHomeFeed = ({
  data,
  onPress,
  type,
  isApplicant,
  onPressHeart,
  onPressApplicants,
  onPressAll,
  contentContainerStyle,
}) => {
  const user_redux = useSelector((state) => state.user);
  const [myUser, setUser] = useState(user_redux);
  // console.log('dATAAA', data)
  useEffect(() => {
    setUser(user_redux);
  }, [user_redux]);
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      ListHeaderComponent={() => {
        return <Spacer height={sizes.smallMargin} />;
      }}
      renderItem={({ item, index }) => {
        return (
          <FeedCard
            keyFeatures
            animation={"fadeInRight"}
            duration={300 + index * 100}
            userImage={item.user?.profilePhoto}
            feedImage={{ uri: item?.postImage }}
            isResturant={type}
            onPressHeart={() => onPressHeart(item, index)}
            isLiked={IsLiked(item)}
            isApplicant={isApplicant}
            onPressApplicants={(props) => onPressApplicants(props)}
            onPressAll={(props) => onPressAll(props, item?.post_id)}
            isJobActive={item?.isActive}
            onPress={() => onPress(item, index)}
            title={item?.position || item?.title}
            jobName={item?.JobName}
            titleDetails={item?.user?.firstName}
            applicants={item?.applicants}
            detailText={
              item?.user?.description
                ? item?.user?.description
                : "Sea Restaurants fast and sea food our menue and get good jobs according to your resume"
            }
            locationText={
              item?.address?.city + ", " + item?.address?.state?.name
            }
            ratingText={item?.ratings}
          />
        );
      }}
    />
  );
};

export const RenderMyJobs = ({ data, onPress }) => {
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => {
        return <Spacer height={sizes.smallMargin} />;
      }}
      renderItem={({ item, index }) => {
        return (
          <FeedCard
            keyFeatures
            onPress={() => onPress(item, index)}
            title={item.post_title}
            jobName={item?.post_JobName}
            userImage={item.postedBy?.profilePhoto}
            feedImage={{ uri: item?.post_image }}
            titleDetails={item.postedBy?.firstName}
            detailText={item?.description}
            locationText="Orlando, OR"
            isAproved={item?.status}
            statusButton={true}
            ratingText="4.5"
          />
        );
      }}
    />
  );
};

export const RenderReviewCard = ({ data, onPress }) => {
  return (
    <FlatList
      horizontal
      data={data}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={() => <Spacer width={sizes.smallMargin} />}
      ListFooterComponent={() => <Spacer width={sizes.smallMargin} />}
      renderItem={({ item, index }) => {
        return (
          <ReviewsCard
            ratingText={(
              (item?.salary +
                item?.treatment +
                item?.management +
                item?.location) /
              4
            ).toFixed(1)}
            source={{ uri: item?.reviewer_photo }}
            title={item?.reviewer_name}
            description={item?.reviewText}
          />
        );
      }}
    />
  );
};

export const RenderReviewCardVertical = ({
  data,
  onPress,
  ListHeaderComponent,
}) => {
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={() => <Spacer height={sizes.doubleBaseMargin} />}
      renderItem={({ item, index }) => {
        return (
          <ReviewsCard
            ratingText={
              item.work
                ? (
                    (item?.behaviour + item?.work + item?.professionalism) /
                    3
                  ).toFixed(1)
                : (
                    (item?.salary +
                      item?.treatment +
                      item?.management +
                      item?.location) /
                    4
                  ).toFixed(1)
            }
            source={{ uri: item.reviewer_photo }}
            containerStyle={styles.reviewCardVertical}
            title={item.reviewer_name}
            description={item.reviewText}
          />
        );
      }}
    />
  );
};

export const RenderNotifications = ({ data, onPress, ListHeaderComponent }) => {
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={() => <Spacer height={sizes.smallMargin} />}
      renderItem={({ item, index }) => {
        return (
          <NotificationPrimaryCard
            onPress={() => onPress(item)}
            isRead={item?.isRead}
            source={item?.image || null}
            info={item?.note}
            time={item?.createdAt}
          />
        );
      }}
    />
  );
};

export const RenderChats = ({ data, onPress }) => {
  const user_redux = useSelector((state) => state.user);
  const [myUser, setUser] = useState(user_redux);
  useEffect(() => {
    setUser(user_redux);
  }, [user_redux]);

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <Spacer height={sizes.smallMargin} />}
      ListFooterComponent={() => <Spacer height={sizes.smallMargin} />}
      renderItem={({ item, index }) => {
        const other_user = item?.users?.find((i) => i._id !== myUser?.user_id);
        if (item.messages) {
          var { createdAt, user, image, text } =
            item?.messages[item?.messages?.length - 1];
        }
        return (
          <ChatCard
            source={{ uri: other_user?.user_photo }}
            imageSize={totalSize(7)}
            title={item.messages ? other_user?.user_name : null}
            timeStamp={item.messages ? moment(createdAt).fromNow() : null}
            message={
              item.messages
                ? image
                  ? user._id == myUser.user_id
                    ? "🖼️ You sent a photo"
                    : "🖼️ You received a photo"
                  : text
                : null
            }
            onPress={() =>
              onPress({ ...other_user, roomId: item.roomId }, index)
            }
          />
        );
      }}
    />
  );
};
export const ResturantFeedApplicants = ({ data, onPress, onPressAll }) => {
  return (
    <FlatList
      horizontal
      inverted
      data={data ? data.slice(0, 3) : data}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={() => {
        return (
          <RowWrapper style={[{ marginStart: 0, height: "100%" }]}>
            <TouchableOpacity onPress={() => onPressAll(data)}>
              <Spacer width={sizes.smallMargin} />
              <MediumText
                style={{ color: colors.appTextColor6, marginStart: 10 }}
              >
                {data?.length}
                {data?.length == 1 ? " Applicant" : " Applicants"}
              </MediumText>
              <Spacer width={width(3)} />
            </TouchableOpacity>
          </RowWrapper>
        );
      }}
      renderItem={({ item, index }) => {
        return (
          <Wrapper style={{ width: 40, marginEnd: -15 }}>
            <TouchableOpacity onPress={() => onPress(item)}>
              <CustomizedImage
                style={{ marginStart: -30 }}
                height={40}
                width={40}
                source={{ uri: item.profilePhoto }}
                radius={sizes.buttonMiniRadius}
              />
            </TouchableOpacity>
          </Wrapper>
        );
      }}
    />
  );
};

export const RenderApplicants = ({ data, onPress }) => {
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      renderItem={({ item, index }) => {
        return (
          <ApplicantCard
            source={{ uri: item?.applied_by?.profilePhoto }}
            title={item?.applied_by?.firstName}
            fullName={item?.applied_by?.jobType}
            isApproved={item?.status}
            locationText={`${item?.applied_by.address.city}, ${item?.applied_by.address.state.name}`}
            rated="5.0"
            description={item?.applied_by?.description}
            onPress={() => onPress(item)}
          />
        );
      }}
    />
  );
};

export const RenderImages = ({
  data,
  onPress,
  iconName,
  onPressDelete,
  isUploading,
  iconType,
}) => {
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      renderItem={({ item, index }) => {
        if (data.length - 1 == index) {
          if (data.length != 6) {
            return (
              <Wrapper style={{ margin: width(1) }}>
                <ButtonBordered
                  iconName="camera"
                  borderColor={colors.appColor2}
                  iconColor={colors.appTextColor7}
                  onPress={onPress}
                  buttonStyle={{
                    marginHorizontal: 0,
                    height: width(100) / 3.6,
                    width: width(100) / 3.6,
                    borderStyle: "dashed",
                  }}
                />
              </Wrapper>
            );
          }
        } else
          return (
            <Wrapper style={{ margin: width(1) }}>
              {index == 0 ? (
                isUploading ? (
                  <CustomizedImage
                    isLoading={true}
                    progress={0.5}
                    radius={sizes.buttonMiniRadius}
                    source={{ uri: item?.uri || item }}
                    height={width(100) / 3.6}
                    width={width(100) / 3.6}
                  />
                ) : (
                  <CustomizedImage
                    radius={sizes.buttonMiniRadius}
                    source={{ uri: item?.uri || item }}
                    height={width(100) / 3.6}
                    width={width(100) / 3.6}
                  />
                )
              ) : (
                <CustomizedImage
                  radius={sizes.buttonMiniRadius}
                  source={{ uri: item?.uri || item }}
                  height={width(100) / 3.6}
                  width={width(100) / 3.6}
                />
              )}
              {iconName ? (
                <AbsoluteWrapper style={{ top: 5, left: 5 }}>
                  {isUploading && index == 0 ? (
                    index != 0 ? (
                      <IconWithText
                        onPress={() => onPressDelete(item, index)}
                        tintColor={colors.appButton5}
                        iconName={iconName}
                        iconType={iconType || "font-awesome"}
                      />
                    ) : null
                  ) : (
                    <IconWithText
                      onPress={() => onPressDelete(item, index)}
                      tintColor={colors.appButton5}
                      iconName={iconName}
                      iconType={iconType || "font-awesome"}
                    />
                  )}
                </AbsoluteWrapper>
              ) : null}
            </Wrapper>
          );
      }}
    />
  );
};

export const RenderSettingsOptions = ({ data, onPress }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        return (
          <Wrapper>
            <ButtonColored
              onPress={() => onPress(item, index)}
              // onPress={() => navigation.navigate(item.route)}
              buttonStyle={styles.settingButtonOuter}
              innerStyle={styles.settingButtonInner}
              text={item?.position || item.title}
              iconName={item.iconName}
              buttonColor={colors.appButton7}
              tintColor={colors.gray}
            />
            <Spacer height={sizes.smallMargin} />
          </Wrapper>
        );
      }}
    />
  );
};

export const RenderMyPosts = ({
  data,
  onPress,
  onPressRequests,
  isInHistory,
  onPressOptionButton,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.post_id}
      renderItem={({ item, index }) => {
        return (
          <FeedCard
            isInHistory={isInHistory}
            isEventList
            onPress={() => onPress(item)}
            onPressOptionButton={(value) => onPressOptionButton(value, item)}
            isActive={item?.isActive}
            userImage={item?.user?.profilePhoto}
            applicants={item?.applicants}
            onPressRequests={() => onPressRequests(item?.post_id)}
            feedImage={{ uri: item?.postImage }}
            title={item?.position || item?.title}
            jobName={item?.JobName}
            titleDetails={item?.user?.firstName}
            // detailText='Sea Restaurants fast and sea food our menue and get good jobs according to your resume'
            detailText={item?.user?.description}
            locationText={
              item?.address?.city + ", " + item?.address?.state?.name
            }
            ratingText="4.5"
          />
        );
      }}
    />
  );
};
export const RenderExperiencesData = ({ data, onPressEdit, isEditable }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item, index }) => {
        return (
          <TextProfileExperience
            isEditable={isEditable}
            onPressEdit={() => onPressEdit(item, index)}
            title={item?.position || item.title}
            companyName={item.company_name}
            employementType={item.employement_type}
            // startDate={moment(item.start_date).format('MMM YYYY')}
            // endDate={moment(item.end_date).format('MMM YYYY')}
            startDate={item.start_date}
            endDate={item.end_date}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  reviewCardVertical: {
    marginHorizontal: 0,
    width: "100%",
    marginVertical: width(2),
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
});
