import mongoose from "mongoose";
import { Role } from "./enum";

export interface IPayload {

    _id: mongoose.Types.ObjectId,
    username: string,
    email: string,
    role: Role,
    number?: number | string
}