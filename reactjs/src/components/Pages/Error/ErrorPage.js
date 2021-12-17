import React from 'react'
import '../../../css/Errorpage.css'
import { useLocation } from 'react-router-dom'

const ErrorPage = () => {
   const state = useLocation().state;
   const eCode = state.code;
   const eText = state.erro.message;
   const eTextFull = state.erro.stack;

   return (
      <main className='errorpage'>
         <h1>{ eCode }</h1>
         <h1>{ eText }</h1>
      </main>
   )
}

export default ErrorPage
