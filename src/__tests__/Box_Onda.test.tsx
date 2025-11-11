    import React from "react";
    import { render, fireEvent } from "@testing-library/react-native";
    import { ThemeProvider } from "@shopify/restyle";
    import { theme } from "@theme";
    import { Box_Onda, TouchableOpacityOnda, PressableBox } from "@components";

    describe("Box_Onda e derivados", () => {
    it("deve renderizar o Box_Onda corretamente", () => {
        const { getByTestId } = render(
        <ThemeProvider theme={theme}>
            <Box_Onda
            testID="box"
            backgroundColor="back"
            padding="s16"
            borderRadius="s12"
            />
        </ThemeProvider>
        );

        const box = getByTestId("box");
        expect(box).toBeTruthy();
    });

    it("deve renderizar o TouchableOpacityOnda e disparar evento de clique", () => {
        const mockFn = jest.fn();

        const { getByText } = render(
        <ThemeProvider theme={theme}>
            <TouchableOpacityOnda onPress={mockFn} backgroundColor="primary" padding="s16">
            <Box_Onda testID="text-box">Clique Aqui</Box_Onda>
            </TouchableOpacityOnda>
        </ThemeProvider>
        );

        const button = getByText("Clique Aqui");
        fireEvent.press(button);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it("deve renderizar o PressableBox e responder ao toque", () => {
        const mockFn = jest.fn();

        const { getByText } = render(
        <ThemeProvider theme={theme}>
            <PressableBox onPress={mockFn} backgroundColor="secondary" padding="s16">
            <Box_Onda testID="inner-box">Pressione</Box_Onda>
            </PressableBox>
        </ThemeProvider>
        );

        const pressable = getByText("Pressione");
        fireEvent.press(pressable);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
    });
