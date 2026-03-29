import { NextFunction, Request, Response } from "express";
import customError from "../util/customError";
import { decode } from "../util/token";
import { User } from "../model/user.model";
import { Role } from "../types/enum";

const auth = (roles?: Role[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {

            //check whether the header contains authentication token or not
            const auth_header = req.headers.authorization
            // console.log("token", auth_header)

            if (!auth_header) {

                throw new customError(401, "unauthorized access denied")
            }

            //check the format of token that we have created
            // like bearer token
            if (!auth_header?.startsWith('Bearer')) {

                throw new customError(401, "unauthorized access denied")

            }

            const token = auth_header.split(' ')[1]

            if (!token) {

                throw new customError(401, "unauthorized access denied")
            }

            //verify token

            const decoded = decode(token)
            // console.log("decode", decoded._id)

            //check the expiry of token
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                throw new customError(401, 'Access token expired , access denied',)

            }

            //check whether the user exists or not
            const user = await User.findOne({ _id: decoded._id })
            // console.log("user", user)

            if (!user) {

                throw new customError(401, "unauthorized access denied")
            }

            if (!roles?.includes(user.role)) {

                throw new customError(401, "unauthorixed access denied")

            }

            //Assign user details in request header to make it reusable
            req.user = {

                _id: user._id,
                username: user.userName,
                email: user.email,
                role: user.role,
                number: user.phoneNumber || ''

            }
            //pass middle ware
            next()

        } catch (error) {

            next(error)

        }
    }

}


export default auth