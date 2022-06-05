



import Box from '@mui/material/Box';
import { opacityVisibilitySnippet, changeDisplay } from '../styles/globals';

type overlayProps = {
  show: boolean,
  hideSelf: Function,
  bgColor?: string,
  hiddenDesktop: boolean
}


const Overlay = ({ show, hideSelf, bgColor, hiddenDesktop }: overlayProps) => (<Box 
onClick={() => hideSelf()}
className='fixed inset-0 h-screen w-screen'
sx={(theme) => ({
  ...opacityVisibilitySnippet(show),
  ...(hiddenDesktop ? changeDisplay(theme, 'none') : {}),
  backgroundColor: bgColor || 'rgba(0,0,0,0)',
  transition: 'opacity 0.3s ease-in-out',
  zIndex: 9
})} />)


export default Overlay