

import  { useCallback } from 'react'
import Typography from '@mui/material/Typography'
import PreQuizTemplate, { LinkConstructor } from './PreQuizTemplate'


interface ConfirmInterface {
  difficulty: string,
  handleStartQuiz: Function,
  handleClearDifficulty: Function
}
const ConfirmQuizStart = ({ 
  difficulty,
  handleStartQuiz,
  handleClearDifficulty,
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
      >You have selected the <b>{difficulty}</b> level and you have <b>{difficulty}</b> minutes to answer <b>{difficulty}</b> questions</Typography>
    </PreQuizTemplate>
    </>
  )
}

export default ConfirmQuizStart
