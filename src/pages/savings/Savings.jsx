import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Overview from '../../components/overview/Overview'
import users from '../../assets/users.svg'
import refresh from '../../assets/refresh.svg'
import search from '../../assets/search.svg'
import close from '../../assets/close.svg'
import useAxios from '../../hooks/useAxios'
import axios from '../../api/axios'

function Savings() {
  const [showTransaction, setShowTransaction] = useState(false)
  const [overview, setOverview] = useState([])
  const [accounts,setAccounts] = useState([])
  const [countAccount, setCountAccount] = useState()
  const axiosPrivateNew = useAxios()

  useEffect( ()=>{
    let isMounted = true
    const controller = new AbortController()

    const getOverview = async() => {
      try{
        const response = await axios.get("/overview/savings", {signal: controller.signal})
        console.log(response.data);
        isMounted && setOverview(response.data)
      }catch(err){
        console.log(err);
      }
    }

    const getAccounts = async() => {
      try{
        const response = await axiosPrivateNew.get("/saving/accounts", {signal: controller.signal})
        console.log(response.data);
        console.log(response.data.count._count.id)
        setCountAccount(response.data.count._count.id)
        isMounted && setAccounts(response.data.accounts) 
      }catch(err){
        console.log(err);
      }
    }

    getOverview()
    getAccounts()


    return ()=>{
      isMounted = false
      controller.abort()
    }
  },[])

  function handleShowTransaction(){
    setShowTransaction(!showTransaction)
  }


  return (
    <div className='flex flex-col items-center md:items-start md:flex-row relative md:gap-4'>
      <div className={`${!showTransaction && 'hidden'} w-full md:w-[450px] transition md:relative bg-white mt-4 rounded-lg border border-gray-300`}>
        <div className='py-4 px-2'>
          <h4>Make Transaction</h4>
          <button onClick={handleShowTransaction} className='p-1 absolute right-0 top-2'>
            <img className='w-4 h-4 ' src={close} alt="" />
          </button>
          <div className='border flex gap-2 border-gray-300 p-1 rounded-lg'><input type="text" className='p-1 outline-0 flex-1' placeholder='Search account'/><button className='h-8 w-8 bg-blue-100 rounded p-1'><img src={search} className='' alt="" /></button></div>
          <form className='mt-4 flex flex-col gap-2'>
            <h5 className='font-bold'>Account Details</h5>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Number</span>
                <p className='m-0'>1071010148099</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Name</span>
                <p className='m-0'>Michael Essien Amoodu</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Status</span>
                <span>Active</span>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Balance</span>
                <p className='m-0'>GH¢ 200,000.00</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-sm text-gray-500'>Transaction Type</span>
                <select name="" id="">
                  <option value="Deposite">Deposite</option>
                  <option value="Debit">Debit</option>
                </select>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Transacted Amount</span>
                <input type="text"  className='border border-gray-300 p-2 outline-0 rounded-lg'/>
              </div>
            </div>
            <button className='rounded-full bg-blue-300 py-2 text-white mt-4'>Proceed with Transaction</button>
          </form>
        </div>
      </div>
      <div className={`${showTransaction && 'md:pl-4 md:border-l md:border-gray-200'} py-4 transition w-full `}>
        <div className='flex justify-between items-center pb-4'>
          <div className='flex items-center gap-8'>
            <h4 className='m-0 font-bold '>Savings Account</h4>

            <div className='flex items-center gap-2 '>
              <button className='bg-green-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' onClick={handleShowTransaction}>Make Transaction</button>
              {/* <button>Debit</button> */}
            </div>
          </div>

          <NavLink to='create' className='text-blue-500 p-1 border text-sm border-blue-500 rounded lg:text-light 2xl:p-2 2xl:rounded-lg'>Add Account</NavLink>
        </div>
        <><Overview overviews={overview} /></>
        <div className='bg-white w-full border border-gray-300 px-4 pt-4 py-8 rounded-lg mt-4  mb-8 overflow-y-auto'>
          <div className='flex items-center justify-between py-2 mb-4'>
            <div className='flex items-center gap-2'>
              <h5 className='text-xl m-0'>Accounts</h5><span className='text-xs mt-2'>{countAccount} accounts found</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='border flex gap-2 border-gray-300 p-2 rounded-lg'><span className='h-6 w-6'><img src={search} className='' alt="" /></span><input type="text" className='outline-0' placeholder='Search account'/></div>
              <div className='flex bg-gray-200 p-1 rounded-lg'>
                <button className='active filter filter text-xs flex whitespace-no-wrap items-center justify-center py-2 px-2'>All</button>
                <button className=' filter text-xs flex whitespace-no-wrap items-center justify-center py-2 px-2'>Active</button>
                <button className=' filter text-xs flex whitespace-no-wrap items-center justify-center py-2 px-2'>Inactive</button>
                <button className=' filter text-xs flex whitespace-no-wrap items-center justify-center py-2 px-2'>Closed</button>
              </div>
              <button className='p-1 bg-blue-100 flex items-center justify-center rounded-lg'>
                <img src={refresh} alt="" className='w-8 h-8'/>
              </button>
            </div>
          </div>
          <div className='min-w-[800px]'>
            {accounts.length == 0 ? 
              <div>No Accounts found</div>  :
              <table className='w-full'>
                <thead className=' border-y border-gray-300'>
                  <tr className=''>
                    <th className='px-2 text-start text-xs py-4 text-gray-400 font-medium'>ID</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Account Name</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Balance</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Phone</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Status</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account)=>{
                    <tr className='py-6 border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                      <td className='px-2 py-6 text-sm'>#{account.account}</td>
                      <td className='py-4 text-sm flex items-center gap-2'>
                      <div className='p-2 border border-gray-200 rounded-full overflow-hidden'>
                        <img className='w-4 h-4' src={users} alt="" />
                      </div>
                      <div>
                        <p className='-mb-1 font-medium'>{account.firstname} {account.lastname} {account.othernames}</p>
                        <span className='-mt-2 text-xs text-gray-300'>{account.account.email}</span>
                      </div>
                    </td>
                      <td className='py-6 text-sm'>¢ {account.balance}</td>
                      <td className='py-6 text-sm'>{account.phone ? account.phone : "-"}</td>
                      <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> {account.status} </span> </td>
                      <td className='py-6 text-sm'>{account.gender}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Savings