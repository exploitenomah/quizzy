
import { StartSharp } from '@mui/icons-material'
import { useRouter } from 'next/router'
import  { createContext, useState, useEffect, useCallback } from 'react'

const quizState: quizStateInterface = {
  quiz: [],
  timer: 0,
  score: 0,
  start: false,
  difficulty: 'easy',
  error: false,
  loading: true,
  handleStartQuiz: () => null,
  handleSetDifficulty: () => null,
  handleClearDifficulty: () => null,
}
interface quizStateInterface {
  quiz: question[],
  timer: number,
  score: number,
  start: boolean,
  difficulty: string,
  error: boolean,
  loading: boolean,
  handleStartQuiz: Function,
  handleSetDifficulty: Function,
  handleClearDifficulty: Function
}
interface question {
  category: string,
  id: string,
  correctAnswer: string,
  incorrectAnswers: string[],
  question: string,
  tags: string[],
  type: string,
  difficulty: string,
}


const QuizContext = createContext(quizState)


export const QuizWrapper = ({children}:{children: React.ReactNode}) => {
  const router = useRouter()

  const [questions, setQuestions] = useState<question[]>([])
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(10)
  const [difficulty, setDifficulty] = useState<string>('easy')
  const [start, setStart] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  console.log(router)
  useEffect(() => {
   const getQuestions = async() => {
      try{
        setLoading(true)
        const res = await fetch(`https://opentdb.com/api.php?amount=${limit}&difficulty=${difficulty}&type=multiple`)
        const data = await res.json()
        localStorage.setItem('questions', JSON.stringify(await data.results))
        return await data.results
      } catch(err){
        setError(true)
      } finally {
        setLoading(false)
      }
   }
   const lsQuestions = localStorage.getItem('questions')
   if(lsQuestions !== null && start) {
     setQuestions(JSON.parse(lsQuestions))
     setLoading(false)
   }else if(start === true){
      (async () => {
        setQuestions(await getQuestions())
    })()
   }
  }, [difficulty, limit, start])
  const saveQuiz = useCallback(() => {
    
  }, [])
  const handleSetDifficulty = useCallback((difficulty: string) => {
    setDifficulty(difficulty)
  }, [])
  const handleTimer = useCallback(() => {
    setTimer((new Date().setMinutes(new Date().getMinutes() + 15)))
  }, [])
  const handleStartQuiz = useCallback((difficulty: string) => {
    setStart(true)
    switch(difficulty){
      case 'easy':
        setLimit(10)
        handleTimer()
      break;
      case 'medium':
        setLimit(12)
        handleTimer()
      break;
      case 'hard':
      setLimit(15)
      handleTimer()
      break;  
      default:
        return
    }
  }, [handleTimer])
  const handleClearDifficulty = useCallback(() => (setDifficulty('easy')), [])
  console.log(timer, limit, difficulty)
  const value = {
    quiz: questions,
    timer,
    start,
    score,
    difficulty,
    error,
    loading,
    handleStartQuiz,
    handleSetDifficulty,
    handleClearDifficulty,
  }
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizContext