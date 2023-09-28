import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
// import users from '../../assets/users.svg'
import arrowleft from '../../assets/arrowleft.svg'
import close from '../../assets/close.svg'
import './profile.css'
import useAuth from '../../hooks/useAuth'
import useAxios from '../../hooks/useAxios'
import AdminPasswordUpdate from '../../components/adminPasswordUpdate/AdminPasswordUpdate';
import UserPasswordUpdate from '../../components/userPasswordUpdate/UserPasswordUpdate';

function Profile() {
  const {auth} = useAuth()
  const navigate = useNavigate()
  const {id} =useParams()
  const axiosPrivateNew = useAxios()
  const [showModal, setShowModal] = useState(false)
  const [user, setUser]= useState([])

  useEffect( ()=>{
    let isMounted = true
    const controller = new AbortController()

    const getUser = async() => {
      try{
        console.log(id);
        const response = await axiosPrivateNew.get(`/users/${id}`, {signal: controller.signal})
        console.log(response.data);
        
        isMounted && setUser(response.data)
        
      }catch(err){
        console.log(err);
        if(err.response){
          toast.error(err.response.data.error)
        }
      }
    }

    getUser()

    return ()=>{
      isMounted = false
      controller.abort()
    }
  },[])

  const getUser = async() => {
    try{
      const response = await axiosPrivateNew.get(`/users/${id}`)      
      setUser(response.data)
      
    }catch(err){
      console.log(err);
      if(err.response){
        toast.error(err.response.data.error)
      }
    }
  }

  const handleShowModal = ()=>{
    setShowModal(!showModal)
  }

  const handleDisableAccount = async () => {
    try{
      const response = await axiosPrivateNew.put(`/user/disable/${user?.id}`)
      toast.success(response.data.message)
      getUser()
    }catch(err){
      console.log(err);
      if(err.response){
        toast.error(err.response.data.error)
      }
    }
  }

  const handleEnableAccount = async () => {
    try{
      const response = await axiosPrivateNew.put(`/user/activate/${user?.id}`)
      toast.success(response.data.message)
      getUser()
    }catch(err){
      console.log(err);
      if(err.response){
        toast.error(err.response.data.error)
      }
    }
  }

  return (
    <div className='pb-4'>
      
      <div className='flex justify-between items-center my-4'>
        <div className='flex items-center gap-8'>
          <button className='p-2 bg-blue-100 flex items-center justify-center rounded-lg' onClick={()=>{navigate(-1)}}>
              <img src={arrowleft} alt="" className='w-4 h-4'/>
            </button>
          <h4 className='m-0 font-bold '>Users</h4>
        </div>
        <div className='flex gap-2'>
          {auth?.user?.role !== "USER" && <div className='flex gap-2'>
              {
                user?.status == "ACTIVE" &&
                <button onClick={handleDisableAccount} className='bg-yellow-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' >Disable Account</button>
              }
              {
                user?.status == "DISABLED" &&
                <button onClick={handleEnableAccount} className='bg-green-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' >Enable Account</button>
              }
              </div>
          }
          <button onClick={handleShowModal} className='text-red-500 p-1 border text-sm border-red-500 rounded lg:text-light 2xl:p-2 2xl:rounded-lg'>Change Password</button>
        </div>
      </div>
      <div className='bg-white my-4 border border-gray-300 rounded-lg h-full relative'>
          <div className='image__bg w-full h-28 bg-gray-200 rounded-lg'></div>
            <div className='pt-8 px-4'>
                <div className='absolute w-28 h-28 rounded-full bg-white border border-gray-200 top-2 left-4'></div>
                <h3>{user?.firstname} {user?.lastname} {user?.othernames}</h3>
                <div className='border-t border-gray-200 pt-4'>
                  <h4 className='font-bold'>User Details</h4>
                  <div className='flex gap-8 flex-wrap'>
                    <div>
                        <span className='text-xs text-gray-300'>Employee Username</span>
                        <p>{user?.username}</p>
                    </div>
                    <div>
                        <span className='text-xs text-gray-300'>Employee Number</span>
                        <p>{user?.employeeId}</p>
                    </div>
                    <div>
                        <span className='text-xs text-gray-300'>Email</span>
                        <p>{user?.email}</p>
                    </div>
                    <div>
                        <span className='text-xs text-gray-300'>Phone</span>
                        <p>{user?.phone ? user?.phone : "-" }</p>
                    </div>
                  </div>
                </div>
                <div className='border-t border-gray-200 pt-4'>
                  <h4 className='font-bold'>User Office Information</h4>
                  <div className='flex gap-8 flex-wrap'>
                    <div>
                        <span className='text-xs text-gray-300'>Department</span>
                        <p>{user?.departments?.length !== 0 && user?.departments?.map(department => { return <>{department?.office}</>} )}</p>
                    </div>
                  </div>
                </div>
                <div className='border-t border-gray-200 pt-4'>
                  <h4 className='font-bold'>User Account Information</h4>
                  <div className='flex gap-8 flex-wrap'>
                    <div>
                        <span className='text-xs text-gray-300'>Day Created</span>
                        <p>{user?.createdAt}</p>
                    </div>
                    <div>
                        <span className='text-xs text-gray-300'>last Updated</span>
                        <p>{user?.updatedAt}</p>
                    </div>
                  </div>
                </div>
                
            </div>
        </div>

        {user.id !== auth.user.id && user.role !== "SUPERADMIN" && auth.user.role == "ADMIN" && <AdminPasswordUpdate client={user} showModal={showModal} handleShowModal={handleShowModal} />}
        {user.id !== auth.user.id  && auth.user.role == "SUPERADMIN" && <AdminPasswordUpdate client={user} showModal={+showModal} handleShowModal={handleShowModal} />}
        {user.id == auth.user.id && <UserPasswordUpdate showModal={showModal} client={user} handleShowModal={handleShowModal} />}
    </div>
  )
}

export default Profile