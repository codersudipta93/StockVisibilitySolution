import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient";

export const FloatingTabBar = ({ theme, navigation }) => {
    const [selectedTab, setSelectedTab] = useState('pay');

    const handleTabPress = (tabName) => {
        setSelectedTab(tabName);
        
        // Add navigation logic here
        if (tabName === 'pay') {
            // Navigate to Pay screen
            console.log("Navigate to Pay Now screen");
        } else if (tabName === 'catalog') {
            // Navigate to Catalog screen
            console.log("Navigate to Catalogue screen");
        } else if (tabName === 'contact') {
            // Navigate to Contact Us screen
            console.log("Navigate to Contact Us screen");
        }
    };

    const renderTabItem = (tabName, iconName, label) => {
        const isSelected = selectedTab === tabName;
        
        // // For Pay Now tab, which uses a special background when selected
        // if (tabName === '2pay') {
        //     return (
        //         <TouchableOpacity 
        //             activeOpacity={0.9}
        //             onPress={() => handleTabPress('pay')}
        //             style={styles.tabWrapper}
        //         >
        //             {isSelected ? (
        //                 <LinearGradient
        //                     colors={['#610111', '#7f0212']}
        //                     style={styles.selectedPayTab}
        //                     start={{ x: 0, y: 0 }}
        //                     end={{ x: 1, y: 0 }}
        //                 >
        //                     <Icon 
        //                         name="card" 
        //                         size={20} 
        //                         color="#dbbf78"
        //                         style={styles.payIcon} 
        //                     />
        //                     <Text style={styles.selectedPayText}>Pay Now</Text>
        //                 </LinearGradient>
        //             ) : (
        //                 <View style={styles.tabItem}>
        //                     <Icon name="card" size={20} color="#FFFFFF" style={styles.tabIcon} />
        //                     <Text style={styles.tabText}>Pay Now</Text>
        //                 </View>
        //             )}
        //         </TouchableOpacity>
        //     );
        // }
        
        // // For other tabs

        
        return (
            <TouchableOpacity 
                activeOpacity={0.9}
                onPress={() => handleTabPress(tabName)}
                style={styles.tabWrapper}
            >
                <View style={styles.tabItem}>
                    <Icon 
                        name={iconName} 
                        size={22} 
                        color={isSelected ? "#dbbf78" : "#FFFFFF"} 
                    />
                    <Text style={[
                        styles.tabText, 
                        isSelected && styles.selectedTabText
                    ]}>
                        {label}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient 
                colors={['#7f0212', '#550b02']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.floatingTabBar}
            >
                {renderTabItem('pay', 'card', 'Pay Now')}
                {renderTabItem('catalog', 'pricetag', 'Catalogue')}
                {renderTabItem('contact', 'call', 'Contact Us')}
            </LinearGradient>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingTabBar: {
        width: width,
        paddingVertical: 6,
        //borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 12,
        paddingHorizontal: 8,
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    tabWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    tabIcon: {
        marginBottom: 4,
    },
    tabText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'OutfitMedium',
        marginTop: 4,
        textAlign: 'center',
    },
    selectedTabText: {
        color: '#dbbf78',
        fontFamily: 'OutfitBold',
    },
    // Special styles for Pay Now tab
    selectedPayTab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        width: '94%',
        height: 52,
        marginLeft: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 5,
    },
    payIcon: {
        marginRight: 8,
    },
    selectedPayText: {
        color: '#dbbf78',
        fontSize: 16,
        fontFamily: 'OutfitBold',
    }
});

