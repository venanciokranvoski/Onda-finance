    import { ThemeColorsOnda } from "@theme";
    import { TouchableOpacityOndaProps } from "../../Box/Box";
    import { TextProps } from "@components";
    import { ButtonPreset,  } from "../Button";

    interface ButtonUI {
    container: TouchableOpacityOndaProps;
    content: { color: ThemeColorsOnda; textProps?: TextProps };
    }

    export const buttonPresetsOnda: Record<
    ButtonPreset,
    {
        default: ButtonUI;
        disabled: ButtonUI;
    }
    > = {
    primary: {
        default: {
        container: {
            backgroundColor: "sucess",
            width: '80%'
        },
        content: { color: "back" },
        },
        disabled: {
        container: {
            backgroundColor: "gray4",
        },
        content: { color: "gray2" },
        },
    },
    outline: {
        default: {
        container: {
            borderWidth: 1,
            borderColor: "primary",
            width: '80%'
        },
        content: { color: "primary" },
        },
        disabled: {
        container: {
            borderWidth: 1,
            borderColor: "gray4",
        },
        content: { color: "gray4" },
        },
    },
    ghost: {
        default: {
        container: {
            borderWidth:1,
            backgroundColor: "background",
            borderColor: "gray1",
            width: '80%'
        },
        content: {
            color: "gray1",
            textProps: {
            preset: "paragraphSmall",
            bold: false,
            },
        },
        },
        disabled: {
        container: {
            backgroundColor: "back",
            borderWidth: 1
        },
        content: { color: "gray01" },
        },
    },
    };
