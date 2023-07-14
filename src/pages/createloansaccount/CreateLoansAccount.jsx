import React from 'react'
import arrowleft from './arrowleft.svg'

const CreateLoansAccount = () => {
    return (
        <div className='flex flex-col items-center md:items-start md:flex-row relative md:gap-4'>
          
          <div className={` py-4 transition w-full `}>
            <div className='flex justify-between items-center pb-4'>
              <div className='flex items-center gap-4'>
                <button className='p-2 bg-blue-100 flex items-center justify-center rounded-lg'>
                    <img src={arrowleft} alt="" className='w-4 h-4'/>
                  </button>
                <h4 className='m-0 font-bold '>Apply for Loan</h4>
              </div>
            </div>
            <div className='bg-white my-4 border border-gray-300 rounded-lg h-full relative'>
                <form className='pt-4 px-4'>
                    <h3 className=''>Personal Information</h3>
                    <div>
                        <div className='flex flex-wrap gap-8'>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Account Number</span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>First Name</span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Last Name</span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Other Names</span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4 '>
                            <div className='flex flex-col gap-2 w-[74%] 2xl:w-[64.5%]'>
                                <span className='text-xs text-gray-300'>Email</span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Phone</span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4'>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Date of Birth</span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Gender</span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Registration Fee</span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4'>
                            <div className='flex flex-col gap-2 w-full 2xl:w-[87%]'>
                                <span className='text-xs text-gray-300'>Purpose</span>
                                <textarea className='py-1 px-2 text-sm rounded border border-slate-200 w-full' ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <h4 className='font-bold'>Address</h4>
                        <div>
                            <div className='flex flex-wrap gap-8'>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Country</span>
                                    <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Region</span>
                                    <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>City</span>
                                    <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Home Town</span>
                                    <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-8 my-4 '>
                                <div className='flex flex-col gap-2 w-[74%] 2xl:w-[64.5%]'>
                                    <span className='text-xs text-gray-300'>Residential Address</span>
                                    <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Digital</span>
                                    <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
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
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Company</span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Employee Number <span>(if applicable)</span></span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4 '>
                            <div className='flex flex-col gap-2 w-[74%] 2xl:w-[64.5%]'>
                                <span className='text-xs text-gray-300'>Location/Address</span>
                                <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <h4 className='font-bold'>Guarantor Information</h4>
                        <div>
                            <div className='flex flex-wrap gap-8 mb-4'>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Guarantors Name or Account</span>
                                    <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Amount Guaranteed</span>
                                    <input type="text" className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button className='mb-8 mt-4 w-1/4 bg-blue-300 py-2 rounded-full text-white'>Create Account</button>
                </form>
            </div>
          </div>
        </div>
      )
}

export default CreateLoansAccount