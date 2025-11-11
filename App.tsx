import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import {theme as ThemeDefault} from '@theme';
import {useFonts} from "expo-font"
import { Box_Onda } from "@components";
import {storage, initializeStorage} from '@services'
import { ActivityIndicator } from "react-native";
import { AppStackRouter } from "@routes";
import { useThemeStore } from "@store";

export default function App() {

  initializeStorage(storage);
  const {theme } = useThemeStore();

  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf")
  });

  if(!fontsLoaded){
    return (
      <Box_Onda flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator color={ThemeDefault.colors.back} />
      </Box_Onda>
    )
  }


  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppStackRouter />
      </NavigationContainer>
    </ThemeProvider>
  );
}
