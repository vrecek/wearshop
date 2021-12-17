import React from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import '../../../css/container.css'

const Container = () => {
   return (
      <section className='container'>
         <LeftSide />

         <RightSide />
      </section>
   )
}

export default Container
