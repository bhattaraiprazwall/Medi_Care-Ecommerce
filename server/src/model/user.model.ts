import mongoose from 'mongoose';
import { Role } from '../types/enum'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    phoneNumber: {
        type: Number,
        minlength: [10, 'Enter valid number'],
        maxlength: [10, 'Enter valid number']
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.user
    }
},
    {
        timestamps: true
    }
);

export const User = mongoose.model('User', userSchema);
