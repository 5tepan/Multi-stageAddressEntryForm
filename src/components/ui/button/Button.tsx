import React, {FC, ReactElement} from 'react'

import './Button.css'

interface ButtonProps {
    content: string | ReactElement
    onClick: () => void
    disabled?: boolean
    type?: 'submit'
}

const Button: FC<ButtonProps> = (
    {
        content,
        onClick,
        disabled,
        type
    }
) => {
    return (
        <button
            className='Button'
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {content}
        </button>
    )
}

export {
    Button
}