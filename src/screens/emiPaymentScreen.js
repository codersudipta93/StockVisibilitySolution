import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Container,
  Loading,
  CustomHeader,
  CustomSelectInput,
  CustomTextInput,
  CustomButton
} from "../components";

import { useTheme } from "../constants/themeProvider";
import { fontFamily, sizes, HelperFunctions } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { postApi } from "../services/apis";
import { clearAllData } from '../services/storage';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUserData } from '../redux/projectReducer';
import { useForm } from "react-hook-form";
import LinearGradient from "react-native-linear-gradient";

const EMIPayment = () => {
  const dispatch = useDispatch();
  const { token, userData } = useSelector((state) => state.project);
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params || {};
  const { theme, isDark } = useTheme();
  const styles = getStyles(theme, isDark);

  const [loading, setLoading] = useState(false);
  const [customersSupplimentoryMembers, setCustomersSupplimentoryMembers] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      "schemeHolder": "",
      "emiAmount": ""
    }
  });

  const emiAmount = watch("emiAmount");

  useEffect(() => {
    getAvailableSchemeHolder();
  }, []);

  const getAvailableSchemeHolder = async () => {
    setLoading(true);
    try {
      let uData = JSON.parse(userData);
      let body = {
        "customerId": uData?.customerid,
        "token": token
      };

      const response = await postApi('CustomersSupplimentoryMembers', body);

      if (response.status === true) {
        const schemeHolderOptions = response.data.map(({ Label: label, Value: value }) => ({ label, value }));
        setCustomersSupplimentoryMembers(schemeHolderOptions);
      } else {
        clearAllData();
        dispatch(setUserData(""));
        dispatch(setToken(""));
        HelperFunctions.showMsg(response.msg, theme.primary);
        navigation.replace('Login');
      }
    } catch (error) {
      HelperFunctions.showMsg("Sorry! Internal server error. Please try again later", theme.primary);
    } finally {
      setLoading(false);
    }
  };

  const showError = (message) => {
    // You can replace this with your preferred toast/alert implementation
    console.error(message);
  };

  const handlePayment = (formData) => {
    alert("hi")
    //setIsProcessing(true);
    console.log('Processing payment:', formData);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigation.goBack();
      // Show success message
    }, 1500);
  };

  return (
    <Container
      bgColor={[
        isDark ? theme.primaryMedium : theme.primaryMedium,
        isDark ? theme.primaryMedium : theme.primaryMedium,
      ]}
    >
      <CustomHeader
        title={ "EMI Payment"}
        leftIconName="chevron-back"
        onLeftPress={() => navigation.goBack()}
        iconColor={theme.white}
        textColor={theme.white}
        backgroundColor={theme.primary}
      />

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Scheme Details Card */}
          <View style={styles.schemeCard}>
            <Text style={styles.cardTitle}>Scheme Details</Text>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <View style={[styles.schemeRow, { width: '50%' }]}>
                <View style={styles.iconContainer}>
                  <Ionicons name="calendar" size={20} color={theme.secondary} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Initiated on</Text>
                  <Text style={styles.detailValue}>{data?.SchemeInitiatedOn}</Text>
                </View>
              </View>

              <View style={[styles.schemeRow, { width: '50%' }]}>
                <View style={styles.iconContainer}>
                  <Ionicons name="document-text" size={20} color={theme.secondary} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Scheme Type</Text>
                  <Text style={styles.detailValue}>{data?.SchemeName}</Text>
                </View>
              </View>
            </View>

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={[styles.schemeRow, { width: '50%' }]}>
                <View style={styles.iconContainer}>
                  <Ionicons name="time" size={20} color={theme.secondary} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{data?.NoOfMonths} months</Text>
                </View>
              </View>

              <View style={[styles.schemeRow, { width: '50%' }]}>
                <View style={styles.iconContainer}>
                  <Ionicons name="cash" size={20} color={theme.secondary} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>EMI starts from</Text>
                  <Text style={styles.detailValue}>₹{data?.EmiAmount}</Text>
                </View>
              </View>

            </View>

            {data?.AmtorWgt === "2" && data?.RateInfo && (
              <View style={styles.schemeRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="pricetag" size={18} color={theme.white} />
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Rate Information</Text>
                  <Text style={styles.detailValue}>{data?.RateInfo}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Scheme Holder</Text>

            <CustomSelectInput
              name="selectedState"
              height={50}
              control={control}
              rules={{ required: "State is required" }}
              placeholder="Select Scheme Holder"
              data={customersSupplimentoryMembers}
              iconLeft={<Ionicons name="person" size={20} color={theme.secondary} />}
              {...selectInputThemeProps(isDark, theme)}
            />

            <Text style={[styles.sectionTitle, { marginTop: 12 }]}>EMI Amount</Text>

            <View style={[{}]}>
              <Text style={[styles.note, { marginBottom: data?.IsVariable == "0" ? 14 : 0, fontSize: sizes.caption + 1 }]}>
                Please enter amount in multiples of ₹500
              </Text>

              <CustomTextInput
                control={control}
                height={50}
                name="emiAmount"
                placeholder="EMI Amount"
                keyboardType="numeric"
                rules={{
                  required: "EMI Amount is required",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Please enter numbers only"
                  },
                  validate: value => {
                    if (data?.IsVariable == "0") {
                      (parseInt(value, 10) % 500 === 0 && parseInt(value, 10) > 0) ||
                        "Amount must be a multiple of 500"
                    }
                  }
                }}
                iconLeft={<Ionicons name="cash-outline" size={20} color={theme.secondary} />}
                {...inputThemeProps(isDark, theme)}
              />
            </View>
          </View>



          {/* Security Note */}
          <View style={styles.securityNoteContainer}>
            <Ionicons
              name="shield-checkmark"
              size={16}
              color={theme.secondaryLight}
            />
            <Text style={styles.securityText}>
              All payments are securely processed with industry-standard encryption. We don't store sensitive payment information.
            </Text>
          </View>

          {/* Pay Button */}
          {/* <TouchableOpacity
            style={[
              styles.payButton,
              // (!emiAmount || !selectedPaymentMethod) && styles.disabledButton
            ]}
            onPress={handleSubmit(handlePayment)}
          // disabled={!emiAmount || !selectedPaymentMethod}
          //  activeOpacity={0.9}
          >
            <Text style={styles.payButtonText}>
              Pay ₹{emiAmount || '0'}
            </Text>
          </TouchableOpacity> */}

          <CustomButton
            buttonText={emiAmount ? "Pay ₹" + emiAmount : 'Pay Now'}
            isLoading={false}
            backgroundColor={theme.secondary}
            buttonTextStyle={{
              textAlign: "center",
              letterSpacing: 1.2,
              fontFamily: fontFamily.medium,
              color: theme.black,
              fontSize: sizes.buttonText,
            }}
            requireBorder={false}
            height={60}
            style={{ width: "100%", borderRadius: 8, marginTop: 10, opacity: emiAmount != "" && selectedPaymentMethod != "" ? 1 : 0.7, paddingHorizontal: 16 }}
            disabled={!emiAmount || !selectedPaymentMethod}
            onPress={handleSubmit(handlePayment)}
          />

        </KeyboardAvoidingView>
      </ScrollView>

      <Loading visible={loading} />
    </Container>
  );
};

