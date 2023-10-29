// express-session.d.ts

declare module "express-session" {
    interface SessionData {
        username?: string;
        userId?: number;
    }
}
