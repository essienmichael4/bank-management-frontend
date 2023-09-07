import React, {useEffect} from 'react'
import { axiosPrivate } from "../api/axios";
import useAuth from './useAuth';


const useAxiosPrivateInterceptor = () => {
    const {auth} = useAuth()

    useEffect(()=>{
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config =>{
                if(!config.headers['Authorization']){
                    config.headers.Authorization= `Bearer ${auth?.token}`
                }
                return config
            },(error) => Promise.reject(error)
        )

        return axiosPrivate.interceptors.request.eject(requestIntercept)
    },[auth])

  return axiosPrivate
}

export default useAxiosPrivateInterceptor