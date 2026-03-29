import * as yup from 'yup'

export const signupSchema = yup.object({

    userName: yup.string().required('Username is required'),
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required'),
    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Enter valid number'),
})

export const loginSchema = yup.object({

    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required'),
})