import React from 'react'
import '../../../css/Feedback.css'
import Inputs from '../../Reusable/Inputs'
import Button from '../../Reusable/Button'
import Star from '../../Reusable/Star'
import { useRef, useEffect, useState } from 'react'
import { fetchPost } from '../../../js/fetchs'

const Feedback = () => {
   const [errs, setErrs] = useState(null);
   const errRef = useRef(null);
   const mail = useRef(null); const nick = useRef(null); const textarea = useRef(null); const stars = useRef(null);

   useEffect(() => {
      const arr = [mail.current, nick.current];
      let starAmount = 0;

      // TEXTAREA FOCUS
      textarea.current.addEventListener('focusin', (e) => {
         e.target.style.borderColor='rgb(0, 202, 0)';
      })
      textarea.current.addEventListener('focusout', (e) => {
         if(e.target.value !== '') return;

         e.target.style.borderColor='#303030';
      })

      // INPUT TEXT FOCUS
      arr.forEach(item => { 
         const [inp, para] = [item.children[1], item.children[0]];

         item.addEventListener('focusin', () => {       
            inp.style.borderColor='rgb(0, 202, 0)';
            para.style.left='50%';
            para.style.top='0';
            para.style.background='linear-gradient(180deg, rgba(255,255,255,1) 49%, rgba(243,240,240,1) 50%)';
            para.style.border='2px solid rgb(0, 202, 0)';
            para.style.transform='translate(-50%,-50%)';
         })
         item.addEventListener('focusout', () => {
            if(inp.value !== '') return;
            
            para.style.left='5%';
            para.style.top='50%';
            para.style.transform='translate(0,-50%)';
            inp.style.borderColor='#303030';
            para.style.background='none';
            para.style.border='0';
         })
      })

      // STAR ITEM EVENTS
      stars.current.addEventListener('mouseover', (e) => {
         const item = e.target;
         const all = [...item.parentElement.childNodes];

         const selected = all.filter(it => it.id <= item.id);
         selected.forEach(it => {
            it.childNodes[0].style.background = 'yellow';
         })
      })
      stars.current.addEventListener('mouseout', (e) => {
         e.target.parentElement.childNodes.forEach((item, ind)=> {
            if(ind+1 <= starAmount) return;

            item.childNodes[0].style.background = 'none';
         })
      })
      stars.current.addEventListener('click', (e) => {
         const id = e.target.id;
         const item = e.target;
         const all = [...item.parentElement.childNodes];

         const selected = all.filter(it => it.id <= item.id);
         selected.forEach(it => {
            it.childNodes[0].style.background = 'yellow';
         })
         
         starAmount = id;
      })
   }, [])

   // SEND AN EMAIL, ON SUCCESS CLEAR FIELDS AND DISPLAY GOOD MESSAGE, OTHERWISE DISPLAY FAIL MESSAGE
   function sendMail(e){
      e.preventDefault();
      const form = e.target.parentElement.parentElement.elements;

      fetchPost('/mailer', { nick: form.nick.value, mail: form.mail.value, textarea: form.textarea.value })
      .then(data => {
         const arr = [mail.current, nick.current];

         textarea.current.style.borderColor='#303030';
         textarea.current.value = '';
         arr.forEach(item => { 
            const [inp, para] = [item.children[1], item.children[0]]; 
            item.childNodes[1].value = '';
            para.style.left='5%';
            para.style.top='50%';
            para.style.transform='translate(0,-50%)';
            inp.style.borderColor='#303030';
            para.style.background='none';
            para.style.border='0';
         })

         setErrs({ info: data.msg, succ: true })
      })
      .catch(err => setErrs({ info: err.message, succ: false }))
   }

   // AFTER SUBMITING, DISPLAY STATUS MSG, CLEAR AFTER 4 SEC
   function mailFinishTxt(obj = { info: '404 message', succ: false }, ref = null){
      const cls = obj.succ ? 'mail-true' : 'mail-false';
      ref.innerHTML = `<h2 class='${cls}'>${obj.info}</h2>`;

      setTimeout(() => {
         ref.innerHTML = '';  
      },4000)   
   }

   return (
      <section className='feedback'>
         <h3>Leave us Your feedback</h3>
         <p>It will help us provide better services to our clients</p>
         
         <div ref={ errRef }> 
            { errs && mailFinishTxt(errs, errRef.current) }
         </div> 
         
         <form method='POST'>
            <fieldset>
               <legend>Form</legend>
               <section className='twocont'>
                  <Inputs name='mail' refe={ mail } typ='text' text='Email' />
                  <Inputs name='nick' refe={ nick } typ='text' text='Nick' />
               </section>
               <section className='textcont'>
                  <textarea name='textarea' ref={ textarea } spellCheck='false'>
                     
                  </textarea>
                  <div className='starcont' ref={ stars }>
                     <Star id='1' />
                     <Star id='2' />
                     <Star id='3' />
                     <Star id='4' />
                     <Star id='5' />
                  </div>
               </section>
               <Button action={ (e) => sendMail(e)} text='Submit' cname='n' />
            </fieldset>       
         </form>
      </section>
   )
}

export default Feedback
