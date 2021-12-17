import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaShoppingBasket } from 'react-icons/fa'
import { fetchGet } from '../../../js/fetchs'
import { useNavigate } from 'react-router-dom'
import Button from '../../Reusable/Button'
import '../../../css/Product.css'

const Product = () => {
   const navigate = useNavigate();
   const [prod, setProd] = useState({});
   const [size, setSize] = useState('');
   const sizeArr = ['ONE', 'TW', 'THR', 'FO'];
   function selectSize(e, str){
      e.target.parentElement.childNodes.forEach(item => item.className = '')
      e.target.className = 'active';
      setSize(str);
   }

   function addCart(){
      console.log(size)
   }

   const id = useParams().id;
   useEffect(() => { 
      fetchGet(`/items/products/${id}`)
      .then(data => setProd(data))
      .catch(err => navigate('/error', { state: { erro: err, code: err.code } }) )
      // eslint-disable-next-line
   }, [])
   
   return (
      <main className='prod-page'>
         <figure>
            <img src={ prod.img } alt='product' />
         </figure>

         <article className='right-sec'>
            <h1>{ prod.name }</h1>
            <table>
               <tbody>
                  <tr>
                     <td>Full name</td>
                     <td>Lorem amet sit</td>
                  </tr>
                  <tr>
                     <td>Type</td>
                     <td>Ipsum</td>
                  </tr>
                  <tr>
                     <td>Producent</td>
                     <td>Conesqecatur</td>
                  </tr>
                  <tr>
                     <td>Sizes</td>
                     <td>Dolorem</td>
                  </tr>
                  <tr>
                     <td>Material</td>
                     <td>Randori</td>
                  </tr>
                  <tr>
                     <td>Prod. Year</td>
                     <td>2020</td>
                  </tr>           
               </tbody> 
            </table>

            <section className='size-prod'>
               <h3>Choose a size:</h3>
               <div>
                  {
                     sizeArr.map((it,ind) => (
                        <h5 key={ ind } onClick={ (e) => selectSize(e,it) }>{ it }</h5>
                     ))
                  }
               </div>
            </section>

            <section className='info-prod'>
               <div>{ prod.price }$</div>
               <Button action={ addCart } text='' cname='x' additional={ <FaShoppingBasket /> } />
            </section>
         </article>
      </main>
   )
}

export default Product
