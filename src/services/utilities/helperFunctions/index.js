import {PermissionsAndroid, Platform} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {getCurrentUserId} from '../../../backend/auth';
import {addToArray, saveData} from '../../../backend/utility';

export const SortAlphabets = text => {
  return text.split('').sort().join('');
};

let user_id = getCurrentUserId();

export const takePhotoFromCamera = async () => {
  let img = false;
  if (cameraPermission) {
    try {
      await ImageCropPicker.openCamera({
        width: 1080,
        height: 1080,
        cropping: true,
      }).then(image => {
        img = image;
      });
    } catch (e) {
      img = false;
    }
  } else {
    img = false;
  }
  return img;
};
export const PickPhotoFromGallery = async () => {
  let img = false;
  try {
    await ImageCropPicker.openPicker({
      width: 1080,
      height: 1080,
      cropping: true,
    }).then(image => {
      img = image;
    });
  } catch (e) {
    img = false;
  }
  return img;
};
export const cameraPermission = async () => {
  let permission = true;
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'StaffSpace App Camera Permission',
          message: 'StaffSpace App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        permission = true;
      } else {
        permission = false;
      }
    } else {
      permission = true;
    }
  } catch (err) {
    console.warn(err);
    permission = false;
  }
  return permission;
};

export const HandleFavourites = (
  item,
  index,
  feedItems,
  setAllPost,
  dispatch,
  action,
  setItem,
) => {
  let tempPosts = [...feedItems];
  let target_post = {...item};
  const new_likes = target_post?.favourites?.filter(i => i != user_id);
  if (new_likes?.length == target_post?.favourites?.length) {
    target_post?.favourites?.push(user_id);
    addToArray('PostedJobs', target_post?.post_id, 'favourites', user_id);
  } else {
    target_post.favourites = new_likes;
    saveData('PostedJobs', target_post?.post_id, {favourites: new_likes});
  }
  tempPosts[index] = target_post;
  setItem(target_post);
  setAllPost(tempPosts);
  dispatch(action(tempPosts));
};

export const IsLiked = item => {
  return item?.favourites?.some(i => {
    return i == user_id;
  });
};
