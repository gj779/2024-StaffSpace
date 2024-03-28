import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ComponentWrapper, ImageBackgroundWrapper } from '../wrappers'

const SplashBackground = ({ children }) => {
    return (
        <View style={{...styles.wrapper, backgroundColor: null,justifyContent:'center'}}>
            {children}
        </View>
    )
}

export default SplashBackground