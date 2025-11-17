import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {AuthStack, RootStackParamList} from "@navigation";
import {useAuthStore} from '@store';
import { AppStack } from "src/navigation/AppStack";


const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStackRouter(){
    const { isAuthenticated } = useAuthStore();

    return (
        <Stack.Navigator screenOptions={{headerShown: false }}>
            {
                isAuthenticated ? (
                    <Stack.Screen name="MainTabParamList" component={AppStack} />
                ) : (
                    <Stack.Screen name="AuthStackParamList" component={AuthStack} />
                )

            }
        </Stack.Navigator>
    )
}