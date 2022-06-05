





import NextLink from 'next/Link'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';


const Hero = () => {
  return (
    <>
     <Box
      component='main'
      className='flex justify-center align-center'
      sx={(theme) => ({
         height: '85vh', 
         background:`linear-gradient(-45deg,
           ${theme.status.success}23 20%, ${theme.status.warning}16)`,
         color:  theme.palette.secondary.main
       })}>
       <Box
       className='mx-auto my-0 md-max-width'
       sx={{
        padding: '.6rem'
      }}
       >
         <Typography 
         variant='h1Hero' 
         align='center'
         component='h1'
         mb={2}
         >Put your mind to the test</Typography>
         <NextLink href='/quiz' passHref>
            <Button 
             variant='contained'
             component='a'
             color={'success'}
             size='large'
             sx={{
               display: 'block', 
               maxWidth: '40vw',
               textAlign: 'center',
               margin: '0 auto'
             }}
             >Let&rsquo;s Go</Button>
         </NextLink>
       </Box>
      </Box>
    </> 
  )
}
 
export default Hero     