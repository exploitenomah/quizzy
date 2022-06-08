

import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Theme } from '@mui/material'
import Box from '@mui/material/Box';
import List from '@mui/material/List'
import MuiLink from '@mui/material/Link'
import ListItem from '@mui/material/ListItem';
import { opacityVisibilitySnippet, changeDisplay } from '../styles/globals';
import QuizContext from '../context/quizContext'

const navLinks = [
  { text: 'Home', path: '/' },
  { text: 'Quiz', path: '/quiz' },
]

const navigationStyles = (theme: Theme, navShown: boolean) => ({
  ...opacityVisibilitySnippet(navShown),
  ...changeDisplay(theme, 'none'),
  zIndex: 10,
  width: '75vw',
  display: 'flex',
  background: `${theme.status.success}`,
  color: `${theme.palette.primary.main}`,
  transform: `${navShown ? 'translateX(0)' : 'translateX(-100vw)'}`,
  textAlign: 'center',
  fontSize: '1.8rem',
  flexDirection: 'column',
  transition: 'all .4s linear ',
  padding: '.7rem',
})
const navListStyles = (theme: Theme) => ({
  textAlign: 'center',
  margin: 'auto'
})


type LinksProps = {
  closeNav?: Function,
}
export const Links = ({closeNav}: LinksProps) => {
  const { handleClearDifficulty } = useContext(QuizContext)
  const router = useRouter()
  return (
    <>
      {navLinks.map((link, index) => (
        <ListItem
          sx={{
            justifyContent: 'center',
          }}
          key={link.text + index}>
          <NextLink
            href={link.path}
            passHref>
            <MuiLink
              onClick={() => {
                closeNav && closeNav(false);
                handleClearDifficulty()
              }}
              sx={() => ({
                textDecoration: `${router.pathname === link.path ? 
                  `underline` :
                   `none`}`,
                color: 'inherit',
                width: 'max-content',
              })}
            >{link.text}</MuiLink>
          </NextLink>
        </ListItem>
      ))}
    </>
  )
}

type navigationProps = {
  navShown: boolean,
  closeNav: Function
} 

const Navigation = ({ navShown, closeNav }: navigationProps) => {
  return (
    <Box 
    component='nav'
    sx={(theme) => navigationStyles(theme, navShown)} 
    className='fixed inset-y left-0 justify-center align-center'>
      <List sx={(theme) => navListStyles(theme)}>
        <Links closeNav={closeNav} />
      </List>
    </Box>
  )
}

export default Navigation