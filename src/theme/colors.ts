export const palette = {
        background: '#000000',     
        surface: '#1A1F3A',         
        surfaceElevated: '#252B4A', 

        text: '#FFFFFF',            
        textSecondary: '#A0A8C5',  
        textTertiary: '#6B7394', 
        
        primary: '#01ffa3',
        primaryLight: '#47df95ff',

        secondary: '#4835F2',
        secondaryLight: '#355FF2',


        success: '#07f984ff',        
        error: '#FF5252',           
        warning: '#FFD740',         
        info: '#2979FF',           

        border: '#2A3055',
        borderLight: '#3A4070',

        overlay: 'rgba(0, 0, 0, 0.7)',

        chartDown: '#FF5252',
            
            gray01:'#3e3d3d22',
            gray0: '#333333',
            gray1: '#636363',
            gray2: '#8E8E8E',
            gray3: '#838383',
            gray4: '#E1E1E1',
            gray5: '#f5f5f5',
};

const DarkTheme: typeof lightTheme = {
    ...palette,
    primary: palette.primary,
    primaryContrast: palette.primaryLight,

    background: palette.background,
    backgroundContrast: palette.text,

    buttonPrimary: palette.primary,
    back: palette.background,
    
    error: palette.error,
    sucess: palette.success,

    paragraph: palette.gray01,
    separator: palette.gray4
}

const lightTheme = {
    ...palette,
    primary: palette.primary,
    primaryContrast: palette.gray01,

    background: palette.textSecondary,
    backgroundContrast: palette.textSecondary,

    buttonPrimary: palette.secondary,
    back: palette.textSecondary,
    
    error: palette.error,
    sucess: palette.success,

    paragraph: palette.text,
    separator: palette.gray4
};



export const colors = {palette, lightTheme, DarkTheme}