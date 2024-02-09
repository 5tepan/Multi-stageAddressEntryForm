import {Address} from "../store/reducers/addressSlice/types"

function parseAddress(value: string): Address {
    const values = value.split(', ')
    let republic = ''
    let district = ''
    let startIndex = 1

    if (
        values[1]?.toLowerCase().includes("республика") ||
        values[1]?.toLowerCase().includes("область")
    ) {
        republic = values[1]
        startIndex = 2
    }

    if (
        values[startIndex]?.toLowerCase().includes("район") ||
        values[startIndex]?.toLowerCase().includes("поселение") ||
        values[startIndex]?.toLowerCase().includes("округ")
    ) {
        district = values[startIndex]
        if (
            values[startIndex + 1]?.toLowerCase().includes("район") ||
            values[startIndex + 1]?.toLowerCase().includes("поселение") ||
            values[startIndex + 1]?.toLowerCase().includes("округ")
        ) {
            district += ", " + values[startIndex + 1]
            startIndex += 2
        } else {
            startIndex += 1
        }
    }

    const country = values[0] ?? ''
    const city = values[startIndex] ?? ''
    const street = values[startIndex + 1] ?? ''
    const houseNumber = values[startIndex + 2] ?? ''
    const entrance = values[startIndex + 3] ?? ''
    const floor = values[startIndex + 4] ?? ''
    const apartment = values[startIndex + 5] ?? ''
    const housing = values[startIndex + 6] ?? ''
    const postalCode = values[startIndex + 7] ?? ''

    return {
        country,
        republic,
        district,
        city,
        street,
        houseNumber,
        entrance,
        floor,
        apartment,
        housing,
        postalCode
    }
}

export {
    parseAddress
}
