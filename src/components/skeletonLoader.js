import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Use 'expo-linear-gradient' for Expo projects

export const SkeletonLoader = ({
  width,
  height,
  borderRadius = 4,
  style,
  shimmerColors = ['#E1E9EE', '#F0F3F5'],
  shimmerDuration = 1500,
  shimmerDirection = 'left-to-right',
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: shimmerDuration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    );
    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerAnim, shimmerDuration]);

  const shimmerTranslateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: shimmerDirection === 'left-to-right' ? [-width, width] : [width, -width],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View
        style={[
          styles.shimmerWrapper,
          {
            transform: [{ translateX: shimmerTranslateX }],
          },
        ]}
      >
        <LinearGradient
          colors={shimmerColors}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius }]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   // backgroundColor: '#E1E9EE',
    overflow: 'hidden',
  },
  shimmerWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

