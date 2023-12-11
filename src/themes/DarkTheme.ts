import { createTheme } from "@mui/material/styles";

//Dark Theme
export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976D2',
            dark: '#1662AD',
            light: '#2196F3',
            contrastText: '#FFFFFF'
        },
        background: {
            paper: '#121212',
            default: '#1E1E1E'
        },
        text:{
            primary: '#FFFFFF',
            secondary: '#EEEEEE'
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
        fontSize: 16,
        h4: {
            fontSize: '2.125rem',
            fontWeight: 'bold'
        },
        h5: {
            fontSize: '1.5rem'
        },
        h6: {
            fontSize: '1.25rem',
            fontWeight: 'medium'
        },
        subtitle1: {
            fontSize: '1rem'
        },
        body2: {
            fontSize: '0.875rem'
        },
        button: {
            fontSize: '0.875rem'
        },
        caption: {
            fontSize: '0.75rem'
        },
    },
});