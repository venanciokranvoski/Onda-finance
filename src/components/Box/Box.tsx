    import React from "react";
    import {TouchableOpacity, TouchableOpacityProps as RNTouchableOpacityProps, PressableProps} from "react-native";
    import { Theme } from "../../theme/theme";
    import {    createBox,
                createRestyleComponent,
                backgroundColor,
                spacing,
                layout,
                border,
                spacingShorthand,
                BackgroundColorProps,
                SpacingProps,
                LayoutProps,
                BorderProps,
                SpacingShorthandProps,
                } from "@shopify/restyle";

                export const Box_Onda = createBox<Theme>();
                export type BoxProps_Onda  = React.ComponentProps<typeof Box_Onda>;

                type RestyleTypes = 
                    BackgroundColorProps<Theme> &
                    SpacingProps<Theme> &
                    LayoutProps<Theme> &
                    SpacingProps<Theme> &
                    BorderProps<Theme> &
                    SpacingShorthandProps<Theme>
                    
                export type TouchableOpacityOndaProps = RNTouchableOpacityProps & RestyleTypes;

                export const TouchableOpacityOnda = createRestyleComponent<TouchableOpacityOndaProps, Theme>([backgroundColor, spacing, layout, border], TouchableOpacity);

                export type PressableBoxProps = PressableProps & RestyleTypes;
                export const PressableBox = createRestyleComponent<PressableBoxProps, Theme>(
                    [backgroundColor, spacing, spacingShorthand, layout, border], TouchableOpacity
                )
