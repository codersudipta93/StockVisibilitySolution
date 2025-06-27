import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    StatusBar,
    TouchableOpacity
} from "react-native";
import { Container, CustomHeader, ConfirmationModal } from "../components";
import { useTheme } from "../constants/themeProvider";

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { fontFamily, sizes, device, local_images, HelperFunctions } from "../constants";
import { colors } from "../constants/theme";

const ProfileView = () => {
    const { theme, isDark } = useTheme();
    const navigation = useNavigation();
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // Sample user data
    const userData = {
        name: 'ALF ENGINEERING PVT LTD',
        location: 'PLOT NO-74A, SECTOR-11,TATA VENDOR',
        email: 'alfengineering@gmail.com',
        mobile: '9876543210',
        gstNumber: '05AAFCA6242G1ZZ',
        panNumber: 'AAFCA6242G',
        profilePhoto: null // Can be a URI if you have an image
    };

    const handleLogout = () => {
        setModalVisible(false);
        navigation.replace('Login')
    };

    const confirmLogout = () => {
        // Add your logout logic here
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <Container
            bgColor={[
                isDark ? theme.primary : theme.primary,
                isDark ? theme.primary : theme.primary,
                "#0b3866",
            ]}
        >
            {/* <StatusBar barStyle={isDark ? "light-content" : "dark-content"} /> */}
            <CustomHeader
                title="My Profile"
                leftIconName="chevron-back"
                onLeftPress={() => navigation.goBack()}
                iconColor={theme.black}
                textColor={theme.black}
                backgroundColor={theme.white}
            />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={[styles.profileContainer, {}]}>
                    {/* Profile Photo Section */}
                    <View style={styles.profilePhotoContainer}>
                        <View style={[styles.profileImageWrapper, { borderColor: isDark ? theme.primary : theme.primary }]}>
                            {userData.profilePhoto ? (
                                <Image source={local_images.customer} style={[styles.profileImage, {}]} />
                            ) : (
                                <Image source={local_images.customer} style={styles.profileImage} />
                            )}
                        </View>
                        <Text style={[styles.userName, { color: isDark ? theme.white : theme.white }]}>{userData.name}</Text>
                    </View>

                    {/* Personal Information Section */}
                    <View style={[styles.sectionContainer]}>
                        <Text style={[styles.sectionTitle, { color: isDark ? theme.white : theme.white, fontFamily: fontFamily.bold, fontSize: 18 }]}>Personal Information</Text>

                        <View style={styles.infoRow}>
                            <Icon name="location-outline" size={20} color={isDark ? theme.white : theme.white} />
                            <Text style={[styles.infoText, { color: isDark ? theme.white : theme.white }]}>{userData.location}</Text>
                        </View>
                    </View>

                    {/* Contact Information Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={[styles.sectionTitle, { color: isDark ? theme.white : theme.white, fontFamily: fontFamily.bold, fontSize: 18 }]}>Contact Information</Text>

                        <View style={styles.infoRow}>
                            <Icon name="mail-outline" size={20} color={isDark ? theme.white : theme.white} />
                            <Text style={[styles.infoText, { color: isDark ? theme.white : theme.white }]}>{userData.email}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Icon name="call-outline" size={20} color={isDark ? theme.white : theme.white} />
                            <Text style={[styles.infoText, { color: isDark ? theme.white : theme.white }]}>+91 {userData.mobile}</Text>
                        </View>
                    </View>

                    {/* Business Information Section */}
                    <View style={styles.sectionContainer}>
                        <Text style={[styles.sectionTitle, { color: isDark ? theme.white : theme.white, fontFamily: fontFamily.bold, fontSize: 18 }]}>Business Information</Text>

                        <View style={styles.infoRow}>
                            <Icon name="document-text-outline" size={20} color={theme.white} />
                            <Text style={[styles.infoText, { color: isDark ? theme.white : theme.white }]}>GST: {userData.gstNumber}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Icon name="document-outline" size={20} color={isDark ? theme.white : theme.white} />
                            <Text style={[styles.infoText, { color: isDark ? theme.white : theme.white }]}>PAN: {userData.panNumber}</Text>
                        </View>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={[styles.logoutButton, { backgroundColor: isDark ? theme.black : theme.black }]}
                       onPress={()=>{setModalVisible(true)}}
                    >
                        <Icon name="log-out-outline" size={20} color={isDark ? theme.white : theme.white} />
                        <Text style={[styles.logoutButtonText, { color: isDark ? theme.white : theme.white }]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    profileContainer: {
        flex: 1,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 10,
    },
    profilePhotoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImageWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    profileImage: {
        width: '75%',
        height: '100%',
        borderRadius: 60,

    },
    userName: {
        fontSize: 20,
        fontFamily: fontFamily.bold,
        marginTop: 15,
        marginBottom: 18
    },
    sectionContainer: {
        marginBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#49d5c6',
        paddingBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: fontFamily.bold,
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        fontFamily: fontFamily.regular,
        marginLeft: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 20,
    },
    logoutButtonText: {
        fontFamily: fontFamily.medium,
        fontSize: 16,
        marginLeft: 10,
    },
});

export default ProfileView;