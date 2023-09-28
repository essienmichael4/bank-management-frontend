import React, {useState} from 'react'
import { toast } from 'react-toastify';
import './userPasswordUpdate.css'
import close from '../../assets/close.svg'
import useAxios from '../../hooks/useAxios'

const UserPasswordUpdate = (props) => {

    const axiosPrivateNew = useAxios()
    const [user, setUser] = useState({
        id: props.client.id.toString(),
        email: props.client.email,
        previousPassword: "",
        password: "",
        repeatPassword: ""
    }) 

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(user.password !== user.repeatPassword){
            toast.error("Passwords do not match")
        }

        console.log(user);
        try{
            const response = await axiosPrivateNew.post(`/user/change-password`, JSON.stringify(user))
            toast.success(response.data.message)
          }catch(err){
            console.log(err);
            if(err.response){
              toast.error(err.response.data.error)
            }
          }

    }

  return (
    <>
        <div className={`${props.showModal && 'active'} modal `}>
            <div className='bg-white w-[400px] md:w-[700px] rounded-lg overflow-hidden'>
                <div className='flex items-center justify-between bg-blue-500 px-4 py-4'>
                    <h5 className='text-white text-xl m-0'>Edit Password {props.showModal}</h5>
                    <button className='p-1 ' onClick={()=> props.handleShowModal()}>
                        <img  className='w-4 h-4 bg-white' src={close} alt="" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='flex gap-4 flex-wrap p-2 md:p-4 md:gap-4'>
                    <div className='flex flex-col gap-2 w-full md:w-full'>
                        <label htmlFor="" >Old Password</label>
                        <input 
                        className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                        placeholder='Old Password' 
                        type="password" 
                          value={user.previousPassword}
                          onChange={e=>{setUser({...user, previousPassword:e.target.value})}}
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                        <label htmlFor="" >New Password</label>
                        <input 
                        className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                        placeholder='Password' 
                        type="password" 
                          value={user.password}
                          onChange={e=>{setUser({...user, password:e.target.value})}}
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                        <label htmlFor="" >Confirm New Password</label>
                        <input 
                        className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                        placeholder='Confirm password' 
                        type="password" 
                         value={user.repeatPassword}
                          onChange={e=>{setUser({...user, repeatPassword:e.target.value})}}
                        />
                    </div>
                    <button className='w-full bg-red-300 text-white rounded-lg py-4 hover:bg-red-500'> Change Password </button>
                </form>
            </div>
        </div>
    </>
  )
}

export default UserPasswordUpdate