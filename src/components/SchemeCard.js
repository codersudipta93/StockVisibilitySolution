
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fontFamily, sizes, device, local_images } from "../constants"; 

export const SchemeCard = ({ item, onPress, theme, isDark, children }) => {
  const styles = getStyles(theme, isDark);

    return (
        <Pressable onPress={() => onPress(item)} style={styles.cardWrapper}>
            <LinearGradient
                colors={[theme.secondary, theme.secondaryLight, theme.secondaryLight]}
                style={[styles.card, { shadowColor: theme.primaryDark }]}
            >
                {children}
               
            </LinearGradient>
        </Pressable>
    );
};


const getStyles = (theme,isDark) => StyleSheet.create({
    cardWrapper: {
        flex: 1,
        margin: 8,
        minWidth: '45%',
    },
    card: {
        borderRadius: 16,
        padding: 16,
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    
});

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { fontFamily, sizes, device, local_images } from "../constants"; 
// export const SchemeCard= ({ item , theme, isDark}) => {

//   const styles = getStyles(theme, isDark);

//   return (
//     <View style={styles.container}>
//       {/* Left Gradient Side */}
//       <LinearGradient
//        colors={[theme.secondaryLight, theme.secondary]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.leftSide}
//       >
//         <Text style={styles.couponText}>{item?.SchemeName}</Text>
//         <Text style={styles.promoLabel}>EMI Amount</Text>
//         <Text style={styles.codeText}>₹ {item?.EMIAmount} x {item?.NoOfMonths} Month</Text>
//       </LinearGradient>

//       {/* Right Side */}
//       <View style={styles.rightSide}>
//         <Text style={styles.verticalText}>{item?.AmtorWgt}</Text>
//         {/* <Text style={styles.smallLabel}>Months</Text>
//         <Text style={styles.verticalCode}>{item?.NoOfMonths}</Text> */}
//       </View>
//     </View>
//   );
// };


// const getStyles = (theme, isDark) =>
//   StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     borderRadius: 16,
//     overflow: 'hidden',
//     elevation: 3,
//     marginVertical: 8,
//     marginHorizontal: 8,
//     backgroundColor: '#fff',
//   },
//   leftSide: {
//     flex: 5,
//     padding: 16,
//     justifyContent: 'center',
//   },
//   rightSide: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     //padding: 4,
//     borderLeftWidth: 1,
//     borderLeftColor: '#eee',
//   },
//   couponText: {
//     color: theme.primaryDark,
//     fontSize: 18,
//     fontFamily: fontFamily.bold,
//   },
//   promoLabel: {
//     color: theme.primaryDark,
//     fontSize: 12,
//     marginTop: 10,
//     marginBottom:4,
//     fontFamily: fontFamily.regular,
//   },
//   codeText: {
//     color: theme.primaryDark,
//     fontSize: 16,
//     fontFamily:fontFamily.medium
//   },
//   verticalText: {
//     transform: [{ rotate: '-90deg' }],
//     fontSize: 13,
//     fontFamily: fontFamily.bold,
//     color: '#000',
//   },
//   smallLabel: {
//     fontSize: 10,
//     color: '#777',
//     marginTop: 6,
//   },
//   verticalCode: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#000',
//   },
// });




