import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontFamily, sizes, device, local_images } from "../constants"; // Import font constants

import { useTheme } from "../constants/themeProvider";

export const CustomTextInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  iconLeft = null,
  iconRight = null,
  inputTextColor = '#fff',
  placeholderTextColor = '#c2c2c2',
  borderColor = '#ffc9d1',
  errorBorderColor = '#FF9500',
  errorTextColor = '#FF9500',
  iconColor = '#D1D1D6',
  bgColor = 'transparent',
  inputWidth = null,
  maxLength ,
  height
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;
   const { toggleTheme, isDark, theme } = useTheme();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 20, width: inputWidth ? inputWidth : '100%' }}>
          <View
            style={[
              styles.inputWrapper,
              {
                //borderColor: error ? errorBorderColor : borderColor,
                borderColor:  theme.primary,
                backgroundColor: bgColor,
              },
            ]}
          >
            {/* Left Icon */}
            {iconLeft && (
              <View style={styles.iconLeft}>
                {React.cloneElement(iconLeft, { color: theme.primary })}
              </View>
            )}

            <TextInput
              style={[styles.input, { color: inputTextColor, fontFamily:fontFamily.medium, height:height ? height : 48 }]}
              placeholder={placeholder}
              onBlur={onBlur}
              //onChangeText={onChange}
              onChangeText={(text) => onChange(text.replace(/^\s+|\s+$/g, ''))}
              value={value}
              secureTextEntry={isPassword && !showPassword}
              keyboardType={keyboardType}
              placeholderTextColor={placeholderTextColor}
              maxLength={maxLength || undefined}
            />

            {/* Password Toggle or Right Icon */}
            {isPassword ? (
              <TouchableOpacity
                style={styles.iconRight}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={value ? theme.primaryMedium : theme.primaryMedium}
                />
              </TouchableOpacity>
            ) : (
              iconRight && (
                <View style={styles.iconRight}>
                  {React.cloneElement(iconRight, { color: iconColor })}
                </View>
              )
            )}
          </View>

          {error && (
            <Text style={[styles.errorText, { color: errorTextColor,fontFamily:fontFamily.regular }]}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,

  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  errorText: {
    fontSize: 13,
    marginTop: 8,
  },
});
