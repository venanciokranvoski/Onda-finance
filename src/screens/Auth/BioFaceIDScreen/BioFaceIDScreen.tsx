import React, { useEffect, useState } from 'react';
import { Box_Onda, Button, Icon, ScreenOnda, Text as TextOnda } from '@components';

import { useAuthStore } from '@store';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export function FaceIDScreen() {
  const { login } = useAuthStore();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [biometricType, setBiometricType] = useState<string>('');

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(compatible);

    if (compatible) {
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (enrolled) {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      
        if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          setBiometricType('Face ID');
        } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          setBiometricType('Digital');
        } else {
          setBiometricType('Biometria');
        }
      }
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      
      if (!enrolled) {
        Alert.alert(
          'Biometria não configurada',
          'Por favor, configure a biometria nas configurações do seu dispositivo primeiro.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentique-se para ativar a biometria',
        fallbackLabel: 'Usar senha',
        cancelLabel: 'Cancelar',
        disableDeviceFallback: false, 
      });

      if (result.success) {
        await saveBiometricPreference(true);
        login();
      } else {
        if (result.error === 'user_cancel') {
          console.log('Usuário cancelou a autenticação');
        } else if (result.error === 'lockout') {
          Alert.alert(
            'Muitas tentativas',
            'Muitas tentativas falhadas. Tente novamente mais tarde.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Erro na autenticação biométrica:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao autenticar. Tente novamente.');
    }
  };

  const saveBiometricPreference = async (enabled: boolean) => {
    console.log(enabled)
  };

  const handleSkip = () => {
    saveBiometricPreference(false);
    login();
  };

  return (
    <ScreenOnda>
      <Box_Onda justifyContent='center' alignItems='center' marginTop='s56'>
        <Icon
          family='FontAwesome' 
          name={biometricType === '' ? 'user-circle' : 'fingerprint'} 
          size={90} 
          color={'success'} 
        />
      </Box_Onda>
      
      <Box_Onda justifyContent='center' alignItems='center' marginTop='s32'>
        <TextOnda preset='headingLarge' bold>
          Ativar {biometricType || 'Biometria'}?
        </TextOnda>
        <TextOnda preset='paragraphMedium' italic textAlign='center' marginTop='s14'>
          Use sua {biometricType.toLowerCase() || 'biometria'} para acessar o app de forma rápida e segura
        </TextOnda>
      </Box_Onda>
      
      <Box_Onda marginTop='s24' justifyContent='center' alignItems='center'>
        <Button 
          title={`Ativar ${biometricType || 'Biometria'}`}
          preset='primary' 
          marginBottom='s20' 
          onPress={handleBiometricAuth}
          disabled={!isBiometricSupported}
        />
        <Button 
          title='Pular' 
          preset='ghost' 
          onPress={handleSkip}
        />
      </Box_Onda>
    </ScreenOnda>
  );
}