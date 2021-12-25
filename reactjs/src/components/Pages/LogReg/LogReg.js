import React from 'react'
import '../../../css/LogReg.css'
import { HiLogin } from 'react-icons/hi'
import Inputs from '../../Reusable/Inputs'
import Button from '../../Reusable/Button'
import { useNavigate } from 'react-router-dom'
import { TiTick } from 'react-icons/ti'
import { FaTimes } from 'react-icons/fa'
import { BiUserPlus } from 'react-icons/bi'
import { useRef, useEffect, useState } from 'react'
import { fetchPost, fetchGet } from '../../../js/fetchs'

const LogReg = () => {
   const [REGSUCCESS, setREGSUCCESS] = useState(null);
   const [LOGSUCCESS, setLOGSUCCESS] = useState(null);

   const navigate2 = useNavigate();
   fetchGet('/users')
   .then(data => {
      if(data.bool === true) window.location.href='/'
   })
   .catch(err => navigate2('/error', { state: { erro: err, code: err.code } }) )
 
   const [nickS, setNickS] = useState(0);
   const [mailS, setMailS] = useState(0);
   const [passS, setpassS] = useState(0);
   const [confpassS, setConfpassS] = useState(0);
   const regForm = useRef(null);

   function switchForm(nr,e){
      if(nr === 1) e.target.parentElement.childNodes[0].className = '';
      else e.target.parentElement.childNodes[1].className = '';

      e.target.className = 'active';
      regForm.current.parentElement.style.transform=`translateX(-${regForm.current.clientWidth * nr}px)`;
   }

   useEffect(() => {
      const [nick,mail,pass,confpass] = [regForm.current.childNodes[1],regForm.current.childNodes[2],regForm.current.childNodes[3],regForm.current.childNodes[4]]

      /**
       *  ! VISUAL INPUTS CORRECT CHECK !
       */
      const nickObj = {
         title: 'nick',
         svg: nick.childNodes[0],
         input: nick.childNodes[2]
      }
      const mailObj = {
         title: 'mail',
         svg: mail.childNodes[0],
         input: mail.childNodes[2]
      }
      const passObj = {
         title: 'pass',
         svg: pass.childNodes[0],
         input: pass.childNodes[2]
      }
      const confpassObj = {
         title: 'confpass',
         svg: confpass.childNodes[0],
         input: confpass.childNodes[2]
      }

      nickObj.input.addEventListener('keyup', e => {
         if(e.target.value.length >= 4){
            setNickS(1);
            nickObj.svg.firstChild.style.color = 'green'
         }else{
            setNickS(0);
            nickObj.svg.firstChild.style.color = 'red'
         }
      })
      mailObj.input.addEventListener('keyup', e => {
         if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value)){
            setMailS(1);
            mailObj.svg.firstChild.style.color = 'green'
         }else{
            setMailS(0);
            mailObj.svg.firstChild.style.color = 'red'
         }
      })
      passObj.input.addEventListener('keyup', e => {
         if(e.target.value.length >= 5){
            setpassS(1);
            passObj.svg.firstChild.style.color = 'green'
         }else{
            setpassS(0);
            passObj.svg.firstChild.style.color = 'red'
         }
      })
      confpassObj.input.addEventListener('keyup', e => {
         if(e.target.value.length >= 5 && (e.target.value === passObj.input.value)){
            setConfpassS(1);
            confpassObj.svg.firstChild.style.color = 'green'
         }else{
            setConfpassS(0);
            confpassObj.svg.firstChild.style.color = 'red'
         }
      })
      /**
       *  ! VISUAL INPUTS CORRECT CHECK !
       */    
   },[])

   const navigate = useNavigate();
   function registerClick(e){
      e.preventDefault();

      const body = {
         user: e.target.elements.user.value,
         mail: e.target.elements.mail.value,
         pass: e.target.elements.pass.value,
         passconf: e.target.elements.passconf.value,
         check: e.target.elements.check.checked,
         captcha: e.target.elements[5].value
      }

      fetchPost('/users/register', body)
      .then(data => {
         if(data.bool){
            e.target.elements.user.value = '';
            e.target.elements.mail.value = '';
            e.target.elements.pass.value = '';
            e.target.elements.passconf.value = '';
            e.target.elements.check.checked = false;
            window.grecaptcha.reset()
         }
         setREGSUCCESS({bool: data.bool, res: data.res})
      })
      .catch(err => navigate('/error', { state: { erro: err, code: err.code } }) )
   }
   function loginClick(e){
      e.preventDefault()

      const body = {
         username: e.target.elements.username.value,
         password: e.target.elements.password.value,
         remember: e.target.elements.remember.checked
      }

      fetchPost('/users/login', body)
      .then(data => {
         if(data.result){
            window.location.href = '/';
         }else{
            setLOGSUCCESS('Incorrect username or password.');
         }
      })
      .catch(err => navigate('/error', { state: { erro: err, code: err.code } }) )
   }

   return (
      <main className='logreg'>
         <section>
            <div onClick={ (e)=>switchForm(0,e) } className='active'>
               <h1>SIGN IN</h1>
            </div>
            <div onClick={ (e)=>switchForm(1,e) }>
               <h1>REGISTER</h1>
            </div>
         </section>

         <article>
            <form onSubmit={ (e) => loginClick(e) } className='login'> {/* action='/users/login' method='POST'*/}
               {
                  LOGSUCCESS && <h3 className='errlog'>{ LOGSUCCESS }</h3>
               }
               <h2><HiLogin /> SIGN IN</h2>
               <Inputs cname='lr-div' typ='text' text='Username' name='username' />
               <Inputs cname='lr-div' typ='text' text='Password' name='password' />
               <a href='/'>Forgot passsword?</a>
               <div className='check'>
                  <label htmlFor='rem-pass'>Remember me</label> <input type='checkbox' name='remember' id='rem-pass' />
               </div>
               <Button text='Login' cname='log-btn' />
            </form>
            <form onSubmit={ (e)=>registerClick(e) } ref={ regForm } className='register'>
               {
                  REGSUCCESS && (
                     REGSUCCESS.bool === false ? 
                        REGSUCCESS.res.map((it,ind) => (
                           <h3 className='errreg' key={ ind }> { it } </h3>
                        ))
                     :
                     REGSUCCESS.res.map((it,ind) => (
                        <h3 className='sucreg' key={ ind }> { it } </h3>
                     ))
                  )
               }
               <h2><BiUserPlus /> REGISTER</h2>
               <Inputs additional={ nickS ? <TiTick /> : <FaTimes /> } cname='lr-div' typ='text' text='Username' name='user' />
               <Inputs additional={ mailS ? <TiTick /> : <FaTimes /> } cname='lr-div' typ='text' text='Mail Address' name='mail' />
               <Inputs additional={ passS ? <TiTick /> : <FaTimes /> } cname='lr-div' typ='text' text='Password' name='pass' />
               <Inputs additional={ confpassS ? <TiTick /> : <FaTimes /> } cname='lr-div' typ='text' text='Confirm password' name='passconf' />
               <div className='check'>
                  <label htmlFor='accreg'>I accept the <a href='/'>Terms &amp; Services</a></label> <input name='check' type='checkbox' id='accreg' />
               </div>
               <div name='captcha' className="g-recaptcha" data-sitekey="6LcWTUIcAAAAAE4rGmd4V3oWtOX6Te1VPZ8891hr"></div>
               <Button text='CREATE ACCOUNT' cname='reg-btn' />
            </form>
         </article>
      </main>
   )
}

export default LogReg
