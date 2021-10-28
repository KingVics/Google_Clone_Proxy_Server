import React from "react"
import { useEffect } from "react"
import  { useLocation } from "react-router-dom"
import ReactPlayer from "react-player"

import { useResultContext } from "../Context/ResultsContext"
import Loading from './Loading';



const Results: React.FC = (): any => {
    const location = useLocation<any>();
    const {results, isLoading, searchType, getResults} = useResultContext()
    const type = location.pathname === '/news' ? 'news' : location.pathname === '/search' ? 'search' :  location.pathname === '/images' ? 'images' : 'videos'
    

    useEffect(() => {
        getResults(type, searchType)
    }, [type, searchType])

    console.log(isLoading)

    if(isLoading){
        <h1>Loading</h1>
    }
    
    switch (location.pathname) {
        case '/search':
            return (
                
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
                    {results?.map((item: any, i: number) => (
                        <div key={i} className="md:w-2/5 w-full">
                            <a href={item.link} target="_blank" rel="noreferrer">
                                <p className="text-sm">
                                    {item.link.length > 30 ? item.link.substring(0, 30) : item.link}
                                </p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                    {item.title}
                                </p>
                            </a>
                        </div>
                    ))  

                    }
                </div>
            )
        case '/images':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {results?.map((item: any, i: number) => (
                        <a key={i} className="sm:p-3 p-5" href={item?.link?.href} target="_blank" rel="noreferrer">
                            <img src={item?.image?.src} alt={item?.link?.title} loading="lazy"/>
                            <p className="w-36 break-words text-sm mt-2">
                                {item?.link?.title}
                            </p>
                        </a>
                    ))}
                </div>
            )
        case '/news':
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
                    {results?.map((item: any) => (
                        <div className="md:w-2/5 w-full">
                            {/* <a href={item?.links[0]?.href} target="_blank" rel="noreferrer" className="hover:underline">
                                <p className="text-lg dark:text-blue-300 text-blue-700">
                                    {item?.links?.title}
                                </p>
                            </a> */}
                            <div className="flex gap-4">
                                <a href={item?.source?.href} target="_blank" rel="noreferrer">
                                    {item?.source?.href}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )
        case '/videos':
            return (
                <div className="flex flex-wrap">
                    {results?.map((item: any, i: number) => (
                        <div key={i} className="p-2">
                            <ReactPlayer url={item.additional_links?.[1]?.href} controls width="355px" height="200px"/>
                        </div>
                    ))}
                </div>
            )
        default:
            return 'ERROR';
    }
}

export default Results;
