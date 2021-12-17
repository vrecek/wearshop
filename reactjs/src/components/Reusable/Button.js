import React from 'react'

const Button = ({ text, cname, action, additional }) => {
   return (
      <button
       style={ cname === undefined ? defStyl : null }
       className={ cname } 
       onClick={ action }>
         { additional }
         <span style={ cname === '' ? defSpan : null }>{ text }</span>
      </button>
   )
}

Button.defaultProps = {
   text: 'Button',
   action: () => console.log('Button clicked')
}

const defStyl = {
   width: '50%',
   cursor: 'pointer',
   borderRadius: '.3em',
   border: '2px solid rgb(0, 144, 240)',
   color: 'rgb(0, 144, 240)',
   background: 'none',
   padding: '1em 0',
}

const defSpan = {
   fontWeight: '700'
}

export default Button
