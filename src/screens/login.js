import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  ImageBackground,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { useTheme } from "../constants/themeProvider";
import { Container, CustomButton, CustomTextInput } from "../components";
import { fontFamily, sizes, device, local_images,HelperFunctions } from "../constants";
import { useForm } from "react-hook-form";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
//Redux
import { useSelector, useDispatch } from 'react-redux'
import { setToken,setUserData } from '../redux/projectReducer';
import { setData, getData, deleteData, clearAllData } from '../services/storage';

import {postApi} from '../services/apis';

const Login = () => {
  const navigation = useNavigation();
  const { isDark, theme } = useTheme();
  const styles = getStyles(theme, isDark, device.width);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { listData } = useSelector((state) => state.project);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: { "fcmid": "XYZTRACAVS"},
  });

  useEffect(() => {
   //navigation.navigate('DrawerNavigator')
  }, [])



  const _doLogin = async (data) => {
    // Alert.alert("Form Data", JSON.stringify(data, null, 2));
    setLoading(true);
    setTimeout(()=>{
      navigation.navigate('DrawerNavigator');
    },1000)
    // await postApi('CustomerLogIn', data).then((response) => {
    //   console.log(response);
    //   if(response.status == true){
    //     if(response?.data?.isverified == "0"){
    //       HelperFunctions.showMsg(response.msg,theme.primary);
    //       navigation.navigate('OTPVerification', {from:"regitstration", data:response?.data});
    //     }else{
    //       setData('userData',JSON.stringify(response.data));
    //       setData('token',response.data?.token);
    //       dispatch(setUserData(response.data));
    //       dispatch(setToken(response.data?.token));
    //       console.log(response.data)
    //       console.log(response.data?.token)
    //       navigation.navigate('DrawerNavigator');
    //     }
    //   }else{
    //     HelperFunctions.showMsg(response.msg,theme.primary);
    //   }
    // }).catch((error) => {
    //   console.log(error)
    //   HelperFunctions.showMsg("Sorry! Internal server error. Please try again later",theme.primary);
    // }).finally(()=>{
    //   setLoading(false)
    // })
  };

  return (
    <Container
      bgColor={[
        isDark ? theme.white : theme.white,
      //  isDark ? theme.primaryMedium : theme.primaryMedium,
        isDark ? theme.white : theme.white,
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={isDark ? theme.primary : theme.primary} />
      <ImageBackground
        source={local_images.splashbg}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.card}>
                <View style={{}}>
                <Image style={styles.logo} source={local_images.logo_circle} />
                <Text style={[styles.text, { color: isDark ? theme.primary : theme.primary }]}>
                 STOCK VISIBILITY SOLUTION
                </Text>
                <Text
                  style={[
                    styles.subText,
                    { color: isDark ? theme.primaryMedium : theme.primaryMedium },
                  ]}
                >
                  Welcome Back, Please login to continue.
                </Text>
                </View>
               

                <CustomTextInput 
                  control={control}
                  name="contactno"
                  placeholder="Username or Email Id"
                  //keyboardType="phone-pad" // ← updated from email-address
                  //maxLength={10}
                  // rules={{
                  //   required: "User name is required",
                  //   pattern: {
                  //     value: /^[0-9]{10}$/, // ← basic 10-digit validation
                  //     message: "Enter a valid 10-digit contact number",
                  //   },
                  // }}
                  iconLeft={
                    <Icon 
                      name="mail-open-outline"
                      size={22}
                      color={isDark ? theme.primary : theme.primary}
                    />
                  }
                  inputTextColor={isDark ? theme.black : theme.black}
                  placeholderTextColor={isDark ? theme.border : theme.border}
                  borderColor={isDark ? theme.primary : theme.primary}
                  errorBorderColor={isDark ? theme.error : theme.error}
                  errorTextColor={isDark ? theme.error : theme.error}
                  iconColor={isDark ? theme.icon : theme.icon}
                  bgColor={
                    isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.05)"
                  }
                />

                <CustomTextInput
                  control={control}
                  name="password"
                  placeholder="Enter Password"
                  secureTextEntry={!showPassword}
                  iconLeft={
                    <Icon
                      name="lock-closed-outline"
                      size={22}
                      color={isDark ? theme.primary : theme.primary}
                    />
                  }
                  iconRight={
                    <Icon
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={28}
                      color={isDark ? theme.icon : theme.icon}
                      onPress={() => setShowPassword((prev) => !prev)}
                    />
                  }
                  // rules={{
                  //   required: "Password is required",
                  //   //minLength: { value: 6, message: "Min 6 characters" },
                  // }}
                  inputTextColor={isDark ? theme.black : theme.black}
                  placeholderTextColor={isDark ? theme.border : theme.border}
                  borderColor={isDark ? theme.primary : theme.primary}
                  errorBorderColor={isDark ? theme.error : theme.error}
                  errorTextColor={isDark ? theme.error : theme.error}
                  iconColor={isDark ? theme.icon : theme.icon}
                  bgColor={
                    isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.05)"
                  }
                />

                <Text
                  style={[
                    styles.forgotText,
                    { color: isDark ? theme.primary : theme.primary, fontFamily:fontFamily.bold },
                  ]}
                >
                  Forgot Password?
                </Text>

                <CustomButton
                  buttonText="Login"
                  isLoading={loading}
                  disabled={!isValid}
                  backgroundColor={
                    isValid ? (isDark ? theme.black : theme.black) : theme.black
                  }
                  buttonTextStyle={{
                    textAlign: "center",
                    letterSpacing: 1.2,
                    fontFamily: fontFamily.medium,
                    color: isDark ? theme.white : theme.white,
                    fontSize: sizes.buttonText,
                  }}
                  requireBorder={false}
                  borderColor={isDark ? theme.white : theme.white}
                  style={{
                    width: "100%",
                    borderRadius: 20,
                    marginTop: 20,
                   // opacity: isValid ? 1 : 0.6,
                  }}
                  onPress={handleSubmit(_doLogin)}
                />
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <Image style={styles.footer} source={local_images.footer} />
      </ImageBackground>
    </Container>
  );
};

export default Login;

const getStyles = (theme, isDark, width) =>
  StyleSheet.create({
    imageBackground: {
      flex: 1,
     
    },
    scrollContainer: {
      flexGrow: 1,
      paddingVertical: 25,
    },
    // card: {
    //   width: width,
    //   padding: 20,
    //   paddingVertical: 25,
    //   borderRadius: 10,
    //   maxWidth: 400,
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
    card: { width, padding: 20, borderRadius: 10, alignSelf: "left" , paddingHorizontal:40, marginTop:70},

    text: {
      fontFamily: fontFamily.bold,
      fontSize: sizes.titleMedium,
    },
    subText: {
      fontFamily: fontFamily.regular,
      fontSize: sizes.bodyDeafult+1,
      marginTop: 12,
      marginBottom: 40,
      textAlign:'left'
    },
    forgotText: {
      alignSelf: "flex-end",
      fontSize: sizes.bodySmall+1,
      marginBottom: 8,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: "cover",
      marginBottom: 12,
    },
    footer:{
       width: '100%',
      height: 40,
      resizeMode: "contain",
      //marginBottom: 12,
    }
  });
