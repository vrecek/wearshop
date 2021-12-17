import React from 'react'
import '../../../css/Items.css'
import Item from './Item'
import { useState, useEffect } from 'react'
import { fetchGet } from '../../../js/fetchs'
import { useNavigate } from 'react-router-dom'

const ItemsCont = () => {
   const navigate = useNavigate();
   const [items, setItems] = useState([]);
   useEffect(() => {
      fetchGet('/items')
      .then(data => setItems(data))
      .catch(err => navigate('/error', { state: { erro: err, code: err.code } }) )
   },[])

   return (
      <section className='items-cont'>
         {
            items.map(it => (
               <Item id={ it._id } key={ it._id } cname='text-cont' text={ it.name } price={ it.price } imgsrc={ it.img } />
            ))
         }
      </section>
   )
}

export default ItemsCont
