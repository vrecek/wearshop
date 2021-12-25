import React from 'react'
import '../../../css/Sponsors.css'

const Sponsors = () => {
   return (
      <section className='sponsors'>
         <h2>Our shippers</h2>
         <h3>Without them this wouldn't be possible. Thanks to them!</h3>
         <article>
            <img src='https://upload.wikimedia.org/wikipedia/commons/3/3e/W3Schools_logo.png' alt='w3' />
            <img src='https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png' alt='fcc' />
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo_of_YouTube_%282005-2011%29.svg/1200px-Logo_of_YouTube_%282005-2011%29.svg.png' alt='yt' />
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/1280px-Stack_Overflow_logo.svg.png' alt='stack' />
         </article>
      </section>
   )
}

export default Sponsors
