import {  useNavigation } from '@react-navigation/native';
import { ScreenProps } from '../Screen';
import { Box_Onda, TouchableOpacityOnda , BoxProps_Onda} from '../../Box';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
type Props = Pick<ScreenProps, 'Title' | 'CanGoBack' | 'HeaderComponent' > & BoxProps_Onda;

export function ScreenComponent({Title, CanGoBack, HeaderComponent, ...BoxProps_Onda}: Props) {
    const nav_Onda = useNavigation();
    const showBacklabel = !Title && !HeaderComponent;
    return (
        <Box_Onda
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="s16"
        {...BoxProps_Onda}
        >
        {CanGoBack && (
            <TouchableOpacityOnda
            testID='screen-back-button'
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            onPress={nav_Onda.canGoBack}
            mr={showBacklabel ? 's10' : undefined}
            >
            <Icon
                family='FontAwesome'
                name="arrow-left"
                color="primary"
                onPress={nav_Onda.goBack}
            />
            {!showBacklabel && (
                <Text preset="paragraphMedium" semiBold ml="s8">
                
                </Text>
            )}
            </TouchableOpacityOnda>
        )}
        {HeaderComponent}
        {Title && <Text preset="headingMedium" bold>{Title}</Text>}
        {Title && <Box_Onda width={20} />}
        </Box_Onda>
        )
    }