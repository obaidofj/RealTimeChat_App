import express from 'express';

namespace AppTypes {

    export interface Request extends express.Request {
        body: {
            id: string;
            username: string;
            password: string;
            email: string;
        }
      }
    
      export interface Response extends express.Response {
       
      }  
      
    export interface Session {
        username?: string;
        userId?: number;
    }

    export interface PartialSessionData {
        username?: string;
        userId?: number;
    }


}

export {AppTypes }