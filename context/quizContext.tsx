
import { StartSharp } from '@mui/icons-material'
import { useRouter } from 'next/router'
import  { createContext, useState, useEffect, useCallback } from 'react'

const quizState: quizStateInterface = {
  questions: [],
  score: 0,
  start: false,
  difficulty: '',
  error: false,
  submit: false,
  loading: true,
  currentActive: 0,
  limit: 0,
  handleStartQuiz: () => null,
  handleSetDifficulty: () => null,
  handleClearDifficulty: () => null,
  handleAnswerQuestion: () => null,
  handleSubmitQuiz: () => null,
  restoreDefault: () => null
}
interface quizStateInterface {
  questions: question[],
  score: number,
  start: boolean,
  difficulty: string,
  error: boolean,
  submit: boolean,
  loading: boolean,
  limit: number,
  currentActive: number,
  handleStartQuiz: Function,
  handleSetDifficulty: Function,
  handleClearDifficulty: Function,
  handleAnswerQuestion: Function,
  handleSubmitQuiz: Function
  restoreDefault: Function
}
export interface question {
  category: string,
  id: string,
  correctAnswer: string,
  incorrectAnswers: string[],
  selectedAnswer: string,
  answeredCorrectly: boolean,
  isAnswered: boolean,
  question: string,
  tags: string[],
  type: string,
  difficulty: string,
  options: string[]
}


const QuizContext = createContext(quizState)


export const QuizWrapper = ({children}:{children: React.ReactNode}) => {
  const router = useRouter()
  const queryDifficulty = typeof(router.query.difficulty) === 'string' && router.query.difficulty 
  const [questions, setQuestions] = useState<question[]>([])
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(10)
  const [difficulty, setDifficulty] = useState<string>( queryDifficulty || 'easy')
  const [start, setStart] = useState<boolean>(false)
  const [submit, setSubmit] = useState<boolean>(false)
  const [currentActive, setCurrentActive] = useState<number>(0)
  const [score, setScore] = useState<number>(0)

  const lsCheck = useCallback((key: string) => {
    return localStorage.getItem(key)
  }, [])
  useEffect(() => {
    const lsCurrentActive = lsCheck('currentActive')
    if(lsCurrentActive !== null) setCurrentActive(+JSON.parse(lsCurrentActive))
    const lsQuery = lsCheck('query')
    if(lsQuery !== null){
      const query = JSON.parse(lsQuery)
      setDifficulty(query.difficulty)
      setLimit(query.limit)
    }
    const lsScore = lsCheck('score')
    if(lsScore !== null){
      setScore(+JSON.parse(lsScore))
    }
    const lsQuestions = lsCheck('questions')
    if(lsQuestions !== null){
      setQuestions(JSON.parse(lsQuestions))
    }
    router.query.start === 'true' && setStart(true)
  }, [lsCheck, router.query])
  useEffect(() => {
     async function getQuestions(){
       try{
         setLoading(true)
         const res = await fetch(`https://the-trivia-api.com/api/questions?difficulty=${difficulty}&limit=${limit}&type=multiple`)
         const data = await res.json()
         const questions = await data.map((datum: question) => ({...datum,
           selectedAnswer: '', 
           answeredCorrectly: false,
           isAnswered: false, 
           options:  [...(datum.incorrectAnswers), datum.correctAnswer].sort().reverse() }))
         localStorage.setItem('questions', JSON.stringify(await questions))
         setQuestions(questions)
       } catch(err){
         setError(true)
       } finally {
         setLoading(false)
       }
    }
    localStorage.setItem('query', JSON.stringify({difficulty, limit}))
    const lsQuestions = lsCheck('questions')
    if(lsQuestions !== null && start === true){
      setQuestions(JSON.parse(lsQuestions))
    }else if(start === true){
      console.log(start)
      getQuestions()
    }
    setLoading(false)
   }, [difficulty, limit, lsCheck, start])

   const checkQuestion = useCallback((
     question: question, 
     key1: keyof typeof question, 
     key2: keyof typeof question): number  => {
    return question[key1] === question[key2] ? 1 : 0
   }, []) 
   const getPercentage = useCallback((part: number, total: number): number => {
     return (part / total) * 100
   }, [])
   const restoreDefault = useCallback(() => {
     localStorage.clear()
     setQuestions([])
     setError(false)
     setLoading(false)
     setStart(false)
     setDifficulty('')
     setCurrentActive(0)
     setLimit(10),
     setScore(0)
     setSubmit(false)
   }, [])
   const handleAnswerQuestion = useCallback((id: string, selectedAnswer: string) => {
     const updQuestions = questions.map((question, idx) => {
       if(question.id === id){ 
       setCurrentActive(idx)
      }
       return question.id === id ? {...question, selectedAnswer: selectedAnswer, isAnswered: true}
       : question
     })
     setQuestions(updQuestions)
     localStorage.setItem('questions', JSON.stringify(updQuestions))
   }, [questions])
   const handleSetDifficulty = useCallback((difficulty: string) => {
    setDifficulty(difficulty)
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
  }, [])
  const handleClearDifficulty = () => setDifficulty('')
  const handleStartQuiz = () => {
    localStorage.setItem('start', JSON.stringify(true))
    setStart(true)
  }
  const handleSubmitQuiz = useCallback(() => {
    setSubmit(true)
    localStorage.setItem('submit', JSON.stringify(true))
    const results = questions.map(question => checkQuestion(question, 'correctAnswer', 'selectedAnswer'))
    const finalScore = results.reduce((prev, current) => (prev + current), 0)
    const percentage = getPercentage(finalScore, results.length).toFixed(1)
    setScore(+percentage)
    localStorage.setItem('score', JSON.stringify(percentage))
  }, [checkQuestion, getPercentage, questions])
  const value = {
    questions,
    score,
    start,
    difficulty,
    error,
    limit,
    submit,
    loading,
    currentActive,
    handleStartQuiz,
    handleSetDifficulty,
    handleClearDifficulty,
    handleAnswerQuestion,
    handleSubmitQuiz,
    restoreDefault
  }
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizContext