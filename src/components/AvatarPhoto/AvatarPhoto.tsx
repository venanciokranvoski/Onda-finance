    import { Image, ImageSourcePropType } from "react-native";

    export interface ProfileAvatarProps {
    path: ImageSourcePropType;
    size?: number;
    borderRadius?: number;
    }
    
    export function ProfileAvatar({
    path,
    borderRadius = 14,
    size = 32,
    }: ProfileAvatarProps) {
    return (
        <Image
        source={path}
        style={{ width: size, height: size, borderRadius: borderRadius }}
        />
    );
    }
