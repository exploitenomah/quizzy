




import NextLink from 'next/Link'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import { changeDisplay } from '../styles/globals';

type color = 'success' | 'info' | 'warning' | 'primary'
export class LinkConstructor {
  text: string;
  path: string;
  color: 'success' | 'info' | 'warning' | 'primary';
  onClick?: Function
  constructor(text: string, path: string, color: color, onClick?: Function){
    this.text = text;
    this.path = path;
    this.color = color
    this.onClick = onClick
  }
}

const listItemSx = {
  maxWidth: '270px',
} 
const listItemClasslist = 'mx-auto justify-center'

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
        {
          links.map(link => (
            <ListItem
            key={link.text}
            sx={listItemSx}
            className={listItemClasslist} >
             <NextLink
              href={link.path} passHref>
               <Button  
               onClick={() => link.onClick && link.onClick()}
               variant='contained'  
               component='a' 
               color={link.color}
               size='large'
               sx={{width: '100%'}}
               >{link.text}</Button>
             </NextLink>
           </ListItem> 
          ))
        } 
        </List>
      </Box>
      </Box>  
    </>
  )
}

export default PreQuizTemplate
