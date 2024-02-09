import React, {FC} from 'react'

import './CheckBox.css'

interface CheckBoxProps {
    label: string
    checked: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CheckBox: FC<CheckBoxProps> = (
    {
        label,
        checked,
        onChange
    }
) => {
    return (
        <div className='CheckBoxBlock'>
            <label className='LabelCheckBox'>{label}</label>
            <input
                className='CheckBox'
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
        </div>
    )
}

export {
    CheckBox
}