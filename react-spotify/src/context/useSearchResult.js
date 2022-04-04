import { useState, createContext, useContext } from 'react'

const SearchContext = createContext({})

export const SearchProvider = ({children}) => {
    const [result,setResult] = useState([])
    const [selectedSongs,setSelectedSongs] = useState([])

    return (
        <SearchContext.Provider
            value={{
                result,
                setResult,
                selectedSongs,
                setSelectedSongs
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchResult = () => {
    const context = useContext(SearchContext)
    return context
}