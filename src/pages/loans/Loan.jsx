import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Overview from '../../components/overview/Overview'
import refresh from './refresh.svg'
import search from './search.svg'
import close from './close.svg'

function Loan() {
  const [showTransaction, setShowTransaction] = useState(false)
  function handleShowTransaction(){
    setShowTransaction(!showTransaction)
  }

  return (
    <div className='flex flex-col items-center md:items-start md:flex-row relative md:gap-4'>
      <div className={`${!showTransaction && 'hidden'} h-full w-full md:w-[450px] transition md:relative  py-4 `}>
        <h4>Loans Payment</h4>
        <button onClick={handleShowTransaction} className='p-1 absolute right-2 top-2'>
          <img className='w-6 h-6 ' src={close} alt="" />
        </button>
        <div className='border flex gap-2 border-gray-300 p-1 rounded-lg'><input type="text" className='p-1 outline-0 flex-1' placeholder='Search account'/><button className='h-8 w-8 bg-blue-100 rounded p-1'><img src={search} className='' alt="" /></button></div>
        <form className='mt-4 '>
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
              <span className='text-xs text-gray-500'>Transaction Type</span>
              <p>Loan Payment</p>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-xs text-gray-500'>Transacted Amount</span>
              <input type="text"  className='border border-gray-300 p-2 outline-0 rounded-lg'/>
            </div>
          </div>
            <button className='w-full rounded-full bg-blue-300 py-2 text-white mt-4'>Proceed with Loan Transaction</button>
        </form>
      </div>
      <div className={`${showTransaction && 'md:pl-4 md:border-l md:border-gray-200'} py-4 transition w-full `}>
        <div className='flex justify-between items-center border-b border-gray-100 pb-4'>
          <div className='flex items-center gap-8'>
            <h4 className='m-0 font-bold '>Loans Payment</h4>

            <div className='flex items-center gap-2 '>
              <button className='bg-green-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' onClick={handleShowTransaction}>Make Transaction</button>
              {/* <button>Debit</button> */}
            </div>
          </div>

          <NavLink className='text-blue-500 p-1 border text-sm border-blue-500 rounded lg:text-light 2xl:p-2 2xl:rounded-lg' to="../dashboard">Add Account</NavLink>
        </div>
        <><Overview/></>
        <div className='w-full border border-gray-300 px-4 pt-4 py-8 rounded-lg mt-4'>
          <div className='flex flex-wrap items-center relative justify-between py-2 mb-4'>
            <div className='flex items-center gap-2'>
              <h5 className='text-xl m-0'>Loans</h5><span className='text-xs mt-2'>20 Loans found</span>
            </div>
            <div className='flex flex-wrap justify-between items-center gap-2'>
              <div className='border flex gap-2 border-gray-300 p-2 rounded-lg'>
                <span className='h-6 w-6'><img src={search} className='' alt="" /></span>
                <input type="text" className='outline-0 text-sm' placeholder='Search account'/>
              </div>
              <div className='flex flex-wrap bg-gray-200 p-1 rounded-lg'>
                <button className='active filter text-xs flex whitespace-no-wrap items-center justify-center py-2 px-2'>All</button>
                <button className=' filter text-xs flex whitespace-no-wrap items-center justify-center py-1 px-2'>Paid</button>
                <button className=' filter text-xs flex whitespace-no-wrap items-center justify-center py-1 px-2'>Pending</button>
                <button className=' filter text-xs flex whitespace-no-wrap items-center justify-center py-1 px-2'>Due</button>
                <button className=' filter text-xs flex whitespace-no-wrap items-center justify-center py-1 px-2'>Overdue</button>
              </div>
              <button className='p-1 bg-blue-100 flex items-center justify-center rounded-lg absolute top-[-0.5rem] right-0 md:relative md:top-0'>
                <img src={refresh} alt="" className='w-8 h-8'/>
              </button>
            </div>
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
      </div>
    </div>
  )
}

export default Loan