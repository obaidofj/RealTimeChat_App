// @ts-nocheck
import express from 'express';


const authorize = (api: string) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const permissions = res.locals.user?.role?.permissions || [];
    if (permissions.filter(p => p.name === api).length > 0) {
      next();
    } else {
      res.status(403).send("You don't have the permission to access this resource!");
    }
  }
}

export {
  authorize
}