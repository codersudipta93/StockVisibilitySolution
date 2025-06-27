import React, { useEffect, useState } from "react";
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
    TouchableOpacity,
} from "react-native";
import { useTheme } from "../constants/themeProvider";
import {
    Container,
    CustomButton,
    CustomTextInput,
    CustomHeader,
    CustomSelectInput,
    Loading,
} from "../components";
import {
    fontFamily,
    sizes,
    device,
    local_images,
    HelperFunctions
} from "../constants";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { postApi } from "../services/apis";
import { useSelector, useDispatch } from "react-redux";
import { setStateList } from "../redux/projectReducer";

const Registration = () => {
    const navigation = useNavigation();
    const { isDark, theme } = useTheme();
    const styles = getStyles(theme, isDark, device.width);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { listData, stateList } = useSelector((state) => state.project);

    const {
        control,
        handleSubmit,
        getValues,
        reset,
        formState: { isValid },
    } = useForm({ mode: "onChange", defaultValues: { "terms": false, "referencecode": "" } });

    useEffect(() => {
        setLoading(true);
        _loadState();
    }, []);

    const _loadState = () => {
        postApi("StateSelectAll", {})
            .then((res) => {
                if (res?.status === true) {
                    if (res?.data) {
                        let data = res?.data;
                        let stateOptions = data.map(({ statename: label, statemasterId: value }) => ({ label, value }));
                        console.log(stateOptions)
                        dispatch(setStateList(stateOptions));
                    }
                }
            })
            .catch((err) => console.log(err))
            .finally(() =>
                setTimeout(() => { setLoading(false) }, 1200));
    };

    const _doSignup = async (data) => {
        setLoading(true)
        let body = {
            "contactno": data?.contactno,
            "customername": data?.firstName + " " + data?.lastName,
            "password": data?.password,
            "preferredstatemasterid": data?.selectedState?.value,
            "referencecode": data?.referencecode
        }

        console.log(body);
        await postApi('CustomerRegistration', body).then((response) => {
            console.log(response);
            if (response.status == true) {
                reset()
                HelperFunctions.showMsg(response.msg,theme.success);
                navigation.navigate('OTPVerification',{from:"regitstration", data:response?.data});
            } else {
                HelperFunctions.showMsg(response.msg, theme.primary);
            }
        }).catch((error) => {
            console.log(error)
            HelperFunctions.showMsg("Sorry! Internal server error. Please try again later",theme.primary);
        }).finally(() => {
            setLoading(false)
        })
    };



    return (
        <Container bgColor={[theme.primary, theme.primaryMedium, theme.primaryDark]}>
            <StatusBar barStyle="light-content" backgroundColor={theme.primary} />
            <ImageBackground source={local_images.bg} resizeMode="cover" style={styles.imageBackground}>
                <CustomHeader
                    title="Create Your Account"
                    leftIconName="arrow-back-outline"
                    onLeftPress={() => navigation.goBack()}
                    iconColor={theme.white}
                    textColor={theme.white}
                />
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>
                            <View style={styles.card}>
                                <View style={styles.row}>
                                    <CustomTextInput
                                        control={control}
                                        name="firstName"
                                        placeholder="First Name"
                                        rules={{ required: "First name is required" }}
                                        inputWidth="48%"
                                        iconLeft={<Icon name="person-outline" size={20} color={theme.icon} />}
                                        {...inputThemeProps(isDark, theme)}
                                    />
                                    <CustomTextInput
                                        control={control}
                                        name="lastName"
                                        placeholder="Last Name"
                                        rules={{ required: "Last name is required" }}
                                        inputWidth="48%"
                                        iconLeft={<Icon name="person-outline" size={20} color={theme.icon} />}
                                        {...inputThemeProps(isDark, theme)}
                                    />
                                </View>

                                <CustomTextInput
                                    control={control}
                                    name="contactno"
                                    maxLength={10}
                                    placeholder="Contact Number"
                                    keyboardType="phone-pad"
                                    rules={{
                                        required: "Contact number is required",
                                        pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
                                    }}
                                    iconLeft={<Icon name="call-outline" size={20} color={theme.icon} />}
                                    {...inputThemeProps(isDark, theme)}
                                />

                                <CustomSelectInput
                                    name="selectedState"
                                    control={control}
                                    rules={{ required: "State is required" }}
                                    placeholder="Select Category"
                                    data={stateList || []}
                                    iconLeft={<Icon name="earth" size={20} color={theme.secondary} />}
                                    {...selectInputThemeProps(isDark, theme)}
                                />

                                <CustomTextInput
                                    control={control}
                                    name="password"
                                    placeholder="Password"
                                    secureTextEntry={!showPassword}
                                    iconLeft={<Icon name="lock-closed-outline" size={20} color={theme.icon} />}
                                    iconRight={
                                        <Icon
                                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                                            size={20}
                                            color={theme.icon}
                                            onPress={() => setShowPassword((prev) => !prev)}
                                        />
                                    }
                                    rules={{
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Min 6 characters" },
                                    }}
                                    {...inputThemeProps(isDark, theme)}
                                />

                                <CustomTextInput
                                    control={control}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    secureTextEntry={!showPassword}
                                    iconLeft={<Icon name="lock-closed-outline" size={20} color={theme.icon} />}
                                    iconRight={
                                        <Icon
                                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                                            size={20}
                                            color={theme.icon}
                                            onPress={() => setShowPassword((prev) => !prev)}
                                        />
                                    }
                                    rules={{
                                        required: "Confirm your password",
                                        minLength: { value: 6, message: "Min 6 characters" },
                                        validate: (value) => value === getValues("password") || "Passwords do not match",
                                    }}
                                    {...inputThemeProps(isDark, theme)}
                                />

                                <CustomTextInput
                                    control={control}
                                    name="referenceCode"
                                    placeholder="Reference Code (Optional)"
                                    iconLeft={<Icon name="pricetag-outline" size={20} color={theme.icon} />}
                                    {...inputThemeProps(isDark, theme)}
                                />

                                <Controller
                                    control={control}
                                    name="terms"
                                    defaultValue={false}
                                    rules={{ required: "You must agree to the terms" }}
                                    render={({ field: { onChange, value } }) => (
                                        <View style={styles.termsContainer}>
                                            <TouchableOpacity
                                                onPress={() => onChange(!value)}
                                                style={styles.checkboxContainer}
                                            >
                                                <View style={[styles.checkbox, value && styles.checkedBox]}>
                                                    {value && <Icon name="checkmark" size={14} color="#fff" />}
                                                </View>
                                                <Text style={[styles.termsText, { color: value ? theme.white : theme.secondary }]}>I agree to all the Terms & Conditions</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />

                                <CustomButton
                                    buttonText="Create Account"
                                    isLoading={false}
                                    disabled={!isValid}
                                    backgroundColor={isValid ? theme.secondary : "#999"}
                                    buttonTextStyle={{
                                        textAlign: "center",
                                        letterSpacing: 1.2,
                                        fontFamily: fontFamily.medium,
                                        color: theme.white,
                                        fontSize: sizes.buttonText,
                                    }}
                                    requireBorder={false}
                                    style={{ width: "100%", borderRadius: 8, marginTop: 20, opacity: isValid ? 1 : 0.6 }}
                                    onPress={handleSubmit(_doSignup)}
                                />

                                <View style={{ marginTop: 28, alignItems: "center" }}>
                                    <Text style={{ color: theme.secondary, fontFamily: fontFamily.regular, fontSize: sizes.bodyDeafult }}>
                                        Already have an account?{' '}
                                        <Text
                                            style={{ color: theme.secondaryLight, fontFamily: fontFamily.bold }}
                                            onPress={() => navigation.navigate("Login")}
                                        >
                                            Login
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <Loading visible={loading} />
            </ImageBackground>
        </Container>
    );
};

export default Registration;

const inputThemeProps = (isDark, theme) => ({
    inputTextColor: theme.white,
    placeholderTextColor: theme.secondary,
    borderColor: theme.secondary,
    errorBorderColor: theme.error,
    errorTextColor: theme.primaryLight,
    iconColor: theme.secondaryLight,
    bgColor: "rgba(255,255,255,0.05)",
});

const selectInputThemeProps = (isDark, theme) => ({
    inputTextColor: theme.white,
    placeholderTextColor: theme.secondary,
    borderColor: theme.secondary,
    errorBorderColor: theme.error,
    errorTextColor: theme.primaryLight,
    iconColor: theme.secondary,
    bgColor: "rgba(255,255,255,0.05)",
    modalBgColor: theme.secondary,
    modalOptionLabelColor: theme.primaryDark,
    modalOptionBorderColor: theme.secondaryLight,
    modalSearchPlaceholderColor: theme.secondaryLight,
    modalSearchTextColor: theme.black,
    modalInputBorderColor: theme.primaryDark,
});

const getStyles = (theme, isDark, width) =>
    StyleSheet.create({
        imageBackground: { flex: 1 },
        scrollContainer: { flexGrow: 1, paddingVertical: 25 },
        card: { width, padding: 20, borderRadius: 10, alignSelf: "center" },
        row: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
        termsContainer: { marginTop: 10, marginBottom: 10, alignItems: "flex-start", width: "100%" },
        checkboxContainer: { flexDirection: "row", alignItems: "center" },
        checkbox: { width: 20, height: 20, borderWidth: 1.5, marginRight: 10, justifyContent: "center", alignItems: "center", borderRadius: 4, borderColor: theme.secondary },
        checkedBox: { backgroundColor: theme.secondary, borderColor: theme.secondary },
        termsText: { fontFamily: fontFamily.regular, fontSize: sizes.bodySmall },
    });
