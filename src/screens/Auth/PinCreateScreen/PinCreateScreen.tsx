import React from "react";
import { Box_Onda, ScreenOnda, Text as TextOnda } from "@components";
import { PinInput, PinInputRef } from "@pakenfit/react-native-pin-input";
import { theme } from "@theme";
import { AuthScreenProps } from "@navigation";
import { ActivityIndicator, Alert } from "react-native";
import {asyncStorage} from "@services";

export function PinCreateScreen({ navigation }: AuthScreenProps<"PinCreate">) {
  const pinRef = React.useRef<PinInputRef>(null);
  const [status, setStatus] = React.useState<"choose" | "enter">("choose");
  const [savePin, setSavePin] = React.useState("");
  const [isloading, setIsloading] = React.useState(false);

  const handleConfirmPinUser = React.useCallback(async (pinCode: string) => {
    if (status === "choose") {
      console.log(status)
      setSavePin(pinCode);
      setStatus("enter");
      pinRef.current?.clear();
    } else {
      if (pinCode === savePin) {
        setIsloading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          asyncStorage.setItem("@onda12", pinCode);
          Alert.alert(
            "✅ PIN salvo com sucesso!",
            "Sua conta esta protegida!",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("BioFaceID"),
              },
            ]
          );
        } catch (error) {
          Alert.alert("❌ Erro ao salvar PIN", "Tente novamente.");
          setStatus("choose");
          pinRef.current?.clear();
          console.log(error)
        }finally{
          setIsloading(false)
        }
      } else {
        Alert.alert(
          "⚠️ Os PINs não coincidem",
          "Digite novamente para confirmar.",
          [
            {
              text: "Tentar novamente",
              onPress: () => {
                setStatus("choose");
                pinRef.current?.clear();
              },
            },
          ]
        );
      }
    }
  }, [status, savePin, navigation]);

  const title = status === "choose" ? "Criar PIN" : "Confirmar PIN";
  const subtitle =
    status === "choose"
      ? "Crie um PIN de 6 dígitos para proteger sua conta"
      : "Digite novamente para confirmar seu PIN";

  return (
    <ScreenOnda>
      <TextOnda preset="headingLarge">{title}</TextOnda>
      <TextOnda preset="paragraphMedium" italic>
        {subtitle}
      </TextOnda>
      <Box_Onda marginTop="s40" alignItems="center" justifyContent="center">
        {isloading ? (
          <ActivityIndicator size={"large"} color={theme.colors.success} />
        ) : (
          <PinInput
            inputProps={{
              secureTextEntry: true,
            }}
            ref={pinRef}
            length={6}
            onFillEnded={(text) => handleConfirmPinUser(text)}
            inputStyle={{
              width: 50,
              height: 50,
              borderWidth: 2,
              borderColor: theme.colors.success,
              borderRadius: 8,
              fontSize: 24,
              color: theme.colors.text,
              backgroundColor: theme.colors.background,
              textAlign: "center",
              fontFamily: "Roboto-Bold",
            }}
          />
        )}
      </Box_Onda>
    </ScreenOnda>
  );
}
