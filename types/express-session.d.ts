// express-session.d.ts

declare module "express-session" {
    interface SessionData {
        username?: string;
        userId?: number;
    }
}

declare module 'express' {
  export interface Request {
    session: {
      username: string; 
      userId: number;
    };
  }
}
