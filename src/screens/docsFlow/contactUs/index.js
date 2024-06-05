import {Keyboard, StyleSheet} from 'react-native';
import React from 'react';
import {MainHeader, MainWrapper} from '../../../components';
import {ButtonWithRightIcon, HideKeyboard} from '../../../components';
import {Spacer, TextInputColored, Wrapper} from '../../../components';
import {appStyles, colors, sizes} from '../../../services';
import Validations from '../../../services/validations';
import {height, totalSize, width} from 'react-native-dimension';
import Toast from 'react-native-simple-toast';
import {openComposer} from 'react-native-email-link';

const ContactUs = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('info@thestaffspace.com');
  const [subject, setSubject] = React.useState('');
  const [comments, setComments] = React.useState('');

  const validations = () => {
    !Validations.validateEmail(email) && Toast.show('Email format is invalid');
    !subject && Toast.show('Enter Subject');
    !comments && Toast.show('Enter your comments');

    if (subject && email && comments && Validations.validateEmail(email)) {
      return true;
    } else {
      return false;
    }
  };

  const HandleSendBtn = async () => {
    if (validations()) {
      // await sendEmail(
      //     email,
      //     subject + ` (${name})`,
      //     comments,
      // ).then(() => {
      //     Toast.show('Your message was successfully sent!');
      // }).catch((err) => {
      //     console.log(err);
      //     Toast.show('Your message was not sent!')
      // })
      await openComposer({
        to: email,
        subject: subject + ` (${name})`,
        body: comments,
      });
    }
  };

  return (
    <MainWrapper>
      <HideKeyboard>
        <Wrapper flex={1} style={appStyles.mainContainer}>
          <MainHeader
            buttonSize={totalSize(3)}
            onPressBack={() => navigation.goBack()}
            // onPressBack={() => {
            //   navigation.toggleDrawer();
            //   Keyboard.dismiss();
            // }}
            title="Contact Us"
            statusBarBgColor={colors.primary}
          />
          <Spacer height={sizes.doubleBaseMargin} />

          <TextInputColored
            value={name}
            onChangeText={text => setName(text)}
            inputContainerStyle={styles.textInputContainer}
            inputStyle={styles.textInputText}
            placeholder="First Name"
          />
          <Spacer height={sizes.smallMargin} />

          <TextInputColored
            value={email}
            onChangeText={text => setEmail(text)}
            editable={false}
            inputContainerStyle={styles.textInputContainer}
            inputStyle={styles.textInputText}
            placeholder="Email"
          />
          <Spacer height={sizes.smallMargin} />

          <TextInputColored
            value={subject}
            onChangeText={text => setSubject(text)}
            inputContainerStyle={styles.textInputContainer}
            inputStyle={styles.textInputText}
            placeholder="Subject"
          />
          <Spacer height={sizes.baseMargin} />

          <TextInputColored
            value={comments}
            onChangeText={text => setComments(text)}
            inputContainerStyle={styles.textInputContainer}
            inputStyle={styles.textInputComments}
            placeholder="Add comments here"
            multiline
            // iconName='attach'
            iconColor={colors.primary}
            iconSize={sizes.icons.large}
          />
          <Spacer height={sizes.doubleBaseMargin} />

          <Wrapper>
            <ButtonWithRightIcon
              onPress={HandleSendBtn}
              iconName="send"
              buttonColor={colors.appButton3}
              text="Submit"
              buttonStyle={styles.buttonColored}
              iconSize={sizes.icons.small}
            />
          </Wrapper>
        </Wrapper>
      </HideKeyboard>
    </MainWrapper>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: colors.appColor9,
  },
  textInputText: {
    height: height(7),
    color: colors.primary,
  },
  textInputComments: {
    height: height(30),
    color: colors.primary,
    textAlignVertical: 'top',
  },
  buttonColored: {
    width: width(50),
    alignSelf: 'flex-end',
    borderRadius: sizes.buttonSmallRadius,
  },
});
