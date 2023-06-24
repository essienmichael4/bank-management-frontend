import React, { useState } from 'react'
import './dashboard.css'
import Overview from '../../components/overview/Overview'
import moment from 'moment';
import DateRangePicker from '../../components/datepicker/DateRangePicker'
import TransactionChart from '../../components/transactionchart/TransactionChart';
import RevenueChart from '../../components/revenuechart/RevenueChart';
import { NavLink } from 'react-router-dom';

function Dashboard() {
  const [dates, setDates] = useState([])
  const[filters, setFilters] = useState({
    activeFilter:{id:"day", name:"Today"},
    fields: [
      {id:"day", name:"Today"},
      {id:"week", name:"This week"},
      {id:"month", name:"This month"},
      {id:"year", name:"This year"}
    ]
  })

  const handleFilterChange = (key)=> {
    setFilters({...filters, activeFilter: filters.fields[key]})
  }

  const handleDateChange = (values) =>{
    setDates(values.map((val)=>{
      return moment(val).format('DD-MM-YYYY')
    }))
  }

  return (
    <>
      <div className='flex mb-4 py-4'>
        <h3 className='lg:hidden'>Dashboard </h3>
        <h4 className='font-bold'> Your Overview</h4>
      </div>
      <><Overview /></>
      <div className='flex items-center justify-between flex-wrap gap-2 mt-4 '>
        <div className='w-full lg:w-[10rem] 2xl:w-1/3 min-w-[320px] border border-gray-300 p-4 rounded-lg'>
          <div className='flex items-center justify-between py-2 mb-4'>
            <h5 className='m-0'>Revenue</h5>
          </div>
          <div className='w-full lg:h-[20rem] 2xl:h-[27rem] h-full'>
            <RevenueChart />
          </div>
        </div>
        <div className='flex-1 min-w-[320px] border border-gray-300 p-4 rounded-lg'>
          <div className='flex flex-wrap items-center justify-between mb-4'>
            <h5 className='m-0'>Transaction Activities</h5>
            <div className='flex flex-wrap justify-end items-center gap-2'>
              <div className='flex flex-wrap bg-gray-200 p-1 rounded-lg'>
                {filters.fields.map((filter, key)=>(
                  <button key={key} 
                    className={`${filters.activeFilter.id === filter.id && 'active'} filter text-sm flex whitespace-no-wrap items-center justify-center py-1 px-2`}
                    onClick={()=>{
                      handleFilterChange(key)
                    }}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
              <DateRangePicker handleDateChange={handleDateChange} />
            </div>
          </div>
          <div className='w-full lg:h-[20rem] 2xl:h-[27rem] pt-4 overflow-x-auto 2xl:overflow-hidden'>
            <TransactionChart />
          </div>
        </div>
      </div>
      <div className='w-full border border-gray-300 px-4 pt-4 py-8 rounded-lg mt-4'>
        <div className='flex items-center justify-between py-2 mb-4'>
          <div className='flex items-center gap-2'>
            <h5 className='text-xl m-0'>Transactions</h5><span className='text-xs mt-2'>Last 20 transactions</span>
          </div>
          <NavLink to="../transactions">See All</NavLink>
        </div>
        <div>
          <table className='w-full'>
            <thead className=' border-y border-gray-300'>
              <tr className=''>
                <th className='text-start py-4 text-gray-500 font-light'>ID</th>
                <th className='text-start py-4 text-gray-500 font-light'>Name</th>
                <th className='text-start py-4 text-gray-500 font-light'>Amount</th>
                <th className='text-start py-4 text-gray-500 font-light'>Date</th>
                <th className='text-start py-4 text-gray-500 font-light'>Transaction Type</th>
                <th className='text-start py-4 text-gray-500 font-light'>Transacted By</th>
              </tr>
            </thead>
            <tbody>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
              <tr className='py-6 border-b border-gray-100'>
                <td className='py-6'>#1</td>
                <td className='py-6'>Michae Essien</td>
                <td className='py-6'>¢ 100.00</td>
                <td className='py-6'>12-06-2022</td>
                <td className='py-6'>Deposit</td>
                <td className='py-6'>Ghost Name</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Dashboard