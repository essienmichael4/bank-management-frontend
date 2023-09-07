import React from 'react'

const FormInput = (props) => {
  return (
    <div className="form-control flex flex-col gap-2">
        <label htmlFor="username">{props.label}</label> {}
        <input type={props.type} onChange={props.onChange} value={props.value} className='py-2 px-2 text-sm rounded border border-slate-200 w-full' placeholder='Please enter your email/username'/>
        <div className='flex justify-between mb-3 mt-1'>
        <p className='text-red-400 text-xs md:text-sm'>Password cannot be empty</p>
        </div>
    </div>
  )
}

export default FormInput