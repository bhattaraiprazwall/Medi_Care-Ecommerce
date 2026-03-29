import { NextFunction, Request, Response } from "express"
import customError from "../util/customError"
import successMsG from "../util/responseHandler"
import asyncHandler from "../util/asyncHandler"
import { User } from "../model/user.model"
import { comparePassword, hashPassord } from "../util/bcrypt"
import { generateToken } from "../util/token"
import { IPayload } from "../types"

export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { userName, password, email, role } = req.body;

    const hashPassword = await hashPassord(password)

    const newUser = await User.create({
        userName,
        password: hashPassword,
        email,
        role
    })

    if (newUser) {

        //send reponse for creating user
        successMsG(201, newUser, res, "signed up successfully")
    }
})


export const login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (user) {

        //compare password hashed

        const isPasswordValid = await comparePassword(password, user.password)

        if (isPasswordValid) {

            //generate token and send
            const payload: IPayload = {
                _id: user._id,
                username: user.userName,
                email: user.email,
                role: user.role,
                number: user.phoneNumber ?? ''
            }

            const token = generateToken(payload)

            successMsG(200, user, res, 'logged in successfully', token)

        }
        else {

            throw new customError(401, "Authentication error Invalid email password")

        }

    }

    else {

        throw new customError(401, "Authentication error Invalid email password")
    }
})