export async function fetchGet(url){
   const response = await fetch(url);

   if(!response.ok){
      const str = response.status.toString();

      let error;
      let errCode;
      switch(str){
         case str.match(/^5\d+$/)?.input: { 
            error = 'Internal server error. If this happens more times, contact us.';
            errCode = str;
            break;
         }
         case '404': { 
            error = `URL (${url}) passed has not been found.`;
            errCode = '404'
            break;
         }
         case str.match(/^4\d+$/)?.input: { 
            error = 'Client error occured. Please visit this page later or contact us.';
            errCode = str;
            break;
         }
         default: {
            error = `UNKOWN ERROR: ${response.statusText}`;
            errCode = str;
         }
      }
      const errorT = new Error(error);
      errorT.code = errCode;
      throw errorT;
   } 

   return await response.json();
}

export async function fetchPost(url, body = {}){
   const response = await fetch(url, {
      method: "POST",
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
   })

   if(!response.ok){
      switch(response.status){
         case 404: throw new Error(`URL (${url}) passed has not been found.`)
         case 403: throw new Error(response.statusText)
         case 406: throw new ReferenceError(response.statusText)
         default: 
            const err = new Error(response.statusText);
            err.code = response.status;
            throw err; 
      }
   }
   
   return await response.json();
}