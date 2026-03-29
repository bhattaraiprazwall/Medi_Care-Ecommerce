
import React from "react"
import { UseFormRegister } from "react-hook-form";
import { LuAsterisk } from "react-icons/lu";

interface IProps {
    required: boolean,
    label: string,
    name: string,
    error?: string,
    register: UseFormRegister<any>,
    multiline?: boolean,
    placeholder?: string;
    type?: string
    value?: string
}

const Input: React.FC<IProps> = ({ required, label, name, error, register, multiline, placeholder, type ,value}) => {

    console.log("input error ", error)
    return (
        <div className='flex flex-col gap-1 font-sans font-medium w-full'>
            <div className='flex font-sans '>
                <label htmlFor={name} className=' text-lg  font-sans'>{label}</label>
                {required && <LuAsterisk size={18} className='text-red-500' />}
            </div>
            {!multiline ? <input
                {...register(name)}
                placeholder={placeholder}
                type={type}
                value={value}
                className={`border border-gray-400 rounded-md py-3 px-3 ${error ? "focus:outline-red-500 border-red-500" : 'focus:outline-blue-400'} 
                    ${type === "number" ? "no-spinner" : ""}`}
            /> :
                <textarea
                    {...register(name)}
                    value={value}
                    placeholder={placeholder}
                    className='min-h-[120px] border border-gray-400 rounded-md py-2 px-3 focus:outline-blue-400'
                />}
            {error && <p className='text-xs text-red-500 mt-0'>{error}</p>}
        </div>

    )
}

export default React.memo(Input)    