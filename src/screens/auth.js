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
    Animated
} from "react-native";
import { useTheme } from "../constants/themeProvider";
import { Container, CustomButton, CustomTextInput } from "../components";
import { fontFamily, sizes, device, local_images, HelperFunctions } from "../constants";
import { useForm } from "react-hook-form";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';

import * as Animatable from 'react-native-animatable';


const Auth = () => {
    const navigation = useNavigation();
    const { isDark, theme } = useTheme();
    const styles = getStyles(theme, isDark, device.width);


    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({
        mode: "onChange",
        shouldUnregister: false,
        defaultValues: { "fcmid": "XYZTRACAVS" },
    });

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 2500)

    }, [])


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
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Animatable.Image
                        style={{
                            width: 400,
                            height: 120,
                            objectFit: 'contain'
                        }}
                        source={local_images.tata_logo}
                        animation="zoomInUp"
                    />
                </View>
                <Image style={styles.footer} source={local_images.footer} />
            </ImageBackground>
        </Container>
    );
};

export default Auth;

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
        card: { width, padding: 20, borderRadius: 10, alignSelf: "left", paddingHorizontal: 40, marginTop: 70 },

        text: {
            fontFamily: fontFamily.bold,
            fontSize: sizes.titleMedium,
        },
        subText: {
            fontFamily: fontFamily.regular,
            fontSize: sizes.bodyDeafult + 1,
            marginTop: 12,
            marginBottom: 40,
            textAlign: 'left'
        },
        forgotText: {
            alignSelf: "flex-end",
            fontSize: sizes.bodySmall + 1,
            marginBottom: 8,
        },
        logo: {
            width: 100,
            height: 100,
            resizeMode: "cover",
            marginBottom: 12,
        },
        footer: {
            width: '100%',
            height: 40,
            resizeMode: "contain",
            //marginBottom: 12,
        }
    });
