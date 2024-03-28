import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  BackArrowSquaredButton,
  ComponentWrapper,
  KeyboardAvoidingScrollView,
  MainHeader,
  MainWrapper,
  RatingWithText,
  RenderReviewCardVertical,
  ReviewsCard,
  SmallTitle,
  Spacer,
  TinyTitle,
  Wrapper,
} from "../../../components";
import { appStyles, colors, sizes } from "../../../services";
import { totalSize, width } from "react-native-dimension";
import { useSelector } from "react-redux";
import { getData, getDocByKeyValue } from "../../../backend/utility";

const RatingAndReview = ({ navigation, route, isType }) => {
  const user_redux = useSelector((state) => state.user);
  var type = null;
  if (route?.params?.type) type = route?.params?.type;
  const isResturant = type == "Resturant";
  const isResturant1 = isType == "Resturant";
  const [workRate, setWorkRate] = useState("");
  const [proRate, setProRate] = useState("");
  const [behaviorRate, setBehaviorRate] = useState("");
  const [locationRate, setLocationRate] = useState("");
  const [reviewItems, setReviewItems] = useState(false);

  useEffect(() => {
    if (user_redux.userType == "Applicant") {
      let work = [];
      let professionalism = [];
      let behavior = [];
      getDocByKeyValue("Reviews", "user_id", user_redux.user_id)
        .then((res) => {
          setReviewItems(res);
          work = res.map((res) => res.work);
          professionalism = res.map((res) => res.professionalism);
          behavior = res.map((res) => res.behaviour);
          setWorkRate(
            Math.round(
              work.reduce(
                (previousScore, currentScore, index) =>
                  previousScore + currentScore,
                0
              ) / work.length
            )
          );
          setProRate(
            Math.round(
              professionalism.reduce(
                (previousScore, currentScore, index) =>
                  previousScore + currentScore,
                0
              ) / professionalism.length
            )
          );
          setBehaviorRate(
            Math.round(
              behavior.reduce(
                (previousScore, currentScore, index) =>
                  previousScore + currentScore,
                0
              ) / behavior.length
            )
          );
        })
        .catch((err) => console.log("error :", err));
    } else {
      let management = [];
      let empTreatment = [];
      let salary = [];
      let location = [];
      getDocByKeyValue("Reviews", "user_id", user_redux.user_id)
        .then((res) => {
          setReviewItems(res);
          management = res.map((res) => res.management);
          empTreatment = res.map((res) => res.treatment);
          salary = res.map((res) => res.salary);
          location = res.map((res) => res.location);
          setWorkRate(
            Math.round(
              management.reduce(
                (previousScore, currentScore, index) =>
                  previousScore + currentScore,
                0
              ) / management.length
            )
          );
          setProRate(
            Math.round(
              empTreatment.reduce(
                (previousScore, currentScore, index) =>
                  previousScore + currentScore,
                0
              ) / empTreatment.length
            )
          );
          setBehaviorRate(
            Math.round(
              salary.reduce(
                (previousScore, currentScore, index) =>
                  previousScore + currentScore,
                0
              ) / salary.length
            )
          );
          setLocationRate(
            Math.round(
              location.reduce(
                (previousScore, currentScore, index) =>
                  previousScore + currentScore,
                0
              ) / location.length
            )
          );
        })
        .catch((err) => console.log("error :", err));
    }
  }, []);

  const RenderHeader = () => (
    <Wrapper>
      {!isResturant1 ? (
        <Wrapper style={appStyles.center}>
          <TinyTitle>Rating and Review</TinyTitle>
        </Wrapper>
      ) : null}
      <Spacer height={sizes.baseMargin * 1.5} />
      <RatingWithText
        defaultRating={workRate ? workRate : 1}
        isDisabled
        title={isResturant || isResturant1 ? "Management" : "Work"}
      />
      <Spacer height={sizes.baseMargin * 1.5} />
      <RatingWithText
        defaultRating={proRate ? proRate : 1}
        title={
          isResturant || isResturant1
            ? "Employee Treatement"
            : "Professionalism"
        }
      />
      <Spacer height={sizes.baseMargin * 1.5} />
      <RatingWithText
        defaultRating={behaviorRate ? behaviorRate : 1}
        title={isResturant || isResturant1 ? "Salary" : "Behavior"}
      />
      <Spacer height={sizes.baseMargin * 1.5} />
      {isResturant || isResturant1 ? (
        <Wrapper>
          <RatingWithText
            defaultRating={locationRate ? locationRate : 1}
            isDisabled
            title={isResturant1 ? "Environment" : "Location"}
          />
          <Spacer height={sizes.baseMargin * 1.5} />
        </Wrapper>
      ) : null}
      <Wrapper style={appStyles.center}>
        <TinyTitle>
          {isResturant || isResturant1
            ? "Over all rating"
            : "Rating and Review"}
        </TinyTitle>
        <Spacer height={sizes.baseMargin} />
        <RatingWithText
          isDisabled
          defaultRating={
            isResturant || isResturant1
              ? (
                  (workRate + proRate + behaviorRate + locationRate) /
                  4
                ).toFixed(3)
              : ((workRate + proRate + behaviorRate) / 3).toFixed(1)
          }
        />
        <Spacer height={sizes.baseMargin} />
        <TinyTitle>
          {isResturant || isResturant1
            ? ((workRate + proRate + behaviorRate + locationRate) / 4).toFixed(
                1
              )
            : ((workRate + proRate + behaviorRate) / 3).toFixed(1)}{" "}
        </TinyTitle>
      </Wrapper>
      <Spacer height={sizes.baseMargin} />
      {/* <TinyTitle>{isResturant ? 'Employee reviews' : 'Applicant reviews'}</TinyTitle> */}
      <TinyTitle>{"Recent Reviews"}</TinyTitle>
      <Spacer height={sizes.baseMargin * 1.5} />
    </Wrapper>
  );

  return (
    <MainWrapper>
      <Wrapper flex={1} style={appStyles.mainContainer}>
        {!isResturant1 ? (
          <MainHeader
            buttonSize={totalSize(3)}
            onPressBack={() => navigation.goBack()}
          />
        ) : null}
        <ComponentWrapper>
          {reviewItems.length > 0 ? (
            <RenderReviewCardVertical
              ListHeaderComponent={() => RenderHeader()}
              data={reviewItems}
            />
          ) : (
            <Wrapper style={[appStyles.center, { height: "100%" }]}>
              <SmallTitle style={{ color: colors.appTextColor5 }}>
                {reviewItems !== false
                  ? user_redux.firstName + " hasn't received any reviews yet."
                  : ""}
              </SmallTitle>
            </Wrapper>
          )}
        </ComponentWrapper>
      </Wrapper>
    </MainWrapper>
  );
};

export default RatingAndReview;
