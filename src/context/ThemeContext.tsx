import { createContext, useCallback, useState, useMemo, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { DarkTheme } from "../themes/DarkTheme";
import { LightTheme } from "../themes/LightTheme";

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme(): void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

interface IAppThemeProviderProps {
    children: React.ReactNode;
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');
    console.log("AAAAAAAAAAAAAAA " + themeName)
    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'light') return LightTheme;
        return DarkTheme;
    } , [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box sx={{bgcolor: theme.palette.background.default }}>
                    {children}
                </Box>
            </ThemeProvider>  
        </ThemeContext.Provider>
    )
}