import { useEffect } from "react";

type StateValueLoggerArguements={
    displayText: String;
    stateValue: any
}

type LoggerArguements={
    displayText: String;
    value: any
}

export function stateValueLogger({displayText, stateValue}: StateValueLoggerArguements){
    useEffect(()=>{
        console.log(`${displayText}: ${stateValue}`);
    }, [stateValue])
}
export function logger({displayText, value}: LoggerArguements){
    useEffect(()=>{
        console.log(`${displayText}: , ${value}`);
    }, [value])
}