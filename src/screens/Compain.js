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
    StatusBar,
    Dimensions
} from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Container, CustomButton, CustomHeader, Loading, ConfirmationModal, SkeletonLoader, FloatingTabBar } from "../components";
import { useTheme } from "../constants/themeProvider";
import { fontFamily, sizes, device, local_images, HelperFunctions } from "../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";

import DateTimePicker from '@react-native-community/datetimepicker';

const Complain = () => {
    const { theme, isDark } = useTheme();
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedComplaintType, setSelectedComplaintType] = useState(null);

    const complaintTypes = [
        { id: 1, name: "Electricity Issue" },
        { id: 2, name: "Water Problem" },
        { id: 3, name: "Maintenance" },
        { id: 4, name: "Security Concern" },
        { id: 5, name: "Sanitation" },
        { id: 6, name: "Other" },
    ];

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            subject: '',
            description: '',
            location: '',
            priority: 'medium',
            anonymous: false
        }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            // Add attachments and complaint type to form data
            const formData = {
                ...data,
                complaintType: selectedComplaintType,
                attachments,
                date: date.toISOString()
            };

            console.log('Form submitted:', formData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setShowConfirmation(true);
            reset();
            setAttachments([]);
            setSelectedComplaintType(null);
        } catch (error) {
            Alert.alert("Error", "Failed to submit complaint. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddAttachment = async () => {
        // try {
        //     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        //     if (!permissionResult.granted) {
        //         Alert.alert("Permission required", "We need access to your photos to add attachments.");
        //         return;
        //     }

        //     const result = await ImagePicker.launchImageLibraryAsync({
        //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //         allowsEditing: true,
        //         aspect: [4, 3],
        //         quality: 0.7,
        //     });

        //     if (!result.canceled) {
        //         setAttachments(prev => [...prev, result.assets[0].uri]);
        //     }
        // } catch (error) {
        //     console.error("Error picking image:", error);
        //     Alert.alert("Error", "Failed to select image. Please try again.");
        // }
    };

    const handleRemoveAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const renderAttachment = ({ item, index }) => (
        <View style={[styles.attachmentContainer, { backgroundColor: theme.cardBg }]}>
            <Image source={{ uri: item }} style={styles.attachmentImage} />
            <TouchableOpacity
                style={[styles.removeAttachmentBtn, { backgroundColor: theme.danger }]}
                onPress={() => handleRemoveAttachment(index)}
            >
                <Icon name="close" size={16} color={theme.white} />
            </TouchableOpacity>
        </View>
    );

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
                title="Register Complaint"
                leftIconName="chevron-back"
                onLeftPress={() => navigation.goBack()}
                iconColor={theme.black}
                textColor={theme.black}
                backgroundColor={theme.white}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={[styles.formContainer,]}>
                            <Text style={[styles.sectionTitle, { color: isDark ? theme.white : theme.white }]}>Complaint Details</Text>

                            {/* Location */}
                            <View style={styles.inputContainer}>
                                {/* <Text style={[styles.label, { color: isDark ? theme.white : theme.white}]}>Name*</Text> */}
                                <Controller
                                    control={control}
                                    rules={{ required: 'Name is required' }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[
                                                styles.input,
                                                {
                                                    backgroundColor: isDark ? theme.white : theme.white,
                                                    borderColor: isDark ? theme.white : theme.white,
                                                    color: isDark ? theme.black : theme.black
                                                }
                                            ]}
                                            placeholder="Enter your name"
                                            placeholderTextColor={isDark ? theme.lightGray : theme.lightGray}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name="location"
                                />
                                {errors.location && (
                                    <Text style={styles.errorText}>{errors.location.message}</Text>
                                )}
                            </View>

                            {/* Subject */}
                            <View style={styles.inputContainer}>
                                {/* <Text style={[styles.label, { color: isDark ? theme.white : theme.white }]}>Subject*</Text> */}
                                <Controller
                                    control={control}
                                    rules={{ required: 'Subject is required' }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[
                                                styles.input,
                                                 {
                                                    backgroundColor: isDark ? theme.white : theme.white,
                                                    borderColor: isDark ? theme.white : theme.white,
                                                    color: isDark ? theme.black : theme.black
                                                }
                                            ]}
                                            placeholder="Enter complaint subject"
                                            placeholderTextColor={isDark ? theme.lightGray : theme.lightGray}

                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}  
                                    name="subject"
                                />
                                {errors.subject && (
                                    <Text style={styles.errorText}>{errors.subject.message}</Text>
                                )}
                            </View>

                            {/* Description */}
                            <View style={styles.inputContainer}>
                                {/* <Text style={[styles.label, { color: theme.text }]}>Description*</Text> */}
                                <Controller
                                    control={control}
                                    rules={{
                                        required: 'Description is required',
                                        minLength: {
                                            value: 20,
                                            message: 'Description should be at least 20 characters'
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[
                                                styles.textArea,
                                                 {
                                                    backgroundColor: isDark ? theme.white : theme.white,
                                                    borderColor: isDark ? theme.white : theme.white,
                                                    color: isDark ? theme.black : theme.black
                                                }
                                            ]}
                                            placeholder="Describe your complaint in detail..."
                                            placeholderTextColor={isDark ? theme.lightGray : theme.lightGray}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            multiline
                                            numberOfLines={4}
                                        />
                                    )}
                                    name="description"
                                />
                                {errors.description && (
                                    <Text style={styles.errorText}>{errors.description.message}</Text>
                                )}
                            </View>

                            {/* Attachments */}
                            <View style={styles.inputContainer}>
                                <Text style={[styles.label, { color: isDark ? theme.white : theme.white }]}>Document Attachments (If any)</Text>
                                {/* <Text style={[styles.subLabel, { color: theme.textSecondary }]}>
                                    Add photos to support your complaint (max 3)
                                </Text> */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                    <TouchableOpacity
                                        style={[
                                            styles.addAttachmentBtn,
                                            { backgroundColor: theme.inputBg, borderColor: theme.border, marginTop: 12 }
                                        ]}
                                        onPress={handleAddAttachment}
                                    >
                                        <Icon name="camera" size={28} color={isDark ? theme.white : theme.white} />
                                        <Text style={[styles.addAttachmentText, { color: isDark ? theme.white : theme.white }]}>
                                            Add Photo
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.addAttachmentBtn,
                                            { backgroundColor: theme.inputBg, borderColor: theme.border, marginTop: 12, marginHorizontal:12 }
                                        ]}
                                        onPress={handleAddAttachment}
                                    >
                                        <Icon name="camera" size={28} color={isDark ? theme.white : theme.white} />
                                        <Text style={[styles.addAttachmentText, { color: isDark ? theme.white : theme.white }]}>
                                            Add Photo
                                        </Text>
                                    </TouchableOpacity>
                                    

                                    <TouchableOpacity
                                        style={[
                                            styles.addAttachmentBtn,
                                            { backgroundColor: theme.inputBg, borderColor: theme.border, marginTop: 12 }
                                        ]}
                                        onPress={handleAddAttachment}
                                    >
                                        <Icon name="add" size={28} color={isDark ? theme.white : theme.white} />
                                        <Text style={[styles.addAttachmentText, { color: isDark ? theme.white : theme.white }]}>
                                            Add More
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>



                            <CustomButton
                                buttonText="Submit Complaint"
                                backgroundColor={
                                    isDark ? theme.black : theme.black
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

                            />
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>


        </Container>
    );
};



