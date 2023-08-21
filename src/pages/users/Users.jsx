import React, { useState, useEffect } from 'react'
// import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import users from '../../assets/users.svg'
import close from '../../assets/close.svg'
import './users.css'
import axios from '../../api/axios'
import useAxios from '../../hooks/useAxios'

function Users() {

  const axiosPrivateNew = useAxios()
  const [showModal, setShowModal] = useState(false)
  const [users, setUsers]= useState([])
  const [department, setDepartment] = useState({
    office: "",
    state: "ACTIVE"
  })
  const [departments, setDepartments] = useState([])
  const [confirmPassword, setConfirmPassword] = useState("")
  const [newUser, setNewUser] = useState({
    email: "",
    phone: "",
    firstName: "",
    employeeId: "",
    lastName: "",
    otherNames: "",
    username: "",
    role: "USER",
    password: "",
    status: "ACTIVE"
  })

  const getAllDepartments = async() => {
      const response = await axios.get(`/departments`)
      console.log(response.data);
      
      setDepartments(response.data)
  }

  useEffect( ()=>{
    let isMounted = true
    const controller = new AbortController()

    const getUsers = async() => {
      try{
        const response = await axiosPrivateNew.get(`/users`, {signal: controller.signal})
        console.log(response.data);
        
        isMounted && setUsers(response.data)
        
      }catch(err){
        console.log(err);
        if(err.response){
          toast.error(err.response.data.error)
        }
      }
    }

    const getDepartments = async() => {
      try{
        const response = await axios.get(`/departments`, {signal: controller.signal})
        console.log(response.data);
        
        isMounted && setDepartments(response.data)
        
      }catch(err){
        console.log(err);
        if(err.response){
          toast.error(err.response.data.error)
        }
      }
    }

    getUsers()
    getDepartments()

    return ()=>{
      isMounted = false
      controller.abort()
    }
  },[])

  const handleShowModal = ()=>{
    setShowModal(!showModal)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(newUser.password !== confirmPassword){
      setConfirmPassword("")
      setNewUser({...newUser, password:""})
      toast.error("Passwords do not match")
    }

    const user = {
      ...newUser,
      departments: [department]
    }

    try{
      const response = await axiosPrivateNew.post("/user",
       JSON.stringify(user)
      );
      console.log(response.data);

      setNewUser({
        email: "",
        phone: "",
        firstName: "",
        employeeId: "",
        lastName: "",
        otherNames: "",
        username: "",
        role: "USER",
        password: "",
        status: "ACTIVE"
      })

      setDepartment({
        office: "",
        state: "ACTIVE"
      })

      getAllDepartments()
      toast.success(response.data.message)

      
    }catch(err){
      console.log(err);
      if(!err.response){
        toast.error("Server not found")
      }else{
        toast.error(err.response.data.error)
      }
    }
    
    console.log(user);
  }

  return (
    <div className='pb-4'>
      
      <div className='flex justify-between items-center my-4'>
          <div className='flex items-center gap-8'>
            <h4 className='m-0 font-bold '>Users</h4>
          </div>

          <button onClick={handleShowModal} className='text-blue-500 p-1 border text-sm border-blue-500 rounded lg:text-light 2xl:p-2 2xl:rounded-lg'>Add New User</button>
        </div>
      <div className='bg-white w-full border border-gray-300 px-4 pt-4 py-8 rounded-lg mt-4  mb-8 overflow-y-auto'>
          <div className='flex items-center justify-between py-2 mb-4'>
            <div className='flex items-center gap-2'>
              <h5 className='text-xl m-0'>Users</h5><span className='text-xs text-gray-300 mt-2'>accounts found</span>
            </div>
            <div className='flex items-center gap-2'>
              
            </div>
          </div>
          <div className='min-w-[800px]'>
            {users.length == 0 ?
              <div>No Transactions found</div>
            :
              <table className='w-full'>
                <thead className=' border-y border-gray-300'>
                  <tr className=''>
                    <th className='px-2 text-start text-xs py-4 text-gray-400 font-medium'>ID</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Account Name</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Department</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Phone</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return(
                      <tr  className='py-6 border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                        <td className='px-2 py-6 text-sm'>#{user.employeeId}</td>
                        <td className='py-4 text-sm flex items-center gap-2'>
                        <div className='p-2 border border-gray-200 rounded-full overflow-hidden'>
                          <img className='w-4 h-4' src={users} alt="" />
                        </div>
                        <div>
                          <p className='-mb-1 font-medium'>{user?.firstname} {user?.lastname} {user?.othernames}</p>
                          <span className='-mt-2 text-xs text-gray-300'>{user?.email}</span>
                        </div>
                      </td>
                        <td className='py-6 text-sm'>
                          {user?.departments?.map(department=> <span>{department.office}</span>)}
                          </td>
                        <td className='py-6 text-sm'>{user?.phone}</td>
                        <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> {user.status} </span> </td>
                      </tr>
                    )
                  })}
                  </tbody>
              </table>
            }
          </div>
        </div>
        <div className={`${showModal && 'active'} modal `}>
          <div className='bg-white w-[400px] md:w-[700px] rounded-lg overflow-hidden'>
            <div className='flex items-center justify-between bg-black px-4 py-4'>
              <h5 className='text-white text-xl m-0'>Add User</h5>
              <button onClick={handleShowModal} className='p-1 '>
                <img className='w-4 h-4 bg-white' src={close} alt="" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className='flex gap-4 flex-wrap p-2 md:p-4 md:gap-4'>
              <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                <label htmlFor="" >Firstname</label>
                <input 
                  className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                  placeholder='Firstname' 
                  type="text" 
                  value={newUser.firstname}
                  onChange={e=>{setNewUser({...newUser, firstName:e.target.value})}}/>
              </div>
              <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                <label htmlFor="" >Lastname</label>
                <input 
                  className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                  placeholder='Lastname' 
                  type="text" 
                  value={newUser.lastname}
                  onChange={e=>{setNewUser({...newUser, lastName:e.target.value})}}/>
              </div>
              <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                <label htmlFor="" >Other names</label>
                <input 
                  className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                  placeholder='Other names' 
                  type="text"
                  value={newUser.othernames}
                  onChange={e=>{setNewUser({...newUser, otherNames:e.target.value})}}/>
              </div>
              <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                <label htmlFor="" >Email</label>
                <input 
                  className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                  placeholder='Email' 
                  type="text" 
                  value={newUser.email}
                  onChange={e=>{setNewUser({...newUser, email:e.target.value})}}/>
              </div>
              <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                <label htmlFor="" >Username</label>
                <input 
                  className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                  placeholder='Username' 
                  type="text" 
                  value={newUser.username}
                  onChange={e=>{setNewUser({...newUser, username:e.target.value})}}/>
              </div>
              <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                <label htmlFor="" >Employee ID</label>
                <input 
                  className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                  placeholder='Employee ID' 
                  type="text" 
                  value={newUser.employeeId}
                  onChange={e=>{setNewUser({...newUser, employeeId:e.target.value})}}/>
              </div>
              <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                <label htmlFor="" >Phone</label>
                <input 
                  className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                  placeholder='Phone' 
                  type="text" 
                  value={newUser.phone}
                  onChange={e=>{setNewUser({...newUser, phone:e.target.value})}}/>
              </div>
              <div className='hidden md:flex'></div>
              <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                <label htmlFor="" >Role</label>
                <select name="" className='rounded border border-gray-200 p-2' id=""
                  value={newUser.role}
                  onChange={e=>{setNewUser({...newUser, role:e.target.value})}}>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPERADMIN">Super Admin</option>
                </select>
              </div>
              <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                <datalist id='dept'>
                  {departments.map(department => {
                      return (<option>{department.office}</option>)
                  })}
                </datalist>
                <label htmlFor="" >Department</label>
                <input 
                  className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                  placeholder='Department' 
                  type="text" 
                  list='dept'
                  value={department.office}
                  onChange={e=>{setDepartment({...department, office:e.target.value})}}/>
              </div>
              
              <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                <label htmlFor="" >Password</label>
                <input 
                  className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                  placeholder='Password' 
                  type="text" 
                  value={newUser.password}
                  onChange={e=>{setNewUser({...newUser, password:e.target.value})}}/>
              </div>
              <div className='flex flex-col gap-2 w-full md:w-[320px]'>
                <label htmlFor="" >Confirm Password</label>
                <input 
                  className='py-2 px-2 text-sm rounded border border-slate-200 w-full' 
                  placeholder='Confirm Password' 
                  type="text" 
                  value={confirmPassword}
                  onChange={e=>{setConfirmPassword(e.target.value)}}/>
              </div>
              <button className='w-full bg-gray-500 text-white rounded-lg py-4 hover:bg-black'> Add User </button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Users