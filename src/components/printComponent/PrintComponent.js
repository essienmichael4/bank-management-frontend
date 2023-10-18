import React, {useRef} from 'react'
import { useReactToPrint } from 'react-to-print';

const PrintComponent = (props) => {
  const printRef = useRef()

  const handlePrint = useReactToPrint({
    content: ()=> printRef.current,
    documentTitle : `${props.account?.firstname} ${props.account?.lastname} ${props.account?.othernames} Account Statement`
  })

  return (
    <div className={`${props.showPrintModal && 'active'} modal z-10 px-20`}>
      <button onClick={handlePrint} className='absolute top-4 left-4 bg-black px-6 py-3 rounded text-white' >Print</button>
      <button onClick={props.handleShowPrintModal} className='absolute top-4 left-32 bg-white px-6 py-3 rounded text-black' >Cancel</button>
        <div ref={printRef} className='bg-white w-full  px-4 pt-4 py-8 rounded-lg mt-8'>
          <div className='flex items-center justify-center py-2 mb-4'>
            <div className='flex flex-col items-center gap-2'>
              <h4>BMS Account Statement</h4>
              <h5 className='text-xl m-0'>{props.account?.firstname} {props.account?.lastname} {props.account?.othernames}</h5>
            </div>
            <div className='flex items-center gap-2'>
            </div>
          </div>

          <div className='min-w-[800px]'>
            {props.shownTransactions.length === 0 ? 
              <div>No Transactions found</div> : 
              
              <div>
                <table className='w-full'>
                  <thead className=' border-y border-gray-300'>
                  <tr className=''>
                    <th className='px-2 text-start text-xs py-4 text-gray-400 font-medium'>ID</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Amount</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Date</th>
                    <th className='text-start text-xs py-4 text-gray-400 font-medium'>Transaction Type</th>
                  </tr>
                  </thead>
                  <tbody>
                  {props.shownTransactions?.map((transaction)=>{
                      return (
                      <tr key={transaction.id} className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
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
                      </tr>
                      )
                  })}
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
    </div>
  )
}

export default PrintComponent