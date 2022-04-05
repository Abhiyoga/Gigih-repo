import { useState, createContext, useContext } from 'react'
import Axios from 'axios'

const ApiContext = createContext({})

export const ApiProvider = ({ children }) => {
    const [token,setToken] = useState(null)
    const baseURL = process.env.REACT_APP_SPOTIFY_BASE_URL

    const axiosInstance = Axios.create({
        baseURL
    })

    if (token) {
        axiosInstance.interceptors.request.use((config) => {
            config.headers.common[
                'Authorization'
            ] = `Bearer ${token}`

            return config
        })
    }

    return (
        <ApiContext.Provider
            value={{
                axios: axiosInstance,
                setToken,
                token
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}

export const useStoreApi = () => {
    const context = useContext(ApiContext)
    return context
}