import React from 'react'
import Button from '../../Reusable/Button'
import { VscInspect } from 'react-icons/vsc'

const Item = ({ text, price, imgsrc, cname, id }) => {
   const redirectProd = num => window.location.href = `/product/${num}`

   return (
      <article>
         <div className='img-cont'>
            <img src={ imgsrc } alt='prod' />
         </div>
         <h2>{ text }</h2>
         <div className={ cname }>
            <Button action={ () => redirectProd(id) } text='Inspect' additional={ <VscInspect /> } cname='n' />
            <mark>{ price }$</mark>
         </div>
      </article>
   )
}

Item.defaultProps = {
   price: '404',
   text: 'Lorem ipsum'
}

export default Item
