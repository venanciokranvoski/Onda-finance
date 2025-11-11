import React from 'react'
import { Box_Onda, Button, ProfileAvatar, ScreenOnda, Text as TextOnda } from '@components'
import { View } from 'react-native'
import {AuthScreenProps} from '@navigation';


export function OnboardingScreen({navigation}: AuthScreenProps<'Onboarding'>) {
  return (
    <ScreenOnda>
      <View style={{paddingHorizontal: 30, marginTop: 120}}>
        <Box_Onda alignItems='center' marginBottom='s16'>
          <ProfileAvatar size={100} path={require('../../../../assets/img/A1.jpg')}  borderRadius={10}   />
        </Box_Onda>
        <TextOnda preset='headingLarge' color='sucess' textAlign='center'>Bem-vindo ao</TextOnda>
        <TextOnda preset='headingLarge' textAlign='center' marginBottom='s10'>Onda finance </TextOnda>
        <TextOnda textAlign='center' alignItems='center' preset='paragraphSmall' italic>Gerencie suas criptomoedas com segurança e simplicidade</TextOnda>
        <Box_Onda alignItems='center' marginTop='s32'>
          <Button title='Começar'  preset='primary' backgroundColor='success' onPress={()=> navigation.navigate('PinCreate')}  />
        </Box_Onda>
      </View>
    </ScreenOnda>
  )
}