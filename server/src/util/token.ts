import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { IPayload } from '../types';
dotenv.config();

const private_key = process.env.JWT_PRIVATE_KEY || ''
const expiresIn = process.env.JWT_EXPIRES_IN ?? "24h"


export const generateToken = (payload: IPayload) => {

    const token = jwt.sign(payload, private_key as string, { expiresIn: expiresIn as any })

    return token
}
    
export const decode = (token: string): jwt.JwtPayload => {

    const decode = jwt.verify(token, private_key)

    return decode as JwtPayload
}