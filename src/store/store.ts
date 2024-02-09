import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { addressReducer } from './reducers/addressSlice/addressSlice'

const rootReducer = combineReducers({
    addressReducer
})

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export {
    setupStore
}

export type {
    RootState,
    AppStore,
    AppDispatch
}
