import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FeedCard, HomeHeader, MainWrapper, RenderMyJobs, Wrapper } from '../../../components'
import { appImages, appStyles, routes } from '../../../services'
import { useDispatch, useSelector } from 'react-redux';
import { getDocByKeyValue } from '../../../backend/utility';

const MyJobs = ({ navigation }) => {
    const user_redux = useSelector(state => state.user)
    const [feedItems, setFeedItems] = useState('')

    useEffect(() => {
        navigation.addListener('focus', async () => {
            getDocByKeyValue('AppliedJobs', 'applied_by.user_id', user_redux.user_id)
                .then(res => {
                    setFeedItems(res)
                })
                .catch(err => console.log(err))
        })
    }, [])
    return (
        <MainWrapper>
            <Wrapper flex={1} style={appStyles.mainContainer}>
                <HomeHeader
                    title='My Jobs'
                    onPressProfile={() => navigation.navigate(routes.myProfileStack)}
                    onPress={() => navigation.toggleDrawer()}
                    source={{ uri: user_redux?.profilePhoto }} />
                <RenderMyJobs
                    data={feedItems}

                    // onPress={(item, index) => console.log(item.post_id)} />
                    onPress={(item, index) => navigation.navigate(routes.resturantProfile, { item: item, isMyJobs: true })} />
            </Wrapper>
        </MainWrapper>
    )
}

export default MyJobs