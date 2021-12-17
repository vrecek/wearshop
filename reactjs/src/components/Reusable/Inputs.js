import React from 'react'

const Inputs = ({ typ, text, refe, name }) => {
   return (
      <div ref={ refe }>
         <p>{ text }</p>
         <input spellCheck='false' autoComplete='off' type={ typ } name={ name } />
      </div>
   )
}

Inputs.defaultProps = {
   typ: 'text',
   text: 'Lorem'
}

export default Inputs
