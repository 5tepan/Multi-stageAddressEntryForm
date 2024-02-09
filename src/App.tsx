import React from 'react'
import {AddressVerificationForm} from "./components/addressVerificationForm/AddressVerificationForm"
import {AddressAutosuggest} from "./components/autosuggest/AddressAutosuggest"
import {useAppSelector} from "./store/hooks/redux"
import {ViewAddressData} from "./components/viewAddressData/ViewAddressData"

import './styles/App.css'

function App() {
    const step = useAppSelector(state => state.addressReducer.step)


    const content = () => {
        switch (step) {
            case 0:
                return <AddressAutosuggest/>
            case 1:
                return <AddressVerificationForm/>
            case 2:
                return <ViewAddressData/>
        }
    }

  return (
    <div className="App">
        {content()}
    </div>
  )
}

export {
  App
}
