import React from "react";
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useAppSafeArea, useAppTheme } from '@hooks';
import { ScreenComponent } from "./Component_Intern/ScreenContainerOnda";
import { Box_Onda, BoxProps_Onda } from "../Box/Box";
import { ScrollViewContainer, ViewContainer } from "../ScrolViewContainerOnda";

export interface ScreenProps extends BoxProps_Onda {
    children?: React.ReactNode;
    HeaderComponent?: React.ReactNode;
    CanGoBack?: boolean;
    Scrollable?: boolean;
    Title?: string;
    NoPaddingHorizontal?: boolean; 
}


export function ScreenOnda({
    children,
    CanGoBack, 
    HeaderComponent,
    NoPaddingHorizontal,
    Scrollable,
    Title,
    style,
    ...BoxProps_Onda
}: ScreenProps) {
    const {bottom, top } = useAppSafeArea();
    const {colors} = useAppTheme();
    const Container = Scrollable ? ScrollViewContainer : ViewContainer;
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1}}>
            <Container backgroundColor={colors.background}>
                <Box_Onda paddingBottom="s16" paddingHorizontal={NoPaddingHorizontal ? undefined : "s16"} style={[{paddingTop: top, paddingBottom: bottom}, style]} {...BoxProps_Onda}>
                    {CanGoBack &&<ScreenComponent paddingHorizontal={NoPaddingHorizontal ? 's16' : undefined} CanGoBack={CanGoBack} Title={Title} HeaderComponent={HeaderComponent}/>}
                    {children}

                </Box_Onda>
            </Container>
        </KeyboardAvoidingView>
    )

}