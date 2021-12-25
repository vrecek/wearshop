import React from 'react'
import Header from './Header'
import Search from './Search'
import Container from './Container'
import Feedback from './Feedback'
import Sponsors from './Sponsors'
import PopCategories from './PopCategories'

const MainPage = () => {
   return (
      <main>     
         <Header />
         <Search />
         <Container />
         <PopCategories />
         <Sponsors />
         <Feedback />
      </main>
   )
}

export default MainPage
