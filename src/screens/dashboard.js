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
    Animated,
    StatusBar
} from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Container, CustomButton, CustomHeader, Loading, ConfirmationModal, SkeletonLoader, FloatingTabBar } from "../components";
import { useTheme } from "../constants/themeProvider";
import { fontFamily, sizes, device, local_images, HelperFunctions } from "../constants";
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation, useRoute } from "@react-navigation/native";

const Dashboard = () => {

    const { theme, isDark } = useTheme();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);


     const handleLogout = () => {
        // Perform logout operations here
        setModalVisible(false);
        navigation.replace('Login')
    };


    return (
        <Container
            bgColor={[
                isDark ? theme.primary : theme.primary,
                isDark ? theme.primary : theme.primary,

                "#0b3866",
                // "#40c0b2",
                // "#EDDD53",
            ]}
        >

            <CustomHeader
                title="Home"
                leftIconName="menu"
                rightIconName="log-out-outline"
                onRightPress={() => setModalVisible(true)}
                iconColor={theme.black}
                textColor={theme.black}
                backgroundColor={theme.white}
            />
            {/* Header Section */}

            <ImageBackground
                source={local_images.dashboard_bg}
                resizeMode="cover"
                style={styles.container}
            >
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeText}>Welcome Back</Text>
                        <Text style={styles.userName}>ALF ENGINEERING PVT LTD</Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <Icon name="location-sharp" size={16} color={theme.primary} />
                        <Text style={styles.locationText}>Plot no-74a, sector-11,tata vendor</Text>
                    </View>
                </View>

                {/* Main Content */}
                <ScrollView style={styles.content}>
                    {/* Stock Report Card */}

                    {/* Purchase history Card */}
                    <TouchableOpacity onPress={() => { navigation.navigate('PurchaseHistoryScreen') }} style={[styles.card, { borderLeftColor: theme.black }]}>
                        <View style={styles.cardLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: "#cdfbf6" }]}>
                                <Image style={{ height: 38, width: 38, resizeMode: 'contain' }} source={local_images.purchase} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={[styles.cardTitle, { fontFamily: fontFamily.bold }]}>Purchase History</Text>
                                <Text style={[styles.cardSubtitle, { fontFamily: fontFamily.medium }]}>Analyze by customer</Text>
                            </View>
                        </View>
                        <Icon name="chevron-forward" size={20} color="#a5b1c2" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate('RMFGStock') }} style={[styles.card, { borderLeftColor: theme.black }]}>
                        <View style={styles.cardLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: "#cdfbf6" }]}>
                                {/* <Icon name="cube-sharp" size={24} color="#4b7bec" /> */}
                                <Image style={{ height: 35, width: 45, resizeMode: 'contain' }} source={local_images.fgrm} />
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={[styles.cardTitle, { fontFamily: fontFamily.bold }]}>RM Stock</Text>
                                <Text style={[styles.cardSubtitle, { fontFamily: fontFamily.medium }]}>View current inventory levels</Text>
                            </View>

                        </View>
                        <Icon name="chevron-forward" size={20} color="#a5b1c2" />
                    </TouchableOpacity>
                     <TouchableOpacity onPress={() => { navigation.navigate('ProfileView') }} style={[styles.card, { borderLeftColor: theme.black }]}>
                        <View style={styles.cardLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: "#cdfbf6" }]}>
                                {/* <Icon name="cube-sharp" size={24} color="#4b7bec" /> */}
                                <Image style={{ height: 35, width: 45, resizeMode: 'contain' }} source={local_images.customer} />
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={[styles.cardTitle, { fontFamily: fontFamily.bold }]}>My Profile</Text>
                                <Text style={[styles.cardSubtitle, { fontFamily: fontFamily.medium }]}>Manage your profile</Text>
                            </View>

                        </View>
                        <Icon name="chevron-forward" size={20} color="#a5b1c2" />
                    </TouchableOpacity>
                     <TouchableOpacity onPress={() => { navigation.navigate('Complain') }} style={[styles.card, { borderLeftColor: theme.black }]}>
                        <View style={styles.cardLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: "#cdfbf6" }]}>
                                {/* <Icon name="cube-sharp" size={24} color="#4b7bec" /> */}
                                <Image style={{ height: 35, width: 55, resizeMode: 'contain' }} source={local_images.chat} />
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={[styles.cardTitle, { fontFamily: fontFamily.bold }]}>Connect TSDPL</Text>
                                <Text style={[styles.cardSubtitle, { fontFamily: fontFamily.medium }]}>Register your complain</Text>
                            </View>

                        </View>
                        <Icon name="chevron-forward" size={20} color="#a5b1c2" />
                    </TouchableOpacity>

                     <TouchableOpacity onPress={() => { navigation.navigate('AdminPannel') }} style={[styles.card, { borderLeftColor: theme.black }]}>
                        <View style={styles.cardLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: "#cdfbf6" }]}>
                                {/* <Icon name="cube-sharp" size={24} color="#4b7bec" /> */}
                                <Image style={{ height: 35, width: 55, resizeMode: 'contain' }} source={local_images.settings} />
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={[styles.cardTitle, { fontFamily: fontFamily.bold }]}>Visibility Control By Admin</Text>
                                <Text style={[styles.cardSubtitle, { fontFamily: fontFamily.medium }]}>Manage visibility access </Text>
                            </View>

                        </View>
                        <Icon name="chevron-forward" size={20} color="#a5b1c2" />
                    </TouchableOpacity>

                </ScrollView>

                {/* Footer Action */}
                {/* <TouchableOpacity style={styles.resetButton}>
                    <Icon name="key-sharp" size={18} color="#4b7bec" />
                    <Text style={styles.resetButtonText}>Reset Password</Text>
                </TouchableOpacity> */}


            </ImageBackground>
             <ConfirmationModal
                visible={modalVisible}
                title="Confirm Logout"
                msg="Are you sure you want to log out?"
                confrimBtnText="Confrim"
                onConfirm={handleLogout}
                onCancel={() => setModalVisible(false)}
            />


        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#4aa399',
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    header: {
        marginTop: 44,
        marginBottom: 32,
    },
    welcomeText: {
        fontSize: 16,
        color: '#ffff',
        marginBottom: 4,
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffff',
        textTransform: 'uppercase'
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1fffd',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: 12,
    },
    locationText: {
        fontSize: 14,
        color: "#4aa399",
        marginLeft: 6,
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    content: {
        flex: 1,
        marginTop: 20
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        borderLeftWidth: 4,
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 24,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2d3436',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#778ca3',
    },
    resetButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        marginBottom: 16,
    },
    resetButtonText: {
        color: '#4b7bec',
        fontWeight: '600',
        marginLeft: 8,
        fontSize: 16,
    },
    footer: {
        width: '100%',
        height: 40,
        resizeMode: "contain",
        //marginBottom: 12,
    }
});

export default Dashboard;