import React from 'react'
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux"
import {Button} from "../ui/button/Button"
import {setDefaultStep, updateAddress} from "../../store/reducers/addressSlice/addressSlice"
import {Title} from "../ui/title/Title"

import './ViewAddressData.css'

const ViewAddressData = () => {
    const dispatch = useAppDispatch()
    const addressObj = useAppSelector((state: any) => state.addressReducer.addressObj)

    const handleStartOver = () => {
        dispatch(updateAddress({
            country: '',
            republic: '',
            district: '',
            city: '',
            street: '',
            houseNumber: '',
            entrance: '',
            floor: '',
            apartment: '',
            housing: '',
            postalCode: ''
        }))
        dispatch(setDefaultStep(0))
    }

    return (
        <div className='ViewAddressData'>
            <Title level={1} value={'Итоговые данные'} className='TitleViewData'/>
            <pre className='View'>
                {JSON.stringify(addressObj, null, 2)}
            </pre>
            <Button content={'Начать с начала'} onClick={handleStartOver}/>
        </div>
    )
}

export {
    ViewAddressData
}