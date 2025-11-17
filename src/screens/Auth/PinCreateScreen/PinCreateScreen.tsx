import React from "react";
import { Box_Onda, Button, ScreenOnda, Text as TextOnda } from "@components";
import { PinInput, PinInputRef } from "@pakenfit/react-native-pin-input";
import { theme } from "@theme";
import { AuthScreenProps } from "@navigation";
import { ActivityIndicator, Alert } from "react-native";
import { asyncStorage } from "@services";

export function PinCreateScreen({ navigation }: AuthScreenProps<"PinCreate">) {
  const pinRef = React.useRef<PinInputRef>(null);
  const [status, setStatus] = React.useState<"choose" | "enter">("choose");
  const [savePin, setSavePin] = React.useState("");
  const [isloading, setIsloading] = React.useState(false);
  const [currentPin, setCurrentPin] = React.useState("");
  const [keymodel, setKeyModel] = React.useState("");


  const handleGetTextUser = React.useCallback((pinCode: string) => {
    setCurrentPin(pinCode);
  }, []);

  const ResetPin = React.useCallback(()=> {
    setCurrentPin("");
    pinRef.current?.clear();
    setKeyModel(key => key + 1);
  }, []);

  const handleConfirmPinUser = React.useCallback(
    async () => {
      if(!currentPin || currentPin.length < 6){
        Alert.alert("⚠️ PIN incompleto", "Digite os 6 dígitos do PIN.")
        return;
      }
      if (status === "choose") {
        setSavePin(currentPin);
        setStatus("enter");
        ResetPin();
      } else {
        if (currentPin === savePin) {
          setIsloading(true);
          try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            asyncStorage.setItem("@onda12", currentPin);
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
            setCurrentPin("");
            pinRef.current?.clear();
            console.log(error);
          } finally {
            setIsloading(false);
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
    },
    [status, savePin, navigation, currentPin]
  );

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
            key={keymodel}
            inputProps={{
              secureTextEntry: true,
            }}
            ref={pinRef}
            length={6}
            onFillEnded={(text) => handleGetTextUser(text)}
            inputStyle={{
              width: 50,
              height: 50,
              borderWidth: 2,
              borderColor: theme.colors.success,
              borderRadius: 8,
              fontSize: 24,
              color: theme.colors.success,
              backgroundColor: theme.colors.text,
              textAlign: "center",
              fontFamily: "Roboto-Bold",
            }}
          />
        )}
      </Box_Onda>
      <Box_Onda marginTop="s48" justifyContent="center" width={'100%'} alignItems="center">
        <Button title="Confirmar PIN" onPress={handleConfirmPinUser}  disabled={currentPin.length < 6 || isloading}/>
      </Box_Onda>
    </ScreenOnda>
  );
}
