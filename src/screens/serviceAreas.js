import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    BackHandler,
    FlatList,
    TextInput
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

import Icon from 'react-native-vector-icons/Ionicons';
import { setData, getData, deleteData, clearAllData } from '../services/storage';
import { useSelector, useDispatch } from 'react-redux'
import { setToken, setUserData } from '../redux/projectReducer';
import { useTheme } from "../constants/themeProvider";

import { fontFamily, sizes, device, local_images, HelperFunctions } from "../constants";

import LinearGradient from "react-native-linear-gradient";
import { postApi } from "../services/apis";

const ServiceAreas = () => {
    const navigation = useNavigation();
    const { theme, isDark } = useTheme();
    const styles = getStyles(theme, isDark);

    const [tableData, setTableData] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all'); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getServiceAreas();
    }, [])

    const filteredData = Array.isArray(tableData) ? tableData.filter(item => {
        const query = searchQuery.toLowerCase();
        if (!query) return true;

        switch (filter) {
            case 'state':
                return item.State?.toLowerCase().includes(query);
            case 'city':
                return item.City?.toLowerCase().includes(query);
            case 'pincode':
                return item.PINCODE?.toLowerCase().includes(query);
            default:
                return (
                    item.State?.toLowerCase().includes(query) ||
                    item.City?.toLowerCase().includes(query) ||
                    item.PINCODE?.toLowerCase().includes(query) ||
                    item.LocationCategory?.toLowerCase().includes(query)
                );
        }
    }) : [];

    const getServiceAreas = async () => {
        setLoading(true);
        let body = {}
        await postApi('ServiceablePinCode', body).then((response) => {
            console.log(response);
            if (response.status == true) {
                if (response.data != null) {
                    console.log(response.data);
                    setTableData(response.data)
                    filteredData
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


    const skelitonRender = ({ item }) => (
        <SkeletonLoader width={455} height={300} borderRadius={4}
            style={styles.skelitonCard}
            shimmerColors={[theme.primary, theme.primaryMedium]}
        />
    );


    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.city}>{item.City}</Text>
                <View style={styles.chip}>
                    <Text style={styles.chipText}>{item.Region}</Text>
                </View>
            </View>

            <View style={[styles.cardHeader, { marginTop: 8 }]}>
                <View style={styles.detailsRow}>
                    <Icon name="location" size={16} color={theme.primary} />
                    <Text style={styles.state}>{item.State}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Icon name="pin" size={16} color={theme.primary} />
                    <Text style={styles.pincode}>{item.PINCODE}</Text>
                </View>
            </View>

            <View style={styles.categoryContainer}>
                <Text style={styles.categoryText}>{item.LocationCategory}</Text>
            </View>
        </View>
    );

    return (
        <Container
            bgColor={[
                isDark ? theme.primaryMedium : theme.primaryMedium,
                isDark ? theme.primaryMedium : theme.primaryMedium,
            ]}
        >
            <CustomHeader
                title="Services Areas"
                leftIconName="chevron-back"
                onLeftPress={() => navigation.goBack()}
                iconColor={theme.white}
                textColor={theme.white}
                backgroundColor={theme.primary}
            />

            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search locations..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#999"
                    />
                </View>
            </View>

            {loading == true ?

                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <FlatList
                        data={[1, 1, 1, 1]}
                        renderItem={skelitonRender}
                    />
                </ScrollView>
                :
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.Sl}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Icon name="location" size={50} color="#ccc" />
                            <Text style={styles.emptyText}>No locations found</Text>
                        </View>
                    }
                />
            }


        </Container>
    );
};

const getStyles = (theme, isDark) => ({
    container: {
        flex: 1,
        backgroundColor: 'red',
        paddingHorizontal: 16,
        // marginHorizontal:12
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 12,
        paddingBottom: 40,
        marginTop: 5,
    },
    headerContainer: {
        marginBottom: 16,
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2c3e50',
        marginTop: 20,
    },
    subheader: {
        fontSize: 16,
        color: '#7f8c8d',
        marginTop: 4,
    },
    searchContainer: {
        marginVertical: 16,
        marginHorizontal: 16
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    filterContainer: {
        marginTop: 12,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        marginRight: 8,
    },
    activeFilter: {
        backgroundColor: '#3498db',
    },
    filterText: {
        color: '#555',
        fontWeight: '500',
    },
    activeFilterText: {
        color: 'white',
    },
    listContent: {
        paddingBottom: 30,
    },
    card: {
        backgroundColor: theme.secondaryLight,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        marginHorizontal: 16
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    city: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.primary,
        fontFamily: fontFamily.bold
    },
    chip: {
        backgroundColor: theme.secondary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    chipText: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.white,
        fontFamily: fontFamily.bold
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    state: {
        fontSize: 15,
        color: theme.primary,
        fontFamily: fontFamily.medium,
        marginLeft: 8,
    },
    pincode: {
        fontSize: 15,
        color: theme.primary,
        fontFamily: fontFamily.medium,
        marginLeft: 8,
    },
    categoryContainer: {
        marginTop: 10,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: theme.secondary,
    },
    categoryText: {
        fontSize: 14,
        color: theme.primaryMedium,
        fontStyle: 'italic',
    },
    separator: {
        // height: 1,
        // backgroundColor: '#ecf0f1',
        //marginVertical: 4,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#95a5a6',
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

export default ServiceAreas;