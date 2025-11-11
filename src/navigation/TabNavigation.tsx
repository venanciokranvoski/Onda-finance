import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Icon } from "@components";
import {DashboardScreen, TransactionsScreen, PortfolioScreen, SettingScreen} from '@screens';
import {colors} from '@theme'


export type AppTabBottomTabParamsList = {
    Dashboard : undefined;
    Transactions : undefined ;
    Portfolio: undefined;
    Setting: undefined;
}

const Tab_Onda = createBottomTabNavigator<AppTabBottomTabParamsList>();

export function AppTabNavigation(){
        return (
        <Tab_Onda.Navigator screenOptions={({route})=> ({
            headerShown: false,
            tabBarActiveTintColor: colors.palette.primary,
            tabBarInactiveTintColor: colors.palette.gray1,
            tabBarStyle: {
            backgroundColor: colors.palette.background,
            borderTopWidth: 0.2,
            borderTopColor: colors.palette.primary,
            elevation: 5,
        },
            tabBarIcon: ({color, size}) => {
                let iconName: string;
                switch (route.name) {
                    case "Dashboard":
                    iconName = "home-outline";
                    break;
                    case "Portfolio":
                    iconName = "briefcase-outline";
                    break;
                    case "Transactions":
                    iconName = "swap-horizontal-outline";
                    break;
                    case "Setting":
                    iconName = "settings-outline";
                    break;
                }
                return <Icon family="Ionicons" name={iconName} size={size} color={color === colors.palette.primary ? "sucess" : "gray1"}/>;
            },
        })}>
            <Tab_Onda.Screen name="Dashboard" component={DashboardScreen} />
            <Tab_Onda.Screen name="Portfolio" component={PortfolioScreen} />
            <Tab_Onda.Screen name="Transactions" component={TransactionsScreen} />
            <Tab_Onda.Screen name="Setting" component={SettingScreen} />
        </Tab_Onda.Navigator>
    );
}