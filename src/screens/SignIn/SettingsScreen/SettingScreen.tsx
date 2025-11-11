import React from "react";
import { Box_Onda, Button, Icon, ScreenOnda, Text as TextOnda } from "@components";
import { Switch } from "react-native";
import { useAuthStore, useThemeStore } from "@store";

export function SettingScreen() {
  const {logout} = useAuthStore();
  const {toggleThemeOnda, theme, themeMode} = useThemeStore();
  return (
    <ScreenOnda backgroundColor="back">
      <Box_Onda>
        <TextOnda preset="headingLarge" semiBold>
          Configurações
        </TextOnda>
        <TextOnda preset="paragraphSmall" semiBold color={"gray3"}>
          Personalize seu app
        </TextOnda>
      </Box_Onda>
      <Box_Onda marginTop="s14">
        <TextOnda preset="headingSmall" semiBold color="gray1">
          PREFERÊNCIAS
        </TextOnda>
        <Box_Onda
          marginTop="s10"
          width={"100%"}
          justifyContent="space-between"
          borderWidth={1}
          alignItems="center"
          flexDirection="row"
          borderRadius="s8"
          padding="s16"
          height={80}
          borderColor="gray0"
        >
          <Box_Onda flexDirection="row" alignItems="center">
            <Icon
              family="FontAwesome5"
              name="moon"
              size={24}
              color="primaryContrast"
            />
            <TextOnda preset="paragraphLarge" paddingLeft="s10" semiBold>
              Tema Escuro
            </TextOnda>
          </Box_Onda>
          <Switch
            value={themeMode === 'light'}
            onValueChange={toggleThemeOnda}
            trackColor={{
              false: theme.colors.text,
              true: theme.colors.primary,
            }}
            ios_backgroundColor={theme.colors.gray2}
          />
        </Box_Onda>
      </Box_Onda>
      <Box_Onda marginTop="s14">

      </Box_Onda>
      <Box_Onda justifyContent="center" alignItems="center" marginTop="s18">
        <Button title="Sair da conta" preset="primary" backgroundColor="error" onPress={logout} />
      </Box_Onda>
          

    </ScreenOnda>
  );
}
