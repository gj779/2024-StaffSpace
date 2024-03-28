import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {useDispatch} from 'react-redux';
import {fcm_token} from '../../redux/actions';
import notifee from '@notifee/react-native';

export const PushNotification = () => {
  const dispatch = useDispatch();
  const requestUserPermission = async () => {
    if (Platform.OS == 'android') {
      const {status} = await requestNotifications().catch(err => {});

      if (status == 'granted') {
        return true;
      } else {
        return false;
      }
    } else {
      const authStatus = await messaging().requestPermission();

      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
    }
  };

  useEffect(() => {
    Notifications();
    let unsubscribe = messaging().onMessage(onMessageReceived);
    return unsubscribe;
  }, [requestUserPermission]);

  const onMessageReceived = async remoteMessage => {
    try {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      if (
        remoteMessage?.notification?.title ||
        remoteMessage?.notification?.body
      ) {
        await notifee.displayNotification({
          title: remoteMessage?.notification?.title,
          body: remoteMessage?.notification?.body,
          android: {
            channelId,
            // smallIcon: 'ic_small_icon',
            pressAction: {id: 'default'},
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Notifications = async () => {
    const isPermit = await requestUserPermission();
    if (isPermit) {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        dispatch(fcm_token(fcmToken));
      }
    }
    messaging().getInitialNotification();
    messaging().onNotificationOpenedApp(async remoteMessage => {});
    messaging().setBackgroundMessageHandler(async remoteMessage => {});
  };
  return null;
};
