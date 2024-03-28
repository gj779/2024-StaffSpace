import {View, Text, FlatList, StyleSheet, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppLogo1,
  ButtonColored,
  ButtonSelectablePrimary,
  CommonDropdown,
  ComponentWrapper,
  KeyboardAvoidingScrollView,
  MainWrapper,
  RegularText,
  RowWrapper,
  SimpleDropdown,
  SmallText,
  Spacer,
  TextInputSimpleBordered,
  TinyTitle,
  Wrapper,
} from '../../../components';
import {appImages, appStyles, colors, routes, sizes} from '../../../services';
import {height, totalSize, width} from 'react-native-dimension';
import {getCitybyStateCountry, getStatebyCountry} from '../../../backend/api';

const CurrentJobDetail = ({navigation, route}) => {
  const {User, image} = route?.params;

  const [selectedJob, setSelectedJob] = useState('Part Time');
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [state, setState] = useState({});
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [city, setCity] = useState({});
  const [titleError, setTitleError] = useState('');
  const [nameError, setNameError] = useState('');

  const [jobCategories, setJobCategories] = useState([
    {id: '0', title: 'Waiter', isSelected: false},
    {id: '1', title: 'Chef', isSelected: false},
    {id: '2', title: 'Bartender', isSelected: false},
    {id: '3', title: 'Kitchen Staff', isSelected: false},
    {id: '4', title: 'Management', isSelected: false},
    {id: '5', title: 'Other', isSelected: false},
  ]);
  const [jobAvailability, setJobAvailability] = useState([
    {id: '1', title: 'Part Time'},
    {id: '2', title: 'Full Time'},
    {id: '2', title: 'Both'},
  ]);
  const handleJobSelection = id => {
    switch (id) {
      case '1':
        setSelectedJob('Part Time');
        break;
      case '2':
        setSelectedJob('Full Time');
        break;
      case '3':
        setSelectedJob('Both');
        break;
      default:
        break;
    }
  };

  const RenderJobCategories = ({item}) => (
    <ButtonSelectablePrimary
      text={item?.position || item.title}
      isSelected={item.isSelected}
      buttonStyle={{
        borderColor: colors.appBgColor3,
        height: Platform.OS === 'android' ? height(5) : height(4),
      }}
      onPress={() => HandleItemSelect(item.id)}
    />
  );

  const HandleItemSelect = id => {
    const Data = [...jobCategories];
    for (let data of jobCategories) {
      if (data.id == id) {
        data.isSelected = data.isSelected == false ? true : !data.isSelected;
        break;
      }
    }
    setJobCategories(Data);
  };

  const validations = () => {
    !title ? setTitleError('* Current job title') : setTitleError('');
    !companyName ? setNameError('* Current working place') : setNameError('');
    if (companyName && title) {
      return true;
    } else {
      return false;
    }
  };

  const HandlePressContinue = () => {
    let user = {
      ...User,
      jobCategories: jobCategories.filter(data => data.isSelected == true),
      jobType: selectedJob,
      currentJob: {
        title: title,
        companyName: companyName,
        state: state,
        city: city,
      },
    };
    if (validations()) {
      navigation.navigate(routes.previousJobDetail, {USER: user, image: image});
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let {states} = await getStatebyCountry(User?.location?.country?.name);
      if (states?.length > 0) {
        setStateData(states || []);
      } else {
        setStateData([User?.location?.country]);
      }
    } catch (error) {
      if (error.msg == 'country not found') {
        setStateData([User?.location?.country]);
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
          <Wrapper>
            <TinyTitle style={appStyles.headingsTitle}>Job Category</TinyTitle>
            <Spacer height={sizes.baseMargin} />
            <FlatList
              data={jobCategories}
              renderItem={RenderJobCategories}
              keyExtractor={item => item.id}
              numColumns={3}
            />
            <TinyTitle style={appStyles.headingsTitle}>Availability</TinyTitle>
            <Spacer height={sizes.baseMargin} />
            <RowWrapper style={styles.availabilityWrapper}>
              <ButtonSelectablePrimary
                text={jobAvailability[0].title}
                buttonStyle={styles.availabilityButton}
                isSelected={selectedJob == 'Part Time'}
                onPress={() => handleJobSelection('1')}
              />
              <ButtonSelectablePrimary
                text={jobAvailability[1].title}
                buttonStyle={styles.availabilityButton}
                isSelected={selectedJob == 'Full Time'}
                onPress={() => handleJobSelection('2')}
              />
              <ButtonSelectablePrimary
                text={jobAvailability[2].title}
                buttonStyle={styles.availabilityButton}
                isSelected={selectedJob == 'Both'}
                onPress={() => handleJobSelection('3')}
              />
            </RowWrapper>
            <TinyTitle style={appStyles.headingsTitle}>
              Current Job Details
            </TinyTitle>
            <Spacer height={sizes.baseMargin} />
            <Wrapper>
              <ComponentWrapper>
                {/* <RegularText style={styles.detailTxt}>* Current job title</RegularText> */}
              </ComponentWrapper>
              <TextInputSimpleBordered
                value={title}
                onChangeText={txt => {
                  setTitle(txt);
                  setTitleError('');
                }}
                error={titleError}
                placeholder="Current job title"
                inputStyle={styles.inputText}
              />
              <ComponentWrapper>
                {/* <RegularText style={styles.detailTxt}>* Current wroking place</RegularText> */}
              </ComponentWrapper>
              <TextInputSimpleBordered
                value={companyName}
                onChangeText={txt => {
                  setCompanyName(txt);
                  setNameError('');
                }}
                error={nameError}
                placeholder="Company Name"
                inputStyle={styles.inputText}
              />
              {/* <TextInputSimpleBordered
                value={state}
                onChangeText={txt => setState(txt)}
                placeholder="State"
                inputStyle={styles.inputText}
              /> */}
              <View style={{marginTop: sizes.smallMargin / 1.5}} />
              <CommonDropdown
                placeholder={'Select state'}
                data={stateData}
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
                  setState(data);
                  setCity('');
                  try {
                    let city = await getCitybyStateCountry(
                      User?.location?.country?.name,
                      data?.name,
                    );
                    if (city?.length > 0) {
                      setCityData(city || []);
                    } else {
                      setCityData([data.name]);
                    }
                  } catch (error) {
                    if (
                      ['country not found', 'state not found'].includes(
                        error.msg,
                      )
                    ) {
                      setCityData([data.name]);
                    }
                  }
                }}
              />
              <View style={{marginVertical: sizes.smallMargin / 1.5}} />
              <CommonDropdown
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
              />

              {/* <TextInputSimpleBordered
                value={city}
                onChangeText={txt => setCity(txt)}
                placeholder="City"
                inputStyle={styles.inputText}
              /> */}
            </Wrapper>
          </Wrapper>
          <Spacer height={sizes.doubleBaseMargin * 1.5} />
          <ButtonColored
            buttonColor={colors.primary}
            text="Continue"
            onPress={HandlePressContinue}
          />
          <Spacer height={sizes.baseMargin * 1.5} />
        </KeyboardAvoidingScrollView>
      </Wrapper>
    </MainWrapper>
  );
};
export default CurrentJobDetail;

const styles = StyleSheet.create({
  availabilityButton: {
    paddingHorizontal: width(5),
  },
  availabilityWrapper: {
    alignSelf: 'center',
    flexWrap: 'wrap',
  },
  inputText: {
    paddingHorizontal: width(3),
    marginVertical: sizes.smallMargin / 1.5,
  },
  detailTxt: {
    color: colors.appTextColor5,
  },
});
