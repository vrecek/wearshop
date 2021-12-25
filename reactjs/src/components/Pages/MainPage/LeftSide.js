import React from 'react'
import '../../../css/Left-side.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import ItemsCont from './ItemsCont'
import { useRef, useEffect } from 'react'

const LeftSide = () => {
   const refLeft = useRef(null);
   const refRight = useRef(null);
   let ol,ol2;

   useEffect(() => {
      // eslint-disable-next-line
      ol = refLeft.current.childNodes[1];
      // eslint-disable-next-line
      ol2 = refRight.current.childNodes[1];
   }, [])

   function mouseov(child){  
      setTimeout(() => {
         child.style.height='0'
         child.style.display='flex'
         child.style.justifyContent='center'
         child.style.alignItems='center'       
         child.style.transition='all .5s'
         child.style.height='250px'
      }, 0);    
   }
   function mouseoff(child){
      setTimeout(() => {
         child.style.transition='all .5s'
         child.style.height='0'
      }, 0);   
   }

   return (
      <article className='left-side'>
         <nav>
            <ul>
               <li onMouseOut={ ()=>mouseoff(ol) } onMouseOver={ ()=>mouseov(ol) } ref={ refLeft } className='li-what'> 
                  <span>For men <IoMdArrowDropdown/> </span> 
                  <ol>
                     <li className='li-inn'>Shoes</li>
                     <li className='li-inn'>Trousers</li>
                     <li className='li-inn'>Shirts</li>
                     <li className='li-inn'>Lorem</li>
                     <li className='li-inn'>Ipsum</li>
                     <li className='li-inn'>Dolore</li>
                     <li className='li-inn'>Conqestaur</li>
                     <li className='li-inn'>Amet</li>
                     <li className='li-inn'>Dolore</li>
                  </ol>
               </li>

               <li onMouseOut={ ()=>mouseoff(ol2) } onMouseOver={ ()=>mouseov(ol2) }  ref={ refRight } className='li-what'> 
                  <span>For men <IoMdArrowDropdown/> </span> 
                  <ol className='scnd'>
                     <li className='li-inn'>Shoes</li>
                     <li className='li-inn'>Trousers</li>
                     <li className='li-inn'>Shirts</li>
                     <li className='li-inn'>Lorem</li>
                     <li className='li-inn'>Ipsum</li>
                     <li className='li-inn'>Dolore</li>
                     <li className='li-inn'>Conqestaur</li>
                     <li className='li-inn'>Amet</li>
                     <li className='li-inn'>Dolore</li>
                  </ol>
               </li>
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
