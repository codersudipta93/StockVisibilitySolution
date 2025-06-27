import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Screen Import
import Sidebar from '../screens/sidebar';
import {
    Dashboard,
    AvailableScheme
} from '../screens'
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <Sidebar {...props} />}>
            {/* <Drawer.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} /> */}
            <Drawer.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
