import React from 'react'
import '../../../css/Header.css'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import img1 from '../../../images/img1.png'
import img2 from '../../../images/img2.png'
import img3 from '../../../images/img3.png'
import { useRef, useEffect } from 'react'

const Header = () => {
   const slider = useRef(null);

   let clickChange = null;
   
   useEffect(() => {
      const slide = slider.current;
      const length = slide.childNodes.length;
      const width = slide.clientWidth;
      let i = 2;
      slide.style.transform=`translateX(-${width * i}px)`;

      function imageChange(){ // AUTO IMAGE CHANGE INTERVAL
         if(document.hasFocus()){
            slide.style.transition='.5s';
            i++;
            slide.style.transform=`translateX(-${width * i}px)`;
         }  
      }

      slide.addEventListener('transitionend', () => { // CHECK IF IMAGE IS LAST OR FIRST
         if(i <= 0){ // first
            slide.style.transition='0s';
            slide.style.transform=`translateX(-${width * (length - 2)}px)`;
            i = length - 2;
         }

         if(i >= length - 1){ // last
            slide.style.transition='0s';
            slide.style.transform=`translateX(-${width}px)`;
            i = 1;
         }
      })

      let interval = setInterval(imageChange, 8000);   
      
      // eslint-disable-next-line 
      clickChange = function(nr){ // ONCLICK CHANGE IMAGE LEFT OR RIGHR
         try{
            clearInterval(interval);
            slide.style.transition='.5s';

            switch(nr){
               case 1:
                  i--;
                  slide.style.transform=`translateX(-${width * i}px)`;
               break;
   
               case 2:
                  i++;
                  slide.style.transform=`translateX(-${width * i}px)`;
               break;
   
               default: throw new Error(`clickChange() error thrown: ${nr}`);
            }
         }catch(err){
            console.log(`ERROR THROWN: ${err.message}`);
         }finally{
            interval = setInterval(imageChange, 5000);
         }      
      }
   }, [])
   
   return (
      <header className='main-header'>
         <div className='header-arrow' onClick={ () => clickChange(1) }>
            <MdKeyboardArrowLeft />
         </div>

         <figure>
            <div ref={ slider }>
               <img src={ img2 } alt='img' />
               <img src={ img3 } alt='img' />
               {/* new images here */}
               <img src={ img1 } alt='img' />          
               {/* new images here */}
               <img src={ img2 } alt='img' />       
               <img src={ img3 } alt='img' />
            </div>
         </figure>

         <div className='header-arrow' onClick={ () => clickChange(2) }>
            <MdKeyboardArrowRight />
         </div>
      </header>
   )
}

export default Header
