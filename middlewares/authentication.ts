import jwt from 'jsonwebtoken';
import { User } from '../db/entities/user.entity.js';


const authenticate = async (req: { headers: { [x: string]: any; }; cookies: { [x: string]: any; }; }, res: { locals: { user: User | null; }; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }, next: () => void) => {
    const token = req.headers['authorization'] ||req.headers['Authorization'] || req.cookies['token'] ||'';
    
    
    let tokenIsValid = verifyToken(token);
   
    if (tokenIsValid) {
        const decoded = jwt.decode(token, { json: true });
        const user = await User.findOneBy({ username: decoded?.username || '' });
        res.locals.user = user; 
        next();
    }
    else {
        res.status(401).send("You are Unauthenticated!");
    }
};
const verifyToken = (token: string) => {
    let IsValid;
    try {
        IsValid = jwt.verify(token, process.env.JWT_SECRET || '');
        return IsValid;
    }
    catch (error) { }
};
export { authenticate, verifyToken as verify };
