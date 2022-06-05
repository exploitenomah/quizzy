import type { AppProps } from 'next/app'
import '../styles/stylesheet.css'
import GlobalStyles  from '../styles/globals'
import { ThemeProvider, } from '@mui/material'
import theme from '../styles/theme'
import { QuizWrapper } from '../context/quizContext'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ThemeProvider theme={theme}>
      <QuizWrapper>
       <GlobalStyles />
       <Component {...pageProps} />        
      </QuizWrapper>
    </ThemeProvider>
   
)}

export default MyApp
