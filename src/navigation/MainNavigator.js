
import React from 'react'
import { Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, TransitionSpecs } from '@react-navigation/native-stack';

import {
    Auth,
    Login,
    Registration,
    OTPVerification,
    NetworkError,
    AvailableScheme,
    SchemeDetailScreen,
    MyScheme,
    ServiceAreas,
    EMIPayment,
    PurchaseHistoryScreen,
    RMFGStock,
    Complain,
    ProfileView,
    AdminPannel
} from '../screens'
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator()


const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="AuthInitial" component={Auth} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false, animation: 'flip', }} />
                <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false, animation: 'slide_from_right', }} />
                <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ headerShown: false, animation: 'slide_from_right', }} />
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false, animation: 'slide_from_right',  }} />
                <Stack.Screen name="NetworkError" component={NetworkError} options={{ headerShown: false, animation: 'flip', }} />
                <Stack.Screen name="AvailableScheme" component={AvailableScheme} options={{ headerShown: false,animation:'flip'}} />
                <Stack.Screen name="SchemeDetailScreen" component={SchemeDetailScreen} options={{ headerShown: false,animation:'simple_push'}} />
                <Stack.Screen name="MyScheme" component={MyScheme} options={{ headerShown: false,animation:'simple_push'}} />
                <Stack.Screen name="ServiceAreas" component={ServiceAreas} options={{ headerShown: false,animation:'simple_push'}} />
                <Stack.Screen name="EMIPayment" component={EMIPayment} options={{ headerShown: false,animation:'simple_push'}} />
                <Stack.Screen name="PurchaseHistoryScreen" component={PurchaseHistoryScreen} options={{ headerShown: false,animation:'simple_push'}} />
                <Stack.Screen name="RMFGStock" component={RMFGStock} options={{ headerShown: false,animation:'simple_push'}} />
                <Stack.Screen name="Complain" component={Complain} options={{ headerShown: false,animation:'simple_push'}} />
                <Stack.Screen name="ProfileView" component={ProfileView} options={{ headerShown: false,animation:'simple_push'}} />
                <Stack.Screen name="AdminPannel" component={AdminPannel} options={{ headerShown: false,animation:'simple_push'}} />
            
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator