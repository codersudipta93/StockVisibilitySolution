import React, { useRef, useEffect, useState } from "react";
import {
    View,
    Text,
    Keyboard,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    ImageBackground,
} from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Container, CustomButton, CustomHeader, Loading } from "../components";
import { useTheme } from "../constants/themeProvider";
import { fontFamily, sizes, local_images, HelperFunctions } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { postApi } from "../services/apis";

const OTPVerification = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
        },
        mode: "onChange",
    });

    const otpValues = useWatch({
        control,
        name: ["otp1", "otp2", "otp3", "otp4"],
    });

    const { theme, isDark } = useTheme();
    const styles = getStyles(theme, isDark);
    const inputs = useRef([]);
    const [loading, setLoading] = useState(false);
    const [resendOTPLoding, setResendOTPLoding] = useState(false)
    const [timer, setTimer] = useState(15);
    const [canResend, setCanResend] = useState(false);

    const { from, data } = route.params || {};

    useEffect(() => {
        let countdown;
        if (!canResend) {
            countdown = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdown);
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [canResend]);

    const moveToNext = (text, index) => {
        if (text && index < 3) {
            inputs.current[index + 1]?.focus();
        }
        if (index === 3) Keyboard.dismiss();
    };

    const moveToPrevious = (e, index) => {
        if (e.nativeEvent.key === "Backspace") {
            const currentValue = watch(`otp${index + 1}`);
            if (!currentValue && index > 0) {
                inputs.current[index - 1]?.focus();
            }
        }
    };

    const _verifyOtp = async (otpData)=>{
        setLoading(true);
        let body = {
            "customerid":data?.customerid,
            "otp":`${otpData.otp1}${otpData.otp2}${otpData.otp3}${otpData.otp4}`
        }

        await postApi('OTPVerification', body).then((response) => {
            console.log(response);
            if (response.status == true) {
                reset()
                HelperFunctions.showMsg(response.msg,theme.success);
                navigation.navigate('login');
            } else {
                HelperFunctions.showMsg(response.msg, theme.primary);
            }
        }).catch((error) => {
            console.log(error)
            HelperFunctions.showMsg("Sorry! Internal server error. Please try again later", theme.primary);
        }).finally(() => {
            setLoading(false)
        })
    }

    const _handleResendOTP = async () => {

        setResendOTPLoding(true);
        let body = {
            "ContactNo":data?.contactno,
        }

        await postApi('ResendOTP', body).then((response) => {
            console.log(response);
            if (response.status == true) {
                reset();
                setTimer(15);
                setCanResend(false);
                HelperFunctions.showMsg(response.msg,theme.success);
            } else {
                HelperFunctions.showMsg(response.msg, theme.primary);
            }
        }).catch((error) => {
            console.log(error)
            HelperFunctions.showMsg("Sorry! Internal server error. Please try again later", theme.primary);
        }).finally(() => {
            setResendOTPLoding(false)
        })
    };

    return (
        <Container
            bgColor={[
                isDark ? theme.primary : theme.primary,
                isDark ? theme.primaryMedium : theme.primaryMedium,
                isDark ? theme.primaryDark : theme.primaryDark,
            ]}
        >
            <ImageBackground
                source={local_images.bg}
                resizeMode="cover"
                style={{ flex: 1 }}
            >
                <CustomHeader
                    title="Verification"
                    leftIconName="arrow-back-outline"
                    onLeftPress={() => navigation.goBack()}
                    iconColor={theme.white}
                    textColor={theme.white}
                />

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Text style={styles.title}>Enter OTP</Text>
                            <Text style={styles.subtitle}>
                                We've sent a 4-digit OTP code to your mobile +91 {data?.contactno}
                            </Text>

                            <View style={styles.otpContainer}>
                                {[1, 2, 3, 4].map((item, index) => (
                                    <Controller
                                        key={index}
                                        control={control}
                                        name={`otp${item}`}
                                        rules={{ required: true, maxLength: 1 }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                            key={index + value} 
                                            ref={(ref) => (inputs.current[index] = ref)}
                                            value={value}
                                            onChangeText={(text) => {
                                              const lastChar = text.slice(-1);
                                              onChange(lastChar);
                                              if (lastChar === "") {
                                                if (index > 0) {
                                                  inputs.current[index - 1]?.focus();
                                                }
                                              } else {
                                                moveToNext(lastChar, index);
                                              }
                                            }}
                                            onKeyPress={(e) => moveToPrevious(e, index)}
                                            style={[
                                              styles.otpInput,
                                              {
                                                borderColor: otpValues[index] ? theme.white : theme.secondary,
                                                textAlign: "center",              // 👈 center align horizontally
                                                textAlignVertical: "center",      // 👈 center align vertically
                                              },
                                            ]}
                                            keyboardType="numeric"
                                            maxLength={1}
                                            placeholder=""
                                            placeholderTextColor={isDark ? theme.secondary : theme.secondary}
                                            selectionColor={theme.white}
                                          />
                                          
                                        )}
                                    />
                                ))}
                            </View>

                            <View style={styles.resendContainer}>
                                {canResend ? (
                                    <TouchableOpacity onPress={_handleResendOTP}>
                                        <Text style={styles.resendTextActive}>
                                            Didn’t receive OTP?{" "}
                                            <Text style={styles.resendLink}>Resend</Text>
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <Text style={styles.resendText}>
                                        Resend code in {timer >= 10 ? '00:' + timer : '00:0' + timer}s
                                    </Text>
                                )}
                            </View>

                            <CustomButton
                                buttonText="Verify"
                                isLoading={loading}
                                disabled={Object.keys(errors).length > 0}
                                backgroundColor={
                                    Object.keys(errors).length === 0
                                        ? theme.secondary
                                        : "#999"
                                }
                                buttonTextStyle={{
                                    textAlign: "center",
                                    letterSpacing: 1.2,
                                    fontFamily: fontFamily.medium,
                                    color: theme.white,
                                    fontSize: sizes.buttonText,
                                }}
                                requireBorder={false}
                                borderColor={theme.white}
                                style={{
                                    width: "100%",
                                    borderRadius: 8,
                                    marginTop: 20,
                                    opacity: Object.keys(errors).length === 0 ? 1 : 0.6,
                                }}
                                onPress={handleSubmit(_verifyOtp)}
                            />
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                 <Loading visible={resendOTPLoding} />
            </ImageBackground>
        </Container>
    );
};

