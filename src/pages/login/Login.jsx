import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth';
import './login.css'

function Login() {
  const {setAuth}= useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/bms/dashboard"

  const [username, setUsername] =useState("")
  const [password, setPassword] =useState("")

  const [usernameFocused, setUsernameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const loginUser = async (e) =>{
    e.preventDefault()
    try{
      const response = await axios.post("/auth/login",
       JSON.stringify({email: username, password}),
       {
        headers: {'Content-Type': 'application/json'}
       }
      );
      console.log(response.data);

      const user = response.data.user
      const token = response.data.token
      
      setAuth({user, token})
      setPassword("")
      setUsername("")
      navigate(from, {replace:true})
    }catch(err){
      console.log(err.response);
      if(!err.response){
        toast.error("Server not found")
      }else{
        toast.error(err.response.data.error)
      }
    }
  }

  return (
    <div className='wrapper  mx-auto bg-red-300 flex flex-col-reverse w-full h-full lg:flex-row'>
        <div className='content absolute p-4 rounded-t-3xl w-full bg-white b-0 
        md:px-20 md:h-1/2 md:flex md:items-center md:justify-center lg:w-1/2 lg:relative
        lg:h-full lg:rounded-t-none'>
          <form className='md:w-full xl:w-[60%]' onSubmit={loginUser}>
            <h1>Login</h1>
            <p className='text-xs mb-3 md:mb-8 text-gray-400' >The faster you type, the faster you manage your stuff</p>
            <div className="form-control flex flex-col gap-2">
              <label htmlFor="username">Email or Username</label>
              <input type="text" onChange={(e)=>{
                  setUsername(e.target.value)
                }} 
                value={username} 
                required 
                minLength={2}
                focused={usernameFocused.toString()}
                className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                placeholder='Please enter your email/username'
                onBlur={(e)=>{
                  setUsernameFocused(true)
                }}
              />
            </div>
            <div className="flex justify-between mb-3 mt-1">
              <p className={`${usernameFocused && username == ""? "flex" : "hidden"} text-red-400 text-xs md:text-sm`}>Username or email cannot be empty</p>
            </div>
            <div className="form-control flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input type="password" onChange={(e)=>{
                  setPassword(e.target.value)
                }} 
                value={password} 
                minLength={8}
                required 
                focused={passwordFocused.toString()}
                className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                placeholder="Please enter your password"
                onBlur={(e)=>{
                  setPasswordFocused(true)
                }}
              />
            </div>
            <div className='flex justify-between mt-1'>
              <p className='text-xs text-gray-300 mb-0'>Minimum 8 characters</p>
              <a className='text-blue-400 text-xs md:text-xs'>forgot password</a>
            </div>
            <div className='flex justify-between mb-3 mt-0 md:mb-8'>
            <p className='text-red-400 text-xs md:text-sm'> 
                <span className={`${passwordFocused && password == ""? "block" : "hidden"}`}>Password cannot be empty</span> </p>
            </div>
            <button className='rounded-full bg-blue-300 w-full text-white py-2 hover:bg-blue-500'>Login</button>
            <div className='flex gap-2 mb-3 mt-1'>
              <p className='text-red-400 text-xs'>Don't have an account?</p>
              <a className=' text-xs '>Contact your manager.</a>
            </div>
          </form>
        </div>

        <div className='hero w-full h-full lg:w-1/2'>
          <div className="overlay w-full h-full"></div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login