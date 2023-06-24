import React from 'react'
import revenue from './revenue.svg'

function Overview() {
  return (
    <div className='w-full flex flex-wrap items-center justify-between border border-gray-300 rounded-lg'>
        <div className='p-6 flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <img src={revenue} className='w-8 h-8' alt="" />
                <h4 className='font-bold m-0'>Total Revenue</h4>
            </div>
            <div className='flex items-center gap-4'>
                <span className='text-3xl text-gray-500'>¢</span>
                <p className='text-[2rem] m-0'>240,000.00</p>
            </div>
        </div>
        <div className='p-6 flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <img src={revenue} className='w-8 h-8' alt="" />
                <h4 className='font-bold m-0'>Total Revenue</h4>
            </div>
            <div className='flex items-center gap-4'>
                <span className='text-3xl text-gray-500'>¢</span>
                <p className='text-[2rem] m-0'>240,000.00</p>
            </div>
        </div>
        <div className='p-6 flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <img src={revenue} className='w-8 h-8' alt="" />
                <h4 className='font-bold m-0'>Total Revenue</h4>
            </div>
            <div className='flex items-center gap-4'>
                <span className='text-3xl text-gray-500'>¢</span>
                <p className='text-[2rem] m-0'>240,000.00</p>
            </div>
        </div>
        <div className='p-6 flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <img src={revenue} className='w-8 h-8' alt="" />
                <h4 className='font-bold m-0'>Total Revenue</h4>
            </div>
            <div className='flex items-center gap-4'>
                <span className='text-3xl text-gray-500'>¢</span>
                <p className='text-[2rem] m-0'>240,000.00</p>
            </div>
        </div>
        <div className='p-6 flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <img src={revenue} className='w-8 h-8' alt="" />
                <h4 className='font-bold m-0'>Total Revenue</h4>
            </div>
            <div className='flex items-center gap-4'>
                <span className='text-3xl text-gray-500'>¢</span>
                <p className='text-[2rem] m-0'>240,000.00</p>
            </div>
        </div>
    </div>
  )
}

export default Overview