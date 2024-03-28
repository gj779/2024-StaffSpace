import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonBordered,
  ButtonColored,
  ButtonSelectablePrimary,
  ButtonSelectableTopBar,
  ComponentWrapper,
  FeedCard,
  ImageRound,
  MainHeader,
  MainWrapper,
  MediumText,
  RenderHomeFeed,
  RowWrapper,
  Spacer,
  Wrapper,
} from '../../../../components';
import {appImages, appStyles, colors, sizes} from '../../../../services';
import {height, totalSize, width} from 'react-native-dimension';

const Listing = ({navigation}) => {
  const navigate = navigation.navigate;
  const [selectedButton, setSelectedButton] = useState('Jobs');

  const handlePressTopButton = props => {
    switch (props) {
      case 'Jobs':
        setSelectedButton(props);
        setSelected(Jobs());
        break;
      case 'Events':
        setSelectedButton(props);
        setSelected(Events());
        break;
      case 'History':
        setSelectedButton(props);
        setSelected(History());
        break;
      default:
        break;
    }
  };
  const Jobs = () => {
    return (
      <FeedCard
        isInListing
        feedImage={appImages.feed1}
        title="Sea Resturant"
        titleDetails="Sea Resturant fast and sea food"
        detailText="Sea Resturant fast and sea food our menue and get good jobs according to your resume"
        locationText="Orlando, OR"
        ratingText="4.5"
      />
    );
  };
  const Events = () => {
    return (
      <FeedCard
        isInListing
        feedImage={appImages.feed1}
        title="Sea Events"
        titleDetails="Sea Resturant fast and sea food"
        detailText="Sea Resturant fast and sea food our menue and get good jobs according to your resume"
        locationText="Orlando, OR"
        ratingText="4.5"
      />
    );
  };
  const History = () => {
    return (
      <FeedCard
        isInListing
        feedImage={appImages.user01}
        title="Sea history"
        titleDetails="Sea Resturant fast and sea food"
        detailText="Sea Resturant fast and sea food our menue and get good jobs according to your resume"
        locationText="Orlando, R"
        ratingText="4.0"
      />
    );
  };
  const [seletedFunction, setSelected] = useState(Jobs());
  return (
    <MainWrapper>
      <Wrapper flex={1} style={appStyles.mainContainer}>
        <MainHeader
          buttonSize={totalSize(3)}
          onPressBack={() => navigation.goBack()}
        />
        <Wrapper style={appStyles.center}>
          <ImageRound source={appImages.user} size={totalSize(12)} />
          <MediumText>Victor Niculici</MediumText>
        </Wrapper>
        <Spacer height={sizes.doubleBaseMargin} />
        <ComponentWrapper>
          <Wrapper style={appStyles.topBarWrapper}>
            <RowWrapper style={appStyles.topBarRowWrapper}>
              <Wrapper flex={1}>
                <ButtonSelectableTopBar
                  text="Jobs"
                  isSelected={selectedButton == 'Jobs'}
                  onPress={() => handlePressTopButton('Jobs')}
                />
              </Wrapper>
              <Wrapper flex={1}>
                <ButtonSelectableTopBar
                  text="Events"
                  isSelected={selectedButton == 'Events'}
                  onPress={() => handlePressTopButton('Events')}
                />
              </Wrapper>
              <Wrapper flex={1}>
                <ButtonSelectableTopBar
                  text="History"
                  isSelected={selectedButton == 'History'}
                  onPress={() => handlePressTopButton('History')}
                />
              </Wrapper>
            </RowWrapper>
          </Wrapper>
        </ComponentWrapper>
        <Spacer height={sizes.baseMargin} />
        {seletedFunction}
      </Wrapper>
    </MainWrapper>
  );
};

export default Listing;
