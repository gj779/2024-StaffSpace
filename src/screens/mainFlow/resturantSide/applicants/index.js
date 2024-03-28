import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RenderApplicants, Wrapper} from '../../../../components';
import {MainHeader, MainWrapper} from '../../../../components';
import {appStyles, routes} from '../../../../services';
import {totalSize, width} from 'react-native-dimension';
import {getDocByKeyValue} from '../../../../backend/utility';

const Applicants = ({navigation, route}) => {
  var postId = null;
  if (route?.params?.postId) {
    postId = route?.params?.postId;
  }
  //   console.log(postId);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      await getDocByKeyValue('AppliedJobs', 'post_id', postId)
        .then(res => {
          //   console.log(res);
          // setApplicants(res.filter(r => r.status !== 'rejected'))
          setApplicants(res);
        })
        .catch(err => console.log(err));
    });
  }, []);
  const navigate = navigation.navigate;
  const [applicants, setApplicants] = useState('');
  return (
    <MainWrapper>
      <Wrapper flex={1} style={appStyles.mainContainer}>
        <MainHeader
          title="Applicants"
          buttonSize={totalSize(3)}
          onPressBack={() => navigation.goBack()}
        />
        <RenderApplicants
          data={applicants}
          onPress={props =>
            navigate(routes.myProfile, {Data: props, isResturant: true})
          }
        />
      </Wrapper>
    </MainWrapper>
  );
};

export default Applicants;