const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    formContainer: {
        flex: 1,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: fontFamily.bold,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        marginBottom: 8,
    },
    subLabel: {
        fontSize: 12,
        fontFamily: fontFamily.regular,
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontFamily: fontFamily.regular,
        fontSize: 14,
    },
    textArea: {
        height: 120,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingTop: 15,
        fontFamily: fontFamily.regular,
        fontSize: 14,
        textAlignVertical: 'top',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 5,
        fontFamily: fontFamily.regular,
    },
    complaintTypeContainer: {
        marginBottom: 20,
    },
    complaintTypeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    complaintTypeBtn: {
        width: '48%',
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        marginBottom: 10,
    },
    complaintTypeText: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
    },
    priorityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priorityBtn: {
        width: '30%',
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
    },
    priorityText: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
    },
    attachmentsList: {
        paddingVertical: 5,
    },
    attachmentContainer: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
        overflow: 'hidden',
    },
    attachmentImage: {
        width: '100%',
        height: '100%',
    },
    removeAttachmentBtn: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addAttachmentBtn: {
        width: 100,
        height: 100,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addAttachmentText: {
        fontFamily: fontFamily.regular,
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
    },
    checkboxContainer: {
        marginBottom: 25,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxLabel: {
        fontFamily: fontFamily.regular,
        fontSize: 14,
    },
    submitBtn: {
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
        color: '#FFFFFF',
    },
});

export default Complain;