


import NextLink from 'next/link'
import { Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Menu  from '@mui/icons-material/Menu'
import Close  from '@mui/icons-material/Close'
import List from '@mui/material/List'
import { Links } from './Navigation'
import { changeDisplay } from '../styles/globals'

const headerStyles = (theme: Theme) => ({
  display: 'flex',
  placeItems: 'center',
  borderBottom: `1px solid currentColor`,
  color: ` ${theme.status.success}`,
})
const boxStyles = (theme: Theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '900px',
  margin: 'auto',
  padding: '.6rem'
})
const buttonStyles = (theme: Theme) => ({
  ...changeDisplay(theme, 'none'),
  color: ` ${theme.status.success}`,
  zIndex: 10
})
const logoStyles  = (theme: Theme) =>  ({
  fontSize: '2.5rem',
  width: 'fit-content'
}) 
const navListStyles = (theme: Theme) => ({ 
  ...changeDisplay(theme, 'flex'), 
  display: 'none',
  color: ` ${theme.status.success}`,
  fontWeight: 600, 
  fontSize: '1.3rem',
 })

type headerProps = {
  toggleNav: Function,
  navShown: boolean
}
const Header = ({ toggleNav, navShown }: headerProps) => {
  return (
    <>
     <Box
     sx={(theme) => headerStyles(theme)}
      component='header'>
       <Box 
       className='flex align-center'
       sx={(theme) => boxStyles(theme)}>
         <NextLink href='/' passHref>
            <Typography component='a' sx={(theme) => logoStyles(theme)}>Quizzy</Typography>
         </NextLink>
        <IconButton
         aria-label='Menu'
         onClick={() => toggleNav()}
         sx={(theme) => buttonStyles(theme)}>
         {navShown ?
          <Close sx={{ fontSize: '3rem' }} />
          :
          <Menu sx={{ fontSize: '3rem' }} />}
        </IconButton>
        <List sx={(theme) => navListStyles(theme)}>
        <Links />
      </List>
       </Box>
      </Box>
    </> 
  )
}
 
export default Header     