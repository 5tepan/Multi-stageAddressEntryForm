import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"
import {Address} from "./types"

interface AddressSliceState {
    step: number
    addressObj: Address
    suggestions: string[]
    error: string | null
}

const apiUrl: string = process.env.REACT_APP_API_URL || ''
const apiKey: string = process.env.REACT_APP_SECRET_KEY || ''

const loadAddressSuggestions = createAsyncThunk(
    'address/loadAddressSuggestions',
    async (value: string, thunkAPI) => {
        try {
            const response = await axios.get(apiUrl, {
                params: {
                    apikey: apiKey,
                    geocode: value,
                    lang: 'ru_RU',
                    format: 'json',
                    results: 5
                }
            })
            const suggestions = response.data.response.GeoObjectCollection.featureMember.map(
                (item: { GeoObject: { metaDataProperty: { GeocoderMetaData: { text: string } } } }) =>
                    item.GeoObject.metaDataProperty.GeocoderMetaData.text
            )
            return suggestions
        } catch (error) {
            console.error('Ошибка при получении адресов:', error)
            throw error
        }
    }
)

const initialState: AddressSliceState = {
    step: 0,
    addressObj: {
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
        postalCode: '',
    },
    suggestions: [],
    error: null
}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        updateAddress: (state, action: PayloadAction<Address>) => {
            state.addressObj = action.payload
        },
        incrementStep: (state) => {
            state.step += 1
        },
        decrementStep: (state) => {
            state.step -= 1
        },
        setDefaultStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadAddressSuggestions.fulfilled, (state, action) => {
                state.suggestions = action.payload
            })
            .addCase(loadAddressSuggestions.rejected, (state, action) => {
                state.error = action.error.message ?? 'Ошибка при загрузке адресов'
            })
    }
})

const addressReducer = addressSlice.reducer
export const {updateAddress, incrementStep, decrementStep, setDefaultStep} = addressSlice.actions

export {
    addressReducer,
    loadAddressSuggestions,
}