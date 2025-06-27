// components/DateRangeSearchBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fontFamily, sizes } from '../constants';
import { CustomButton } from './customButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const DateRangeSearchBar = ({
    fromDate,
    toDate,
    onFromDateChange,
    onToDateChange,
    onSearchPress,
    showFromPicker,
    showToPicker,
    setShowFromPicker,
    setShowToPicker,
    theme
}) => {
    const styles = getStyles(theme);

    const formatDate = (date) => {
        if (!date) return "Select";
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={styles.container}>
            
                <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateBox}>
                    <Text style={styles.label}>From Date</Text>
                    <Text style={styles.dateText}>{formatDate(fromDate) || "Select"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateBox}>
                    <Text style={styles.label}>To Date</Text>
                    <Text style={styles.dateText}>{formatDate(toDate) || "Select"}</Text>
                </TouchableOpacity>
            
            {/* <CustomButton
                title="Search"
                onPress={onSearchPress}
                buttonStyle={styles.searchBtn}
                textStyle={styles.searchText}
            /> */}

            {/* <CustomButton
                buttonText="Search"
                requireIcon={false}
                simbolType="icon"
                icon={"search"}
                height={44}
                isLoading={false}
                backgroundColor={theme.primary}
                buttonTextStyle={{
                    textAlign: "center",
                    letterSpacing: 1,
                    fontFamily: fontFamily.medium,
                    color: theme.white,
                    fontSize: sizes.bodyDeafult,
                    textTransform: 'none'
                }}
                //requireBorder={true}
                style={{ width: "20%", borderRadius: 8, opacity: 1, paddingVertical:4}}
                 onPress={onSearchPress}
            /> */}

            {showFromPicker && (
                <DateTimePicker
                    value={fromDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, selectedDate) => {
                        setShowFromPicker(false);
                        if (selectedDate) onFromDateChange(selectedDate);
                    }}
                />
            )}
            {showToPicker && (
                <DateTimePicker
                    value={toDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, selectedDate) => {
                        setShowToPicker(false);
                        if (selectedDate) onToDateChange(selectedDate);
                    }}
                />
            )}
        </View>
    );
};



const getStyles = (theme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            margin: 12,
            paddingVertical: 6,
        },
        dateBox: {
           // flex: 1,
            marginHorizontal: 5,
            marginRight:0,
            padding: 10,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 8,
            width:'45%'
            //backgroundColor: theme.white,
        },
        label: {
            fontSize: 10,
            color: theme.white,
            fontFamily: fontFamily.medium,
            marginBottom: 4
        },
        dateText: {
            fontSize: sizes.buttonText,
            fontFamily: fontFamily.bold,
            color: theme.white,
        },
        searchBtn: {
            backgroundColor: theme.primary,
            marginLeft: 5,
            paddingHorizontal: 12,
            paddingVertical: 14,
            borderRadius: 8,
            width: "40%"
        },
        searchText: {
            fontSize: sizes.buttonText,
            color: theme.white,
            fontFamily: fontFamily.bold,
        },
    });
