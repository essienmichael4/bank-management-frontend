import React from 'react'
import revenue from '../../assets/revenue.svg'
import saving from '../../assets/saving.svg'
import loan from '../../assets/loan.svg'
import current from '../../assets/current.svg'
import interest from '../../assets/interest.svg'
import transaction from '../../assets/transaction.svg'


function Overview(props) {
  return (
    <div className='bg-white w-full flex flex-wrap gap-2 items-center justify-around border border-gray-300 rounded-lg'>
        {props?.overviews.map((overview, i)=>{
            return (
                <div key={i} 
                className={`
                    ${overview.tag==="revenue" && 'bg-blue-200'}  
                    ${overview.tag==="savings" && 'bg-green-200'} 
                    ${overview.tag==="loans" && 'bg-red-200'} 
                    ${overview.tag==="transactions" && 'bg-voilet-200'}
                    ${overview.tag==="interest" && 'bg-yellow-200'}
                    ${overview.tag==="current" && 'bg-gray-200'} min-w-[150px] p-4 2xl:p-6  flex-1 rounded-lg m-2 flex flex-col gap-4`}>
                    <div className='flex items-center gap-4'>
                        <img src={
                            overview.tag==="revenue" && revenue || 
                            overview.tag==="savings" && saving || 
                            overview.tag==="loans" && loan ||
                            overview.tag==="transactions" && transaction ||
                            overview.tag==="interest" && interest ||
                            overview.tag==="current" && current
                            } className='w-8 h-8' alt="" />
                        <h4 className='text-sm font-bold m-0'>{overview.title}</h4>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                        <span className='text-3xl text-gray-500'>¢</span>
                        <p className='text-[2rem] lg:text-[1.5rem] 2xl:text-[1.5rem] m-0'>{overview.balance}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Overview