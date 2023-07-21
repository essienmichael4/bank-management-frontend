import React, {useEffect} from 'react'
import { axiosPrivateNew } from "../api/axios";
import useAuth from './useAuth';

const useAxios = () => {
    const {auth} = useAuth()

    useEffect(()=>{
        axiosPrivateNew.interceptors.request.use(
            config =>{
                if(!config.headers['Authorization']){
                    config.headers.Authorization= `Bearer ${auth?.token}`
                }
                return config
            }
        )

        // return axiosPrivateNew.interceptors.request.eject(requestIntercept)
    },[auth])

  return axiosPrivateNew
}

export default useAxios