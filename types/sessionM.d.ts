
declare module 'express-session' {
 
  // Augment the module type
  export function session(
    options: express.RequestHandler& { //RequestHandlerOptions
      secret: string;
      resave: boolean;
      saveUninitialized: boolean;
      cookie: express.CookieOptions;
    }
  ): express.RequestHandler;
}
