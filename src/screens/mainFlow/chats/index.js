import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ComponentWrapper,
  HomeHeader,
  ImageRound,
  MainHeader,
  MainWrapper,
  MediumText,
  RenderChats,
  RowWrapper,
  RowWrapperBasic,
  SmallText,
  Wrapper,
} from '../../../components';
import {appImages, appStyles, routes} from '../../../services';
import {totalSize} from 'react-native-dimension';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFriends} from '../../../backend/utility';
import {useIsFocused} from '@react-navigation/native';

const Chats = ({navigation}) => {
  const isFocused = useIsFocused();
  const user_redux = useSelector(state => state.user);
  const [user, setUser] = useState(user_redux);
  const [chats, setChats] = useState([
    {id: '0', title: 'Waiter', isSelected: false},
    {id: '1', title: 'Chef', isSelected: false},
    {id: '2', title: 'Bartender', isSelected: false},
    {id: '3', title: 'Kitchen Staff', isSelected: false},
    {id: '4', title: 'Management', isSelected: false},
    {id: '5', title: 'Management', isSelected: false},
    {id: '6', title: 'Management', isSelected: false},
    {id: '7', title: 'Management', isSelected: false},
    {id: '8', title: 'Management', isSelected: false},
  ]);
  useEffect(() => {
    setUser(user_redux);
  }, [user_redux]);

  useEffect(() => {
    getAllFriends('Chats', 'keys', user.user_id).then(res => {
      const sorted_chats = res.sort(
        (a, b) => b.last_message_time - a.last_message_time,
      );
      setChats(sorted_chats);
    });
  }, [isFocused]);

  return (
    <MainWrapper>
      <Wrapper flex={1} style={appStyles.mainContainer}>
        <HomeHeader
          onPressProfile={() => {
            navigation.navigate(routes.profile);
          }}
          onPress={() => navigation.toggleDrawer()}
          source={{uri: user?.profilePhoto}}
          title="Chats"
        />
        <RenderChats
          data={chats}
          onPress={(item, index) => {
            const receiver = {
              user_id: item._id,
              profilePhoto: item.user_photo,
              firstName: item.user_name,
            };
            navigation.navigate(routes.chatScreen, {
              receiver: receiver,
              roomId: item.roomId,
            });
          }}
        />
      </Wrapper>
    </MainWrapper>
  );
};

export default Chats;
