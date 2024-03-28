import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';

export const Spacer = props => {
    const { style, width, height } = props
    return (
        <View style={[{ height: height, width: width }, style]} />
    );
}