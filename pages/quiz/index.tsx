


import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import LevelSelect from '../../components/LevelSelect'
import ConfirmQuizStart from '../../components/ConfirmQuizStart'
import { useContext } from 'react'
import QuizContext from '../../context/quizContext'


interface PrequizInterface {
  handleStartQuiz: Function
  handleSetDifficulty: Function,
  handleClearDifficulty: Function,
  difficulty: string
}

const PreQuiz = ({
  difficulty,
  handleStartQuiz,
  handleSetDifficulty,
  handleClearDifficulty,
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
            handleStartQuiz={handleStartQuiz}
            difficulty={difficulty}
            handleClearDifficulty={handleClearDifficulty} />
      }
    </Layout>
  )
}

const QuizPage: NextPage = () => {
  const { quiz, start, timer, score,
    difficulty, loading, error, handleStartQuiz,
    handleSetDifficulty, handleClearDifficulty, } = useContext(QuizContext)
  const router = useRouter()

  console.log(loading)
  return (
    <>

      {
        !(router.query.start) ?
          <PreQuiz
            handleStartQuiz={handleStartQuiz}
            handleSetDifficulty={handleSetDifficulty}
            difficulty={difficulty}
            handleClearDifficulty={handleClearDifficulty}
          />
          :
          <>
            {error ?
              <>Error...</> :
              <>
                {
                  loading === true ?
                    <>Loading</> :
                    <>
                      Hello world
                    </>
                }
              </>
            }
          </>
      }
    </>
  )
}

export default QuizPage
