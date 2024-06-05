import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { FilterButton, FilterDropdown, RegularText } from "../../../components";
import { HomeHeader, LineHorizontal } from "../../../components";
import { Spacer, TextInputSearch, Wrapper } from "../../../components";
import { MainWrapper, RenderHomeFeed, RowWrapper } from "../../../components";
import { colors, HandleFavourites, routes, sizes } from "../../../services";
import { totalSize, width } from "react-native-dimension";
import { useDispatch, useSelector } from "react-redux";
import { MenuTrigger, renderers } from "react-native-popup-menu";
import { Menu, MenuOptions, MenuOption } from "react-native-popup-menu";
import { addFavorites, all_jobs } from "../../../redux/actions";
import { getCitybyStateCountry, getStatebyCountry } from "../../../backend/api";
import {
  getAllOfCollection,
  getDocByKeyValue,
  getFavoritesList,
} from "../../../backend/utility";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const user_redux = useSelector((state) => state.user);
  const favorites_list = useSelector((state) => state.favorites);
  const jobs_redux = useSelector((state) => state?.allJobs);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [ex, setEx] = useState();
  const [feedItems, setFeedItems] = useState(jobs_redux);
  const [feedItems1, setFeedItems1] = useState(jobs_redux);

  const [feedItems2, setFeedItems2] = useState([]);
  const [feedItems3, setFeedItems3] = useState([]);

  const [search_query, setSearchQuery] = useState("");
  const [user, setUser] = useState(user_redux);
  const [favs, setFavs] = useState(favorites_list);

  const [stateData, setStateData] = useState([]);
  const [selectState, setSelectState] = useState({});
  const [cityData, setcityData] = useState([]);
  const [selectcity, setselectCity] = useState("");

  const getAllData = async () => {
    try {
      if (user?.userType == "Applicant") {
        const res = await getAllOfCollection("PostedJobs");
        dispatch(all_jobs(res));
      } else {
        const res = await getDocByKeyValue(
          "PostedJobs",
          "user.user_id",
          user?.user_id
        );
        dispatch(all_jobs(res));
      }
      await getFavoritesList("Favorites", "likes", user?.user_id).then(
        (res) => {
          dispatch(addFavorites(res));
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    getAllData();
  }, [isFocused]);

  const reset = () => {
    setselectCity("");
    setSelectState({});
    setStateData([]);
    setcityData([]);
    setFeedItems(feedItems1);
    getStateData();
    getCityData();
  };

  const getStateData = async () => {
    try {
      let { states } = await getStatebyCountry(
        user_redux.location?.country?.name
      );
      if (states?.length > 0) {
        setStateData(states);
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
        setcityData(city);
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
    setUser(user_redux);
    getStateData();
    getCityData();
  }, [user_redux]);

  useEffect(() => {
    setFavs(favorites_list);
  }, [favorites_list]);

  useEffect(() => {
    setFeedItems(jobs_redux);
    setFeedItems1(jobs_redux);
  }, [jobs_redux]);

  useEffect(() => {
    if (selectState?.name || selectcity) {
      HandleAddressFilters(selectState?.name, selectcity);
    }
  }, [selectState?.name, selectcity]);

  const HandleIsLiked = (item, index) => {
    HandleFavourites(
      item,
      index,
      feedItems,
      setFeedItems,
      dispatch,
      all_jobs,
      setEx
    );
  };

  const search_data = (text) => {
    setSearchQuery(text);
    let jobs_search = [];

    if (feedItems2.length > 0) {
      jobs_search = feedItems2?.filter(function (item) {
        const item_data =
          `${item.user.userType} ${item.user.firstName} ${item.address} ${item.position} ${item.title} ${item.JobType}`.toUpperCase();
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      setFeedItems(jobs_search);
    } else if (feedItems3.length > 0) {
      jobs_search = feedItems3?.filter(function (item) {
        const item_data =
          `${item.user.userType} ${item.user.firstName} ${item.address} ${item.position} ${item.title} ${item.JobType}`.toUpperCase();
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      setFeedItems(jobs_search);
    } else {
      jobs_search = feedItems1?.filter(function (item) {
        const item_data =
          `${item.user.userType} ${item.user.firstName} ${item.address} ${item.position} ${item.title} ${item.JobType}`.toUpperCase();
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      setFeedItems(jobs_search);
    }
  };
  const HandleFilters = (value) => {
    let data = feedItems3.length > 0 ? feedItems3 : feedItems1;
    let filteredData = [];

    if (value == "1") {
      setFeedItems(data);
      setFeedItems2([]);
    } else if (value == "2") {
      filteredData = data.filter((post) => post.user.userType == "Event");
      setFeedItems(filteredData);
      setFeedItems2(filteredData);
    } else if (value == "3") {
      filteredData = data.filter((post) => post.user.userType == "Resturant");
      setFeedItems(filteredData);
      setFeedItems2(filteredData);
    } else if (value == "4") {
      filteredData = data.filter((post) => post.JobType == "Full Time");
      setFeedItems(filteredData);
      setFeedItems2(filteredData);
    } else if (value == "5") {
      filteredData = data.filter((post) => post.JobType == "Part Time");
      setFeedItems(filteredData);
      setFeedItems2(filteredData);
    }
  };

  const HandleAddressFilters = (state, city) => {
    let check = [null, undefined, ""];
    let data = feedItems2.length > 0 ? feedItems2 : feedItems1;
    let filteredData = [];

    if (city && check.includes(state)) {
      filteredData = data.filter((post) => post.address.city == city);
      setFeedItems(filteredData);
      setFeedItems3(filteredData);
    } else if (state && check.includes(city)) {
      filteredData = data.filter((post) => post.address.state.name == state);
      setFeedItems(filteredData);
      setFeedItems3(filteredData);
    } else if (state && city) {
      filteredData = data.filter(
        (post) => post.address.state.name == state && post.address.city == city
      );
      setFeedItems(filteredData);
      setFeedItems3(filteredData);
    } else {
      setFeedItems(feedItems1);
      setFeedItems3([]);
    }
  };

  const CheckedOption = (props) => (
    <MenuOption
      value={props.value}
      text={(props.checked ? "\u2713 " : "") + props.text}
    />
  );

  return (
    <MainWrapper>
      <Wrapper flex={1}>
        <HomeHeader
          onPressProfile={() => navigation.navigate(routes?.myProfileStack)}
          onPress={() => navigation.toggleDrawer()}
          source={{ uri: user?.profilePhoto }}
        />
        <Spacer height={sizes.baseMargin} />
        {(Object.keys(selectState).length > 0 || selectcity) && (
          <RegularText
            onPress={reset}
            style={{
              textAlign: "right",
              marginRight: 10,
              marginBottom: 4,
              color: colors.primary,
            }}
          >
            Reset
          </RegularText>
        )}

        <RowWrapper>
          <View style={{ flex: 1 }}>
            <FilterDropdown
              placeholder={"State"}
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
                setSelectState(data);
                getCityData(data);
              }}
            />
          </View>
          <View style={{ marginHorizontal: 5 }} />
          <View style={{ flex: 1 }}>
            <FilterDropdown
              placeholder={"City"}
              data={cityData}
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
                setselectCity(data);
              }}
            />
          </View>
        </RowWrapper>
        <Spacer height={sizes.baseMargin} />
        <RowWrapper>
          <Wrapper>
            <TextInputSearch
              value={search_query}
              onChangeText={(text) => search_data(text)}
              placeholder="Search for jobs and events"
              width={width(77)}
            />
          </Wrapper>
          <Wrapper>
            <Menu
              onSelect={(value) => HandleFilters(value)}
              renderer={renderers.NotAnimatedContextMenu}
            >
              <MenuTrigger>
                <FilterButton
                  iconName="filter-outline"
                  iconSize={sizes.icons.large}
                  iconColor={colors.primary}
                />
              </MenuTrigger>
              <MenuOptions customStyles={optionsStyles}>
                <CheckedOption value={1} text="All" />
                <LineHorizontal />
                <CheckedOption value={2} text="Events" />
                <LineHorizontal />
                <CheckedOption value={3} text="Restaurant" />
                <LineHorizontal />
                <CheckedOption value={4} text="Full Time" />
                <LineHorizontal />
                <CheckedOption value={5} text="Part Time" />
              </MenuOptions>
            </Menu>
          </Wrapper>
        </RowWrapper>
        <Spacer height={sizes.TinyMargin} />
        <RenderHomeFeed
          isApplicant
          data={feedItems}
          onPressHeart={(item, index) => HandleIsLiked(item, index)}
          onPress={(item, index) =>
            navigation.navigate(routes.resturantProfile, {
              item: item,
              idx: index,
            })
          }
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </Wrapper>
    </MainWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  filterButtonWrapper: {
    marginVertical: sizes.baseMargin,
    marginHorizontal: null,
  },
  filterButton: {
    marginHorizontal: null,
    marginEnd: width(3),
  },
  optionButton: {
    height: totalSize(5),
    width: totalSize(5),
  },
});
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
