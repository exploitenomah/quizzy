


import Typography from '@mui/material/Typography'
import BgBox from '../../components/BgBox';
import { useState, useContext, useCallback } from 'react'
import QuizContext, { question } from '../../context/quizContext'
import List from '@mui/material/List'
import LinksList,  { LinkConstructor,  LinkButton } from '../../components/Links'
import { PaperCard, BoxCard } from '../../components/Cards'


const Results = () => {
  const {
    questions,
    score,
    restoreDefault
  } = useContext(QuizContext)
  const links: LinkConstructor[] = [
    new LinkConstructor('New quiz', '/quiz', 'secondary', () => restoreDefault()),
    new LinkConstructor('scoresheet', '/quiz/scoresheet', 'info')
    ]
  
  const getCorrects = questions.filter(question => question.selectedAnswer === question.correctAnswer).length
  console.log(questions)
  return (
    <BgBox className='flex column justify-center align-center'>
      <LinkButton 
         sx={{ margin: '1rem 1rem 0 auto' }}
         link={new LinkConstructor('Home', '/', 'secondary')}/>
      <BoxCard>
        <PaperCard className='flex column justify-center align-center'>
          <Typography variant='h1Hero'>You scored</Typography>
          <Typography
            variant='h1'
            className='mx-auto'
            align='center'
            component='p'
            sx={{
              fontSize: '3.5rem',
              margin: '1rem auto .6rem'
            }}
          >{score}%
          </Typography>
          <Typography
            align='center'
            >
            <>
              You answered {getCorrects} correctly
               out of {questions.length} questions.
            </>
          </Typography>
          <List className='flex wrap'>
            <LinksList links={links} />
          </List>
        </PaperCard>
      </BoxCard>
    </BgBox>
  )
}

export default Results