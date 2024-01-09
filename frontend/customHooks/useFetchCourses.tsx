import React, { useEffect, useState } from "react";
import axios from 'axios'

function useFetchCourses(){

    interface Item {
        title : String, 
        description : String, 
        price : String, 
        imageLink : String
    }

    const [data,setData] = useState<Item[]>([])

    async function fetchData(){
        let resp = await axios.get(`${process.env.BACKEND_BASEPATH}/users/courses`)
        if(resp.data.success){
            setData(resp.data.result)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return data
}

export default useFetchCourses