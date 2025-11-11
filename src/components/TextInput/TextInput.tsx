
    import React from 'react'
    import {
        Pressable,
        TextInput as RNTextInput,
        TextInputProps as RNTextInputProps,
        TextStyle,
    } from 'react-native';
    import { Box_Onda, BoxProps_Onda } from '../Box';
    import {$fontFamily, $fontSizes, Text as TextOnda} from '../Text'
    import { colors } from '@theme';
    import { useAppTheme } from '@hooks';


    export interface TextInputProps extends RNTextInputProps {
        label?: string;
        errorMessage?: string;
        boxSetting?: BoxProps_Onda;
        containerProps?: BoxProps_Onda;
    }

    export  function TextInput({label, errorMessage, boxSetting, containerProps, ...RNTextInputProps}: TextInputProps) {
        const { colors } = useAppTheme();
        const inputRef = React.useRef<RNTextInput>(null);
        
        const $textInputContainer: BoxProps_Onda = {
        borderWidth: errorMessage ? 2 : 1,
        padding: 's16',
        borderColor: errorMessage ? 'error' : 'gray2',
        borderRadius: 's12',
        flexDirection: 'row',
        };

        function focusInput() {
            inputRef.current?.focus();
        }
        return (
            <Box_Onda flexGrow={1} flexShrink={1} {...boxSetting}>
                <Pressable onPress={focusInput}>
            {label && (
            <TextOnda marginBottom="s4" color="gray2" preset="paragraphMedium">
                    {label}
            </TextOnda>
            )}
            <Box_Onda {...$textInputContainer} {...containerProps} backgroundColor='back'>
            <RNTextInput
                ref={inputRef}
                placeholderTextColor={colors.gray2}
                {...RNTextInputProps}
                style={$textInputStyle}
                autoCapitalize="none"
            />
            </Box_Onda>
            <TextOnda color="error" preset="paragraphSmall" bold>
            {errorMessage}
            </TextOnda>
        </Pressable>
            </Box_Onda>
        )
    }


    export const $textInputStyle: TextStyle = {
        padding: 0,
        flexGrow: 1,
        flexShrink: 1,
        color: colors.palette.text, 
        fontFamily: $fontFamily.regular,
        ...$fontSizes.paragraphMedium,
    };