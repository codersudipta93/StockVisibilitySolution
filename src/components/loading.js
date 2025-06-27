// import React, { useEffect, useRef } from 'react';
// import { Animated, Easing, StyleSheet, Image, View, Dimensions } from 'react-native';
// import { fontFamily, sizes, device, local_images,HelperFunctions } from "../constants";


// const { width, height } = Dimensions.get('window');

// export const Loading = () => {
//   const rotateAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(rotateAnim, {
//         toValue: 1,
//         duration: 1500,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, [rotateAnim]);

//   const spin = rotateAnim.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: ['0deg', '180deg', '360deg'],
//   });

//   const scale = rotateAnim.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: [1, 0.8, 1],
//   });

//   return (
//     <View style={styles.overlay}>
//       <Animated.Image
//         source={local_images.loading}
//         style={[
//           styles.coin,
//           {
//             transform: [
//               { rotateY: spin },
//               { scale },
//             ],
//           },
//         ]}
//         resizeMode="contain"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width,
//     height,
//     backgroundColor: 'rgba(0,0,0,0.5)', // transparent black overlay
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 9999,
//   },
//   coin: {
//     width: 100,
//     height: 100,
//   },
// });

// import React, { useEffect, useRef } from 'react';
// import { Animated, Easing, StyleSheet, Dimensions, View } from 'react-native';
// import { local_images } from '../constants'; // replace with your coin image

// const { width, height } = Dimensions.get('window');

// export const Loading = ({ visible }) => {
//   const dropAnim = useRef(new Animated.Value(-height)).current; // drop from top
//   const rotateAnim = useRef(new Animated.Value(0)).current;     // flip
//   const opacityAnim = useRef(new Animated.Value(0)).current;    // fade control

//   useEffect(() => {
//     if (visible) {
//       // Reset for re-show
//       dropAnim.setValue(-height);
//       opacityAnim.setValue(0);
//       rotateAnim.setValue(0);

//       // Start drop + fade in
//       Animated.parallel([
//         Animated.timing(opacityAnim, {
//           toValue: 1,
//           duration: 400,
//           useNativeDriver: true,
//         }),
//         Animated.spring(dropAnim, {
//           toValue: 0,
//           tension: 60,
//           friction: 5,
//           useNativeDriver: true,
//         }),
//       ]).start(() => {
//         // After drop, start looped flip
//         Animated.loop(
//           Animated.timing(rotateAnim, {
//             toValue: 1,
//             duration: 2000,
//             easing: Easing.linear,
//             useNativeDriver: true,
//           })
//         ).start();
//       });
//     } else {
//       // On hide: fade out
//       Animated.timing(opacityAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [visible]);

//   const spin = rotateAnim.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: ['0deg', '180deg', '360deg'],
//   });

//   const scale = rotateAnim.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: [1, 0.85, 1],
//   });

//   if (!visible) return null;

//   return (
//     <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
//       <Animated.Image
//         source={local_images.loading}
//         style={[
//           styles.coin,
//           {
//             transform: [
//               { translateY: dropAnim },
//               { rotateY: spin },
//               { scale },
//             ],
//           },
//         ]}
//         resizeMode="contain"
//       />
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width,
//     height,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 9999,
//   },
//   coin: {
//     width: 120,
//     height: 120,
//   },
// });


// import React, { useEffect, useRef } from 'react';
// import { Animated, Easing, StyleSheet, View, Dimensions } from 'react-native';
// import { fontFamily, sizes, device, local_images,HelperFunctions } from "../constants";
// const { width, height } = Dimensions.get('window');

// export const Loading = ({ visible = false }) => {
//   const rotateAnim = useRef(new Animated.Value(0)).current;
//   const dropAnim = useRef(new Animated.Value(-height)).current;
//   const opacityAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     if (visible) {
//       dropAnim.setValue(-height);
//       opacityAnim.setValue(0);
//       rotateAnim.setValue(0);
  
//       // Drop + Fade in
//       Animated.parallel([
//         Animated.timing(opacityAnim, {
//           toValue: 1,
//           duration: 400,
//           useNativeDriver: true,
//         }),
//         Animated.spring(dropAnim, {
//           toValue: 0,
//           tension: 60,
//           friction: 6,
//           useNativeDriver: true,
//         }),
//       ]).start();
  
//       // Start rotating immediately
//       Animated.loop(
//         Animated.timing(rotateAnim, {
//           toValue: 1,
//           duration: 1500,
//           easing: Easing.linear,
//           useNativeDriver: true,
//         })
//       ).start();
//     } else {
//       // Hide the loader with fade out
//       Animated.timing(opacityAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [visible]);
  
//   const spin = rotateAnim.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: ['0deg', '180deg', '360deg'],
//   });

//   const scale = rotateAnim.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: [1, 0.8, 1],
//   });

//   return ( 
//     <Animated.View
//       pointerEvents={visible ? 'auto' : 'none'}
//       style={[
//         styles.overlay,
//         {
//           opacity: opacityAnim,
//         },
//       ]}
//     >
//       <Animated.Image
//         source={local_images.loading} // use your gold coin image
//         style={[
//           styles.coin,
//           {
//             transform: [
//               { translateY: dropAnim },
//               { rotateY: spin },
//               { scale },
//             ],
//           },
//         ]}
//         resizeMode="contain"
//       />
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width,
//     height,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 9999,
//   },
//   coin: {
//     width: 100,
//     height: 100,
//   },
// });

import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import { local_images } from "../constants";

const { width, height } = Dimensions.get('window');

export const Loading = ({ visible = false }) => {
  const spinAnim = useRef(new Animated.Value(0)).current; // Z-axis (initial spin)
  const flipAnim = useRef(new Animated.Value(0)).current; // Y-axis (continuous flip)
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      opacityAnim.setValue(0);
      spinAnim.setValue(0);
      flipAnim.setValue(0);

      // Fade in
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      // First spin once like a wheel
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        // Then flip continuously
        Animated.loop(
          Animated.sequence([
            Animated.timing(flipAnim, {
              toValue: 1,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(flipAnim, {
              toValue: 0,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ).start();
      });

    } else {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const flip = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.overlay,
        { opacity: opacityAnim },
      ]}
    >
      <Animated.Image
        source={local_images.loading}
        style={[
          styles.coin,
          {
            transform: [
              { rotate: spin },    // Initial spin (Z-axis)
              { rotateY: flip },   // Continuous flip (Y-axis)
            ],
          },
        ]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  coin: {
    width: 75,
    height: 75,
    backfaceVisibility: 'hidden',
  },
});
