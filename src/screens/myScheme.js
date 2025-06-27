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
import { Container, CustomButton, SearchBarWithLoader, CustomHeader, ConfirmationModal, SkeletonLoader, SchemeCard, NotFound, DateRangeSearchBar } from "../components";
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


const MyScheme = () => {
    const dispatch = useDispatch();
    const { token, userData } = useSelector((state) => state.project);

    const navigation = useNavigation();
    const route = useRoute();

    const { theme, isDark } = useTheme();
    const styles = getStyles(theme, isDark);

    const [loading, setLoading] = useState(false);
    const [myScheme, setMyScheme] = useState("");
    const [backBtnModalVisible, setbackBtnModalVisible] = useState(false);
    const [redeemAlertVisibility, setRedeemStatus] = useState(false)


    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
        }, [])
    );

    useEffect(() => {
        const token = getData('userDatad');
        console.log(token);
        getMyScheme()
    }, [])


    const handleSearch = async (query) => {
        Keyboard.dismiss()
        getMyScheme(query)

    };


    const getMyScheme = async (query) => {

        console.log(userData)
        let uData = JSON.parse(userData)
        console.log(token)
        setLoading(true);
        let body = {
            "customerId": uData?.customerid,
            "token": token,
            "SearchText": query ? query : "",
            "FromDate": fromDate ? HelperFunctions.formatDate(fromDate) : "",
            "ToDate": toDate ? HelperFunctions.formatDate(toDate) : ""
        }
        await postApi('MyScheme', body).then((response) => {
            console.log(response);
            if (response.status == true) {
                console.log(response.data);
                setMyScheme(response.data)
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

    const moreDetails = (index) => {

        let data = JSON.parse(JSON.stringify(myScheme));
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            if (i == index) {
                data[i].showDetails = !data[i].showDetails;
            } else {
                data[i].showDetails = false;
            }
        }

        setMyScheme(data)
    }

    const schemeList = ({ item, index }) => (
        <SchemeCard
            item={item}
            theme={theme}
            mode={isDark}
            onPress={(item) => {
                console.log('Selected:', item.SchemeId)
                //navigation.navigate('SchemeDetailScreen', { from: "avialbleScheme", data: { SchemeId: item?.SchemeId, SchemeName: item?.SchemeName } });
            }}
        >
            <View style={styles.titleRow}>
                <Text style={[styles.schemeName, { color: theme.primaryDark }]}>
                    {item.SchemeName}
                </Text>
                <Pressable style={styles.iconWrapper} onPress={() => { moreDetails(index) }}>
                    <Icon
                        name={item?.showDetails ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                        size={22}
                        color={theme.primaryDark}
                    />
                </Pressable>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Subscription Date</Text>
                <Text style={styles.value}>{item.SubscriptionDate}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>EMI Amount</Text>
                <Text style={styles.value}>₹ {item.EmiAmount}</Text>
            </View>

            {item?.showDetails ? <>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>PassBook Number</Text>
                    <Text style={styles.value}>{item.PassbookNo}</Text>
                </View>

                {/* Type */}
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Type</Text>
                    <Text style={styles.value}>{item.AmtorWgt}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Paid Amount</Text>
                    <Text style={styles.value}>₹ {item.PaidAmount}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Total Month</Text>
                    <Text style={styles.value}>{item.NoOfMonths}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Pending Month</Text>
                    <Text style={styles.value}>{item.PendingMonth}</Text>
                </View>

                {/* Next payment date */}
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Next Payment Date</Text>
                    <Text style={styles.value}>{item.NextPayDate}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Maturity Date</Text>
                    <Text style={styles.value}>{item.NextPayDate}</Text>
                </View>

                <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.label}>Scheme Holder</Text>
                    <Text style={styles.value}>{item.SchemeHolder}</Text>
                </View>

                <View style={styles.buttonRow}>
                    <CustomButton
                        buttonText="View Details"
                        height={40}
                        backgroundColor={theme.primary}
                        style={{ width: '35%' }}
                        onPress={() => { navigation.navigate('SchemeDetailScreen', { from: "MyScheme", data: { SchemeId: item?.SchemeId, SchemeName: item?.SchemeName } }); }}
                    />
                    {item?.IsRedeem != "0"?
                        <CustomButton
                            buttonText="Redeem"
                            height={40}
                            backgroundColor={theme.info}
                            style={{ width: '25%', marginLeft: 10 }}
                            onPress={() => { setRedeemStatus(true) }}
                        /> : null}
                    <CustomButton
                        buttonText="Pay Now"
                        height={40}
                        backgroundColor={theme.success}
                        style={{ width: '25%', marginLeft: 10 }}
                    />
                </View> </> : null}

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
                title="My Scheme"
                leftIconName="chevron-back"
                //rightIconName={"search"}
                onLeftPress={() => navigation.goBack()}
                iconColor={theme.white}
                textColor={theme.white}
                backgroundColor={theme.primary}
            />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <DateRangeSearchBar
                    fromDate={fromDate}
                    toDate={toDate}
                    onFromDateChange={setFromDate}
                    onToDateChange={setToDate}
                    showFromPicker={showFromPicker}
                    showToPicker={showToPicker}
                    setShowFromPicker={setShowFromPicker}
                    setShowToPicker={setShowToPicker}
                    theme={theme}
                />

                <SearchBarWithLoader
                    onSearch={handleSearch}

                />

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
                        </> :

                        myScheme != "" ?
                            <FlatList
                                data={myScheme}
                                renderItem={schemeList}
                                contentContainerStyle={styles.container}
                            />
                            :
                            <NotFound />
                    }

                </ScrollView>

            </KeyboardAvoidingView>

            <ConfirmationModal
                visible={redeemAlertVisibility}
                title="Alert!"
                msg="Please contact us to nearest brach to redeem"
                confrimBtnText="Understand"
                onConfirm={() => {
                    setRedeemStatus(false)
                }
                }
                onCancel={() => setRedeemStatus(false)}
            />



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

export default MyScheme;

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

        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            borderTopWidth: 1.5,
            borderTopColor: theme.secondary,
            paddingTop: 12,
            marginTop: 25
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
