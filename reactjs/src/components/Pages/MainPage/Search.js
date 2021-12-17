import React from 'react'
import '../../../css/Search.css'
import Results from './Results'
import { BsSearch } from 'react-icons/bs'
import { useState } from 'react'
import { fetchGet } from '../../../js/fetchs'

const Search = () => {
   const [result, setResult] = useState(null);

   function query(e){
      if(e.target.value === ''){
         setResult(null);
         return;
      } 

      fetchGet(`items/search/${e.target.value}`)
      .then(data => setResult(data))
      .catch(err => console.log(err))
   }

   return (
      <section className='search-cont'>
         <h4>Search through our base</h4>
         <div>
            <BsSearch />
            <input onChange={ (e) => query(e) } spellCheck='false' type='text' />
         </div>
         { result && <Results results={ result } /> }
      </section>
   )
}

export default Search
