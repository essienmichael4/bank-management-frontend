import React from 'react'
import revenue from './revenue.svg'

function Overview() {
  return (
    <div className='bg-white w-full flex flex-wrap gap-2 items-center justify-around border border-gray-300 rounded-lg'>
        <div className='p-4 2xl:p-6 bg-green-200 flex-1 rounded-lg m-2 flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <img src={revenue} className='w-8 h-8' alt="" />
                <h4 className='font-bold m-0'>Total Revenue</h4>
            </div>
            <div className='flex items-center gap-4'>
                <span className='text-3xl text-gray-500'>¢</span>
                <p className='text-[2rem] lg:text-[1.5rem] 2xl:text-[1.5rem] m-0'>240,000.00</p>
            </div>
        </div>
        <div className='p-4 2xl:p-6 flex flex-1 bg-blue-200 rounded-lg m-2 flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <img src={revenue} className='w-8 h-8' alt="" />
                <h4 className='font-bold m-0'>Total Revenue</h4>
            </div>
            <div className='flex items-center gap-4'>
                <span className='text-3xl text-gray-500'>¢</span>
                <p className='text-[2rem] lg:text-[1.5rem] 2xl:text-[1.5rem] m-0'>240,000.00</p>
            </div>
        </div>
        <div className='p-4 2xl:p-6 flex-1 bg-orange-200 rounded-lg m-2 flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <img src={revenue} className='w-8 h-8' alt="" />
                <h4 className='font-bold m-0'>Total Revenue</h4>
            </div>
            <div className='flex items-center gap-4'>
                <span className='text-3xl text-gray-500'>¢</span>
                <p className='text-[2rem] lg:text-[1.5rem] 2xl:text-[1.5rem] m-0'>240,000.00</p>
            </div>
        </div>
        <div className='p-4 2xl:p-6 flex-1 bg-red-200 rounded-lg m-2 flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <img src={revenue} className='w-8 h-8' alt="" />
                <h4 className='font-bold m-0'>Total Revenue</h4>
            </div>
            <div className='flex items-center gap-4'>
                <span className='text-3xl text-gray-500'>¢</span>
                <p className='text-[2rem] lg:text-[1.5rem] 2xl:text-[1.5rem] m-0'>240,000.00</p>
            </div>
        </div>
        <div className='p-4 2xl:p-6 flex-1 bg-gray-200 rounded-lg m-2 flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <img src={revenue} className='w-8 h-8' alt="" />
                <h4 className='font-bold m-0'>Total Revenue</h4>
            </div>
            <div className='flex items-center gap-4'>
                <span className='text-3xl text-gray-500'>¢</span>
                <p className='text-[2rem] lg:text-[1.5rem] 2xl:text-[1.5rem] m-0'>240,000.00</p>
            </div>
        </div>
    </div>
  )
}

export default Overview