    import React from "react";
    import { Icon, IconFamily } from "../Icon";
    import { Box_Onda, PressableBox } from "../Box";
    import {Text as TextOnda} from '../Text'

    export const BtnsDirectionsPropsList = [
        { id: 1, label: 'Enviar',    icon: 'money-bill-transfer', family: 'FontAwesome6' as IconFamily },
        { id: 2, label: 'Receber',   icon: 'angles-down', family:'FontAwesome6' as IconFamily },
        { id: 3, label: 'Histórico', icon: 'history', family:'FontAwesome' as IconFamily },
    ]

    interface PropsBtnIndicator {
    size: number;
    familyIcon: IconFamily;
    nameIcon: string;
    NameText: string;
    onPress: ()=> void;
    }

    export function ButtonDirection({
    NameText,
    familyIcon,
    nameIcon,
    size,
    onPress
    }: PropsBtnIndicator) {
    return (
        <PressableBox
        width={80}
        height={90}
        borderRadius="s18"
        justifyContent="center"
        alignItems="center"
        borderColor="gray0"
        borderWidth={1}
        backgroundColor="background"
        marginTop="s32"
        onPress={onPress}
        >
        <Box_Onda
            alignItems="center"
            justifyContent="center"
            width={50}
            height={50}
            backgroundColor="primary"
            borderRadius="s12"
            padding="s4">
            <Icon size={size} family={familyIcon} name={nameIcon} color="back" />
        </Box_Onda>
        <TextOnda preset="paragraphSmall" paddingTop="s4" bold>
            {NameText}
        </TextOnda>
        </PressableBox>
    );
    }
