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
    FlatList,
    Image,
    Pressable,
    BackHandler,
    Alert,

} from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Container, CustomButton, CustomHeader, ConfirmationModal, SkeletonLoader, SchemeCard, NotFound } from "../components";
import { useTheme } from "../constants/themeProvider";
import { fontFamily, sizes, device, local_images, HelperFunctions } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { postApi } from "../services/apis";
import { setData, getData, deleteData, clearAllData } from '../services/storage';
import LinearGradient from "react-native-linear-gradient";
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { setToken, setUserData } from '../redux/projectReducer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AvailableScheme = () => {
    const dispatch = useDispatch();
    const { token, userData } = useSelector((state) => state.project);

    const navigation = useNavigation();
    const route = useRoute();

    const { theme, isDark } = useTheme();
    const styles = getStyles(theme, isDark);

    const [loading, setLoading] = useState(false);
    const [availableScheme, setAvailableScheme] = useState("");
    const [backBtnModalVisible, setbackBtnModalVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
        }, [])
    );



    useEffect(() => {
        const token = getData('userDatad');
        console.log(token);
        getAvailableScheme()
    }, [])


    const [modalVisible, setModalVisible] = useState(false);

    const handleLogout = () => {
        // Perform logout operations here
        console.log('User logged out');
        clearAllData()
        setModalVisible(false);
        navigation.replace('login')

    };

    const getAvailableScheme = async () => {
        console.log(userData)
        console.log(token)
        setLoading(true);
        let uData = JSON.parse(userData)
        let body = {
            "customerId": uData?.customerid,
            "token": token
        }
        await postApi('SchemeList', body).then((response) => {
            console.log(response);
            if (response.status == true) {
                console.log(response.data);
                setAvailableScheme(response.data)
            } else {
                clearAllData()
                setUserData("");
                setToken("");
                HelperFunctions.showMsg(response.msg, theme.primary);
                navigation.replace('Login')
            }
        }).catch((error) => {
            console.log(error)
            HelperFunctions.showMsg("Sorry! Internal server error. Please try again later", theme.primary);
        }).finally(() => {
            setLoading(false)
        })
    }

    const schemeList = ({ item }) => (
        <SchemeCard
            item={item}
            theme={theme}
            mode={isDark}
            onPress={(item) => {
                console.log('Selected:', item.SchemeId)
                navigation.navigate('SchemeDetailScreen', { from: "avialbleScheme", data: { SchemeId: item?.SchemeId, SchemeName: item?.SchemeName } });
            }}
        >
            <View style={styles.titleRow}>
                <Text style={[styles.schemeName, { color: theme.primaryDark }]}>
                    {item.SchemeName}
                </Text>
                <View style={styles.iconWrapper}>
                    <Icon
                        name="chevron-right"
                        size={22}
                        color={theme.primaryDark}
                    />
                </View>
            </View>

            {/* EMI */}
            <View style={styles.detailRow}>
                <Text style={styles.label}>EMI</Text>
                <Text style={styles.value}>₹ {item.EMIAmount}</Text>
            </View>

            {/* Duration */}
            <View style={styles.detailRow}>
                <Text style={styles.label}>Duration</Text>
                <Text style={styles.value}>{item.NoOfMonths} Months</Text>
            </View>

            {/* Type */}
            <View style={styles.detailRow}>
                <Text style={styles.label}>Type</Text>
                <Text style={styles.value}>{item.AmtorWgt}</Text>
            </View>
        </SchemeCard>
    );

    const skelitonRender = ({ item }) => (
        <SkeletonLoader width={450} height={300} borderRadius={4}
            style={styles.skelitonCard}
            shimmerColors={[theme.primary, theme.primaryMedium]}
        />
    );

    return (
        <Container
            bgColor={[

                isDark ? theme.primaryMedium : theme.primaryMedium,
                isDark ? theme.primaryMedium : theme.primaryMedium,
                //  isDark ? theme.primaryDark : theme.primaryDark,
            ]}
        >

            <CustomHeader
                title="Scheme List"
                leftIconName="chevron-back"
                rightIconName={"search"}
                onLeftPress={() => navigation.goBack()}
                iconColor={theme.white}
                textColor={theme.white}
                backgroundColor={theme.primary}
            />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >

                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    {loading == true ?
                        <>
                            <FlatList
                                data={[1, 1, 1, 1]}
                                renderItem={skelitonRender}
                                contentContainerStyle={styles.container}
                            />
                        </>
                        :
                        availableScheme != "" ?
                            <FlatList
                                data={availableScheme}
                                renderItem={schemeList}
                                contentContainerStyle={styles.container}
                            />
                            :
                            <NotFound />
                    }


                </ScrollView>

            </KeyboardAvoidingView>


            <ConfirmationModal
                visible={backBtnModalVisible}
                title="Hold on!"
                msg="Are you sure you want to go back?"
                confrimBtnText="Yes"
                onConfirm={() => {
                    setbackBtnModalVisible(false)
                    BackHandler.exitApp()
                }
                }
                onCancel={() => setbackBtnModalVisible(false)}
            />
        </Container>
    );
};

export default AvailableScheme;

const getStyles = (theme, isDark) =>
    StyleSheet.create({
        scrollContainer: {
            flexGrow: 1,
            paddingHorizontal: 12,
            paddingBottom: 40,
            marginTop: 5,
        },
        title: {
            fontSize: 22,
            color: isDark ? theme.secondaryLight : theme.secondaryLight,
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
            marginRight: 22,
            lineHeight: 21
        },

        card: {
            //backgroundColor: isDark ? theme.border : "#d9d9d9",
            //alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            margin: 10,
            height: device.width / 2.5 - 30, // Adjust height to maintain aspect ratio
            borderRadius: 10,
            // iOS shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            // Android shadow
            elevation: 5,
            paddingLeft: 12
        },
        skelitonCard: {
            backgroundColor: theme.primaryMedium,
            justifyContent: 'center',
            flex: 1,
            margin: 10,
            marginLeft: 0,
            height: device.width / 2.5 - 30, // Adjust height to maintain aspect ratio
            // iOS shadow
            paddingLeft: 12
        },
        cardText: {
            marginTop: 10,
            fontSize: sizes.buttonText,
            fontFamily: fontFamily.bold,
            color: theme.primaryDark,
        },
        titleRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        schemeName: {
            fontSize: 18,
            fontFamily: fontFamily.bold,
            flex: 1,
            marginRight: 8,
            textTransform: 'capitalize'
        },
        iconWrapper: {
            backgroundColor: "#c2c2c2",
            borderRadius: 20,
            padding: 4,
            elevation: 3,
        },
        detailRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 4.5,
            borderBottomColor: theme.secondary,
            borderBottomWidth: 1,
            paddingBottom: 4

        },
        label: {
            fontSize: 14,
            fontFamily: fontFamily.medium,
            color: theme.primaryMedium,
            marginBottom: 6
        },
        value: {
            fontSize: 14,
            fontFamily: fontFamily.semibold,
            color: theme.primaryMedium,
            marginBottom: 6
        },
    });
