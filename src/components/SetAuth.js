import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const SetAuth = () => {
    const {auth, setAuth} = useAuth()

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("bmsUser"))
        const token = JSON.parse(localStorage.getItem("bmsUserAccessToken"))
        if(!auth && !user){
            return
        }

        setAuth({user, token})
        
    },[])

  return (
    <Outlet /> 
  )
}

export default SetAuth