export default OTPVerification;

const getStyles = (theme, isDark) =>
    StyleSheet.create({
        scrollContainer: {
            flexGrow: 1,
            paddingHorizontal: 40,
            paddingBottom: 40,
            marginTop: 30,
        },
        title: {
            fontSize: 22,
            color: isDark ? theme.secondaryLight : theme.secondaryLight ,
            fontFamily: fontFamily.bold,
            textAlign: "left",
            marginBottom: 10,
        },
        subtitle: {
            fontSize: 14,
            color: isDark ? theme.secondary : theme.secondary,
            fontFamily: fontFamily.medium,
            textAlign: "left",
            marginBottom: 20,
            marginRight:22,
            lineHeight:21
        },
        otpContainer: {
            flexDirection: "row",
            justifyContent: "flex-start", // left align
            alignItems: "center",
            marginBottom: 25,
          },
          
          otpInput: {
            width: 55, // smaller width for inputs
            height: 55,
            marginRight: 12, // balanced gap between inputs
            fontSize: sizes.subtitle,
            fontFamily: fontFamily.bold,
            textAlign: "center",
            color: theme.white,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: theme.secondary,
            backgroundColor: "rgba(255,255,255,0.05)",
          },
        resendContainer: {
            alignItems: "flex-start",
            marginTop: 5,
            marginBottom: 25,
        },
        resendText: {
            fontSize: 14,
            color: theme.secondaryLight,
            fontFamily: fontFamily.medium,
            textAlign: "center",
        },
        resendTextActive: {
            fontSize: 14,
            color: theme.secondary,
            fontFamily: fontFamily.medium,
            textAlign: "center",
        },
        resendLink: {
            color: theme.secondaryLight,
            fontFamily: fontFamily.bold,
        },
    });
