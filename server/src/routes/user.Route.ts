import { Router } from "express";
import { login, signup } from "../controllers/user.Controller";

const userRoute = Router()

userRoute.post('/signup', signup)
userRoute.post('/login', login)

export default userRoute