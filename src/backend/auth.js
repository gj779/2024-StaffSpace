import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import qs from 'qs';
import {Linking} from 'react-native';
import '@react-native-firebase/firestore';
import {_storeData} from './AsyncFuncs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {Alert} from 'react-native';

export async function signUp(USER) {
  let success = true;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(USER.email, USER.password)
    .then(async user => {
      await firebase.auth().currentUser.sendEmailVerification();
      setTimeout(() => {
        Alert.alert(
          'Account created',
          `A verification link has been sent to ${user.user.email}\nPlease check your spam folder if not initially found.  Click on the link to verify your email address.`,
          // `A verification link has been sent to ${user.user.email}\nPlease check your spam folder if not initially found.  Click on the link to verify your email address and then please log into GetN2TechAgain`,
        );
      }, 6000);
      // delete USER.password;
      // USER.user_id = user.user.uid
      // await saveData(USER.userType, user.user.uid, USER);
      // await AsyncStorage.setItem('Token', user.user.uid)
      success = user;
    })
    .catch(function (error) {
      success = false;
      Toast.show(error.code + ': ' + error.message);
    });
  return success;
}

export async function signIn(email, password, rememberme) {
  let success = false;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async user => {
      if (rememberme) {
        AsyncStorage.setItem('Token', user.user.uid);
      }
      success = user.user.uid;
    })
    .catch(function (error) {
      // console.log(error.code, error.message)
      success = {res: false, error: error.message};
    });
  return success;
}

export async function checkEmailAlreadyInUse(email, callback) {
  let emails = await firebase.auth().fetchSignInMethodsForEmail(email.trim());

  callback(emails.length > 0);
}

export async function connectAccount(email, password, callback) {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async user => {
      if (user.user.emailVerified) {
        callback({...user, success: true});
      } else {
        success = false;
        await user.user.sendEmailVerification();
        // alert(`A verification link has been sent to ${email.trim()}, please verify and try connecting again`)
        alert(
          `A verification link has been sent to ${email.trim()}\nPlease check your spam folder if not initially found.  Click on the link to verify your email address and then please log into Click and go again.`,
        );
      }
    })
    .catch(function (error) {
      alert(error.code + ': ' + error.message);
      callback({...error, success: false});
    });
}

export function getCurrentUserId() {
  var user = firebase.auth().currentUser;

  if (user != null) {
    return user.uid;
  } else {
    // console.log('Session Expired Please Login Again');
    return null;
  }
}

export function isEmailVerified(type) {
  let user = firebase.auth().currentUser.emailVerified;
  if (user) {
    return user;
  } else {
    if (type === 'splash') {
      firebase.auth().signOut();
    } else {
      Alert.alert(
        'Email not verified',
        `Please verify your email,\nA verification link has been sent to ${
          firebase.auth().currentUser.email
        }\nPlease check your spam folder if not initially found.  Click on the link to verify your email address and then please log into Click and go again.`,
        [
          {
            text: 'Resend email',
            onPress: async () => {
              try {
                await firebase.auth().currentUser.sendEmailVerification();
                alert(
                  `A verification link has been sent to ${
                    firebase.auth().currentUser.email
                  }\nPlease check your spam folder if not initially found.  Click on the link to verify your email address.`,
                  // `A verification link has been sent to ${user.user.email}\nPlease check your spam folder if not initially found.  Click on the link to verify your email address and then please log into GetN2TechAgain`,
                );
              } catch (error) {
                alert(error || 'Something went wrong!');
              } finally {
                await firebase.auth().signOut();
              }
            },
          },
          {text: 'OK', onPress: async () => await firebase.auth().signOut()},
        ],
      );
    }
    return false;
  }
}

export async function Logout() {
  await firebase.auth().signOut();
}

export async function DeleteAccount() {
  // var user = firebase.auth().currentUser;
  await firebase.auth().currentUser.delete();
}

export async function DeleteUser() {
  var userId = firebase.auth().currentUser?.uid || null;
  if (userId !== null) {
    await firebase.firestore().collection('Users').doc(userId).delete();
  }
}

export async function ResetPassword(email) {
  let success = true;
  await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function (user) {
      success = true;
      // alert('Please check your email...', user)
    })
    .catch(function (e) {
      // console.log(e)
      success = e.message;
    });
  return success;
}

export async function sendEmail(to, subject, body, options = {}) {
  const {cc, bcc} = options;

  let url = `mailto:${to}`;

  // Create email link query
  const query = qs.stringify({
    subject: subject,
    body: body,
    cc: cc,
    bcc: bcc,
  });

  if (query.length) {
    url += `?${query}`;
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error('Provided URL can not be handled');
  }

  return Linking.openURL(url);
}
