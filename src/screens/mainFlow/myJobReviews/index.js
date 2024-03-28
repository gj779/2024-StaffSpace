import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonColored,
  ComponentWrapper,
  CustomizedImage,
  CustomizedModel,
  KeyboardAvoidingScrollView,
  LargeText,
  MainHeader,
  MainWrapper,
  MediumText,
  MediumTitle,
  RatingWithBackground,
  Spacer,
  TextInputBordered,
  TinyTitle,
  Wrapper,
} from '../../../components';
import {appImages, appStyles, colors, routes, sizes} from '../../../services';
import {height, totalSize, width} from 'react-native-dimension';
import {useSelector} from 'react-redux';
import {saveData, uniqueID} from '../../../backend/utility';

const MyJobReviews = ({navigation, route}) => {
  const user_redux = useSelector(state => state.user);
  var isResturant = '';
  var item = '';
  if (route?.params?.isResturant) isResturant = route?.params?.isResturant;
  if (route?.params?.item) item = route?.params?.item;

  const [isModelVisible, setModelVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [managementRate, setManagementRate] = useState(3);
  const [employeeTreatmentRate, setEmployeeTreatmentRate] = useState(3);
  const [salaryRate, setSalaryRate] = useState(3);
  const [locationRate, setLocationRate] = useState(3);
  const [reviewText, setReviewText] = useState('');

  const HandleRateUs = () => {
    setLoading(true);
    let id = uniqueID();
    if (isResturant) {
      let Review_Data = {
        _id: id,
        reviewer_id: user_redux.user_id,
        reviewer_name: user_redux.firstName,
        reviewer_photo: user_redux.profilePhoto,
        user_id: item?.applied_by?.user_id,
        work: managementRate,
        professionalism: employeeTreatmentRate,
        behaviour: salaryRate,
        reviewText: reviewText,
        reviewTime: Date.parse(new Date()),
      };
      saveData('Reviews', Review_Data._id, Review_Data)
        .then(res => {
          setLoading(false);
          setModelVisible(!isModelVisible);
        })
        .catch(err => {
          setLoading(false);
        });
    } else {
      let ReviewData = {
        _id: id,
        reviewer_id: user_redux.user_id,
        reviewer_name: user_redux.firstName,
        reviewer_photo: user_redux.profilePhoto,
        post_id: item.post_id,
        user_id: item?.postedBy?.user_id,
        management: managementRate,
        treatment: employeeTreatmentRate,
        salary: salaryRate,
        location: locationRate,
        reviewText: reviewText,
        reviewTime: Date.parse(new Date()),
        user_type: item?.postedBy?.userType,
      };
      saveData('Reviews', ReviewData._id, ReviewData)
        .then(res => {
          setLoading(false);
          setModelVisible(!isModelVisible);
        })
        .catch(err => {
          setLoading(false);
        });
    }
  };
  return (
    <MainWrapper>
      <Wrapper animation="fadeInRight" flex={1} style={appStyles.mainContainer}>
        <MainHeader
          buttonSize={totalSize(3)}
          onPressBack={() => navigation.goBack()}
        />
        <KeyboardAvoidingScrollView>
          <Wrapper style={appStyles.center}>
            <TinyTitle>Rating and Review</TinyTitle>
          </Wrapper>
          <Spacer height={sizes.baseMargin} />
          <RatingWithBackground
            onFinishRating={retings => setManagementRate(retings)}
            title={isResturant ? 'Work' : 'Management'}
          />
          <RatingWithBackground
            onFinishRating={retings => setEmployeeTreatmentRate(retings)}
            title={isResturant ? 'Professionalism' : 'Employee Treatement'}
          />
          <RatingWithBackground
            onFinishRating={retings => setSalaryRate(retings)}
            title={isResturant ? 'Behaviour' : 'Salary'}
          />
          {!isResturant ? (
            <RatingWithBackground
              onFinishRating={retings => setLocationRate(retings)}
              title="Location"
            />
          ) : null}
          <ComponentWrapper>
            <LargeText>Review</LargeText>
          </ComponentWrapper>
          <Spacer height={sizes.smallMargin} />
          <TextInputBordered
            inputStyle={styles.textInputComments}
            multiline
            value={reviewText}
            onChangeText={txt => setReviewText(txt)}
            iconColor={colors.primary}
            iconSize={sizes.icons.large}
          />
          <Spacer height={sizes.doubleBaseMargin} />
          <ButtonColored
            disabled={isLoading}
            text={
              isResturant ? (
                isLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  'Submit Review'
                )
              ) : isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                'Rate us'
              )
            }
            buttonColor={colors.primary}
            onPress={HandleRateUs}
          />
          <Spacer height={sizes.baseMargin} />
        </KeyboardAvoidingScrollView>

        <CustomizedModel isVisible={isModelVisible}>
          <Wrapper style={appStyles.center}>
            <CustomizedImage
              width={totalSize(40)}
              height={totalSize(20)}
              source={appImages.rated}
            />
            <MediumTitle style={{color: colors.appTextColor9}}>
              Rated
            </MediumTitle>
            <Spacer height={sizes.TinyMargin} />
            <Wrapper style={{width: width(40)}}>
              <MediumText style={{textAlign: 'center'}}>
                Your Rating has been added!
              </MediumText>
            </Wrapper>
          </Wrapper>
          <Spacer height={sizes.doubleBaseMargin} />
          <ButtonColored
            text="Back to home"
            buttonColor={colors.primary}
            onPress={() => {
              setModelVisible(!isModelVisible);
              isResturant
                ? navigation.navigate(routes.resturantHome)
                : navigation.navigate(routes.myJobs);
            }}
          />
        </CustomizedModel>
      </Wrapper>
    </MainWrapper>
  );
};

export default MyJobReviews;
const styles = StyleSheet.create({
  textInputComments: {
    height: height(20),
    color: colors.primary,
    textAlignVertical: 'top',
  },
  buttonColored: {
    width: width(20),
    alignSelf: 'flex-end',
    borderRadius: sizes.buttonSmallRadius,
  },
});
