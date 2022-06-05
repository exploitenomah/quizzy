
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
    }
  }
  interface ThemeOptions { 
    status:{
      success?: string,
      info?: string,
      warning?: string,
      danger?: string
      error?: string,
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
    },
  },
  // spacing:{},
  status:{ 
    success: green[500],
    info: blue[500],
    warning: orange[500],
    danger: red[400],
    error: red[500],
  },
  breakpoints:{},
  zIndex:{},
  transitions:{},
}  

const theme = createTheme(themeStyles as themeOpt);

export default theme