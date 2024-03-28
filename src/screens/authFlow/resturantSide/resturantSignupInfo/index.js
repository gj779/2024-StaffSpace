import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppLogo1,
  ButtonBordered,
  ButtonColored,
  CommonDropdown,
  ComponentWrapper,
  CustomizedImage,
  KeyboardAvoidingScrollView,
  MainWrapper,
  RegularText,
  RenderImages,
  RowWrapper,
  SimpleDropdown,
  SmallText,
  Spacer,
  TextInputBordered,
  TextInputSimpleBordered,
  Wrapper,
} from '../../../../components';
import {
  appImages,
  appStyles,
  colors,
  routes,
  sizes,
  takePhotoFromCamera,
} from '../../../../services';
import {height, totalSize, width} from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import {
  saveData,
  uniqueID,
  uploadProfileImage,
} from '../../../../backend/utility';
import {Logout, signUp} from '../../../../backend/auth';
import SimpleToast from 'react-native-simple-toast';
import {
  getCitybyStateCountry,
  getCountry,
  getStatebyCountry,
} from '../../../../backend/api';

const ResturantSignupInfo = ({navigation, route}) => {
  const {USER, image} = route.params;
  const [country, setCountry] = useState({});
  const [countryError, setCountryError] = useState('');
  const [stateError, setStateError] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setcityData] = useState([]);
  const [state, setState] = useState({});
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [jobName, setJobName] = useState('');
  const [jobNameError, setjobNameError] = useState('');

  const [images, setImages] = useState([{id: '1'}]);

  var name = USER?.userType == 'Resturant' ? 'Restaurant' : 'Event';

  const AddImages = async () => {
    try {
      const image = await takePhotoFromCamera();
      if (image) {
        setImages([{id: uniqueID(), uri: image.path}, ...images]);
      }
    } catch (error) {}
  };

  const validations = () => {
    Object.keys(country).length < 1
      ? setCountryError('* Country is required')
      : setCountryError('');
    Object.keys(state).length < 1
      ? setStateError('* State is required')
      : setStateError('');
    !city ? setCityError('* Cityis required') : setCityError('');
    !description
      ? setDescriptionError('* Description is required')
      : setDescriptionError('');
    !jobName
      ? setjobNameError('* ' + name + ' name is required')
      : setjobNameError('');
    if (
      Object.keys(country).length > 0 &&
      Object.keys(state).length > 0 &&
      city &&
      description &&
      jobName
    ) {
      return true;
    } else {
      return false;
    }
  };
  const HandleSignUp = async () => {
    let user = {
      ...USER,
      JobName: jobName,
      location: {
        country: country,
        state: state,
        city: city,
      },
      description: description,
      photos: [],
      profilePhoto: '',
    };

    if (validations()) {
      setLoading(true);
      signUp(user)
        .then(async res => {
          user.user_id = res.user.uid;
          const photos = images.filter(image => image.id != '1');
          let tempPhotos = [];
          let tempProfile = '';
          if (image.uri) {
            tempProfile = await uploadProfileImage(
              image.uri,
              `${user.userType}/Images/profileImages/${uniqueID()}${
                image.fileName
              }`,
            );
          } else {
            tempProfile = await uploadProfileImage(
              appImages.noUser,
              `${user.userType}/Images/profileImages/${uniqueID()}_random.png`,
            );
          }
          await Promise.all(
            photos.map(async photo => {
              const tPhoto = await uploadProfileImage(
                photo.uri,
                `${user.userType}/Images/Photos/${photo.id}`,
              );

              tempPhotos.push({id: uniqueID(), uri: tPhoto});
            }),
          )
            .then(() => {
              if (tempProfile) {
                user.profilePhoto = tempProfile;
              }
              if (tempPhotos.length > 0) {
                user.photos = tempPhotos;
              }
              delete user.password;

              saveData('Users', user.user_id, user)
                .then(res => {
                  Logout();
                  SimpleToast.show(
                    'You have successfully registered, kindly login to proceed.',
                  );
                  navigation.navigate(routes.signin);
                  setLoading(false);
                })
                .catch(err => {
                  setLoading(false);
                });
            })
            .catch(err => {
              setLoading(false);
            });
        })
        .catch(err => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await getCountry();
      setCountryData(data);
    } catch (error) {}
  };

  return (
    <MainWrapper>
      <Wrapper flex={1} style={appStyles.mainContainer}>
        <KeyboardAvoidingScrollView>
          <Spacer height={sizes.doubleBaseMargin} />
          <Wrapper style={appStyles.center}>
            <AppLogo1
              height={totalSize(15)}
              width={totalSize(25)}
              source={appImages.logoIcon}
            />
          </Wrapper>

          <ComponentWrapper>
            <RegularText style={styles.detailTxt}>* {name} Name</RegularText>
          </ComponentWrapper>
          <TextInputSimpleBordered
            value={jobName}
            onChangeText={txt => {
              setJobName(txt);
              setjobNameError('');
            }}
            error={jobNameError}
            inputStyle={styles.inputText}
          />

          <View style={{marginBottom: 10}} />

          <ComponentWrapper>
            <RegularText style={styles.detailTxt}>* Country</RegularText>
          </ComponentWrapper>
          <CommonDropdown
            data={countryData}
            error={countryError}
            onSelect={async data => {
              setcityData([]);
              setState({});
              setCity('');
              setCountryError('');
              setCountry(data);
              try {
                let {states} = await getStatebyCountry(data?.name);
                if (states?.length > 0) {
                  setStateData(states || []);
                } else {
                  setStateData([data]);
                }
              } catch (error) {
                if (error.msg == 'country not found') {
                  setStateData([data]);
                }
              }
            }}
            buttonStyle={{borderColor: colors.primary}}
          />
          {/* <TextInputSimpleBordered
            value={country}
            onChangeText={txt => {
              setCountry(txt);
              setCountryError('');
            }}
            error={countryError}
            placeholder="Country"
            inputStyle={styles.inputText}
          /> */}
          <Spacer height={sizes.TinyMargin} />
          <ComponentWrapper>
            <RegularText style={styles.detailTxt}>* State</RegularText>
          </ComponentWrapper>
          <CommonDropdown
            placeholder={'Select state'}
            data={stateData}
            error={stateError}
            buttonTextAfterSelection={data => {
              if (state?.name) {
                return data?.name;
              } else {
                return 'Select state';
              }
            }}
            rowTextForSelection={data => {
              return data?.name;
            }}
            onSelect={async data => {
              setCity('');
              setState(data);
              setStateError('');
              try {
                let city = await getCitybyStateCountry(
                  country?.name,
                  data?.name,
                );
                if (city?.length > 0) {
                  setcityData(city || []);
                } else {
                  setcityData([data?.name]);
                }
              } catch (error) {
                if (
                  ['country not found', 'state not found'].includes(error.msg)
                ) {
                  setcityData([data?.name]);
                }
              }
            }}
            buttonStyle={{borderColor: colors.primary}}
          />
          {/* <TextInputSimpleBordered
            value={state}
            onChangeText={txt => {
              setState(txt);
              setStateError('');
            }}
            error={stateError}
            placeholder="State"
            inputStyle={styles.inputText}
          /> */}
          <Spacer height={sizes.TinyMargin} />
          <ComponentWrapper>
            <RegularText style={styles.detailTxt}>* City</RegularText>
          </ComponentWrapper>
          <CommonDropdown
            error={cityError}
            placeholder={'Select city'}
            data={cityData}
            buttonTextAfterSelection={data => {
              if (city) {
                return data;
              } else {
                return 'Select city';
              }
            }}
            rowTextForSelection={data => {
              return data;
            }}
            onSelect={data => {
              setCity(data);
              setCityError('');
            }}
            buttonStyle={{borderColor: colors.primary}}
          />
          {/* <TextInputSimpleBordered
            value={city}
            onChangeText={txt => {
              setCity(txt);
              setCityError('');
            }}
            error={cityError}
            placeholder="City"
            inputStyle={styles.inputText}
          /> */}
          <Spacer height={sizes.TinyMargin} />
          <ComponentWrapper>
            <RegularText style={styles.detailTxt}>Description</RegularText>
          </ComponentWrapper>
          <Spacer height={sizes.smallMargin} />
          <TextInputBordered
            value={description}
            onChangeText={txt => {
              setDescription(txt);
              setDescriptionError('');
            }}
            containerStyle={styles.textInputBorderedContainer}
            inputStyle={styles.textInputComments}
            multiline
            iconColor={colors.primary}
            error={descriptionError}
            iconSize={sizes.icons.large}
          />
          <ComponentWrapper style={appStyles.right}>
            <Spacer height={sizes.TinyMargin} />
            <SmallText style={styles.detailTxt}>
              {description.length} to 250
            </SmallText>
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <RegularText style={styles.detailTxt}>Add images</RegularText>
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <RenderImages data={images} onPress={AddImages} />
          </ComponentWrapper>
          <Spacer height={sizes.doubleBaseMargin} />
          <ButtonColored
            disabled={isLoading}
            text={
              isLoading ? (
                <ActivityIndicator color={colors.appColor8} />
              ) : (
                'Continue'
              )
            }
            buttonColor={colors.primary}
            onPress={HandleSignUp}
          />
          <Spacer height={sizes.doubleBaseMargin} />
        </KeyboardAvoidingScrollView>
      </Wrapper>
    </MainWrapper>
  );
};

export default ResturantSignupInfo;

const styles = StyleSheet.create({
  availabilityButton: {
    paddingHorizontal: width(8),
  },
  availabilityWrapper: {
    alignSelf: 'center',
  },
  inputText: {
    paddingHorizontal: width(3),
    marginVertical: sizes.smallMargin / 1.5,
    borderColor: colors.primary,
  },
  detailTxt: {
    color: colors.appTextColor5,
  },
  textInputComments: {
    height: height(20),
    color: colors.primary,
    textAlignVertical: 'top',
  },
  textInputBorderedContainer: {
    borderColor: colors.primary,
  },
});
