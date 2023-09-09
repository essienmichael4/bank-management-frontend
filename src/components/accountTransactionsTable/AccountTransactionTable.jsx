import React from 'react'
import { useNavigate } from 'react-router-dom'


const AccountTransactionTable = (props) => {
  const navigate = useNavigate()

  return (
    <div><table className='w-full'>
    <thead className=' border-y border-gray-300'>
      <tr className=''>
        <th className='px-2 text-start text-xs py-4 text-gray-400 font-medium'>ID</th>
        <th className='text-start text-xs py-4 text-gray-400 font-medium'>Amount</th>
        <th className='text-start text-xs py-4 text-gray-400 font-medium'>Date</th>
        <th className='text-start text-xs py-4 text-gray-400 font-medium'>Transaction Type</th>
        <th className='text-start text-xs py-4 text-gray-400 font-medium'>Transacted By</th>
      </tr>
    </thead>
    <tbody>
      {props.shownTransactions?.map((transaction)=>{
        return (
          <tr onClick={()=>{navigate(`../transactions/${transaction.id}`)}} className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
            <td className='px-2 py-4 text-sm'>#{transaction.receipt}</td>
            <td className='py-4 text-sm'>¢ {transaction.amount}</td>
            <td className='py-4 text-sm'>{new Date(transaction.createdAt).toDateString()}</td>
            <td className='py-4 text-sm'>
              <span 
                className={`${transaction.type === "DEPOSITE" && 'bg-green-100 text-green-500 before:bg-green-500'}
            ${transaction.type === "DEBIT" && 'bg-red-100 text-red-500 before:bg-red-500'} 
            ${transaction.type === "LOAN_PAYMENT" && 'bg-blue-100 text-blue-500 before:bg-blue-500'} 
            rounded-lg relative text-sm py-2 px-6  before:block before:absolute before:w-2 before:h-2  before:rounded-full before:left-2 before:top-[.9rem]`}> 
                {transaction.type} 
              </span> 
            </td>
            <td className='py-4 text-sm'>{transaction.user.firstname} {transaction.user.lastname} {transaction.user.othernames}</td>
          </tr>
        )
      })}
    </tbody>
  </table></div>
  )
}

export default AccountTransactionTable