const inputThemeProps = (isDark, theme) => ({
  inputTextColor: theme.secondaryLight,
  placeholderTextColor: theme.secondary,
  borderColor: 'rgba(255,255,255,0.2)',
  errorBorderColor: theme.error,
  errorTextColor: theme.primaryLight,
  iconColor: theme.secondaryLight,
  bgColor: "rgba(0,0,0,0.25)",
});

const selectInputThemeProps = (isDark, theme) => ({
  inputTextColor: theme.secondaryLight,
  placeholderTextColor: theme.secondary,
  borderColor: 'rgba(255,255,255,0.2)',
  errorBorderColor: theme.error,
  errorTextColor: theme.primaryLight,
  iconColor: theme.secondary,
  bgColor: "rgba(0,0,0,0.25)",
  modalBgColor: theme.primaryDark,
  modalOptionLabelColor: theme.white,
  modalOptionBorderColor: 'rgba(255,255,255,0.1)',
  modalSearchPlaceholderColor: theme.secondary,
  modalSearchTextColor: theme.white,
  modalInputBorderColor: theme.secondary,
});

const getStyles = (theme, isDark) =>
  StyleSheet.create({
    keyboardView: {
      flex: 1,
      paddingHorizontal: 16,
      //paddingBottom: 30,
      marginBottom: 25
    },
    schemeCard: {
      backgroundColor: theme.primaryMedium,
      borderRadius: 12,
      padding: 20,
      marginTop: 16,
      marginBottom: 24,
      //borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',

    },
    cardTitle: {
      fontSize: sizes.subtitle,
      fontFamily: fontFamily.semibold,
      color: theme.secondaryLight,
      marginBottom: 16,
    },
    schemeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginBottom: 8,
      paddingBlock: 18,
      //borderBottomWidth: 0.8,
      //borderBottomColor: theme.secondary,
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 8,
      backgroundColor: 'rgba(255,255,255,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    detailContainer: {
      //  flex: 1,

    },
    detailLabel: {
      fontSize: sizes.caption + 1,
      fontFamily: fontFamily.medium,
      color: theme.secondary,
      marginBottom: 4,
    },
    detailValue: {
      fontSize: sizes.bodyDeafult,
      fontFamily: fontFamily.semibold,
      color: theme.secondaryLight,
    },
    formSection: {
      marginBottom: 24,
    },
    amountSection: {
      marginTop: 8,
    },
    paymentMethodSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: sizes.bodyMedium,
      fontFamily: fontFamily.semibold,
      color: theme.secondaryLight,
      marginBottom: 12,
    },
    note: {
      fontSize: sizes.caption,
      fontFamily: fontFamily.regular,
      color: theme.secondary,
      marginBottom: 8,
    },
    paymentMethodsContainer: {
      marginTop: 8,
    },
    paymentMethod: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    selectedPaymentMethod: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderColor: theme.secondaryLight,
    },
    paymentIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: 'rgba(255,255,255,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    selectedPaymentIconContainer: {
      backgroundColor: theme.secondaryLight,
    },
    paymentMethodText: {
      flex: 1,
      fontSize: sizes.bodyDeafult,
      fontFamily: fontFamily.medium,
      color: theme.white,
    },
    selectedPaymentMethodText: {
      color: theme.white,
    },
    checkmarkContainer: {
      marginLeft: 8,
    },
    securityNoteContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: 'rgba(0,0,0,0.2)',
      padding: 14,
      borderRadius: 10,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    securityText: {
      marginLeft: 10,
      fontSize: sizes.bodySmall,
      fontFamily: fontFamily.regular,
      color: theme.secondaryLight,
      flex: 1,
      lineHeight: 18,
    },
    payButton: {
      backgroundColor: theme.secondary,
      borderRadius: 10,
      padding: 16,
      paddingVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      marginBottom: 20,
    },
    disabledButton: {
      backgroundColor: 'rgba(192,147,116,0.3)',
      elevation: 0,
      shadowOpacity: 0,
    },
    payButtonText: {
      color: theme.primaryDark,
      fontSize: sizes.bodyMedium,
      fontFamily: fontFamily.bold,
    },
  });

export default EMIPayment;