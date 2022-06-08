
import { createTheme, ThemeOptions } from '@mui/material';
import { blue, red, orange, green } from '@mui/material/colors'

declare module '@mui/material' {
  interface Theme {
    status:{
      success: string,
      info: string, 
      warning: string,
      danger: string
      error: string,
      primary?: string,
      secondary?: string,
    }
  }
  interface ThemeOptions { 
    status:{
      success?: string,
      info?: string,
      warning?: string,
      danger?: string
      error?: string,
      primary?: string,
      secondary?: string,
    }
  }
}
declare module '@mui/material/Typography' {
  interface TypographyVariantsOptions {
    h1Hero?: React.CSSProperties
  }
  interface TypographyOptions{
    h1Hero: React.CSSProperties
  }
  interface TypographyPropsVariantOverrides {
    h1Hero: true
  }
}
interface themeOpt extends ThemeOptions {}

const themeStyles = {
  palette:{
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#333',
    },
  },
  typography: {
    h1:{
      fontSize: 40,
    },
    h1Hero: {
      fontSize: 45,
      fontWeight: '100',
      fontFamily: ['Roboto ', 'sans-serif']
    },
  },
  // spacing:{},
  status:{ 
    success: green[700],
    info: blue[700],
    warning: orange[700],
    danger: red[700],
    error: red[600], 
    primary: '#fff',
    secondary: ''
  },
  breakpoints:{},
  zIndex:{},
  transitions:{},
}  

const theme = createTheme(themeStyles as themeOpt);

export default theme