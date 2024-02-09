import React, {useState} from 'react'
import Autosuggest from 'react-autosuggest'
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux"
import {incrementStep, loadAddressSuggestions, updateAddress} from "../../store/reducers/addressSlice/addressSlice"
import {Button} from "../ui/button/Button"
import {parseAddress} from "../../common/parseAddress"
import {Title} from "../ui/title/Title"

import './AddressAutosuggest.css'

const AddressAutosuggest = () => {
    const [value, setValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const suggestions = useAppSelector((state: any) => state.addressReducer.suggestions)

    const onChange = (event: React.FormEvent<HTMLElement>, { newValue }: Autosuggest.ChangeEvent) => {
        setValue(newValue)
    }

    const onSuggestionsFetchRequested = ({value}: Autosuggest.SuggestionsFetchRequestedParams) => {
        dispatch(loadAddressSuggestions(value))
    }

    const inputProps: Autosuggest.InputProps<string> = {
        placeholder: 'Введите адрес',
        value,
        onChange
    }

    const goToNextPage = () => {
        dispatch(updateAddress(parseAddress(value)))
        dispatch(incrementStep())
    }

    return (
        <div className='AddressAutosuggest'>
            <Title
                level={1}
                value={'Введите полный адрес'}
                className='TitleAutosuggest'
            />
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                getSuggestionValue={suggestion => suggestion}
                renderSuggestion={suggestion => <div>{suggestion}</div>}
                inputProps={inputProps}
            />
            <Button
                content={'Далее'}
                onClick={goToNextPage}
                disabled={value.length === 0}
            />
        </div>
    )
}

export {
    AddressAutosuggest
}