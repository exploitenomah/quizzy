
import  { Theme }   from '@mui/material/styles'
import Box from '@mui/material/Box'
import { SystemStyleObject } from '@mui/system'


interface BgBoxProps {
  children: React.ReactNode[] | React.ReactNode
  sx?: SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
  className?: string
}
const BgBox = ({children, sx, className}: BgBoxProps) => {
  const SX = (theme: Theme) => (sx ? (typeof sx === 'object' ? sx : sx(theme)) :  {})
     
  return (
    <Box
    className={className}
    sx={(theme) => ({
      minHeight: '100vh',
      background: `linear-gradient(-45deg,
      ${theme.status.success}23 20%, ${theme.status.warning}16)`,
      color: theme.palette.secondary.main,
      ...SX(theme)
     })}
    >
      {children}
    </Box>
  )
}

export default BgBox