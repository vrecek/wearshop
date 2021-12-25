import React from 'react'
import '../../../css/Errorpage.css'
import { useLocation } from 'react-router-dom'
import errImg from '../../../images/error.png'

const ErrorPage = () => {
   const state = useLocation().state;
   let eCode = 500;
   let eText = 'If you see this error, you probably shouldnt be here...'
   if(state){
      eCode = state.code;
      eText = state.erro.message;
   }
   
   return (
      <main className='errorpage'>
         <figure>
            <img src={ errImg } alt='error' />
         </figure>
         <h1><i>Oops! An error occured.</i></h1>
         <div>
            <h4>Message:</h4>
            <h3>{ eText }</h3>
            <h4>Error code:</h4>
            <h3>{ eCode }</h3>
         </div>
      </main>
   )
}

export default ErrorPage
