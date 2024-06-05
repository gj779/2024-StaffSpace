import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ButtonColored,
  HomeHeader,
  MainWrapper,
  RenderHomeFeed,
  Wrapper,
} from "../../../../components";
import { appStyles, colors, routes } from "../../../../services";
import { height, totalSize, width } from "react-native-dimension";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { MenuOption } from "react-native-popup-menu";
import {
  getAllOfCollection,
  getDocByKeyValue,
} from "../../../../backend/utility";
import { addFavorites, all_jobs } from "../../../../redux/actions";

const ResturantHome = ({ navigation }) => {
  const isFocused = useIsFocused();
  const user_redux = useSelector((state) => state.user);
  const { navigate } = navigation;
  const dispatch = useDispatch();

  const [feedItems, setFeedItems] = useState([]);
  const [feedItems1, setFeedItems1] = useState([]);
  const [search_query, setSearchQuery] = useState("");
  const jobs_redux = useSelector((state) => state?.allJobs);

  useEffect(() => {
    setFeedItems(jobs_redux);
    setFeedItems1(jobs_redux);
  }, [jobs_redux]);

  const getAllData = async () => {
    try {
      if (user_redux?.userType == "Applicant") {
        const res = await getAllOfCollection("PostedJobs");
        dispatch(all_jobs(res));
      } else {
        const res = await getDocByKeyValue(
          "PostedJobs",
          "user.user_id",
          user_redux?.user_id
        );
        dispatch(all_jobs(res));
      }
      await getFavoritesList("Favorites", "likes", user_redux?.user_id).then(
        (res) => {
          dispatch(addFavorites(res));
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    getAllData();
  }, [isFocused]);

  const HandleFilters = (value) => {
    let filteredData = [];
    if (value == "1") {
      setFeedItems(feedItems1);
    } else if (value == "2") {
      filteredData = feedItems1.filter(
        (post) =>
          post.isActive == true ||
          (Date.parse(new Date()) > post.start_date &&
            Date.parse(new Date() < post.end_date))
      );
      setFeedItems(filteredData);
    } else {
      filteredData = feedItems1.filter(
        (post) =>
          post.isActive !== true ||
          (Date.parse(new Date()) < post.start_date &&
            Date.parse(new Date() > post.end_date))
      );
      setFeedItems(filteredData);
    }
  };
  const CheckedOption = (props) => (
    <MenuOption
      value={props.value}
      text={(props.checked ? "\u2713 " : "") + props.text}
    />
  );

  const search_data = (text) => {
    setSearchQuery(text);
    let jobs_search = feedItems1?.filter(function (item) {
      const item_data =
        `${item.user.userType} ${item.user.firstName} ${item.address} ${item.position} ${item.title}`.toUpperCase();
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });

    setFeedItems(jobs_search);
  };
  return (
    <MainWrapper>
      <Wrapper flex={1} style={appStyles.mainContainer}>
        <HomeHeader
          source={{ uri: user_redux?.profilePhoto }}
          onPressProfile={() => {
            navigation.navigate(routes.profile);
          }}
          onPress={() => navigation.toggleDrawer()}
        />
        {feedItems?.length < 1 && (
          <ButtonColored
            text={
              "Create " + (user_redux?.userType == "Event" ? "Event" : "Job")
            }
            buttonColor={colors.primary}
            buttonStyle={{
              width: width(80),
              alignSelf: "center",
              marginTop: height(32),
            }}
            onPress={() =>
              navigation.navigate(routes.createJob, {
                type: user_redux?.userType,
              })
            }
          />
        )}
        {/* <Spacer height={sizes.baseMargin} /> */}
        {/* <RowWrapper>
                    <Wrapper>
                        <TextInputSearch
                            value={search_query}
                            onChangeText={text => search_data(text)}
                            placeholder='Search for jobs and events'
                            width={width(75)}
                        />
                    </Wrapper>
                    <Wrapper>
                        <Menu
                            onSelect={value => HandleFilters(value)}
                            renderer={renderers.NotAnimatedContextMenu}>
                            <MenuTrigger>
                                <FilterButton
                                    iconName='filter-outline'
                                    iconSize={sizes.icons.large}
                                    iconColor={colors.primary}
                                />
                            </MenuTrigger>
                            <MenuOptions customStyles={optionsStyles}>
                                <CheckedOption value={1} text='All' />
                                <LineHorizontal />
                                <CheckedOption value={2} text='Active' />
                                <LineHorizontal />
                                <CheckedOption value={3} text='In Active' />
                            </MenuOptions>
                        </Menu>
                    </Wrapper>

                </RowWrapper> */}
        {/* <Spacer height={sizes.TinyMargin} /> */}
        <RenderHomeFeed
          onPressApplicants={(props) =>
            navigate(routes.myProfile, { Data: props, isResturant: true })
          }
          onPressAll={(props, post_id) =>
            navigate(routes.applicants, { postId: post_id })
          }
          onPress={(props) =>
            navigate(routes.resturantProfile, {
              item: props,
              isResturant: true,
              isEdit: true,
            })
          }
          data={feedItems}
          type={true}
          contentContainerStyle={{ paddingBottom: 50 }}
          // onPressApplicants={() => navigate(routes.applicants)}
        />
      </Wrapper>
    </MainWrapper>
  );
};

export default ResturantHome;

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
