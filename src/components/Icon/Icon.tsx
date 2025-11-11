    import React from "react";
    import { Pressable } from "react-native";
    import { useAppTheme } from "@hooks";
    import { ThemeColorsOnda } from "@theme";
    import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome, FontAwesome6, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

    export type IconFamily = keyof typeof import('@expo/vector-icons');

    export interface IconProps {
    name: string;
    family?: IconFamily;
    color?: ThemeColorsOnda;
    size?: number;
    onPress?: () => void;
    }

    export function Icon({
    name,
    family = "Feather",
    color = "background",
    size = 24,
    onPress,
    }: IconProps) {
    const { colors } = useAppTheme();

    const iconColor = colors[color];

    const IconComponent =
        family === "Ionicons"
        ? Ionicons
        : family === "MaterialCommunityIcons"
        ? MaterialCommunityIcons
        : family === "Feather"
        ? Feather 
        : family === "FontAwesome5"
        ? FontAwesome5
        : family === "FontAwesome6"
        ? FontAwesome6 
        : family === 'FontAwesome' 
        ? FontAwesome 
        : MaterialIcons ;

    const iconElement = <IconComponent name={name as any} size={size} color={iconColor} />;

    if (onPress) {
        return (
        <Pressable hitSlop={10} onPress={onPress}>
            {iconElement}
        </Pressable>
        );
    }

    return iconElement;
    }