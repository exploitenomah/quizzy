
import { StartSharp } from '@mui/icons-material'
import { useRouter } from 'next/router'
import  { createContext, useState, useEffect, useCallback } from 'react'

const quizState: quizStateInterface = {
  questions: [],
  timer: 0,
  score: 0,
  active: 0,
  start: false,
  answers: [],
  difficulty: 'easy',
  error: false,
  loading: true,
  handleStartQuiz: () => null,
  handleSetDifficulty: () => null,
  handleClearDifficulty: () => null,
  handleSubmitQuestion: () => null
}
interface quizStateInterface {
  questions: question[],
  answers: answer[],
  active: number,
  timer: number,
  score: number,
  start: boolean,
  difficulty: string,
  error: boolean,
  loading: boolean,
  handleStartQuiz: Function,
  handleSetDifficulty: Function,
  handleClearDifficulty: Function,
  handleSubmitQuestion: Function,
}
export interface question {
  category: string,
  id: string,
  correctAnswer: string,
  incorrectAnswers: string[],
  question: string,
  tags: string[],
  type: string,
  difficulty: string,
}
interface answer {
  question: string,
  selectedAnswer: string
}


const QuizContext = createContext(quizState)


export const QuizWrapper = ({children}:{children: React.ReactNode}) => {
  const router = useRouter()
  const [currentQuiz, setCurrentQuiz] = useState(quizState)
  const [questions, setQuestions] = useState<question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<string>('')
  const [answers, setAnswers] = useState<answer[]>([])
  const [active, setActive] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(10)
  const [difficulty, setDifficulty] = useState<string>('')
  const [start, setStart] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(0)
  const [submit, setSubmit] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

   const saveQuiz = useCallback(() => {
    const currentQuiz = {
      questions, answers, timer, start, difficulty, limit, score, currentQuestion
    }
    localStorage.setItem('quiz', JSON.stringify(currentQuiz))
    localStorage.setItem('answers', JSON.stringify(answers))
  }, [answers, currentQuestion, difficulty, limit, questions, score, start, timer])
  const handleSetDifficulty = useCallback((difficulty: string) => {
    setDifficulty(difficulty)
  }, [])
  const handleTimer = useCallback(() => {
    setTimer((new Date().setMinutes(new Date().getMinutes() + 15)))
  }, [])
  const handleSubmitQuestion = useCallback((answer: answer, action: string) => {
    setAnswers((prev) => {
      if(prev.find(el => el.question === answer.question)) return prev.map(el => el.question === answer.question ? answer : el)
      else return [...prev, answer]
    })
    if(action === 'next') {
      setActive((prev) => prev + 1)
    }else if(action === 'prev'){
      setActive((prev) => prev - 1)
    }else if(action === 'final-submit'){
      setSubmit(true)
    }
  }, [])
  const handleStartQuiz = useCallback((difficulty: string) => {
    setStart(true)
    setDifficulty(difficulty)
    handleTimer()
    switch(difficulty){
      case 'easy':
        setLimit(10)
      break;
      case 'medium':
        setLimit(12)
      break;
      case 'hard':
      setLimit(15)
      break;  
      default:
        return
    }
  }, [handleTimer])
  const handleClearDifficulty = useCallback(() => (setDifficulty('')), [])
  
  useEffect(() => {
    const lsQuiz = localStorage.getItem('quiz')
    if(lsQuiz !== null) {
      const quizInLs: quizStateInterface = JSON.parse(lsQuiz)
      setCurrentQuiz(quizInLs)
    } 
    const questions = localStorage.getItem('questions')
    if(questions !== null){
      setQuestions(JSON.parse(questions))
    }
  }, []) 
  useEffect(() => {
   const getQuestions = async() => {
      try{
        setLoading(true)
        const res = await fetch(`https://the-trivia-api.com/api/questions?difficulty=${difficulty}&limit=${limit}&type=multiple`)
        
        const data = await res.json()
        console.log(data)
        localStorage.setItem('questions', JSON.stringify(await data))
        return await data
      } catch(err){
        setError(true)
      } finally {
        setLoading(false)
      }
   }
   const lsQuestions = localStorage.getItem('questions')
   if(start === true && lsQuestions !== null) {
     setQuestions(JSON.parse(lsQuestions))
     setLoading(false)
   }else if(start === true){
      (async () => {
        setQuestions(await getQuestions())
    })()
    setLoading(false)
   }
  }, [difficulty, limit, router.query.start, start])
console.log(questions)
  const value = {
    questions,
    timer,
    start,
    score,
    difficulty,
    error,
    loading,
    handleStartQuiz,
    handleSetDifficulty,
    handleClearDifficulty,
    handleSubmitQuestion,
    answers,
    active
  }
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizContext