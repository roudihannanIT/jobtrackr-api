import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {User} from "../models/User";

interface JwtPayload {
    id:string;
}

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token:string | undefined;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split('')[1];
    }

    if(!token) {
        return res.status(401).json({message: 'Not authorized, no token'});
    }

    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        const user = await User.findById(decoded.id).select('-password');
        if(!user) {
            throw new Error('User not found');
        }
        
        req.user = user;

        next();
    }catch(error) {
        next(error);
    }
};