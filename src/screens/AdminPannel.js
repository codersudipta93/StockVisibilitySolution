import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { Container, CustomHeader } from "../components";
import { useTheme } from "../constants/themeProvider";
import { fontFamily, sizes } from "../constants";

const CustomMultiSelectDropdown = ({
  options,
  selectedValues,
  onValueChange,
  placeholder,
  theme,
  styles
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
useEffect(() => {
   
  if (searchText) {
    setFilteredOptions(
      options.filter(option => 
        option.label.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  } else {
    setFilteredOptions(options);
  }
}, [searchText, options]);

  const toggleSelection = (value) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(item => item !== value)
      : [...selectedValues, value];
    onValueChange(newSelectedValues);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchText('');
  };

  return (
    <View style={styles.dropdownWrapper}>
      <TouchableOpacity 
        style={styles.dropdownHeader}
        onPress={toggleDropdown}
      >
        <Text style={styles.dropdownHeaderText}>
          {selectedValues.length > 0 
            ? selectedValues + ', '
            : placeholder}
        </Text>
        <Icon 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={theme.text} 
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownListContainer}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color={theme.text} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={theme.lightGray}
              value={searchText}
              onChangeText={setSearchText}
              autoFocus={true}
            />
          </View>
          
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => toggleSelection(item.value)}
              >
                <View style={[
                  styles.checkbox,
                  selectedValues.includes(item.value) && styles.checkboxSelected
                ]}>
                  {selectedValues.includes(item.value) && (
                    <Icon name="checkmark" size={16} color={theme.white} />
                  )}
                </View>
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
            style={styles.dropdownList}
            nestedScrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
};

const AdminPannel = () => {
    const { theme, isDark } = useTheme();
    const navigation = useNavigation();
    const styles = getStyles(theme, isDark, fontFamily, sizes);

    // State for filters
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [selectedGrades, setSelectedGrades] = useState([]);
    const [visibilityOption, setVisibilityOption] = useState(null);
    const [visibilityPercentage, setVisibilityPercentage] = useState('');

    // Sample data
    const data = [
      { id: '1', date: '01.01.2025', customer: 'John Doe', grade: 'A', visibility: '80%' },
      { id: '2', date: '02.01.2025', customer: 'Raja Samanta', grade: 'B', visibility: '70%' },
      { id: '3', date: '03.01.2025', customer: 'Sudipta Mukherje', grade: 'A', visibility: '90%' },
      { id: '4', date: '04.01.2025', customer: 'Michael Johnson', grade: 'C', visibility: '60%' },
      { id: '5', date: '05.01.2025', customer: 'Sarah Williams', grade: 'B', visibility: '75%' },
      { id: '6', date: '06.01.2025', customer: 'David Brown', grade: 'A', visibility: '85%' },
      { id: '7', date: '07.01.2025', customer: 'Emily Davis', grade: 'B', visibility: '65%' },
      { id: '8', date: '08.01.2025', customer: 'Robert Wilson', grade: 'C', visibility: '55%' },
      { id: '9', date: '09.01.2025', customer: 'Jennifer Taylor', grade: 'A', visibility: '95%' },
      { id: '10', date: '10.01.2025', customer: 'Thomas Anderson', grade: 'B', visibility: '70%' },
      // Add more data as needed...
    ];

    // Options for dropdowns
    const customerOptions = [
      { label: 'John Doe', value: 'John Doe' },
      { label: 'Raja Samanta', value: 'Raja Samanta' },
      { label: 'Sudipta Mukherje', value: 'Sudipta Mukherje' },
      { label: 'Michael Johnson', value: 'Michael Johnson' },
      { label: 'Sarah Williams', value: 'Sarah Williams' },
      { label: 'David Brown', value: 'David Brown' },
      { label: 'Emily Davis', value: 'Emily Davis' },
      { label: 'Robert Wilson', value: 'Robert Wilson' },
      { label: 'Jennifer Taylor', value: 'Jennifer Taylor' },
      { label: 'Thomas Anderson', value: 'Thomas Anderson' },
      // Add more customers as needed...
    ];

    const gradeOptions = [
      { label: 'Grade A', value: 'A' },
      { label: 'Grade B', value: 'B' },
      { label: 'Grade C', value: 'C' },
    ];

  
    return (
        <Container bgColor={[isDark ? theme.primary : theme.primary, "#0b3866"]}>
            <CustomHeader
                title="Visibility Control "
                leftIconName="chevron-back"
                onLeftPress={() => navigation.goBack()}
                rightIconName="lock-closed-sharp"
                rightIconSize={32}
                iconColor={theme.black}
                textColor={theme.black}
                backgroundColor={theme.white}
            />

            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* Filter Section */}
                    <View style={styles.filterCard}>
                        {/* Customer Dropdown */}
                        <View style={styles.filterGroup}>
                            <Text style={styles.filterLabel}>Customer</Text>
                            <CustomMultiSelectDropdown
                                options={customerOptions}
                                selectedValues={selectedCustomers}
                                onValueChange={setSelectedCustomers}
                                placeholder="Select customers..."
                                theme={theme}
                                styles={styles}
                            />
                        </View>

                        {/* Grade Dropdown */}
                        <View style={styles.filterGroup}>
                            <Text style={styles.filterLabel}>Grade</Text>
                            <CustomMultiSelectDropdown
                                options={gradeOptions}
                                selectedValues={selectedGrades}
                                onValueChange={setSelectedGrades}
                                placeholder="Select grades..."
                                theme={theme}
                                styles={styles}
                            />
                        </View>

                        {/* Visibility Options */}
                        <View style={styles.filterGroup}>
                            <Text style={styles.filterLabel}>Visibility</Text>
                            <View style={styles.radioGroup}>
                                <TouchableOpacity
                                    style={styles.radioOption}
                                    onPress={() => setVisibilityOption('%')}
                                >
                                    <View style={styles.radioCircle}>
                                        {visibilityOption === '%' && <View style={styles.radioInnerCircle} />}
                                    </View>
                                    <Text style={styles.radioLabel}>Visibility</Text>
                                </TouchableOpacity>

                                {visibilityOption === '%' && (
                                    <View style={styles.percentageInputContainer}>
                                        <TextInput
                                            style={styles.percentageInput}
                                            placeholder=""
                                            placeholderTextColor={theme.lightGray}
                                            keyboardType="numeric"
                                            value={visibilityPercentage}
                                            onChangeText={setVisibilityPercentage}
                                        />
                                        <Text style={styles.percentageSymbol}>%</Text>
                                    </View>
                                )}

                                <TouchableOpacity
                                    style={styles.radioOption}
                                    onPress={() => setVisibilityOption('Hide')}
                                >
                                    <View style={styles.radioCircle}>
                                        {visibilityOption === 'Hide' && <View style={styles.radioInnerCircle} />}
                                    </View>
                                    <Text style={styles.radioLabel}>Hide (Visibility = 0%)</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={[styles.button, styles.manageButton]}>
                                <Text style={styles.buttonText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.applyButton]}>
                                <Text style={styles.buttonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Active Filters Heading */}
                    <Text style={styles.sectionHeading}>ACTIVE FILTERS</Text>

                    {/* Table */}
                    <View style={styles.tableContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                            <View>
                                {/* Table Header */}
                                <View style={styles.tableHeader}>
                                    <Text style={styles.headerText}>Date</Text>
                                    <Text style={[styles.headerText, { width: 160 }]}>Customer</Text>
                                     <Text style={[styles.headerText, { width: 90 }]}>Grade</Text>
                                    <Text style={[styles.headerText, { width: 90 }]}>Visibility</Text>
                                    <Text style={styles.headerText}>Actions</Text>
                                </View>

                                {/* Table Rows */}
                                {data.map((item, index) => (
                                    <View
                                        key={item.id}
                                        style={[
                                            styles.tableRow,
                                            index === data.length - 1 && styles.lastTableRow
                                        ]}
                                    >
                                        <Text style={styles.cellText}>{item.date}</Text>
                                        <Text style={[styles.cellText, { width: 160 }]}>{item.customer}</Text>
                                        <Text style={[styles.cellText, { width: 90 }]}>{item.grade}</Text>
                                        <Text style={[styles.cellText, { width: 90 }]}>{item.visibility}</Text>
                                        <View style={styles.actionCell}>
                                            <TouchableOpacity style={styles.actionButton}>
                                                <Icon name="create-outline" size={20} color={theme.primary} />
                                                <Text style={styles.actionText}>EDIT</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.actionButton,{marginHorizontal:12}]}>
                                                <Icon name="trash-outline" size={20} color={theme.error} />
                                                <Text style={styles.actionText}>DELETE</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </Container>
    );
};

const getStyles = (theme, isDark, fontFamily, sizes) => StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    filterCard: {
        backgroundColor: isDark ? theme.card : theme.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: isDark ? theme.black : theme.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    }, 
    filterGroup: {
        marginBottom: 16,
    },
    filterLabel: {
        fontSize: sizes.bodyMedium,
        fontFamily: fontFamily.semibold,
        marginBottom: 8,
        color: theme.text,
    },
    dropdownWrapper: {
        position: 'relative',
        zIndex: 1,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: isDark ? theme.border :  theme.border,
        borderRadius: 8,
        padding: 12,
        backgroundColor: isDark ? theme.white : theme.white,
        height:48
    },
    dropdownHeaderText: {
        fontSize: sizes.bodyDefault,
        fontFamily: fontFamily.regular,
        color: isDark ? theme.text : theme.text,
        flex: 1,
    },
    dropdownListContainer: {
        maxHeight: 300,
        borderWidth: 1,
        borderColor: isDark ? theme.border : theme.border,
        borderRadius: 8,
        marginTop: 4,
        backgroundColor: isDark ? theme.white : theme.white,
        elevation: 3,
        shadowColor: isDark ? theme.black : theme.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? theme.border : theme.border,
    },
    searchInput: {
        flex: 1,
        fontSize: sizes.bodyDefault,
        fontFamily: fontFamily.regular,
        color: theme.text,
        marginLeft: 8,
    },
    dropdownList: {
        paddingHorizontal: 8,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? theme.border : theme.border,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: isDark ? theme.border : theme.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkboxSelected: {
        backgroundColor: isDark ? theme.primary : theme.primary,
        borderColor:isDark ? theme.primary : theme.primary,
    },
    dropdownItemText: {
        fontSize: sizes.bodyDefault,
        fontFamily: fontFamily.regular,
        color:  isDark ? theme.text : theme.text,
    },
    radioGroup: {
        marginTop: 8,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor:  isDark ? theme.primary : theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioInnerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: isDark ? theme.primary : theme.primary,
    },
    radioLabel: {
        fontSize: sizes.bodyDefault,
        fontFamily: fontFamily.regular,
        color: theme.text,
    },
    percentageInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        marginBottom: 12,
    },
    percentageInput: {
        borderWidth: 1,
        borderColor: isDark ? theme.border : theme.border,
        borderRadius: 8,
        padding: 10,
        width: 80,
        fontSize: sizes.bodyDefault,
        fontFamily: fontFamily.regular,
        color: isDark ?  theme.text : theme.text,
        backgroundColor: isDark ? theme.white : theme.white
    },
    percentageSymbol: {
        marginLeft: 8,
        fontSize: sizes.bodyDefault,
        color: theme.text,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        //borderRadius:20
    },
    manageButton: {
        backgroundColor: isDark ? theme.black : theme.black,
    },
    applyButton: {
        backgroundColor: isDark ? theme.primary : theme.primary,
    },
    buttonText: {
        color: theme.white,
        fontFamily: fontFamily.medium,
        fontSize: sizes.buttonText,
        //textTransform:'uppercase'
    },
    sectionHeading: {
        fontSize: sizes.bodyMedium,
        fontFamily: fontFamily.semibold,
        marginBottom: 12,
        marginTop: 10,
        color: isDark ? theme.white : theme.white,
    },
    tableContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: isDark ? theme.border : theme.border,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: isDark ? theme.card : theme.card,
        paddingVertical: 16,
        paddingHorizontal: 12,
    },
    headerText: {
        fontFamily: fontFamily.semibold,
        width: 120,
        color: isDark ? theme.text : theme.text,
        fontSize: sizes.bodyDefault,
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: isDark ? theme.white : theme.white,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? theme.border : theme.border,
    },
    lastTableRow: {
        borderBottomWidth: 0,
    },
    cellText: {
        width: 120,
        color: isDark ? theme.text : theme.text,
        fontSize: sizes.bodyDefault,
        fontFamily: fontFamily.regular,
    },
    actionCell: {
        flexDirection: 'row',
        width: 160,
        justifyContent: 'space-around',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        marginLeft: 5,
        color: isDark ?  theme.text : theme.text,
        fontSize: sizes.bodySmall,
        fontFamily: fontFamily.medium,
    },
});

export default AdminPannel;