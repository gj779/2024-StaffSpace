import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ButtonColored,
  HomeHeader,
  MainWrapper,
  RenderNotifications,
  Spacer,
  Wrapper,
} from '../../../components';
import {appImages, appStyles, colors, routes, sizes} from '../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteAllNotification,
  getAllNotification,
  readNotification,
} from '../../../backend/utility';
import {useIsFocused} from '@react-navigation/native';
import {height, width} from 'react-native-dimension';

const Applicant = [
  {
    id: '0',
    title: 'Waiter',
    isSelected: false,
    source: appImages.feed1,
    info: 'Sea restaurants, your application has been approved',
    time: '2 hours ago',
  },
  {
    id: '1',
    title: 'Chef',
    isSelected: false,
    info: 'Sea restaurants, your application has been approved',
    time: '2 hours ago',
  },
  {
    id: '2',
    title: 'Bartender',
    isSelected: false,
    info: 'Sea restaurants, your application has been approved',
    time: '2 hours ago',
  },
  {
    id: '3',
    title: 'Management',
    isSelected: false,
    info: 'Sea restaurants, your application has been approved',
    time: '2 hours ago',
  },
  {
    id: '4',
    title: 'Management',
    isSelected: false,
    info: 'Sea restaurants, your application has been approved',
    time: '2 hours ago',
  },
  {
    id: '5',
    title: 'Management',
    isSelected: false,
    info: 'Sea restaurants, your application has been approved',
    time: '2 hours ago',
  },
  {
    id: '6',
    title: 'Management',
    isSelected: false,
    info: 'Sea restaurants, your application has been approved',
    time: '2 hours ago',
  },
  {
    id: '7',
    title: 'Management',
    isSelected: false,
    info: 'Sea restaurants, your application has been approved',
    time: '2 hours ago',
  },
  {
    id: '8',
    title: 'Management',
    isSelected: false,
    info: 'Sea restaurants, your application has been approved',
    time: '2 hours ago',
  },
  {
    id: '9',
    title: 'Management',
    isSelected: false,
    info: 'Sea restaurants, your application has been approved',
    time: '2 hours ago',
  },
  {
    id: '10',
    title: 'Management',
    isSelected: false,
    info: 'Sea restaurants, your application has been approved',
    time: '2 hours ago',
  },
];
const Restaurant = [
  {
    id: '0',
    title: 'Waiter',
    isSelected: false,
    source: appImages.feed1,
    info: 'Applicant has been approved for your restaurant',
    time: '2 hours ago',
  },
];
const Event = [
  {
    id: '0',
    title: 'Waiter',
    isSelected: false,
    source: appImages.feed1,
    info: 'Applicant has been approved for your event',
    time: '2 hours ago',
  },
];

const Notifications = props => {
  const isFocused = useIsFocused();
  const {navigation} = props;
  const user_redux = useSelector(state => state.user);
  const [notofocations, setNotofocations] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = () => {
    getAllNotification()
      .then(res => {
        if (res.length > 0) {
          setNotofocations(res);
        } else {
          setNotofocations([]);
        }
      })
      .catch(err => {});
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  return (
    <MainWrapper>
      <Wrapper flex={1} style={appStyles.mainContainer}>
        <HomeHeader
          title="Notifications"
          source={{uri: user_redux?.profilePhoto}}
          onPressProfile={() => {
            navigation.navigate(
              user_redux.userType == 'Applicant'
                ? routes.myProfileStack
                : routes.profile,
            );
          }}
          onPress={() => navigation.toggleDrawer()}
        />
        <RenderNotifications
          data={notofocations}
          onPress={async data => {
            await readNotification(data.id);
            getData();
          }}
        />

        {notofocations.length > 0 && (
          <ButtonColored
            disabled={isLoading}
            text={'Delete All'}
            buttonColor={colors.appButton3}
            buttonStyle={{
              width: width(80),
              alignSelf: 'center',
              marginBottom: 10,
            }}
            onPress={async () => {
              try {
                setLoading(true);
                await deleteAllNotification();
                getData();
              } catch (error) {
              } finally {
                setLoading(false);
              }
            }}
          />
        )}
      </Wrapper>
    </MainWrapper>
  );
};

export default Notifications;
