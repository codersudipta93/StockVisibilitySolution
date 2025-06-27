import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { defaultStyle } from '../constants/globalStyle';
import LinearGradient from 'react-native-linear-gradient';

export const Container = ({ style, children, bgColor }) => {
   // alert(bgColor)
    return (
        <LinearGradient colors={bgColor} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom', 'left', 'right']}>
             {/* Ensure full height */}
                <View style={[style, defaultStyle.mainContainer, { flex: 1 }]}>
                    {children}
                </View>
          
        </SafeAreaView>
        </LinearGradient>
    );
};
