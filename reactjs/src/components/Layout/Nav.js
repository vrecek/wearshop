import React from 'react'
import logo from '../../images/logo.png'
import '../../css/Nav.css'
import { Link } from 'react-router-dom'
import { FaShoppingBasket, FaSun } from 'react-icons/fa'
import { AiOutlineLogin, AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdManageAccounts, MdOutlinePrivacyTip } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { SiGithubsponsors } from 'react-icons/si'
import { useState } from 'react'

const Nav = () => {
   const [toggled, setToggled] = useState(false);
   const lines = [20,50,80];
   const cross = [225,225,135];
   function menuToggle(e){
      const menu = e.target.parentElement.parentElement.childNodes[3];
      const nodes = e.target.childNodes;

      if(toggled){
         nodes.forEach((item,ind) => {
            item.style.top = `${lines[ind]}%`;
            item.style.width='90%'
            item.style.transform = `rotate(0) translate(-50%,0)`;
            item.style.borderColor = '#303030';
            item.style.background = '#303030';
            menu.style.transform='translateY(100%) translateX(100%)';
         })
      }else{
         nodes.forEach((item, ind) => {
            item.style.top = `50%`;
            item.style.width='100%'
            item.style.transform = `translate(-50%,-50%) rotate(${cross[ind]}deg)`;
            item.style.borderColor = 'red';
            item.style.background = 'red';
            menu.style.transform='translateY(100%) translateX(0)';
         })
      }

      setToggled(!toggled);
   }

   return (
      <nav className='main-nav'>
         <section className='nav-logo'>
            <img src={ logo } alt='logo' />
         </section>

         <ul>
            <li> <Link to='/'> Homepage </Link> </li>
            <li> <Link to='/'> Latest </Link> </li>
            <li> <Link to='/'> Contact </Link> </li>
            <li> <Link to='/'> About </Link> </li>
         </ul>

         <section className='nav-icons'>
            <a href='/' tex='Cart' className='icns'><FaShoppingBasket /></a>
            <a href='/credentials' tex='Sign in' className='icns'> <AiOutlineLogin /></a>
           
            <div onClick={ menuToggle }>
               <span></span>
               <span></span>
               <span></span>
            </div>
         </section>

         <article className='nav-menu'>
           <ol>
              <a href='/'> <li> <FaSun /> LIGHT MODE</li> </a>
              <a href='/'> <li> <MdManageAccounts /> Account</li> </a> 
              <a href='/'> <li> <AiOutlineQuestionCircle /> Terms &amp; Services</li> </a>
              <a href='/'> <li> <MdOutlinePrivacyTip /> Privacy policy</li> </a>
              <a href='/'> <li> <SiGithubsponsors /> Sponsors</li> </a>
              <a href='/'> <li> <BiSupport /> Support</li> </a>
              <a href='/'> <li> <AiOutlineLogin /> Login / Register</li> </a>
           </ol>
           <p>&copy; All rights reserved to its owners &copy;</p>
         </article>
      </nav>
   )
}

export default Nav
