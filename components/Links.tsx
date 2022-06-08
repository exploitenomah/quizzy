


import NextLink from 'next/Link'
import ListItem from '@mui/material/ListItem'
import { SxProps } from '@mui/material'
import Button from '@mui/material/Button';

export type color = 
'success' | 'info' | 'warning' | 'primary' | 'secondary'
export class LinkConstructor {
  text: string;
  path: string;
  color: color;
  action?: () => void
  constructor(text: string, path: string, color: color, onClick?: () => void){
    this.text = text;
    this.path = path;
    this.color = color
    this.action = onClick
  }
}


export const LinkButton = ({ link, sx }: {link: LinkConstructor, sx?:SxProps}) => {
  return (
    <NextLink href={link.path} passHref>
    <Button 
     onClick={() => link.action && link.action()}
     variant='contained'
     component='a'
     color={link.color}
     size='large'
     sx={{
       display: 'block', 
       maxWidth: '40vw',
       textAlign: 'center',
       margin: '0 auto',
       ...sx
     }}
     >{link.text}</Button>
 </NextLink>
  )
}
const LinksList = ({links}:{links:  LinkConstructor[]}) => {
  return (
    <>
    {links.map(link => (
      <ListItem
        sx={{ width: '50%',  margin: '0 auto', justifyContent: 'center' }}
        key={link.text}>
        <NextLink href={link.path} passHref>
        <Button
          variant='contained'
          component='a'
          onClick={() => link.action && link.action()}
          color={link.color}
          size='large'
          sx={{ minWidth: 'max-content',  fontSize: '.9rem'}}
        >{link.text}</Button>
        </NextLink>
      </ListItem>
    ))}
  </>
  )
}
export default LinksList