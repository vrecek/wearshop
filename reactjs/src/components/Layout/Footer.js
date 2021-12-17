import React from 'react'
import '../../css/Footer.css'
import en from '../../images/enfl.png'
import pl from '../../images/plfl.png'
import logo from '../../images/logo.png'

const Footer = () => {
   /*
      icons
      logo lewo
      ul 1 flex
      para
   */
   return (
      <footer className='footer'>
         <div>
            <img src={ en } alt='en' />
            <img src={ pl } alt='pl' />
         </div>

         <ul>
            <li>Perspiciatis</li>
            <li>Voluptatem</li>
            <li>Aperiam</li>
            <li>Dolores</li>
            <li>Ratione</li>
         </ul>

         <img className='logo' src={ logo } alt='logo' />

         <p>All rights reserved to its owners.</p>
         <p>&copy; Copyright claim &copy;</p>
      </footer>
   )
}

export default Footer
