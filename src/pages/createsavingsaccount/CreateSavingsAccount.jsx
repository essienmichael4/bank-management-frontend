import React, { useState,useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import arrowleft from '../../assets/arrowleft.svg'
import useAxios from '../../hooks/useAxios'
import "./createsavingsaccount.css"

const CreateSavingsAccount = () => {
    const navigate = useNavigate()
    const axiosPrivateNew = useAxios()
    let accountNumber = ""
    const [work,setWork] = useState({
        employeeId: "",
        occupation: "",
        company: "",
        location: ""
    }) 
    const [address,setAddress] = useState({
        residentialAddress: "",
        homeTown: "",
        city: "",
        region: "",
        country: "",
        nationality: "",
        digital: ""
    })
    const [family, setFamily] = useState({
        maritalStatus: "",
        spouseName: "",
        noOfChildren: ""
    })
    const [nextOfKin,setNextOfKin] = useState({
        firstname: "",
        lastname: "",
        othernames: "",
        relation: "",
        phone: "",
        occupation: "",
        residentialAddress: ""
    })
    const [account, setAccount] = useState({
        account: "",
        email: "",
        phone: "",
        firstname: "",
        lastname: "",
        othernames: "",
        dateOfBirth: "",
        registration: "",
        accountStatus: "ACTIVE",
        gender: "",
        card: "",
    })

    useEffect( ()=>{
        let isMounted = true
        const controller = new AbortController()
    
        const getAccountNumber = async() => {
          try{
            const response = await axiosPrivateNew.get(`/saving/accounts/number`, {signal: controller.signal})
            console.log(response.data);
            !response.data[0]?.account ? accountNumber = "1000000000000" : accountNumber = response.data[0].account
            
          }catch(err){
            console.log(err);
          }
  
          accountNumber = parseInt(accountNumber) + 1
          setAccount({...account, account: accountNumber.toString()}) 
        }
  
        getAccountNumber()
  
        return ()=>{
          isMounted = false
          controller.abort()
        }
      },[])

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const newAccount = {
            ...account,
            work: work,
            family: family,
            nextOfKin: nextOfKin,
            address: address
        }

        try{
            const response = await axiosPrivateNew.post("/saving/account",
             JSON.stringify(newAccount)
            );
            console.log(response.data);
            setWork({
                employeeId: "",
                occupation: "",
                company: "",
                location: ""
            }) 
            setAddress({
                residentialAddress: "",
                homeTown: "",
                city: "",
                region: "",
                country: "",
                nationality: "",
                digital: ""
            })
            setFamily({
                maritalStatus: "",
                spouseName: "",
                noOfChildren: ""
            })
            setNextOfKin({
                firstname: "",
                lastname: "",
                othernames: "",
                relation: "",
                phone: "",
                occupation: "",
                residentialAddress: ""
            })
            setAccount({
                account: "",
                email: "",
                phone: "",
                firstname: "",
                lastname: "",
                othernames: "",
                dateOfBirth: "",
                registration: "",
                accountStatus: "",
                gender: "",
                card: "",
            })
            toast.error("Account Created Successfully")
            navigate("../savings")
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
        <div className='flex flex-col items-center md:items-start md:flex-row relative md:gap-4'>
          
          <div className={` py-4 transition w-full `}>
            <div className='flex justify-between items-center pb-4'>
              <div className='flex items-center gap-4'>
                <button className='p-2 bg-blue-100 flex items-center justify-center rounded-lg' onClick={()=>{navigate(-1)}}>
                    <img src={arrowleft} alt="" className='w-4 h-4'/>
                  </button>
                <h4 className='m-0 font-bold '>Create Saving Account</h4>
              </div>
            </div>
            <div className='bg-white my-4 border border-gray-300 rounded-lg h-full relative'>
                <form className='pt-4 px-4' onSubmit={handleSubmit}>
                    <h3 className=''>Personal Information</h3>
                    <div>
                        <div className='flex flex-wrap gap-8'>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Account Number <span className='text-red-500'>*</span></label>
                                <input type="text" required onChange={(e)=> setAccount({...account, account: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' value={account.account}/>
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>First Name <span className='text-red-500'>*</span></label>
                                <input type="text" minLength={3} required onChange={(e)=> setAccount({...account, firstname: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Last Name <span className='text-red-500'>*</span></label>
                                <input type="text" required onChange={(e)=> setAccount({...account, lastname: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Other Names</label>
                                <input type="text" onChange={(e)=> setAccount({...account, othernames: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4 '>
                            <div className='flex flex-col gap-2 w-[74%] 2xl:w-[64.5%]'>
                                <label className='text-xs text-gray-500'>Email <span className='text-red-500'>*</span></label>
                                <input type="text" required onChange={(e)=> setAccount({...account, email: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Phone <span className='text-red-500'>*</span></label>
                                <input type="text" onChange={(e)=> setAccount({...account, phone: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4'>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Ghana Card</label>
                                <input type="text" onChange={(e)=> setAccount({...account, card: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Date of Birth <span className='text-red-500'>*</span></label>
                                <input type="date" required onChange={(e)=> setAccount({...account, dateOfBirth: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Gender <span className='text-red-500'>*</span></label>
                                <input type="text" required onChange={(e)=> setAccount({...account, gender: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Registration Fee</label>
                                <input type="text" onChange={(e)=> setAccount({...account, registration: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <h4 className='font-bold'>Address</h4>
                        <div>
                            <div className='flex flex-wrap gap-8'>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Country <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setAddress({...address, country: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Region <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setAddress({...address, region: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>City <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setAddress({...address, city: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Home Town <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setAddress({...address, homeTown: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-8 my-4 '>
                                <div className='flex flex-col gap-2 w-[74%] 2xl:w-[64.5%]'>
                                    <label className='text-xs text-gray-500'>Residential Address <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setAddress({...address, residentialAddress: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Digital</label>
                                    <input type="text" onChange={(e)=> setAddress({...address, digital: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <h4 className='font-bold'>Work Information</h4>
                        <div>
                            <div className='flex flex-wrap gap-8'>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Occupation <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setWork({...work, occupation: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Company</label>
                                    <input type="text" onChange={(e)=> setWork({...work, company: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Employee Number <label>(if applicable)</label></label>
                                    <input type="text" onChange={(e)=> setWork({...work, employeeId: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-8 my-4 '>
                                <div className='flex flex-col gap-2 w-[74%] 2xl:w-[64.5%]'>
                                    <label className='text-xs text-gray-500'>Location/Address </label>
                                    <input type="text" onChange={(e)=> setWork({...work, location: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <h4 className='font-bold'>Family Details</h4>
                        <div>
                            <div className='flex flex-wrap gap-8 mb-4'>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Marital Status <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setFamily({...family, maritalStatus: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Spouse Name</label>
                                    <input type="text" onChange={(e)=> setFamily({...family, spouseName: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>No. of Children</label>
                                    <input type="text" onChange={(e)=> setFamily({...family, noOfChildren: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <h4 className='font-bold'>Next of Kin</h4>
                        <div>
                            <div className='flex flex-wrap gap-8'>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>First Name <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setNextOfKin({...nextOfKin, firstname: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Last Name <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setNextOfKin({...nextOfKin, lastname: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Other Names </label>
                                    <input type="text" onChange={(e)=> setNextOfKin({...nextOfKin, othernames: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Relation <span className='text-red-500'>*</span></label>
                                    <input type="text" required list='relation' onChange={(e)=> setNextOfKin({...nextOfKin, relation: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                            <datalist id='relation'>
                                <option>Father</option>
                                <option>Mother</option>
                                <option>Son</option>
                                <option>Daugther</option>
                                <option>Brother</option>
                                <option>Sister</option>
                                <option>Sibling</option>
                                <option>Nephew</option>
                                <option>Niece</option>
                                <option>Cousin</option>
                                <option>Guardian</option>
                            </datalist>
                            <div className='flex flex-wrap gap-8 my-4 '>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Phone <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setNextOfKin({...nextOfKin, phone: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Occupation <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setNextOfKin({...nextOfKin, occupation: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-[44%]'>
                                    <label className='text-xs text-gray-500'>Residential Address <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setNextOfKin({...nextOfKin, residentialAddress: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <button className='mb-8 mt-4 w-1/4 bg-blue-300 py-2 rounded-full text-white'>Create Account</button>
                </form>
            </div>
          </div>
        </div>
        // <div>SavingsAccount</div>
      )
}

export default CreateSavingsAccount