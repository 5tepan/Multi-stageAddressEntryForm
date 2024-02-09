import React, {FC} from 'react'
import {Address} from "../../../store/reducers/addressSlice/types"

import './Input.css'

interface InputProps {
    label: string
    disabled?: boolean
    value?: string | number
    placeholder?: string
    onChange?: () => void
    type?: 'text' | 'number'
    name?: keyof Address
    register?: any
    required?: boolean
    error?: string
    pattern?: string
    minLength?: number
    maxLength?: number
    className?: string
}

const Input: FC<InputProps> = (
    {
        label,
        disabled,
        value,
        placeholder,
        onChange,
        type,
        name,
        register,
        required,
        error,
        pattern,
        minLength,
        maxLength,
        className
    }
) => {
    return (
        <div className='InputBlock'>
            <label
                className='LabelInput'
            >
                {label} {required ? <span className='Required'>*</span> : undefined}
            </label>
            <input
                className={className ? className : 'Input'}
                value={value}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
                {...register(name, {
                    required: required,
                    pattern: pattern,
                    minLength: minLength,
                    maxLength: maxLength
                })}
            />
            {error && <span className='Error'>{error}</span>}
        </div>
    )
}

export {
    Input
}