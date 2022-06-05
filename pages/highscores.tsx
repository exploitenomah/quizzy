


import type { NextPage } from 'next'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
const Home: NextPage = () => {
  return (
    <>
     <Layout title='Quizzy'>
       <Hero />
     </Layout>
    </>
  )
}

export default Home
