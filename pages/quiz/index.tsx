


import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import LevelSelect from '../../components/quiz/LevelSelect'
import ConfirmQuizStart from '../../components/quiz/ConfirmQuizStart'
import QuizTemplate from '../../components/quiz/QuizTemplate'
import { useContext } from 'react'
import QuizContext from '../../context/quizContext'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

const permits = ['easy', 'medium', 'hard']
interface PrequizInterface {
  handleStartQuiz: Function
  handleSetDifficulty: Function,
  handleClearDifficulty: Function,
  difficulty: string,
  limit: number,
}

const PreQuiz = ({
  difficulty,
  handleStartQuiz,
  handleSetDifficulty,
  handleClearDifficulty,
  limit
}: PrequizInterface) => {
  const { query } = useRouter()
  return (
    <Layout title='Quizzy'>
      {
        !(query.difficulty) ?
          <LevelSelect
            difficulty={difficulty}
            handleSetDifficulty={handleSetDifficulty}
          />
          :
          <ConfirmQuizStart
            limit={limit}
            handleStartQuiz={handleStartQuiz}
            difficulty={difficulty}
            handleClearDifficulty={handleClearDifficulty} />
      }
    </Layout>
  )
}
const Quiz = () => {
  const { loading, error, questions} = useContext(QuizContext)
  return (
    <Paper
    sx={(theme) => ({
      background:`linear-gradient(-45deg,
        ${theme.status.success}23 20%, ${theme.status.warning}16)`,
      color:  theme.palette.secondary.main
    })}
    >
      {error ?
        <>Error...</> :
        <>
          {
            (loading || questions.length <= 0) ?
              <Box
              className='flex justify-center align-center'
              sx={{minHeight: '100vh', fontSize: '2.7rem'}}
              >Loading</Box> :
              <QuizTemplate  />
          }
        </>
      }
    </Paper>
  )
}
const QuizPage: NextPage = () => {
  const { submit, limit,
    difficulty, handleStartQuiz,
    handleSetDifficulty, handleClearDifficulty,
   } = useContext(QuizContext)
  const router = useRouter()
  useEffect(() => {
    if ((router.query.difficulty) && (router.query.start)) {
      if (typeof (router.query.difficulty) === 'string' &&
        permits.includes(router.query.difficulty)) {
        handleStartQuiz(router.query.difficulty)
      } else {
        router.push('/')
      }
    }
  }, [router, handleStartQuiz])
  useEffect(() => {
    submit && router.push('/quiz/result')
  }, [router, submit])
  return (
    <>
    {
        (router.query.start) ?
          <Quiz />
          :
          <PreQuiz
          limit={limit}
          handleStartQuiz={handleStartQuiz}
          handleSetDifficulty={handleSetDifficulty}
          difficulty={difficulty}
          handleClearDifficulty={handleClearDifficulty}
        />
    }
    </>
  )
}

export default QuizPage
