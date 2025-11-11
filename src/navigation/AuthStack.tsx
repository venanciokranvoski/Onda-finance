import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {OnboardingScreen, PinCreateScreen, FaceIDScreen} from '@screens';

export type AuthStackNavigationProps = {
    Onboarding: undefined;
    PinCreate: undefined;
    BioFaceID: undefined;
}

const Stack = createNativeStackNavigator<AuthStackNavigationProps>();

export function AuthStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false, fullScreenGestureEnabled: true}}initialRouteName="Onboarding">
            
            <Stack.Screen name="Onboarding"   component={OnboardingScreen}  />
            <Stack.Screen name="PinCreate"   component={PinCreateScreen}   />
            <Stack.Screen name="BioFaceID" component={FaceIDScreen} />
        </Stack.Navigator>
    )
}