import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Container, CustomButton, CustomHeader, Loading, ConfirmationModal, SkeletonLoader, FloatingTabBar } from "../components";
import { useTheme } from "../constants/themeProvider";
import { fontFamily, sizes, device, local_images, HelperFunctions } from "../constants";
import LinearGradient from 'react-native-linear-gradient';

const PurchaseHistoryScreen = () => {
    const [activeFilter, setActiveFilter] = useState('12 Months');
    const [startDate, setStartDate] = useState('From Date');
    const [endDate, setEndDate] = useState('To Date');
    const { theme, isDark } = useTheme();
    const [expandedCard, setExpandedCard] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [customername, setCustomername] = useState('ALF ENGINEERING PVT LTD');
    const [location, setLocation] = useState('Plot no-74a, sector-11,tata vendor');

    const navigation = useNavigation();
    const styles = getStyles(theme, isDark, fontFamily, sizes);
    // Sample data - replace with your actual data
    // Sample data
    const invoiceData = [
        {
            id: '1',
            invoiceNo: '511081728',
            invoiceDate: '11/6/2025',
            productType: 'TML SPS',
            grade: 'E34',
            tdc: '--',
            thickness: 1.9,
            width: 1250,
            length: 2500,
            qty: 2.336
        },
        {
            id: '2',
            invoiceNo: '511081759',
            invoiceDate: '11/6/2025',
            productType: 'TML POS',
            grade: 'E34',
            tdc: '--',
            thickness: 1.9,
            width: 1250,
            length: 2500,
            qty: 5.708
        },
        {
            id: '3',
            invoiceNo: '511081729',
            invoiceDate: '11/6/2025',
            productType: 'TML SPS',
            grade: 'E34',
            tdc: '---',
            thickness: 1.6,
            width: 1250,
            length: 2500,
            qty: 5.708
        },
        {
            id: '4',
            invoiceNo: '511081436',
            invoiceDate: '9/6/2025',
            productType: 'TML POS',
            grade: 'E34',
            tdc: '---',
            thickness: 3,
            width: 1250,
            length: 2360,
            qty: 5.076
        },



        {
            id: '5',
            invoiceNo: '511081313',
            invoiceDate: '8/6/2025',
            productType: 'TML POS',
            grade: 'E46',
            tdc: '---',
            thickness: 4,
            width: 1250,
            length: 2500,
            qty: 3.156
        },
        {
            id: '6',
            invoiceNo: '511080973',
            invoiceDate: '4/6/2025',
            productType: 'TML POS',
            grade: 'E34',
            tdc: '---',
            thickness: 2.5,
            width: 1250,
            length: 2500,
            qty: 6.706
        },{
            id: '7',
            invoiceNo: '511080712',
            invoiceDate: '31/5/2025',
            productType: 'TML POS',
            grade: 'E34',
            tdc: '---',
            thickness: 1.9,
            width: 1250,
            length: 1720,
            qty: 7.688
        },{
            id: '8',
            invoiceNo: '511080500',
            invoiceDate: '29/5/2025',
            productType: 'TML POS',
            grade: 'E34',
            tdc: '---',
            thickness: 2.5,
            width: 1250,
            length: 2500,
            qty: 4.276
        },{
            id: '9',
            invoiceNo: '511079405',
            invoiceDate: '26/5/2025',
            productType: 'TML POS',
            grade: 'E34',
            tdc: '---',
            thickness: 3,
            width: 1250,
            length: 2500,
            qty: 12.002
        },{
            id: '10',
            invoiceNo: '511079410',
            invoiceDate: '26/5/2025',
            productType: 'TML POS',
            grade: 'E34',
            tdc: '---',
            thickness: 2.5,
            width: 1250,
            length: 2500,
            qty: 4.276
        }

    ];

    const filteredData = invoiceData.filter(item =>
        item.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.grade.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const renderItem = ({ item, index }) => (
        <View style={[styles.card, { marginBottom: (index == (filteredData.length) - 1) ? 29 : 0 }]}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                    <Icon name="document-text-outline" size={18} color="#fff" />
                    <Text style={styles.invoiceNo}>{item.invoiceNo}</Text>
                </View>
                <View style={styles.headerRight}>
                    <Icon name="calendar-outline" size={16} color="#fff" />
                    <Text style={styles.invoiceDate}>{item.invoiceDate}</Text>
                </View>
            </View>

            {/* Card Content */}
            <View style={styles.cardContent}>
                <View style={styles.productInfo}>
                    <Icon name="cube-outline" size={20} color="#6b7280" />
                    <Text style={styles.productType}>{item.productType}</Text>
                    <View style={styles.gradeBadge}>
                        <Text style={styles.gradeText}>{item.grade}</Text>
                    </View>
                </View>

                <View style={styles.detailGrid}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>TDC</Text>
                        <Text style={styles.detailValue}>{item.tdc}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Quantity</Text>
                        <Text style={[styles.detailValue, styles.quantityText]}>{item.qty} MT</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => setExpandedCard(expandedCard === index ? null : index)}
                    style={styles.expandButton}
                >
                    <Text style={styles.expandButtonText}>Dimensions</Text>
                    <Icon
                        name={expandedCard === index ? "chevron-up-outline" : "chevron-down-outline"}
                        size={22}
                        color="#4b5563"
                    />
                </TouchableOpacity>

                {expandedCard === index && (
                    <View style={styles.dimensionsContainer}>
                        <View style={styles.dimensionItem}>
                            <View style={{flexDirection:'row'}}>
                                <Icon name="resize-outline" size={16} color="#6b7280" />
                                <Text style={styles.dimensionLabel}>Thickness</Text>
                            </View>
                            <Text style={styles.dimensionValue}>{item.thickness}mm</Text>
                        </View>
                        <View style={styles.dimensionItem}>
                           <View style={{flexDirection:'row'}}>
                                <Icon name="resize-outline" size={16} color="#6b7280" />
                                <Text style={styles.dimensionLabel}>Width</Text>
                            </View>
                            <Text style={styles.dimensionValue}>{item.width}mm</Text>
                        </View>
                        <View style={styles.dimensionItem}>
                           <View style={{flexDirection:'row'}}>
                                <Icon name="resize-outline" size={16} color="#6b7280" />
                                <Text style={styles.dimensionLabel}>Length</Text>
                            </View>
                            <Text style={styles.dimensionValue}>{item.length}mm</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );


    return (
        <Container
            bgColor={[
                isDark ? theme.primary : theme.primary,
                "#0b3866",
            ]}
        >

            <CustomHeader
                title="Purchase History Report"
                leftIconName="chevron-back"
                onLeftPress={() => navigation.goBack()}
                rightIconName="download"
                rightIconSize={32}
                //onRightPress={() => setModalVisible(true)}
                iconColor={theme.black}
                textColor={theme.black}
                backgroundColor={theme.white}
            />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* Header */}
                    {/* <View style={styles.header}>
                        <View style={styles.locationCustomerContainer}>
                            <Text style={styles.locationText}>Location</Text>
                            <Icon name="chevron-down" size={16} color="#4b7bec" />
                        </View>
                        <Text style={styles.customerName}>Customer Name</Text>
                    </View> */}



                    {/* Filter Options */}
                    <View style={styles.filterContainer}>

                        <View style={styles.dateRangeContainer}>

                            <View style={[styles.searchContainer, { width: '38%' }]}>
                                <Icon name="location-outline" size={22} color="#9ca3af" style={styles.searchIcon} />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Location"
                                    placeholderTextColor="#9ca3af"
                                    value={location}
                                    onChangeText={setLocation}
                                    editable={true}

                                />
                                {searchTerm.length > 0 && (
                                    <TouchableOpacity onPress={() => setSearchTerm('')}>
                                        <Icon name="close-circle-outline" size={18} color="#9ca3af" />
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View style={[styles.searchContainer, { width: '60%' }]}>
                                <Icon name="person-outline" size={22} color="#9ca3af" style={styles.searchIcon} />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Customer Name"
                                    placeholderTextColor="#9ca3af"
                                    value={customername}
                                    onChangeText={setCustomername}
                                    editable={true}
                                />
                                {searchTerm.length > 0 && (
                                    <TouchableOpacity onPress={() => setSearchTerm('')}>
                                        <Icon name="close-circle-outline" size={18} color="#9ca3af" />
                                    </TouchableOpacity>
                                )}
                            </View>


                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {['Past 12 Months', '6 Months', '3 Months', 'Custom'].map((filter) => (
                                <TouchableOpacity
                                    key={filter}
                                    style={[styles.filterButton, activeFilter === filter && styles.activeFilterButton]}
                                    onPress={() => setActiveFilter(filter)}
                                >
                                    <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
                                        {filter}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Date Range Selector */}
                    {activeFilter === 'Custom' && (
                        <View style={styles.dateRangeContainer}>
                            <View style={styles.dateInputContainer}>
                                {/* <Text style={styles.dateLabel}>From Date:</Text> */}
                                <TouchableOpacity style={styles.dateInput}>
                                    <Text style={{ fontFamily: fontFamily.medium }}>{startDate}</Text>
                                    <Icon name="calendar" size={22} color={theme.primary} style={styles.dateIcon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.dateInputContainer}>
                                {/* <Text style={styles.dateLabel}>To Date:</Text> */}
                                <TouchableOpacity style={styles.dateInput}>
                                    <Text style={{ fontFamily: fontFamily.medium }}>{endDate}</Text>
                                    <Icon name="calendar" size={22} color={theme.primary} style={styles.dateIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* Invoice List */}
                    <FlatList
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Icon name="alert-circle-outline" size={24} color="#6b7280" />
                                <Text style={styles.emptyText}>No invoices found</Text>
                            </View>
                        }
                    />
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, }}>
                    <LinearGradient
                        colors={['#373B44', theme.primary,]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.totalContainer}
                    >

                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalValue}>5.2 MT</Text>

                    </LinearGradient>
                </View>

            </View>
        </Container>
    );
};

const getStyles = (theme, isDark, fontFamily, sizes) => ({
    container: {
        flex: 1,
        // backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        marginBottom: 20,
    },
    locationCustomerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    locationText: {
        fontSize: 14,
        color: '#495057',
        marginRight: 4,
    },
    customerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212529',
    },
    tabsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
        marginBottom: 16,
    },
    tab: {
        paddingBottom: 12,
        marginRight: 24,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#4b7bec',
    },
    tabText: {
        fontSize: 16,
        color: '#6c757d',
    },
    activeTabText: {
        color: '#4b7bec',
        fontWeight: '600',
    },
    filterContainer: {
        marginBottom: 16,
    },
    filterButton: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 16,
        backgroundColor: '#e9ecef',
        marginRight: 8,
    },
    activeFilterButton: {
        backgroundColor: '#000',
    },
    filterText: {
        fontSize: 14,
        color: '#495057',
        fontFamily: fontFamily.medium
    },
    activeFilterText: {
        color: '#fff',
    },
    dateRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        width: '100%',
        //borderWidth:1
    },
    dateInputContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
        marginRight: 8,
        //borderWidth:1,

    },
    dateLabel: {
        marginBottom: 8,
        color: '#495057',

    },
    dateInput: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        padding: 8,
        width: '98%',
        height: 48
    },
    dateIcon: {
        marginLeft: 8,
    },
    exportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: 16,
    },
    exportText: {
        color: '#4b7bec',
        marginLeft: 4,
        fontWeight: '500',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
        marginBottom: 8,
    },
    headerText: {
        flex: 1,
        fontWeight: '600',
        color: '#495057',
        textAlign: 'center',
    },
    invoiceItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        // padding: 12,
        marginBottom: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    invoiceMainInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: 'red'
    },
    invoiceNo: {
        flex: 1,
        fontWeight: '500',
        color: '#212529',
    },
    invoiceDate: {
        flex: 1,
        textAlign: 'center',
        color: '#6c757d',
        fontFamily: fontFamily.medium,
        fontSize: 18
    },
    invoiceQty: {
        flex: 1,
        textAlign: 'right',
        color: '#212529',
        fontWeight: '500',
    },
    invoiceDetails: {
        borderTopWidth: 1,
        borderTopColor: '#f1f3f5',
        paddingTop: 8,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    detailLabel: {
        width: 100,
        color: '#6c757d',
    },
    detailValue: {
        flex: 1,
        color: '#212529',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#dee2e6',
        marginTop: 8,
        backgroundColor: theme.primary,
        paddingHorizontal: 12,
        width: '100%',
        // borderTopRightRadius: 12,
        // borderTopLeftRadius: 12
    },
    totalLabel: {
        fontFamily: fontFamily.bold,
        fontSize: 18,
        color: theme.white,
        marginRight: 18,
    },
    totalValue: {
        fontWeight: '600',
        color: theme.white,
        fontFamily: fontFamily.bold,
        fontSize: 18,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        width: '47%'
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#334155',
        fontFamily: fontFamily.bold
    },
    listContent: {
        paddingBottom: 16,
    },
    card: {
        marginTop: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        // marginBottom: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#000',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    invoiceNo: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 8,
        fontSize: 15,
        fontFamily: fontFamily.bold
    },
    invoiceDate: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 6,
        fontFamily: fontFamily.medium
    },
    cardContent: {
        padding: 16,
    },
    productInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    productType: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginLeft: 8,
        marginRight: 8,
    },
    gradeBadge: {
        backgroundColor: '#f1f5f9',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    gradeText: {
        fontSize: 13,
        fontFamily: fontFamily.medium,
        color: '#475569',
        fontWeight: '500',
    },
    detailGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    detailItem: {
        backgroundColor: '#f8fafc',
        borderRadius: 6,
        padding: 12,
        flex: 1,
        marginHorizontal: 4,
    },
    detailLabel: {
        fontSize: 12,
        fontFamily: fontFamily.bold,
        color: '#64748b',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 14,
        fontFamily: fontFamily.bold,
        color: '#1e293b',
    },
    quantityText: {
        color: '#10b981',
    },
    expandButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 6,
        padding: 12,
    },
    expandButtonText: {
        fontSize: 14,
        fontFamily: fontFamily.bold,
        fontWeight: '500',
        color: '#475569',
    },
    dimensionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    dimensionItem: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    dimensionLabel: {
        fontSize: 12,
        color: '#64748b',
        marginLeft: 4,
        marginRight: 4,
        fontFamily: fontFamily.bold
    },
    dimensionValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1e293b',
        fontFamily: fontFamily.bold,
        marginTop:6,
        textAlign:'center'
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    emptyText: {
        color: '#64748b',
        fontSize: 14,
        marginTop: 8,
    },
    summaryContainer: {
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        alignItems: 'center',
    },
    summaryText: {
        color: '#64748b',
        fontSize: 14,
    },
    boldText: {
        fontWeight: '600',
        color: '#334155',
    },

});

export default PurchaseHistoryScreen;