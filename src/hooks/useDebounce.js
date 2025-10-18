"use client"
import {useState, useEffect} from "react"
export default function useDebounce(input){
    const [debounce, setDebounce]=useState(input)

    useEffect(()=>{
        const timer=setTimeout(() => {
            setDebounce(input)
        }, 500);

        return ()=>clearTimeout(timer)

    },[input])

    return {debounce}

}