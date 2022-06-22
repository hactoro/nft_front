import {useEffect, useState} from 'react';



export default function useEffect2(action, list){
    const [isFirst, setIsFirst] = useState(true);


    useEffect(()=>{
        if(isFirst){
            setIsFirst(false);
        }else{
            action();
        }
    }, list);
    

}