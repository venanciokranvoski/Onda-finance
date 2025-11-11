import { Box_Onda, Button, FormTextInput, ScreenOnda } from "@components";
import { sendCryptoSchema } from "@validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectList } from "react-native-dropdown-select-list";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { theme } from "@theme";
import { Alert } from "react-native";
import { websocketMock } from "@services";
import { MainScreenProps } from "@navigation";

type sendCryptoSchemaType = yup.InferType<typeof sendCryptoSchema>;

export function Enviar({ navigation }: MainScreenProps<"Enviar">) {
  const [selected, setSelected] = React.useState("");
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<sendCryptoSchemaType>({
    resolver: yupResolver(sendCryptoSchema),
    defaultValues: {
      destinationAddress: "",
      quantity: "",
    },
    mode: "onChange",
  });

  async function submitForm(formValue: sendCryptoSchemaType) {
    if (!selected) {
      Alert.alert("Erro", "Selecione uma criptomoeda");
      return;
    }

    const payload = {
      type: "SEND_CRYPTO",
      data: {
        cryptocurrency: selected,
        destinationAddress: formValue.destinationAddress,
        quantity: parseFloat(formValue.quantity),
        timestamp: new Date().toISOString(),
      },
    };
    try {
      await websocketMock.send(payload);
    } catch (error) {
      console.log(error);
    }

    Alert.alert("✅ Enviado!");
    reset();
    setSelected("");
    navigation.navigate('Transactions');
  }

  const data = [
    { key: "1", value: "Bitcoin (BTC)" },
    { key: "2", value: "Ethereum (ETH)" },
    { key: "3", value: "Solana (SOL)" },
  ];

  return (
    <ScreenOnda Title="Enviar Cripto" CanGoBack backgroundColor="back">
      <Box_Onda>
        <Box_Onda marginBottom="s20" marginTop="s18">
          <SelectList
            setSelected={setSelected}
            data={data}
            save="value"
            placeholder="Selecione a Criptomoeda"
            search={false}
            boxStyles={{
              borderRadius: 10,
              borderColor: theme.colors.back,
              backgroundColor: theme.colors.primary,
            }}
            inputStyles={{ color: theme.colors.back }}
            dropdownTextStyles={{ color: theme.colors.text }}
          />
        </Box_Onda>
        <FormTextInput
          control={control}
          name="destinationAddress"
          label="Endereço de Destino"
          placeholder="01234..abcdxc"
          boxSetting={{ mb: "s20" }}
          errorMessage={errors.destinationAddress?.message}
        />
        <FormTextInput
          control={control}
          name="quantity"
          label="Quantidade"
          placeholder="0.1"
          boxSetting={{ mb: "s20" }}
          errorMessage={errors.quantity?.message}
        />
      </Box_Onda>
      <Button
        title="Continuar"
        width={"100%"}
        onPress={handleSubmit(submitForm)}
        disabled={!isValid}
      />
    </ScreenOnda>
  );
}
