import crypto from 'crypto-js';

interface hashObj {
   salt: string,
   hash: string
}

export function genHash(pass:string):hashObj{
   const salt = crypto.lib.WordArray.random(32).toString();
   const hash = crypto.PBKDF2(pass, salt, {
      keySize: 512 / 32
   }).toString();

   return { salt:salt, hash:hash }
}

export function verifyHash(pass:string,salt:string,hash:string):Boolean{
   const hashVer = crypto.PBKDF2(pass, salt, {
      keySize: 512 / 32
   }).toString();

   return hashVer === hash;
}
