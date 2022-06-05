
import Head from 'next/head'
import { useState, ReactNode } from 'react'
import Header from './Header'
import Navigation from './Navigation'
import Overlay from './TransparentOverlay';

type layoutProps = {
  title: string,
  children: ReactNode[] | ReactNode
}


const Layout = ({ title, children }: layoutProps) => {
  const [navShown, setNavShown] = useState(false)

  const toggleNavShown = (val?: boolean) => {
    setNavShown(prev => val ? val : !prev)
  }
  return (
    <>
     <Head>
        <title>{title}</title>
        <meta 
        name="description" 
        content="Quizzy. Put your mind to the test..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Overlay hiddenDesktop={true} show={navShown} hideSelf={toggleNavShown} />
      <Header navShown={navShown} toggleNav={toggleNavShown} />
      <Navigation navShown={navShown} closeNav={toggleNavShown} />
      {children}
    </>
  )
}

export default Layout