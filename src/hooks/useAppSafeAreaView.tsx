import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "./useAppThemeOnda";

export function useAppSafeArea(){
    const { top, bottom } = useSafeAreaInsets();
    const { spacing } = useAppTheme();
    return {
        top: Math.max(top, spacing.s14),
        bottom: Math.max(bottom, spacing.s16),
    };
}