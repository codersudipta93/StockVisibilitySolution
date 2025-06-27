import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  FlatList
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Container,
  CustomButton,
  CustomHeader,
  Loading,
  ConfirmationModal,
  NotFound,
  SkeletonLoader,
} from "../components";
import { useTheme } from "../constants/themeProvider";
import { setData, getData, deleteData, clearAllData } from '../services/storage';

import { fontFamily, sizes, device, local_images, HelperFunctions } from "../constants";

import LinearGradient from "react-native-linear-gradient";
import { postApi } from "../services/apis";
import { useSelector, useDispatch } from 'react-redux'
import { setToken, setUserData } from '../redux/projectReducer';

const SchemeDetailScreen = () => {
  const [agree, setAgree] = useState(false);
  const [backBtnModalVisible, setbackBtnModalVisible] = useState(false);
  const navigation = useNavigation();
  const { theme, isDark } = useTheme();
  const styles = getStyles(theme, isDark);
  const { token, userData } = useSelector((state) => state.project);
  const route = useRoute();
  const { from, data } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [schemeDetails, setschemeDetails] = useState([]);
  const [schemeterms, setschemeterms] = useState([]);
  const [schemeinfo, setschemeinfo] = useState("");


  useEffect(() => {
    getSchemeDetails()
  }, [])

  const skelitonRender = ({ item, index }) => (
    <SkeletonLoader width={450} height={600} borderRadius={4}
      style={styles.skelitonCard}
      shimmerColors={[theme.primary, theme.primaryMedium]}
    />
  );

  const getSchemeDetails = async () => {
    setLoading(true);
    let uData = JSON.parse(userData)
    let body = {
      "customerId": uData?.customerid,
      "token": token,
      "SchemeId": data?.SchemeId
    }
    await postApi('SchemeTermsAndDetails', body).then((response) => {
      console.log(response);
      if (response.status == true) {
        if (response.data != null) {
          console.log(response.data);
          setschemeDetails(response.data?.schemedetails)
          setschemeterms(response.data?.schemeterms)
          setschemeinfo(response?.data?.schemeinfo)
        }

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


  return (
    <Container
      bgColor={[
        isDark ? theme.primaryMedium : theme.primaryMedium,
        isDark ? theme.primaryMedium : theme.primaryMedium,
      ]}
    >
      <CustomHeader
        title={data?.SchemeName}
        leftIconName="chevron-back"
        onLeftPress={() => navigation.goBack()}
        iconColor={theme.white}
        textColor={theme.white}
        backgroundColor={theme.primary}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {

          loading == true ?
            <FlatList
              data={[1, 1, 1]}
              renderItem={skelitonRender}
              contentContainerStyle={styles.container}

            /> :
            <>
              {schemeDetails != "" || schemeterms != "" ?
                <>
                  {schemeDetails != "" ?
                    <View style={styles.headingWrapper}>
                      <LinearGradient
                        colors={[theme.secondary, theme.secondaryLight]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.headingLine}
                      />
                      <Text style={styles.heading}>Scheme Details</Text>
                    </View> : null}

                  {schemeDetails.map((item, index) => (
                    <Text key={index} style={styles.detailItem}>• {item?.SchemeDetails}</Text>
                  ))}

                  {schemeterms != "" ?
                    <View style={[styles.headingWrapper, { marginTop: 25 }]}>
                      <LinearGradient
                        colors={[theme.secondary, theme.secondaryLight]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.headingLine}
                      />
                      <Text style={[styles.heading, {}]}>Scheme Terms & Conditions</Text>
                    </View> : null}
                  {schemeterms.map((item, index) => (
                    <Text key={index} style={styles.termItem}>{index + 1}. {item?.terms}</Text>
                  ))}

                  {/* <View style={styles.checkboxRow}>
                    <TouchableOpacity
                      onPress={() => setAgree(!agree)}
                      style={styles.checkboxBox(agree)}
                    >
                      {agree && <Text style={styles.checkboxTick}>✓</Text>}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>I agree to the terms & conditions*</Text>
                  </View> */}

                  {from == 'avialbleScheme' ?

                    <View style={[styles.buttonRow, { justifyContent: 'space-around' }]}>
                      <CustomButton
                        buttonText="Serviceable Pincode"
                        isLoading={false}
                        backgroundColor={theme.white}
                        buttonTextStyle={{
                          textAlign: "center",
                          letterSpacing: 1.2,
                          fontFamily: fontFamily.medium,
                          color: theme.black,
                          fontSize: sizes.buttonText,
                        }}
                        requireBorder={false}
                        style={{ width: "50%", borderRadius: 8, marginTop: 20, opacity: 1, paddingHorizontal: 16 }}
                        onPress={() => { navigation.navigate("ServiceAreas") }}
                      />

                      <CustomButton
                        buttonText="Subscribe"
                       // disabled={!agree}
                        isLoading={false}
                        backgroundColor={theme.secondaryLight}
                        buttonTextStyle={{
                          textAlign: "center",
                          letterSpacing: 1.2,
                          fontFamily: fontFamily.medium,
                          color: theme.black,
                          fontSize: sizes.bodyDeafult,
                          //opacity: agree ? 1 : 0.6,
                        }}
                        requireBorder={false}
                        style={{ width: "42%", borderRadius: 8, marginTop: 20, opacity: 1 }}
                        onPress={() => {navigation.navigate("EMIPayment",{from:'availableSchemeDetails', data:schemeinfo})}}
                      />
                    </View> : null}
                </> :

                <View style="">
                  <NotFound />
                </View>
              }
            </>}
      </ScrollView>

      <Loading visible={false} />

      <ConfirmationModal
        visible={backBtnModalVisible}
        title="Hold on!"
        msg="Are you sure you want to go back?"
        confrimBtnText="Yes"
        onConfirm={() => {
          setbackBtnModalVisible(false);
          BackHandler.exitApp();
        }}
        onCancel={() => setbackBtnModalVisible(false)}
      />
    </Container>
  );
};

const getStyles = (theme, isDark) => ({
  container: {
    //padding: 16,
    //  paddingBottom: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingBottom: 40,
    marginTop: 5,
  },
  headingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 12,
  },
  headingLine: {
    width: 4,
    height: 22,
    borderRadius: 4,
    marginRight: 8,
  },
  heading: {
    fontSize: sizes.bodyMedium + 2,
    fontFamily: fontFamily.bold,
    color: theme.secondaryLight,
  },
  detailItem: {
    fontSize: sizes.bodyDeafult,
    marginVertical: 4,
    color: theme.secondaryLight,
    fontFamily: fontFamily.regular,
    lineHeight: 20
  },
  termItem: {
    fontSize: sizes.bodyDeafult,
    marginVertical: 5,
    color: theme.secondaryLight,
    fontFamily: fontFamily.regular,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxBox: (agree) => ({
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: agree ? theme.secondaryLight : theme.secondary,
    backgroundColor: agree ? theme.secondary : "transparent",
    alignItems: "center",
    justifyContent: "center",
  }),
  checkboxTick: {
    color: "#fff",
    fontSize: sizes.bodyDeafult,
    fontWeight: "bold",
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: sizes.bodyDeafult,
    fontFamily: fontFamily.medium,
    color: theme.secondaryLight,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
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
});

export default SchemeDetailScreen;
