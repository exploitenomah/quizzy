

import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Theme } from '@mui/material'

const optionSx = (theme: Theme, color: 'success' | 'error' | 'warning' | 'primary') => ({
    '&:hover': {
       backgroundColor: theme.status[color],
    },
});

const AnswerReview = ({
  question, 
  options, 
  correctAnswer, 
  selectedAnswer}:
   {question: string, 
    options: string[], 
    correctAnswer: string, 
    selectedAnswer: string}) => {

  return (
    <ListItem 
    sx={{
      display: 'block',
      margin: '1rem auto'
    }}>
      <Typography variant='h6'>
        {question}
      </Typography>
      <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap:'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '0 auto'
      }}
      >
      {
        options.map(option => {
          const color = ((option === correctAnswer && selectedAnswer === '')) ?
            'warning' :
            (option === selectedAnswer && option !== correctAnswer) ?
             'error' : (option === correctAnswer) ? 
             'success' : 'primary'
          return(
          <Button
          disableRipple
          sx={(theme) => ({
          margin: '.7rem 1rem', 
          textTransform:'lowercase',
          cursor: 'text',
          ...optionSx(theme, color)
          })}
          variant='contained'
          color={color}
           component='li'
           key={option}>
             {option}
            </Button>
        )})
      }
      </Box>
    </ListItem>
  )
}

export default AnswerReview

/*

*/