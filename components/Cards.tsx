

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import  { Theme }   from '@mui/material/styles'
import { SystemStyleObject } from '@mui/system'


interface CardProps {
  children: React.ReactNode[] | React.ReactNode
  className?: string
  sx?: SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
}
export const PaperCard = ({children, sx, className}: CardProps) => {

  const SX = (theme: Theme) => (sx ? (typeof sx === 'object' ? sx : sx(theme)) :  {})
     
  return (
    <Paper
    className={className}
    sx={(theme) => ({
      minHeight: '40vh',
      width: '85vw',
      maxWidth: '400px', 
      padding: '.8rem',
      ...SX(theme)
    })}>
      {children}
    </Paper>
  )
}
export const BigPaperCard = ({children, sx, className}: CardProps) => {

  const SX = (theme: Theme) => (sx ? (typeof sx === 'object' ? sx : sx(theme)) :  {})
     
  return (
    <Paper
    className={className}
    sx={(theme) => ({
      height: '80vh',
      width: '85vw',
      margin: '0 auto',
      overflowY:'scroll',
      ...SX(theme)
    })}> 
    {children}
    </Paper>
  )
}
export const BoxCard = ({children, sx, className}: CardProps) => {

  const SX = (theme: Theme) => (sx ? (typeof sx === 'object' ? sx : sx(theme)) :  {})
     
  return (
    <Box
    className={`flex justify-center align-center ${className} `}
    sx={(theme) => ({
      height: '85vh',
      padding: '.6rem',
      overflowY: 'auto',
      ...SX(theme)
    })}>
    
      {children}
    </Box>
  )
}