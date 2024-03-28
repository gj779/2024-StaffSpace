import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AbsoluteWrapper,
  AddButton,
  ButtonSelectableTopBar,
  ComponentWrapper,
  EventListingHeader,
  FeedCard,
  MainWrapper,
  MediumText,
  RenderMyPosts,
  RowWrapper,
  Spacer,
  Wrapper,
} from "../../../../components";
import { appImages, appStyles, routes, sizes } from "../../../../services";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOfCollection,
  getDocByKeyValue,
  getDocRefByKeyValue,
  saveData,
} from "../../../../backend/utility";
import { useIsFocused } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import { all_jobs } from "../../../../redux/actions";

const EventListing = (props) => {
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState("");
  const [renderOnChange, setrenderOnChange] = useState(false);
  const { navigation, route } = props;
  const user_redux = useSelector((state) => state.user);
  const jobs_redux = useSelector((state) => state?.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    getDocByKeyValue("PostedJobs", "user.user_id", user_redux.user_id)
      .then((res) => {
        setPosts(res);
        // console.log('focused', res)
      })
      .catch((err) => console.log("err", err));
  }, [isFocused, renderOnChange]);

  var type = null;
  var active = { isActive: false };

  // console.log("To set isActive: ", active);

  if (route?.params?.type) {
    type = route?.params?.type;
  } else {
    type = user_redux.userType;
  }

  const [isSelected, setIsSelected] = useState(false);

  const HandleActiveInActive = async (value, item) => {
    if (value == "1") {
      active.isActive = true;
      setrenderOnChange(!renderOnChange);
    }
    if (value == "2") {
      active.isActive = false;
      setrenderOnChange(!renderOnChange);
    }

    // console.log(value, item);

    await saveData("PostedJobs", item.post_id, active)
      .then((res) => {
        console.log(`Successfully set Active: ${active?.isActive}`);
      })
      .catch((err) => console.log(`Error to set Active: ${active?.isActive}`));

    await getAllOfCollection("PostedJobs").then((res) => {
      dispatch(all_jobs(res));
    });
  };

  const Jobs = () => {
    return (
      <RenderMyPosts
        data={posts}
        onPressOptionButton={(value, item) => HandleActiveInActive(value, item)}
        onPress={(props) =>
          navigation.navigate(routes.resturantProfile, {
            item: props,
            isResturant: true,
            isEdit: true,
          })
        }
        onPressRequests={(props) =>
          navigation.navigate(routes.applicants, { postId: props })
        }
      />
    );
  };
  const History = () => {
    return (
      <RenderMyPosts
        data={posts}
        onPressOptionButton={(value, item) => HandleActiveInActive(value, item)}
        onPress={(props) =>
          navigation.navigate(routes.resturantProfile, {
            item: props,
            isResturant: true,
          })
        }
        isInHistory={isSelected}
        onPressRequests={(props) =>
          navigation.navigate(routes.applicants, { postId: props })
        }
      />
    );
  };

  return (
    <Provider>
      <MainWrapper>
        <Wrapper flex={1} style={appStyles.mainContainer}>
          <EventListingHeader
            title={type == "Event" ? `My Event Listing` : `My Job Listing`}
            onPressProfile={() => {
              navigation.navigate(routes.profile);
            }}
            source={{ uri: user_redux?.profilePhoto }}
            onPress={() => navigation.toggleDrawer()}
          />
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <Wrapper style={appStyles.topBarWrapper}>
              <RowWrapper style={appStyles.topBarRowWrapper}>
                <Wrapper flex={1}>
                  <ButtonSelectableTopBar
                    text={type == "Event" ? "Event" : "Jobs"}
                    isSelected={!isSelected}
                    onPress={() => setIsSelected(!isSelected)}
                  />
                </Wrapper>
                <Wrapper flex={1}>
                  <ButtonSelectableTopBar
                    text="History"
                    isSelected={isSelected}
                    onPress={() => setIsSelected(!isSelected)}
                  />
                </Wrapper>
              </RowWrapper>
            </Wrapper>
          </ComponentWrapper>
          <Spacer height={sizes.smallMargin} />
          {isSelected ? History() : Jobs()}
          <AbsoluteWrapper style={{ bottom: 20, right: 10 }}>
            <AddButton
              onPress={() =>
                navigation.navigate(routes.createJob, {
                  type: type || user_redux?.userType,
                })
              }
              size={sizes.icons.xxl}
            />
          </AbsoluteWrapper>
        </Wrapper>
      </MainWrapper>
    </Provider>
  );
};

export default EventListing;

const triggerStyles = {
  triggerText: {
    color: "white",
  },
  triggerOuterWrapper: {
    backgroundColor: "orange",
    padding: 5,
    flex: 1,
  },
  triggerWrapper: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  triggerTouchable: {
    underlayColor: "darkblue",
    activeOpacity: 70,
    style: {
      flex: 1,
    },
  },
};
