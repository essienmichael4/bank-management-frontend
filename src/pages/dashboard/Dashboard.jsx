import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import './dashboard.css'
import users from '../../assets/users.svg'
import Overview from '../../components/overview/Overview'
import moment from 'moment';
import DateRangePicker from '../../components/datepicker/DateRangePicker'
import TransactionChart from '../../components/transactionchart/TransactionChart';
import RevenueChart from '../../components/revenuechart/RevenueChart';
import { NavLink } from 'react-router-dom';

function Dashboard() {
  const [overview, setOverview] = useState([])
  const [dataBalance, setDataBalance] = useState([])
  const [dataLables, setDataLables] = useState([])
  const [transactions, setTransactions] = useState([])
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

  useEffect( ()=>{
    let isMounted = true
    const controller = new AbortController()

    const getOverview = async() => {
      try{
        const response = await axios.get("/overview/dashboard", {signal: controller.signal})
        console.log(response.data);
        setDataBalance(response.data.map((item)=> item.balance))
        setDataLables(response.data.map((item)=> item.tag))
        isMounted && setOverview(response.data)
      }catch(err){
        console.log(err);
      }
    }
    const getTransactions = async() => {
      try{
        const response = await axios.get("/transactions/dashboard", {signal: controller.signal})
        console.log(response.data);
        isMounted && setTransactions(response.data)
      }catch(err){
        console.log(err);
      }
    }

    getOverview()
    getTransactions()

    // axios.get("/overview/dashboard")
    //   .then(response=> { console.log(response.data);
    //     setOverview(response.data)})
    //   .catch(err=>console.log(err))


    return ()=>{
      isMounted = false
      controller.abort()
    }
  },[])

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
      <div className='flex my-4 py-4'>
        <h3 className='lg:hidden'>Dashboard </h3>
        <h4 className='font-bold'> Your Overview</h4>
      </div>
      <><Overview overviews={overview} /></>
      <div className=' flex items-center justify-between flex-wrap gap-2 mt-4 '>
        <div className='bg-white w-full lg:w-[10rem] 2xl:w-1/3 min-w-[320px] border border-gray-300 p-4 rounded-lg'>
          <div className='flex items-center justify-between py-2 mb-4'>
            <h5 className='m-0'>Revenue</h5>
          </div>
          <div className='w-full lg:h-[20rem] 2xl:h-[27rem] h-full'>
          <RevenueChart dataBalance={dataBalance} dataNames={dataLables}/>
          </div>
        </div>
        <div className='bg-white flex-1 min-w-[320px] border border-gray-300 p-4 rounded-lg'>
          <div className='flex flex-wrap items-center justify-between mb-4'>
            <h5 className='m-0'>Transaction Activities</h5>
            <div className='flex flex-wrap justify-end items-center gap-2'>
              <div className='flex flex-wrap bg-gray-200 p-1 rounded-lg'>
                {filters.fields.map((filter, key)=>(
                  <button key={key} 
                    className={`${filters.activeFilter.id === filter.id && 'active'} filter filter text-xs flex whitespace-no-wrap items-center justify-center py-1 px-2`}
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
      <div className='bg-white w-full border border-gray-300 px-4 pt-4 py-8 rounded-lg mt-4 mb-8 overflow-y-auto'>
        <div className='flex items-center justify-between py-2 mb-4'>
          <div className='flex items-center gap-2'>
            <h5 className='text-xl m-0'>Transactions</h5><span className='text-xs mt-2'>Last 20 transactions</span>
          </div>
          <NavLink to="../transactions" className='text-blue-500 py-1 px-4 border text-sm border-blue-500 rounded-full lg:text-light 2xl:py-2'>See All</NavLink>
        </div>
        <div className='min-w-[800px]'>
          <table className='w-full'>
            <thead className=' border-y border-gray-300'>
              <tr className=''>
                <th className='px-2 text-start text-xs py-4 text-gray-400 font-medium'>ID</th>
                <th className='text-start text-xs py-4 text-gray-400 font-medium'>Name</th>
                <th className='text-start text-xs py-4 text-gray-400 font-medium'>Amount</th>
                <th className='text-start text-xs py-4 text-gray-400 font-medium'>Date</th>
                <th className='text-start text-xs py-4 text-gray-400 font-medium'>Transaction Type</th>
                <th className='text-start text-xs py-4 text-gray-400 font-medium'>Transacted By</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full overflow-hidden'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
              <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                <td className='px-2 py-4 text-sm'>#1</td>
                <td className='py-4 text-sm flex items-center gap-2'>
                  <div className='p-2 border border-gray-200 rounded-full'>
                    <img className='w-4 h-4' src={users} alt="" />
                  </div>
                  <div>
                    <p className='-mb-1 font-medium'>Michae Essien</p>
                    <span className='-mt-2 text-xs text-gray-300'>essienmicahel.gmail.com</span>
                  </div>
                </td>
                <td className='py-4 text-sm'>¢ 100.00</td>
                <td className='py-4 text-sm'>12-06-2022</td>
                <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> Deposit </span> </td>
                <td className='py-4 text-sm'>Ghost Name</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Dashboard