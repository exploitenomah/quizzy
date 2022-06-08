

import  { useCallback } from 'react'
import Typography from '@mui/material/Typography'
import PreQuizTemplate from './PreQuizTemplate'
import  { LinkConstructor } from '../Links'


interface ConfirmInterface {
  difficulty: string,
  handleStartQuiz: Function,
  handleClearDifficulty: Function,
  limit: number
}
const ConfirmQuizStart = ({ 
  difficulty,
  handleStartQuiz,
  handleClearDifficulty,
  limit,
 }: ConfirmInterface) => {


  const handleStart = useCallback(() => handleStartQuiz(difficulty), [difficulty, handleStartQuiz])
  const hadleGoBack = useCallback(() => handleClearDifficulty(), [handleClearDifficulty])
  const links = [
    new LinkConstructor('Start Quiz', `/quiz?difficulty=${difficulty}&start=${true}`, 'success',  handleStart ),
    new LinkConstructor('Go Back', `/quiz`, 'warning', hadleGoBack)
  ]
  return (
    <>
    <PreQuizTemplate links={links} heading='Are You Ready?'>
     <Typography 
      mt={2}
      mb={0}
      align='center'
      component='p'
      >You have selected the <b>{difficulty}</b> level to answer <b>{limit}</b> questions</Typography>
    </PreQuizTemplate>
    </>
  )
}

export default ConfirmQuizStart
