import React from 'react'
import '../../../css/Right-side.css'
import rec1 from '../../../images/rec1.png'
import Button from '../../Reusable/Button'
import { VscInspect } from 'react-icons/vsc'

const RightSide = () => {
   return (
      <article className='right-side'>
         <div className='wrap'>    
            <h2>Popular Trends</h2>
            <figure>
               <img src={ rec1 } alt='popular' />
            </figure>

            <section className='radios'>
               <div className='active'></div>
               <div></div>
               <div></div>
            </section>

            <h3>Lorem Hoodie</h3>

            <section className='add-cont'>
               <Button additional={<VscInspect />} cname='addBtn' text='Inspect' />
               <mark>150 $</mark>
            </section>
         </div>
      </article>
   )
}

export default RightSide
