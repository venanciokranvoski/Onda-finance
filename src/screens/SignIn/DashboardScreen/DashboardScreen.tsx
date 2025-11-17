import React from "react";
import {
  Box_Onda,
  BtnsDirectionsPropsList,
  ButtonDirection,
  CardInfoGenerics,
  Icon,
  ScreenOnda,
  Text as TextOnda,
} from "@components";
import { MainScreenProps } from "@navigation";
import { websocketMock } from "@services";
import { useDashboardStore } from "@store";
import { FlatList } from "react-native";
import {ptBR} from 'date-fns/locale';
import {format} from 'date-fns'



export function DashboardScreen({ navigation }: MainScreenProps<"Dashboard">) {
  const handleNavigationIndicator = (id: number) => {
    switch (id) {
      case 1:
        navigation.navigate("Enviar");
        break;
      case 2:
        navigation.navigate("Receber");
        break;
      case 3:
        navigation.navigate("Transactions");
        break;
    }
  };

  const { assets } = useDashboardStore();

    const TotalBalanceCript = assets.reduce((sum, asset) => {
    return sum + asset.price * asset.quantity;
  }, 0);



  React.useEffect(() => {
    websocketMock.connect();

    return () => {
      websocketMock.disconnect();
    };
  }, []);

  function renderItem({ item }: any) {
    return <CardInfoGenerics ScreenForComponent="dashboard" asset={item} />;
  }

  const currentDate = format(new Date(), "EEE dd MM yyyy", {locale: ptBR})

  return (
    <ScreenOnda Scrollable>
      <Box_Onda>
        <TextOnda preset="headingLarge" semiBold>
          Dashboard
        </TextOnda>
        <TextOnda preset="paragraphSmall" semiBold color={"gray3"}>
          {currentDate}
        </TextOnda>
      </Box_Onda>

      <Box_Onda
        width={"100%"}
        borderRadius="s18"
        borderColor="gray0"
        borderWidth={1}
        backgroundColor="background"
        marginTop="s32"
      >
        <Box_Onda padding="s12">
          <TextOnda preset="paragraphSmall" bold color="gray2">
            Saldo Total
          </TextOnda>
          <TextOnda preset="headingLarge" bold>
            R$ {TotalBalanceCript.toFixed(2)}
          </TextOnda>
        </Box_Onda>
        <Box_Onda
          flexDirection="row"
          top={-10}
          marginLeft="s12"
          marginBottom="s32"
        >
          <Icon family="FontAwesome" name="bitcoin" size={24} color="primary" />
          <TextOnda
            paddingLeft="s10"
            preset="paragraphSmall"
            bold
            color="primary"
          >
            +R$ 1.234,56 (3.2%) hoje
          </TextOnda>
        </Box_Onda>
      </Box_Onda>
      <Box_Onda
          flexDirection="row"
          width={"100%"}
          borderWidth={1}
          alignItems="center"
          justifyContent="space-between"
        >
          {BtnsDirectionsPropsList.map((props) => (
            <ButtonDirection
              NameText={props.label}
              key={props.id}
              familyIcon={props.family}
              nameIcon={props.icon}
              size={24}
              onPress={() => handleNavigationIndicator(props.id)}
            />
          ))}
        </Box_Onda>

      <Box_Onda marginTop="s40">
        <FlatList
          data={assets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListHeaderComponent={()=> (
            <TextOnda preset="paragraphCaption" semiBold>Seus Ativos</TextOnda>
          )}
        />
      </Box_Onda>
    </ScreenOnda>
  );
}
