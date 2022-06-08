


import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import BgBox from '../../components/BgBox';
import { useEffect, useContext } from 'react'
import QuizContext from '../../context/quizContext'
import List from '@mui/material/List'
import  { LinkConstructor,  LinkButton } from '../../components/Links'
import { BigPaperCard } from '../../components/Cards'
import AnswerReview from '../../components/quiz/AnswerReview'

const Results = () => {
  const router = useRouter()
  const {
    questions,
    score,
    restoreDefault
  } = useContext(QuizContext)
  useEffect(() => {
    const lsQuestions = localStorage.getItem('questions')
    const lsSubmit = localStorage.getItem('submit')
    if(lsQuestions === null && lsSubmit === null) router.push('/')
    if(lsQuestions !== null && JSON.parse(lsQuestions).length < 1) router.push(`/`)
  }, [router])
  const reset = () => restoreDefault()
  return (
    <BgBox  className='flex column justify-center align-center'>
      <BigPaperCard>
      <Box className='flex justify-center align-center'>
      <Typography variant='h1' sx={{margin: '1rem auto 1rem 1rem'}}>
          {score}%
      </Typography>
      <LinkButton
         sx={{ margin: '1rem 1rem 0 auto' }}
         link={new LinkConstructor('new quiz', '/quiz', 'primary', reset)}/>
      <LinkButton 
         sx={{ margin: '1rem 1rem 0' }}
         link={new LinkConstructor('Home', '/', 'secondary', reset)}/>
      </Box>
      <List sx={{
        overflowY: 'hidden',
      }}>
        {questions.map(q => (
          <AnswerReview 
          key={q.question} 
          question={q.question}
          options={q.options} 
          correctAnswer={q.correctAnswer} 
          selectedAnswer={q.selectedAnswer}  />
        ))}
      </List>
      </BigPaperCard>
    </BgBox> 
  )
}

export default Results