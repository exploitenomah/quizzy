import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import '../styles/stylesheet.css'
import GlobalStyles  from '../styles/globals'
import { ThemeProvider, } from '@mui/material'
import theme from '../styles/theme'
import { QuizWrapper } from '../context/quizContext'

function MyApp({ Component, pageProps }: AppProps) {
 
  const router = useRouter()
  useEffect(() => {
    const lsQuestions = localStorage.getItem('questions')
    const lsQuery = localStorage.getItem('query')
    const lsSubmit = localStorage.getItem('submit')
    const lsStart = localStorage.getItem('start')
    if(lsQuestions !== null && lsQuery !== null && lsSubmit !== null){
      const query = JSON.parse(lsQuery)
      console.log(lsSubmit)
     if(JSON.parse(lsSubmit) !== true) router.push(`/quiz?difficulty=${query.difficulty}&start=${true}`)
     else if(JSON.parse(lsSubmit) === true){
       router.push('/quiz/scoresheet')
     }
    }else if(lsQuestions !== null && lsQuery !== null && lsSubmit === null){
      const query = JSON.parse(lsQuery)
      if(lsStart !== null) router.push(`/quiz?difficulty=${query.difficulty}&start=${true}`)
    }
  }, [router])
  return(
    <ThemeProvider theme={theme}>
      <QuizWrapper>
       <GlobalStyles />
       <Component {...pageProps} />        
      </QuizWrapper>
    </ThemeProvider>
   
)}

export default MyApp
