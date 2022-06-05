

import GlobalStyles from '@mui/material/GlobalStyles'
import { Theme } from '@mui/material/styles/createTheme'


export const opacityVisibilitySnippet = ( condition:boolean ) => {
  return {
    opacity: condition ? 1 : 0,
    visibility: condition ? 'visible' : 'hidden'
  }
}
export const changeDisplay = (theme: Theme, display: string) => {
  return{
    [theme.breakpoints.up('md')]: {
      display
    }
  }
}

const AppGlobalStyles = () => {
  return(
    <GlobalStyles styles={(theme) =>(
     { html: {
        'WebkitFontSmoothing': 'antialiased',
        'MozOsxFontSmoothing': 'grayscale',
      },
      '*, *::before, *::after': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      'button, a':{
        color: 'inherit',
        textDecorationOffset: '5px'
      },
      body: {
        minHeight: '100vh',
        overflowX: 'hidden'
      },
    })} />
  )
}
export default AppGlobalStyles
