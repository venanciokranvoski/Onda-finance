import React from 'react';
import { AppTabNavigation, AppTabBottomTabParamsList } from './TabNavigation';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Enviar, Receber } from '@screens';

export type AppStackParamList = {
    AppTabNavigator: NavigatorScreenParams<AppTabBottomTabParamsList>
    Enviar: undefined;
    Receber: undefined;
}

const Stack = createNativeStackNavigator<AppStackParamList>();

interface Props {
    initialRouteName?: keyof AppStackParamList;
}

export function AppStack({initialRouteName = 'AppTabNavigator'}: Props){
    return (
        <Stack.Navigator screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
        }} initialRouteName={initialRouteName}>
            <Stack.Screen name='AppTabNavigator' component={AppTabNavigation} />
            <Stack.Screen name='Enviar' component={Enviar} />
            <Stack.Screen name='Receber' component={Receber} />
        </Stack.Navigator>
    )
}