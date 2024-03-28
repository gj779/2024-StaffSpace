import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  AddIcon,
  ChatHeader,
  CloseIcon,
  MainWrapper,
  SendButton,
  Spacer,
  Wrapper,
} from '../../../components';
import {
  appImages,
  appStyles,
  colors,
  fontFamily,
  sizes,
} from '../../../services';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
  Send,
  Actions,
} from 'react-native-gifted-chat';
import {height, totalSize, width} from 'react-native-dimension';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToArray,
  addToArrayCustom,
  getData,
  saveData,
  uniqueID,
  uploadChatImage,
  uploadProfileImage,
} from '../../../backend/utility';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import ProgressBar from 'react-native-progress/Bar';
import {sendPushNotification} from '../../../backend/api';

const ChatScreen = ({navigation, route}) => {
  const user_redux = useSelector(state => state.user);
  const {receiver, roomId} = route?.params || null;

  const [user, setUser] = useState(user_redux);
  const [end_user, setEndUser] = useState('');
  const [image, setImage] = useState(receiver?.profilePhoto);
  const [chatImage, setChatImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showProgress, setShowProgress] = useState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (receiver?.user_id) {
      getData('Users', receiver?.user_id)
        .then(res => {
          setEndUser(res);
        })
        .catch(err => console.log(err));
    }
  }, [receiver?.user_id]);

  useEffect(() => {
    setUser(user_redux);
  }, [user_redux]);

  useEffect(() => {
    const unsub = firestore()
      .collection('Chats')
      .doc(roomId)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          const msgs = doc?.data();
          setMessages(msgs['messages']?.reverse());
        }
      });
    return () => unsub();
  }, []);

  const PickPhotoFromGallery = async () => {
    try {
      const data = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        compressImageMaxHeight: 500,
        compressImageMaxWidth: 500,
      }).then(image => {
        let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
        setChatImage({uri: image.path, fileName: filename});
      });
    } catch (e) {}
  };

  const takePhotoFromCamera = async () => {
    try {
      const data = await ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
        compressImageMaxHeight: 500,
        compressImageMaxWidth: 500,
      }).then(image => {
        let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
        setChatImage({uri: image.path, fileName: filename});
      });
    } catch (e) {}
  };

  const onSend = useCallback((messages = [], image) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    messages[0]._id = uniqueID();
    messages[0].createdAt = Date.parse(messages[0].createdAt);
    messages[0].receiver_id = receiver?.user_id;
    if (image) {
      messages[0].image = image;
    }
    addToArrayCustom('Chats', roomId, 'messages', messages[0]).then(res => {
      if (!res) {
        saveData('Chats', roomId, {
          keys: [user_redux.user_id, receiver?.user_id],
          users: [
            {
              _id: user?.user_id,
              user_photo: user?.profilePhoto,
              user_name: user?.firstName,
            },
            {
              _id: receiver?.user_id,
              user_photo: receiver?.profilePhoto,
              user_name: receiver?.firstName,
            },
          ],
          ['messages']: [messages[0]],
          roomId: roomId,
          last_message_time: messages[0].createdAt,
        });
      }
    });
  }, []);
  const renderChatBubble = props => (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: colors.appTextColor6,
          fontFamily: fontFamily.appTextRegular,
        },
        left: {
          color: colors.primary,
          fontFamily: fontFamily.appTextRegular,
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: colors.appColor3,
        },
        right: {
          backgroundColor: colors.primary,
        },
      }}
    />
  );
  const renderSend = props => {
    return (
      <Send
        sendButtonProps={{
          ...props.sendButtonProps,
          onPress: () => customOnPress(props.text, props.onSend),
        }}
        {...props}
        containerStyle={{
          height: 49,
          width: 49,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SendButton size={sizes.icons.medium} color={colors.appTextColor6} />
      </Send>
    );
  };
  const customOnPress = async (text, onSend) => {
    if (chatImage != null && onSend) {
      Keyboard.dismiss();
      setShowProgress(true);
      const chat_image = await uploadChatImage(
        chatImage.uri,
        chatImage.fileName,
        setProgress,
      );
      onSend({text: text.trim(), image: chat_image}, true);
      setChatImage(null);
      setProgress(0);
      setShowProgress(false);
      if (end_user?.fcm_token) {
        sendPushNotification(end_user?.fcm_token, user_redux.firstName, text);
      } else {
      }
    } else if (text && onSend) {
      if (end_user?.fcm_token) {
        sendPushNotification(end_user?.fcm_token, user_redux.firstName, text);
      }
      onSend({text: text.trim()}, true);
    }
  };
  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: colors.appBgColor1,
          borderTopColor: colors.appColor8,
          borderColor: colors.appColor8,
          borderWidth: 1,
          borderRadius: sizes.ModalRadius,
          height: 50,
          margin: 3,
        }}
      />
    );
  };
  const renderActions = props => {
    return (
      <Actions
        {...props}
        options={{
          ['Open Camera']: takePhotoFromCamera,
          ['Open Gallery']: PickPhotoFromGallery,
          ['Cancel']: () => {},
        }}
        icon={() => <AddIcon />}
      />
    );
  };
  const renderChatFooter = () => {
    if (chatImage) {
      return (
        <Wrapper style={styles.chatFooterContainer}>
          <Wrapper style={styles.chatFooterInnerContainer}>
            <Wrapper style={styles.imageWrapper}>
              <Image source={{uri: chatImage.uri}} style={styles.footerImage} />
            </Wrapper>
            <CloseIcon
              onPress={() => setChatImage(null)}
              size={sizes.icons.medium}
            />
          </Wrapper>
          {showProgress && (
            <View style={{paddingVertical: 8}}>
              <ProgressBar
                progress={progress}
                width={width(90)}
                color={colors.primary}
              />
            </View>
          )}
        </Wrapper>
      );
    } else {
      return <Spacer height={sizes.TinyMargin} />;
    }
  };
  return (
    <MainWrapper>
      <Wrapper flex={1} style={appStyles.mainContainer}>
        <ChatHeader
          source={{uri: image}}
          ratings="5.0(10)"
          onPressBack={() => navigation.goBack()}
          title={receiver?.firstName}
        />
        <GiftedChat
          alwaysShowSend
          renderSend={renderSend}
          messages={messages}
          showUserAvatar={null}
          showAvatarForEveryMessage={null}
          renderActions={renderActions}
          renderBubble={props => renderChatBubble(props)}
          renderInputToolbar={props => customtInputToolbar(props)}
          renderChatFooter={renderChatFooter}
          onSend={messages => onSend(messages)}
          user={{_id: user.user_id, name: receiver?.firstName}}
        />
      </Wrapper>
    </MainWrapper>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  chatFooterContainer: {
    // backgroundColor: colors.appBgColor2,
    width: width(90),
    height: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  chatFooterInnerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    // padding: 16,
  },
  imageWrapper: {
    justifyContent: 'center',
  },
  footerImage: {
    height: height(70),
    width: width(90),
    // resizeMode: 'contain',
    borderRadius: 10,
  },
});
