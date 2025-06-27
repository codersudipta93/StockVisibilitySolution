import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontFamily, sizes, device, local_images } from "../constants"; // Import font constants

export const CustomHeader = ({
  title,
  leftIconName,
  rightIconName,
  rightIconSize,
  onLeftPress,
  onRightPress,
  iconColor = '#fff',
  backgroundColor = 'transparent', // default: Dark Brown
  textColor = '#fff',
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.sideIcon,{flexDirection:'row',width:'90%',alignItems:'center',justifyContent:'center'}]}>
        {leftIconName ? (
          <TouchableOpacity onPress={onLeftPress}>
            <Icon name={leftIconName} size={32} color={iconColor} />
          </TouchableOpacity>
        ) : null}
         {title ? (
        <Text style={[styles.title, { color: textColor,fontFamily:fontFamily.bold ,fontSize: sizes.bodyMedium+1,}]} numberOfLines={1}>
          {title}
        </Text>
      ) : (
        <View style={styles.titlePlaceholder} />
      )}
      </View>

      <View style={[styles.sideIcon,{flexDirection:'row',width:'10%',justifyContent:'center'}]}>
        {rightIconName ? (
          <TouchableOpacity onPress={onRightPress}>
            <Icon name={rightIconName} size={rightIconSize ? rightIconSize : 36} color={iconColor} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width:'100%'
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    //borderWidth:1
  },
  title: {
    flex: 1,
    textAlign: 'left',
    marginLeft:12
  },
  titlePlaceholder: {
    flex: 1,
  },
  sideIcon: {
    width: 32,
    alignItems: 'center',
  },
});
