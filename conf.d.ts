declare module 'node-fetch';

declare namespace Express {
  export interface Request {
    session: any,
    isAuthenticated:Function
  }
}