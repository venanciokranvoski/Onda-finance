import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";


export type AuthStackParamList = {
    Onboarding: undefined;
    PinCreate: undefined;
    BioFaceID: undefined; 
};

export type MainTabParamList = {
    Dashboard: undefined;
    Portfolio: undefined;
    Transactions: undefined;
    Setting: undefined;
    BioFaceID: undefined;
    Enviar: undefined;
    Receber: undefined;
};

export type MainStackParamList = {
    Tabs: undefined;
    AssetDetail: { symbol: string };
    Send: { address: string };
};

export type RootStackParamList = {
    MainTabParamList: undefined;
    AuthStackParamList: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, T>;

export type MainScreenProps<T extends keyof MainTabParamList> = NativeStackScreenProps<MainTabParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
    CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<MainStackParamList>
    >;

    export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

    declare global {
        namespace ReactNavigation {
        interface RootParamList
        extends AuthStackParamList,
        MainStackParamList,
        MainTabParamList,
        RootStackParamList {}
        }
    }