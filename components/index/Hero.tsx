





import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { LinkConstructor,  LinkButton } from '../Links'
import { BoxCard } from '../Cards'

const Hero = () => {
  return (
    <>
     <Box
      component='main'
      className='flex justify-center align-center'
      sx={{height: '85vh', maxWidth: '45ch', margin: '0 auto'}}>
       <BoxCard
       >
        <Box>
        <Typography 
         variant='h1Hero' 
         align='center'
         component='h1'
         mb={2}
         >Put your mind to the test</Typography>
         <LinkButton 
         link={new LinkConstructor('let\'s go', '/quiz', 'success')}/>
        </Box>
       </BoxCard>
      </Box>
    </> 
  )
}
 
export default Hero     