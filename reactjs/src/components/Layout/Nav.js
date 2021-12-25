import React from 'react'
import logo from '../../images/logo.png'
import '../../css/Nav.css'
import { isLogged } from '../../js/fetchs'
import { Link } from 'react-router-dom'
import { FaShoppingBasket, FaSun } from 'react-icons/fa'
import { AiOutlineLogin, AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdManageAccounts, MdOutlinePrivacyTip } from 'react-icons/md'
import { BiSupport, BiLogOut } from 'react-icons/bi'
import { SiGithubsponsors } from 'react-icons/si'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
   const navigate = useNavigate();
   const [auth, setAuth] = useState({authed:false, user:''});
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

   useEffect(() => {
      isLogged()
      .then(data => {
         const currUser = data.user ? data.user.username : ''
         setAuth({authed: data.bool, user: currUser})
      })
      .catch(err => navigate('/error', { state: { erro: err, code: err.code } }))
      // eslint-disable-next-line
   },[])

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
            {
               auth.authed === true ? 
               <>
                  <a href='http://localhost:5000/users/logout' tex='Logout' className='icns'> <BiLogOut /> </a>
                  <Link to='/' tex='Account' className='icns'> <MdManageAccounts /> </Link>
               </>
               : 
               <Link to='/credentials' tex='Sign in' className='icns'> <AiOutlineLogin /></Link>
            }
            
           
            <div onClick={ menuToggle }>
               <span></span>
               <span></span>
               <span></span>
            </div>
         </section>

         <article className='nav-menu'>
           <ol>
              <a href='/'> <li> <FaSun /> LIGHT MODE</li> </a>
              <a className='acc' href='/'>
                  { auth.authed ? <p>logged as: <i>{ auth.user }</i> </p> : '' }
                  <li> <MdManageAccounts /> Account</li> 
               </a> 
              <a href='/'> <li> <AiOutlineQuestionCircle /> Terms &amp; Services</li> </a>
              <a href='/'> <li> <MdOutlinePrivacyTip /> Privacy policy</li> </a>
              <a href='/'> <li> <SiGithubsponsors /> Sponsors</li> </a>
              <a href='/'> <li> <BiSupport /> Support</li> </a>
               {
                 auth.authed === true ?
                 <a href='http://localhost:5000/users/logout'> <li> <BiLogOut /> Logout</li> </a>
                 :
                 <a href='/credentials'> <li> <AiOutlineLogin /> Login / Register</li> </a>
               }
           </ol>
           <p>&copy; All rights reserved to its owners &copy;</p>
         </article>
      </nav>
   )
}

export default Nav
