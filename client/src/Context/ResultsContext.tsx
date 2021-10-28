import React, {useContext, useState} from "react"
import axios from "axios"

interface IContextProps {
    getResults: (type: string, search: string) => Promise<void>;
    results: any;
    searchType: string;
    setSearch: any;
    isLoading: boolean;
}


const ResultContext = React.createContext({} as IContextProps);

export const ResultContextProvider = ({children}: any) => {
    const [results, setResults] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchType, setSearch] = useState<string>("JavaScript")


    const getResults = async(type: string, search: string) => {
        setIsLoading(true)

        const response = await axios.get(`http://localhost:5000/${type}/${search}`)
        const {data} = await response

        if(type.includes('news')) {
            setResults(data.entries)
        } else if(type.includes('images')) {
            setResults(data.image_results)
        } else {
            setResults(data.results)
        }

        setIsLoading(false)

    }

    return (
        <ResultContext.Provider value={{getResults, results, searchType, setSearch, isLoading}}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext)