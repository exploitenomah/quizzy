

import Box from '@mui/material/Box';
import { color } from '../Links'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { useState, useContext, useCallback, useMemo } from 'react'
import QuizContext  from '../../context/quizContext'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import AlertDialog from '../Dialog'
import { PaperCard } from '../Cards'


const buttons: {
  text: string,
  color: color
}[] = [
    {
      text: 'prev',
      color: 'primary'
    },
    {
      text: 'next',
      color: 'info'
    }
  ]



const QuizTemplate = () => {
  const {
    questions,
    currentActive,
    handleAnswerQuestion,
    handleSubmitQuiz,
  } = useContext(QuizContext)
  const [active, setActive] = useState<number>(currentActive)
  const [preSubmitWarning, setPreSubmitWarning] = useState(false)
  const currentQuestion = questions[active]
  const allIndices = questions.length - 1

  // const options = currentQuestion ? [...(currentQuestion?.incorrectAnswers), currentQuestion?.correctAnswer].sort().reverse() : []


  const handleChangeQuestion = useCallback((action: string) => {
    if (action === 'next') {
      if (allIndices === active) return
      setActive(prev => prev + 1)
      localStorage.setItem('currentActive', JSON.stringify(active + 1))
    }
    if (action === 'prev') {
      if (active === 0) return
      setActive(prev => prev - 1)
      localStorage.setItem('currentActive', JSON.stringify(active - 1))
    }
  }, [allIndices, active])

  const handlePreSubmit = useCallback(() => {
    const unansweredQuestions = questions.filter(question => !question.isAnswered)
    if (unansweredQuestions.length > 0) setPreSubmitWarning(true)
    else {
      return handleSubmitQuiz()
    }
  }, [questions, handleSubmitQuiz])
  const handleModal = useCallback((action: string) => {
    if (action === 'submit') {
      setPreSubmitWarning(false)
      return handleSubmitQuiz()
    }
    if (action === 'close') {
      return setPreSubmitWarning(false)
    } else {
      setPreSubmitWarning(true)
    }
  }, [handleSubmitQuiz])
  return (
    <>
      <Box
        className='flex justify-center align-center'
        sx={{
          padding: '.6rem',
          minHeight: '100vh'
        }}
      >
        <Box>
          <PaperCard>
            <Typography
              className='mx-auto'
              align='center'
              component='p'
              sx={{
                maxWidth: '35ch',
                margin: '1rem auto .6rem'
              }}
            >
              {currentQuestion?.question}
            </Typography>
            <List>
              {
                currentQuestion?.options.map((option) => (
                  <ListItem
                    key={option}
                    sx={{}}
                    className={'listItemClasslist'} >
                    <Button
                      onClick={() => {
                        handleAnswerQuestion(currentQuestion.id, option)
                      }}
                      variant='contained'
                      component='a'
                      color={currentQuestion?.selectedAnswer === option ? 'secondary' : 'primary'}
                      size='large'
                      sx={{ width: '100%', textTransform: 'lowercase' }}
                    >{option}</Button>
                  </ListItem>
                ))
              }
            </List>
            <List className='flex wrap'>
              {buttons.map(button => (
                <ListItem
                  sx={{ width: '50%' }}
                  key={button.text}>
                  <Button
                    onClick={() => handleChangeQuestion(button.text)}
                    variant='contained'
                    disabled={button.text === 'next' ? allIndices === active : active === 0}
                    color={button.color}
                    size='large'
                    sx={{ width: '100%' }}
                  >{button.text}</Button>
                </ListItem>
              ))}
            </List>
            {
              allIndices === active &&
              <Button
                onClick={handlePreSubmit}
                variant='contained'
                color='info'
                size='large'
                sx={{ width: '100%' }}
              >Submit</Button>
            }
          </PaperCard>
        </Box>
      </Box>
      <AlertDialog
        open={preSubmitWarning}
        handleToggleOpen={handleModal}
        title={'Submit Quiz?'}
        content={'You have some unanswerd questions'}
        agreeText={'submit'} disagreeText={'cancel'} agreeBtnColor='warning' />
    </>
  )
}

export default QuizTemplate