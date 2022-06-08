




import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import { changeDisplay } from '../../styles/globals';
import LinksList, { LinkConstructor } from '../Links'

interface PreQuizInterface {
  links: LinkConstructor[],
  heading: string,
  children?: React.ReactNode[] | React.ReactNode
}
const PreQuizTemplate = ({ 
  links,
  heading,
  children
 }: PreQuizInterface) => {

  return (
    <>
     <Box   
       className='mx-auto'  
       sx={(theme) => ({
        color: theme.palette.secondary.main,
        maxWidth: '60ch',
        padding: '.6rem'
      })} >
      <Typography 
      mt={4}
      mb={3}
      align='center'
      variant='h1' 
      component='h1'
      >{heading}</Typography>
      {children}
      <Box>
        <List 
        sx={(theme) => ({
          [theme.breakpoints.down('md')]:{ display: 'block'},
          ...changeDisplay(theme, 'flex'),
          flexDirection: 'row-reverse',
          maxWidth: '600px'
        })}
        className='justify-center mx-auto align-center md-max-width'
        component='ul' > 
        <LinksList links={links} />
        </List>
      </Box>
      </Box>  
    </>
  )
}

export default PreQuizTemplate
