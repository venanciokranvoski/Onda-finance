import React from 'react'
import { Box_Onda,  CardInfoGenerics,  Icon, ScreenOnda, Text as TextOnda } from '@components'
import { PieChart } from 'react-native-gifted-charts'
import { theme } from '@theme';
import { FlatList } from 'react-native';
import { useDashboardStore } from '@store';


export  function PortfolioScreen() {

  const { assets } = useDashboardStore();

  const pieData = assets.map(asset => ({
    value: asset.quantity,
    color: asset.color,
    pct: `${asset.price}`,
    text: asset.symbol
  }))

    const TotalBalanceCript = assets.reduce((sum, asset) => {
      return sum + asset.price * asset.quantity;
  }, 0);


    function renderItem({ item }: any) {
      return <CardInfoGenerics ScreenForComponent="Portfolio" asset={item} />;
    }


  return (
    <ScreenOnda Scrollable backgroundColor='back'>
      <TextOnda preset='headingLarge' bold>Portfólio</TextOnda>
      <TextOnda preset='paragraphSmall' semiBold>Composição dos seus ativos</TextOnda>

      <Box_Onda borderWidth={1} marginTop='s20' borderColor='gray0' backgroundColor='gray01' borderRadius='s12' height={110}>
        <Box_Onda padding='s12'>
          <TextOnda preset='paragraphSmall' bold color='gray2'>Valor Total</TextOnda>
          <TextOnda preset='headingLarge' bold>R$ {TotalBalanceCript.toFixed(2)}</TextOnda>
        </Box_Onda>
        <Box_Onda  flexDirection='row' top={-10} marginLeft='s12' marginBottom='s32'>
          <Icon family='FontAwesome' name='arrow-up' size={16} color='primary' />
          <TextOnda paddingLeft='s10' preset='paragraphSmall' bold color='primary'>+R$ 1.234,56 (3.2%) hoje</TextOnda>
        </Box_Onda>
      </Box_Onda>

      <Box_Onda marginTop='s24' alignItems='center' justifyContent='center'>
        <PieChart
              data={pieData}
              donut
              showText={true}
              radius={100}
              innerRadius={60}
              textBackgroundRadius={26}
              textSize={8}
              textColor={theme.colors.back}
              sectionAutoFocus={true}
              focusOnPress={true}
              showTooltip={true}
              showValuesAsLabels={false}
              centerLabelComponent={()=>(
                <TextOnda  preset='paragraphCaptionSmall'  bold color='back'>R$ {TotalBalanceCript.toFixed(2)}</TextOnda>
              )}
              />
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
  )
}