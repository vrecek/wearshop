import React from 'react'
import '../../../css/Left-side.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import ItemsCont from './ItemsCont'

const LeftSide = () => {
   return (
      <article className='left-side'>
         <nav>
            <ul>
               <li>For men <IoMdArrowDropdown/> </li>
               <li>For women <IoMdArrowDropdown/> </li>
            </ul>
         </nav>
         
         <ItemsCont />

         <section className='pages-cont'>
            <div className='active'>1</div>
            <div>2</div>
            <div>3</div>
            <div>...</div>
            <div>100</div>
            <div>101</div>
            <div>102</div>
         </section>
      </article>
   )
}

export default LeftSide
