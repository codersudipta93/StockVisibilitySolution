import React from 'react';
import { View, Text } from 'react-native';

export const Footer = ({ style, children }) => {
    return (
        <View
            style={[{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 20,
            }, style]}>
            {children}
        </View>
    )
}