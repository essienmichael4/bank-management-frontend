import React, { useState,useEffect } from 'react'
import arrowleft from '../../assets/arrowleft.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'

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
    const [nextOfKing,setNextOfKing] = useState({
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
        accountStatus: "",
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
            !response.data[0]?.account ? accountNumber = "1000000000000" : accountNumber = response.data

            
            // setAccount({...account, account: response.data.account}) 
            // isMounted && setAccount(response.data) 
            
          }catch(err){
            console.log(err);
          }
  
          accountNumber = parseInt(accountNumber) + 1
        //   setAccount(...account, account.account = accountNumber) 
        setAccount({...account, account: accountNumber}) 
        }
  
        getAccountNumber()
  
        return ()=>{
          isMounted = false
          controller.abort()
        }
      },[])

    const handleSubmit = (e)=>{
        e.preventDefault()
        const newAccount = {
            ...account,
            work: work,
            family: family,
            nextOfKing: nextOfKing,
            address: address
        }

        console.log(newAccount);
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
                                <span className='text-xs text-gray-300'>Account Number</span>
                                <input type="text" onChange={(e)=> setAccount({...account, account: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' value={account.account}/>
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>First Name</span>
                                <input type="text" onChange={(e)=> setAccount({...account, firstname: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Last Name</span>
                                <input type="text" onChange={(e)=> setAccount({...account, lastname: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Other Names</span>
                                <input type="text" onChange={(e)=> setAccount({...account, othernames: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4 '>
                            <div className='flex flex-col gap-2 w-[74%] 2xl:w-[64.5%]'>
                                <span className='text-xs text-gray-300'>Email</span>
                                <input type="text" onChange={(e)=> setAccount({...account, email: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Phone</span>
                                <input type="text" onChange={(e)=> setAccount({...account, phone: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4'>
                        <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Ghana Card</span>
                                <input type="text" onChange={(e)=> setAccount({...account, card: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Date of Birth</span>
                                <input type="text" onChange={(e)=> setAccount({...account, dateOfBirth: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Gender</span>
                                <input type="text" onChange={(e)=> setAccount({...account, gender: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Registration Fee</span>
                                <input type="text" onChange={(e)=> setAccount({...account, registration: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <h4 className='font-bold'>Address</h4>
                        <div>
                            <div className='flex flex-wrap gap-8'>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Country</span>
                                    <input type="text" onChange={(e)=> setAddress({...address, country: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Region</span>
                                    <input type="text" onChange={(e)=> setAddress({...address, region: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>City</span>
                                    <input type="text" onChange={(e)=> setAddress({...address, city: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Home Town</span>
                                    <input type="text" onChange={(e)=> setAddress({...address, homeTown: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-8 my-4 '>
                                <div className='flex flex-col gap-2 w-[74%] 2xl:w-[64.5%]'>
                                    <span className='text-xs text-gray-300'>Residential Address</span>
                                    <input type="text" onChange={(e)=> setAddress({...address, residentialAddress: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Digital</span>
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
                                <span className='text-xs text-gray-300'>Occupation</span>
                                <input type="text" onChange={(e)=> setWork({...work, occupation: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Company</span>
                                <input type="text" onChange={(e)=> setWork({...work, company: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Employee Number <span>(if applicable)</span></span>
                                <input type="text" onChange={(e)=> setWork({...work, employeeId: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4 '>
                            <div className='flex flex-col gap-2 w-[74%] 2xl:w-[64.5%]'>
                                <span className='text-xs text-gray-300'>Location/Address</span>
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
                                    <span className='text-xs text-gray-300'>Marital Status</span>
                                    <input type="text" onChange={(e)=> setFamily({...family, maritalStatus: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Spouse Name</span>
                                    <input type="text" onChange={(e)=> setFamily({...family, spouseName: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>No. of Children</span>
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
                                    <span className='text-xs text-gray-300'>First Name</span>
                                    <input type="text" onChange={(e)=> setNextOfKing({...nextOfKing, firstname: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Last Name</span>
                                    <input type="text" onChange={(e)=> setNextOfKing({...nextOfKing, lastname: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Other Names</span>
                                    <input type="text" onChange={(e)=> setNextOfKing({...nextOfKing, othernames: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Relation</span>
                                    <input type="text" onChange={(e)=> setNextOfKing({...nextOfKing, relation: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-8 my-4 '>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Phone</span>
                                    <input type="text" onChange={(e)=> setNextOfKing({...nextOfKing, phone: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Occupation</span>
                                    <input type="text" onChange={(e)=> setNextOfKing({...nextOfKing, occupation: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-[44%]'>
                                    <span className='text-xs text-gray-300'>Residential Address</span>
                                    <input type="text" onChange={(e)=> setNextOfKing({...nextOfKing, residentialAddress: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
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