import React, {useState} from 'react'
import {SubmitHandler, useForm} from "react-hook-form"
import {Input} from "../ui/input/Input"
import {decrementStep, incrementStep, updateAddress} from "../../store/reducers/addressSlice/addressSlice"
import {CheckBox} from "../ui/checkBox/CheckBox"
import {Button} from "../ui/button/Button"
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux"
import {Title} from "../ui/title/Title"
import {Address} from "../../store/reducers/addressSlice/types"

import './AddressVerificationForm.css'

const AddressVerificationForm = () => {
    const [isChecked, setIsChecked] = useState(false)
    const dispatch = useAppDispatch()
    const addressObj = useAppSelector(state => state.addressReducer.addressObj)

    const {register, handleSubmit, clearErrors, trigger, formState: {errors, isValid}} = useForm<Address>(
        {
            mode: 'onChange',
            defaultValues: addressObj
        }
    )

    const handleCheckBoxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked)
        clearErrors(['entrance', 'apartment', 'floor'])
        await trigger()
    }

    const onSubmit: SubmitHandler<Address> = (data) => {
        dispatch(updateAddress(data))
    }

    const goToBackPage = () => {
        dispatch(decrementStep())
    }

    return (
        <div className='AddressVerificationForm'>
            <Title
                level={1}
                value={'Проверьте заполненные данные'}
                className='TitleForm'
            />
            <form className='Form' onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label={'Страна:'}
                    name={'country'}
                    register={register}
                    required={true}
                    error={errors.country && 'Это поле должно быть заполнено!'}
                    type={'text'}
                    className={errors.country && 'InputError'}
                    placeholder={'Страна'}
                />
                <Input
                    label={'Республика/Область:'}
                    name={'republic'}
                    register={register}
                    required={false}
                    type={'text'}
                    placeholder={'Республика/Область'}
                />
                <Input
                    label={'Район/Поселение/Округ:'}
                    name={'district'}
                    register={register}
                    required={false}
                    type={'text'}
                    placeholder={'Район/Поселение/Округ'}
                />
                <Input
                    label={'Город:'}
                    name={'city'}
                    register={register}
                    required={true}
                    error={errors.city && 'Это поле должно быть заполнено!'}
                    type={'text'}
                    className={errors.city && 'InputError'}
                    placeholder={'Город'}
                />
                <Input
                    label={'Улица:'}
                    name={'street'}
                    register={register}
                    required={true}
                    error={errors.street && 'Это поле должно быть заполнено!'}
                    className={errors.street && 'InputError'}
                    placeholder={'Улица'}
                />
                <Input
                    label={'№ Дома:'}
                    name={'houseNumber'}
                    register={register}
                    required={true}
                    error={errors.houseNumber && 'Это поле должно быть заполнено!'}
                    className={errors.houseNumber && 'InputError'}
                    placeholder={'№ Дома'}
                />
                <CheckBox
                    label={'Частный дом'}
                    checked={isChecked}
                    onChange={handleCheckBoxChange}
                />
                <Input
                    label={'№ Подъезда:'}
                    name={'entrance'}
                    register={register}
                    required={!isChecked}
                    error={errors.entrance && 'Это поле должно быть заполнено!'}
                    disabled={isChecked}
                    className={errors.entrance && 'InputError'}
                    placeholder={'№ Подъезда'}
                />
                <Input
                    label={'Этаж:'}
                    name={'floor'}
                    register={register}
                    required={!isChecked}
                    error={errors.floor && 'Это поле должно быть заполнено!'}
                    disabled={isChecked}
                    className={errors.floor && 'InputError'}
                    placeholder={'Этаж'}
                />
                <Input
                    label={'Квартира:'}
                    name={'apartment'}
                    register={register}
                    required={!isChecked}
                    error={errors.apartment && 'Это поле должно быть заполнено!'}
                    disabled={isChecked}
                    className={errors.apartment && 'InputError'}
                    placeholder={'Квартира'}
                />
                <Input
                    label={'Корпус:'}
                    name={'housing'}
                    register={register}
                    required={false}
                    disabled={isChecked}
                    placeholder={'Корпус'}
                />
                <Input
                    label={'Почтовый индекс:'}
                    name={'postalCode'}
                    register={register}
                    required={true}
                    minLength={6}
                    maxLength={6}
                    pattern={'[0-9]{6}'}
                    error={errors.postalCode && 'Проверьте правильность введенного индекса!'}
                    type={'number'}
                    className={errors.postalCode && 'InputError'}
                    placeholder={'Почтовый индекс'}
                />
                <div className='Buttons'>
                    <Button
                        content={'Назад'}
                        onClick={goToBackPage}
                    />
                    <Button
                        content={'Далее'}
                        onClick={() => dispatch(incrementStep())}
                        type={'submit'}
                        disabled={!isValid}
                    />
                </div>
            </form>
        </div>
    )
}

export {
    AddressVerificationForm
}