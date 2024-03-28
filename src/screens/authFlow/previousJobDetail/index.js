import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {AppLogo1, BorderedTextWithIcon, Spacer} from '../../../components';
import {ButtonColored, KeyboardAvoidingScrollView} from '../../../components';
import {TextInputSimpleBordered, Wrapper} from '../../../components';
import {SimpleDropdown, SmallText, ComponentWrapper} from '../../../components';
import {MainWrapper, RegularText, RowWrapper} from '../../../components';
import {height, totalSize, width} from 'react-native-dimension';
import {appImages, appStyles, colors, routes, sizes} from '../../../services';
import DocumentPicker, {types} from 'react-native-document-picker';
import {Logout, signUp} from '../../../backend/auth';
import {saveData, uniqueID} from '../../../backend/utility';
import {uploadProfileImage, uploadpdfFile} from '../../../backend/utility';
import SimpleToast from 'react-native-simple-toast';
import {getCitybyStateCountry} from '../../../backend/api';

const PreviousJobDetail = ({navigation, route}) => {
  const {USER, image} = route.params;

  const [cityData, setCityData] = useState([]);
  const [city, setCity] = useState('');
  const [year, setYear] = useState('');
  const [previousJobDetail, setPreviousJobDetails] = useState('');
  const [description, setDescription] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [fileResponse, setFileResponse] = useState([]);

  const currentYear = new Date().getFullYear();
  let yearData = [];
  for (let year = currentYear; year >= 1980; year--) {
    yearData.push({year: year});
  }

  const fileName = data => {
    let txt = data.split('.');
    let name = '';
    if (txt[0].length > 10) {
      name = txt[0].substring(0, 5) + '...' + txt[0].slice(-5) + '.' + txt[1];
    } else {
      name = txt[0] + '.' + txt[1];
    }
    return name;
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf, types.docx],
      });
      setFileResponse(response);
    } catch (err) {}
  }, []);

  const validations = () => {
    if (city && year && description) {
      return true;
    } else {
      return false;
    }
  };

  const HandleSignUp = async () => {
    try {
      let User = {
        ...USER,
        // selectionCity: city,
        // selectionDate: year,
        // previousJobDetail: previousJobDetail,
        // description: description,
      };
      // if (validations()) {
      setLoading(true);
      await signUp(User)
        .then(async res => {
          User.user_id = res.user.uid;
          let profileImage = false;
          let temDoc = false;
          if (image?.uri) {
            profileImage = await uploadProfileImage(
              image.uri,
              `${User.userType}/Images/profiles/${uniqueID()}${image.fileName}`,
            );
          } else {
            profileImage = await uploadProfileImage(
              appImages.noUser,
              `${User.userType}/Images/Profiles/${uniqueID()}_random.png`,
            );
          }
          await Promise.all(
            fileResponse.map(async i => {
              temDoc = await uploadpdfFile(
                i.uri,
                `${User.userType}/Documents/${uniqueID()}${i.name}`,
              );
            }),
          ).then(() => {
            if (profileImage) {
              User.profilePhoto = profileImage;
            }
            if (temDoc) {
              User.resume = temDoc;
            }
            delete User.password;
            saveData('Users', User.user_id, User)
              .then(res => {
                Logout();
                setLoading(false);
                SimpleToast.show(
                  'You have successfully registered, kindly login to proceed.',
                );
                navigation.navigate(routes.signin);
              })
              .catch(err => {
                setLoading(false);
              });
          });
        })
        .catch(err => {
          setLoading(false);
        });
      // } else {
      //   setLoading(false);
      // }
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let city = await getCitybyStateCountry(
        USER?.location?.country?.name,
        USER?.location?.state?.name,
      );
      if (city?.length > 0) {
        setCityData(city || []);
      } else {
        setCityData([USER?.location?.state?.name]);
      }
    } catch (error) {
      if (['country not found', 'state not found'].includes(error.msg)) {
        setCityData([USER?.location?.state?.name]);
      }
    }
  };
  return (
    <MainWrapper>
      <Wrapper flex={1} animation="fadeInUp">
        <KeyboardAvoidingScrollView>
          <Spacer height={sizes.doubleBaseMargin} />
          <Wrapper style={appStyles.center}>
            <AppLogo1
              height={totalSize(15)}
              width={totalSize(25)}
              source={appImages.logoIcon}
            />
          </Wrapper>
          <Spacer height={sizes.smallMargin} />
          {/* <RowWrapper>
            <RegularText style={styles.detailTxt}>* Selection City</RegularText>
            <RegularText style={styles.detailTxt}>Selection Year</RegularText>
          </RowWrapper> 
          <Spacer height={sizes.smallMargin} />*/}
          {/* <RowWrapper style={[appStyles.center]}>
            <SimpleDropdown
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
              onSelect={data => setCity(data)}
              buttonStyle={{width: width(40)}}
            />
            {/* <TextInputSimpleBordered
              value={city}
              onChangeText={txt => setCity(txt)}
              placeholder="city"
              inputStyle={styles.inputTextRow}
            /> 
            <SimpleDropdown
              placeholder={'Select year'}
              data={yearData}
              buttonTextAfterSelection={data => {
                return data?.year;
              }}
              rowTextForSelection={data => {
                return data?.year;
              }}
              onSelect={data => setYear(data?.year)}
              buttonStyle={{width: width(40)}}
            />
            {/* <TextInputSimpleBordered
              value={year}
              onChangeText={txt => setYear(txt)}
              placeholder="year"
              inputStyle={styles.inputTextRow}
            /> 
          </RowWrapper> */}
          {/* <Spacer height={sizes.baseMargin} />
          <RowWrapper>
            <RegularText style={styles.detailTxt}>
              * Previous Job details
            </RegularText>
            <RegularText style={styles.detailTxt}>Optional*</RegularText>
          </RowWrapper>
          <Spacer height={sizes.smallMargin} />
          <TextInputSimpleBordered
            value={previousJobDetail}
            onChangeText={txt => setPreviousJobDetails(txt)}
          />
          <Spacer height={sizes.smallMargin} />
          <ComponentWrapper>
            <RegularText style={styles.descriptionColor}>
              Description
            </RegularText>
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin} />
          <TextInputSimpleBordered
            value={description}
            onChangeText={txt => setDescription(txt)}
            multiline={true}
            inputStyle={styles.inputTextmultiline}
          />
          <ComponentWrapper style={appStyles.right}>
            <Spacer height={sizes.TinyMargin} />
            <SmallText style={styles.descriptionColor}>
              {description?.length} to 250
            </SmallText>
          </ComponentWrapper> */}
          <ComponentWrapper style={{marginVertical: sizes.smallMargin}}>
            <RegularText style={styles.descriptionColor}>
              Upload Resume
            </RegularText>
          </ComponentWrapper>
          <BorderedTextWithIcon
            text={
              fileResponse != []
                ? fileResponse?.map(i => fileName(i.name))
                : 'Browse file'
            }
            iconName="cloud-upload-outline"
            iconSize={sizes.icons.large}
            iconColor={colors.primary}
            onPress={() => handleDocumentSelection()}
            style={{color: colors.primary}}
          />
          <Spacer height={sizes.doubleBaseMargin * 2.5} />
          <ButtonColored
            buttonColor={colors.primary}
            disabled={isLoading}
            text={
              isLoading ? (
                <ActivityIndicator color={colors.appColor8} />
              ) : (
                'Continue'
              )
            }
            onPress={HandleSignUp}
          />
          <Spacer height={sizes.baseMargin * 1.5} />
        </KeyboardAvoidingScrollView>
      </Wrapper>
    </MainWrapper>
  );
};
export default PreviousJobDetail;

const styles = StyleSheet.create({
  availabilityButton: {
    paddingHorizontal: width(8),
  },
  availabilityWrapper: {
    alignSelf: 'center',
  },
  inputTextRow: {
    width: width(40),
  },
  inputTextmultiline: {
    height: height(10),
    textAlignVertical: 'top',
  },
  detailTxt: {
    color: colors.appTextColor5,
  },
  descriptionColor: {
    color: colors.appTextColor5,
  },
});
