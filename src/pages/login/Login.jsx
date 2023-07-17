import React from 'react'
import './login.css'

function Login() {
  return (
    <div className='wrapper  mx-auto bg-red-300 flex flex-col-reverse w-full h-full lg:flex-row'>
        <div className='content absolute p-4 rounded-t-3xl w-full bg-white b-0 
        md:px-20 md:h-1/2 md:flex md:items-center md:justify-center lg:w-1/2 lg:relative
        lg:h-full lg:rounded-t-none'>
          <form className='md:w-full xl:w-[60%]'>
            <h1>Login</h1>
            <p className='text-xs mb-3 md:mb-8'>The faster you type, the faster you manage your stuff</p>
            <div className="form-control flex flex-col gap-2">
              <label htmlFor="username">Email or Username</label>
              <input type="text" className='py-2 px-2 text-sm rounded border border-slate-200 w-full' placeholder='Please enter your email/username'/>
            </div>
            <div className='flex justify-between mb-3 mt-1'>
              <p className='text-red-400 text-xs md:text-sm'>Password cannot be empty</p>
            </div>
            <div className="form-control flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input type="password"  className='py-2 px-2 text-sm rounded border border-slate-200 w-full' placeholder="Please enter your password"/>
            </div>
            <div className='flex justify-between mb-3 mt-1 md:mb-8'>
              <p className='text-red-400 text-xs md:text-sm'>Password cannot be empty</p>
              <a className='text-blue-400 text-xs md:text-sm'>forgot password</a>
            </div>
            <button className='rounded-full bg-blue-300 w-full text-white py-2'>Login</button>
            <div className='flex gap-2 mb-3 mt-1'>
              <p className='text-red-400 text-xs md:text-sm md:text-sm'>Don't have an account?</p>
              <a className=' text-xs md:text-sm md:text-sm'>Contact your manager.</a>
            </div>
          </form>
        </div>

        <div className='hero w-full h-full lg:w-1/2'>
          <div className="overlay w-full h-full"></div>
        </div>
    </div>
  )
}

export default Login