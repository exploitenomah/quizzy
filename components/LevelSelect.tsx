
import  { useCallback } from 'react'
import PreQuizTemplate, { LinkConstructor } from './PreQuizTemplate'

interface LevelSelectInterface {
  difficulty: string,
  handleSetDifficulty: Function,
}
const LevelSelect = ({difficulty, handleSetDifficulty}: LevelSelectInterface) => {

  const setLevel = useCallback((level: string) => { 
    return () => handleSetDifficulty(level)
  }, [handleSetDifficulty])
  const links = [
    new LinkConstructor('easy', `/quiz?difficulty=easy`, 'success', setLevel('easy')),
    new LinkConstructor('medium', `/quiz?difficulty=medium`, 'info', setLevel('medium')),
    new LinkConstructor('hard', `/quiz?difficulty=hard`, 'warning', setLevel('hard'))
  ]
  return (
    <>
     <PreQuizTemplate links={links} heading='Select Difficulty' />
    </>
  )
}

export default LevelSelect
