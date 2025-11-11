    import React from "react";
    import { ActivityIndicator } from "react-native";
    import { buttonPresetsOnda } from "./Component_Intern/ButtonPresets_Onda";
    import { TouchableOpacityOndaProps, TouchableOpacityOnda } from "../Box";
    import {Text} from '../Text/Text'
    // +++++++++++++++++
    // UI
    // preset: primary secondary
    // default, disabled
    // +++++++++++++++++
    export type ButtonPreset = "primary" | "outline" | "ghost";

    export interface ButtonProps extends TouchableOpacityOndaProps {
    title: string;
    loading?: boolean;
    preset?: ButtonPreset;
    disabled?: boolean;
    }

    export function Button({
    title,
    loading,
    preset = "primary",
    disabled,
    ...touchableOpacityVenonProps
    }: ButtonProps) {
    const buttonPreset = buttonPresetsOnda[preset][disabled ? "disabled" : "default"];
    return (
        <TouchableOpacityOnda
            disabled={disabled || loading}
            paddingHorizontal="s16"
            height={50}
            alignItems="center"
            justifyContent="center"
            borderRadius="s12"
        {...buttonPreset.container}
        {...touchableOpacityVenonProps}
        >
        {loading ? (
            <ActivityIndicator />
        ) : (
            <Text preset="paragraphMedium" bold color={buttonPreset.content.color} {...buttonPreset.content.textProps}>
            {title}
            </Text>
        )}
        </TouchableOpacityOnda>
    );
    }