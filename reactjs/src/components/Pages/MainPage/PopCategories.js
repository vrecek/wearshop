import React from 'react'
import '../../../css/PopCategories.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchGet } from '../../../js/fetchs'
import { redirectProd } from '../../../js/redirect'

const PopCategories = () => {
   const [items, setItems] = useState([]);
   const [items2, setItems2] = useState([]);
   const navigate = useNavigate();
   useEffect(() => {
      fetchGet('/items/products/61b673c066702ce20cff8951')
      .then(data => {
         const sameArr = [...Array(10)].map((it,ind) => data)
         setItems(sameArr)
      })
      .catch(err => navigate('/error', { state: { erro: err, code: err.code } }) )

      fetchGet('/items/products/61b6753366702ce20cff8956')
      .then(data => {
         const sameArr = [...Array(10)].map((it,ind) => data)
         setItems2(sameArr)
      })
      .catch(err => navigate('/error', { state: { erro: err, code: err.code } }) )
      // eslint-disable-next-line
   },[])
   return (
      <section className='popular-cats'>
         <h3>Most popular categories</h3>
         <section>
            <div className='div-inf'>
               <h5>Category: <span>Loremipsum</span></h5>
               <h5>BEST 2021</h5>
            </div>
            <article>
               {
                  items.map((prod,ind) => (
                     <div onClick={ () => redirectProd(prod._id) } key={ ind } className='prod'>
                        <img alt='prodimg' src={ prod.img } />
                        <h6>{ prod.name }</h6>
                        <h6>{ prod.price }$</h6>
                     </div>
                  ))
               }
            </article>
         </section>
         
         <section>
            <div className='div-inf'>
               <h5>Category: <span>Loremipsum</span></h5>
               <h5>BEST 2021</h5>
            </div>
            <article>
               {
                  items2.map((prod,ind) => (
                     <div onClick={ () => redirectProd(prod._id) } key={ ind } className='prod'>
                        <img alt='prodimg' src={ prod.img } />
                        <h6>{ prod.name }</h6>
                        <h6>{ prod.price }$</h6>
                     </div>
                  ))
               }
            </article>
         </section>
      </section>
   )
}

export default PopCategories
