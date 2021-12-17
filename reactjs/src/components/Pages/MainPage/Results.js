import React from 'react'
import '../../../css/Results.css'

const Results = ({ results }) => {
   const redirectProd = num => window.location.href = `/product/${num}`;

   return (
      <section className='result-cont'>
         {
            results.map((it,ind) => (
               <h2 onClick={ () => redirectProd(it._id) } key={ it._id }>{ it.name }</h2>
            ))
         }
      </section>
   )
}

export default Results
