import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  MainHeader,
  MainWrapper,
  ProfileHeader,
  RenderHomeFeed,
  Wrapper,
} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteDocument,
  getFavoritesList,
  saveData,
} from '../../../backend/utility';
import {HandleFavourites, IsLiked, routes} from '../../../services';
import {all_jobs} from '../../../redux/actions';

const Favorites = ({navigation}) => {
  const {toggleDrawer, navigate} = navigation;
  const favorites_list = useSelector(state => state.favorites);
  const user_redux = useSelector(state => state.user);
  const jobs_redux = useSelector(state => state?.allJobs);
  const dispatch = useDispatch();
  const [alljobs, setAllJobs] = useState(jobs_redux);
  const [ex, setEx] = useState();
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState(user_redux);

  useEffect(() => {
    setUser(user_redux);
  }, [user_redux]);

  useEffect(() => {
    let likes = [];
    setAllJobs(jobs_redux);
    jobs_redux.map(d => {
      if (IsLiked(d)) {
        likes.push(d);
      }
    });
    setFavourites(likes);
  }, [jobs_redux]);

  const FindOriginalIndex = async id => {
    let temp = false;
    await alljobs.map((d, i) => {
      if (d?.post_id == id) {
        temp = i;
      }
    });
    return temp;
  };

  const HandleIsLiked = async (item, index) => {
    let idx = await FindOriginalIndex(item.post_id);
    if (idx) {
      HandleFavourites(
        item,
        idx,
        alljobs,
        setAllJobs,
        dispatch,
        all_jobs,
        setEx,
      );
    }
  };

  const NavigateToProfile = async (item, index) => {
    let idx = await FindOriginalIndex(item.post_id);

    if (idx !== false) {
      navigate(routes.resturantProfile, {item: item, idx: idx});
    }
  };
  return (
    <MainWrapper>
      <ProfileHeader onPress={() => toggleDrawer()} title="Favorites" />
      <Wrapper flex={1}>
        <RenderHomeFeed
          isApplicant
          data={favourites}
          onPressHeart={(item, index) => HandleIsLiked(item, index)}
          onPress={NavigateToProfile}
        />
      </Wrapper>
    </MainWrapper>
  );
};

export default Favorites;
