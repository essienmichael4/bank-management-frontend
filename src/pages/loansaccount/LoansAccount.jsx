import React, { useState,useEffect } from 'react'
import './loansaccount.css'
import useAuth from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import refresh from '../../assets/refresh.svg'
import search from '../../assets/search.svg'
import close from '../../assets/close.svg'
import arrow from '../../assets/arrow.svg'
import arrowleft from '../../assets/arrowleft.svg'
import useAxios from '../../hooks/useAxios'

const LoansAccount = () => {
  const navigate = useNavigate()
  const {id} =useParams()
  const {auth} = useAuth()
  const axiosPrivateNew = useAxios()
  const [transaction, setTransaction] = useState({
    accountNumber: "",
    transactionType: "LOAN_PAYMENT",
    transactedAmount: ""
  })

  const [showTransaction, setShowTransaction] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  const [account,setAccount] = useState({})
  const [transactions, setTransactions] = useState([])
  const [shownTransactions, setShownTransactions] = useState([])

  useEffect( ()=>{
    let isMounted = true
    const controller = new AbortController()

    const getAccounts = async() => {
      try{
        const response = await axiosPrivateNew.get(`/loan/account/${id}`, {signal: controller.signal})
        setTransactions(response.data.transactions) 
        setShownTransactions(response.data.transactions) 
        setTransaction({...transaction, accountNumber:response.data.account})
        isMounted && setAccount(response.data) 
        
      }catch(err){
        console.log(err);
        if(err.response){
          toast.error(err.response.data.error)
          navigate("../loans")
        }
      }
    }

    getAccounts()

    return ()=>{
      isMounted = false
      controller.abort()
    }
  },[])

  const getAccounts = async() => {
    try{
      const response = await axiosPrivateNew.get(`/loan/account/${id}`)
      setTransactions(response.data.transactions) 
      setShownTransactions(response.data.transactions) 
      setTransaction({...transaction, accountNumber:response.data.account})
      setAccount(response.data) 
      
    }catch(err){
      console.log(err);
      if(err.response){
        toast.error(err.response.data.error)
        navigate("../loans")
      }
    }
  }

  const handleGrantLoan = async () => {
    try{
      const response = await axiosPrivateNew.put(`/loan/grant/${account?.account}`)
      toast.success(response.data.message)
    }catch(err){
      console.log(err);
      if(err.response){
        toast.error(err.response.data.error)
      }
    }
  }

  const handleCloseAccount = async () => {
    try{
      const response = await axiosPrivateNew.put(`/loan/close/${account?.account}`)
      toast.success(response.data.message)
    }catch(err){
      console.log(err);
      if(err.response){
        toast.error(err.response.data.error)
      }
    }
  }

  const handleLoaned = async () => {
    try{
      const response = await axiosPrivateNew.put(`/loan/loaned/${account?.account}`)
      toast.success(response.data.message)
    }catch(err){
      console.log(err);
      if(err.response){
        toast.error(err.response.data.error)
      }
    }
  }

  function handleShowTransaction(){
      setShowTransaction(!showTransaction)
  }

  function toggleDetails(){
      setIsToggled(!isToggled)
  }

  const handleTransactionSearch = (e)=>{
    const filteredAccounts = transactions.filter(transaction =>{
      return transaction.receipt.toLowerCase().includes(e.target.value)
    })
    setShownTransactions(filteredAccounts)
  }

  const makeTransaction = async (e)=>{
    e.preventDefault()
    try{
      const response = await axiosPrivateNew.post("/transactions",
       JSON.stringify(transaction)
      );
      getAccounts()
      toast.success(response.data.message)
    }catch(err){
      if(!err.response){
        toast.error("Server not found")
      }else{
        toast.error(err.response.data.error)
      }
    }
  }

  return (
    <div className='flex flex-col items-center md:items-start md:flex-row relative md:gap-4'>
      <div className={`${!showTransaction && 'hidden'} h-full w-full md:w-[450px] transition md:relative bg-white mt-4 rounded-lg border border-gray-300`}>
        <div className='py-4 px-2'>
          <h4>Make Transaction</h4>
          <button onClick={handleShowTransaction} className='p-1 absolute right-0 top-2'>
            <img className='w-4 h-4 ' src={close} alt="" />
          </button>
          {/* <div className='border flex gap-2 border-gray-300 p-1 rounded-lg'><input type="text" className='p-1 outline-0 flex-1' placeholder='Search account'/><button className='h-8 w-8 bg-blue-100 rounded p-1'><img src={search} className='' alt="" /></button></div> */}
            <form onSubmit={makeTransaction} className='mt-4 flex flex-col gap-2'>
              <h5 className='font-bold'>Account Details</h5>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                  <span className='text-xs text-gray-500'>Account Number</span>
                  <p className='m-0'>{account.account}</p>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-xs text-gray-500'>Account Name</span>
                  <p className='m-0'>{account?.firstname} {account?.lastname} {account?.othernames}</p>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-xs text-gray-500'>Account Status</span>
                  <span>{account.status}</span>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-xs text-gray-500'>Account Balance</span>
                  <p className='m-0'>GH¢ {account.balance}</p>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-sm text-gray-500'>Transaction Type</span>
                  <p className='m-0'>Loan Payment</p>
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-xs text-gray-500'>Transacted Amount</span>
                  <input type="text"
                    value={transaction.transactedAmount} 
                    onChange={e =>{setTransaction({...transaction, transactedAmount:e.target.value})}}
                    className='border border-gray-300 p-2 outline-0 rounded-lg'/>
                </div>
              </div>
            <button className='rounded-full bg-blue-300 py-2 text-white mt-4'>Proceed with Transaction</button>
          </form>
        </div>
      </div>
      <div className={`${showTransaction && ''} py-4 transition w-full `}>
        <div className='flex justify-between items-center pb-4'>
          <div className='flex items-center gap-8'>
            <button className='p-2 bg-blue-100 flex items-center justify-center rounded-lg' onClick={()=>{navigate(-1)}}>
                <img src={arrowleft} alt="" className='w-4 h-4'/>
              </button>
            <h4 className='m-0 font-bold '>Loan Account</h4>

            <div className='flex items-center gap-2 '>
              <button className='bg-green-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' onClick={handleShowTransaction}>Make Transaction</button>
            </div>
          </div>
          {account?.loanDetail?.state === "GRANTED" && account?.status === "NOT_LOANED" && 
            <button className='bg-black text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg'  onClick={handleLoaned}>Loaned to Person</button>
          }
          {auth.role !== "USER" && <div className='flex gap-2'>
            {!account?.loanDetail?.grantedBy && 
              <button className='bg-blue-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' onClick={handleGrantLoan}>Grant Loan</button>
            }
            {
              account?.loanDetail?.state !== "CLOSED" &&
              <button className='bg-red-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg'  onClick={handleCloseAccount}>Close Account</button>
            }
            </div>}
        </div>
        <div className='bg-white my-4 border border-gray-300 rounded-lg h-full relative'>
          <div className='image__bg w-full h-28 bg-gray-200 rounded-lg'></div>
            <div className='pt-8 px-4'>
                <div className='absolute w-28 h-28 rounded-full bg-white border border-gray-200 top-2 left-4'></div>
                <h3>{account.firstname} {account.lastname} {account.othernames}</h3>
                <div className='flex flex-wrap gap-8'>
                    <div>
                        <span className='text-xs text-gray-300'>Loan Balance</span>
                        <p>{account.balance}</p>
                    </div>
                    <div>
                        <span className='text-xs text-gray-300'>Account Number</span>
                        <p>{account.account}</p>
                    </div>
                    <div>
                        <span className='text-xs text-gray-300'>Email</span>
                        <p>{account.email}</p>
                    </div>
                    <div>
                        <span className='text-xs text-gray-300'>Phone</span>
                        <p>{account.phone ? account.phone : "-" }</p>
                    </div>
                    <div>
                        <span className='text-xs text-gray-300'>Ghana Card</span>
                        <p>{account.card ? account.card : "-" }</p>
                    </div>
                </div>
                <div className={`${!isToggled && 'hidden'} border-t border-gray-200 pt-4`}>
                  <h4 className='font-bold'>Other Personal Details</h4>
                  <div className='flex gap-8 flex-wrap'>
                    <div>
                      <span className='text-xs text-gray-300'>Date of Birth</span>
                      <p>{new Date(account.dateOfBirth).toDateString()}</p>
                    </div>
                    <div>
                      <span className='text-xs text-gray-300'>Gender</span>
                      <p>{account.gender}</p>
                    </div>
                    <div>
                      <span className='text-xs text-gray-300'>Account Status</span>
                      <p>{account.status}</p>
                    </div>
                    <div>
                      <span className='text-xs text-gray-300'>Pupose</span>
                      <p>{account.purpose}</p>
                    </div>
                  </div>
                </div>
                <div className={`${!isToggled && 'hidden'} border-t border-gray-200 pt-4`}>
                    <h4 className='font-bold'>Address</h4>
                    <div className='flex gap-8 flex-wrap'>
                        <div>
                            <span className='text-xs text-gray-300 '>Nationality</span>
                            <p>{account.address?.nationality}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Country</span>
                            <p>{account.address?.country}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Region</span>
                            <p>{account.address?.region}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>City</span>
                            <p>{account.address?.city}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Residential Address</span>
                            <p>{account.address?.residentialAddress}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Home Town</span>
                            <p>{account.address?.homeTown}</p>
                        </div>
                    </div>
                </div>
                <div className={`${!isToggled && 'hidden'} border-t border-gray-200 pt-4`}>
                    <h4 className='font-bold'>Work Details</h4>
                    <div className='flex gap-8 flex-wrap'>
                        <div>
                            <span className='text-xs text-gray-300 '>Employee Number</span>
                            <p>{account.work?.employeeId ? account.work?.employeeId : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Occupation</span>
                            <p>{account.work?.occupation}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Company</span>
                            <p>{account.work?.company}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Location</span>
                            <p>{account.work?.location}</p>
                        </div>
                    </div>
                </div>
                <div className={`${!isToggled && 'hidden'} border-t border-gray-200 pt-4`}>
                    <h4 className='font-bold'>Sponsor Details</h4>
                    <div className='flex gap-8 flex-wrap'>
                        <div>
                            <span className='text-xs text-gray-300 '>Name</span>
                            <p>
                              {account.saving?.firstname}
                              {account.saving?.lastname}
                              {account.saving?.othernames}
                            </p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Account Number</span>
                            <p>-</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Phone</span>
                            <p>-</p>
                        </div>
                    </div>
                </div>
                <div className={`${!isToggled && 'hidden'} border-t border-gray-200 pt-4`}>
                    <h4 className='font-bold'>Guarantor Details</h4>
                    {account?.guarantor?.map((guarantee)=>{
                      return(
                        <div className='flex gap-8 flex-wrap'>
                        <div>
                            <span className='text-xs text-gray-300 '>Name</span>
                            <p>
                              {`${guarantee?.saving?.firstname} ${guarantee?.saving?.lastname} ${guarantee?.saving?.othernames}`}
                            </p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Account Number</span>
                            <p>{guarantee?.saving?.account}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Phone</span>
                            <p>{guarantee?.saving?.phone}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Amount Guaranted</span>
                            <p>¢ {guarantee?.amount}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Date Guaranted</span>
                            <p>{guarantee?.createdAt}</p>
                        </div>
                    </div>
                      )
                    })}
                    
                </div>
                <div className={`${!isToggled && 'hidden'} border-t border-gray-200 pt-4`}>
                    <h4 className='font-bold'>Loan Details</h4>
                    <div className='flex gap-8 flex-wrap'>
                        <div>
                            <span className='text-xs text-gray-300 '>Amount</span>
                            <p>{account.loanDetail?.amount}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Interest</span>
                            <p>{account.loanDetail?.interest}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Interest Percentage (%)</span>
                            <p>{account.loanDetail?.interestPercent}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Application Date</span>
                            <p>{account.loanDetail?.appliedAt}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Due Date</span>
                            <p>{account.loanDetail?.dueAt}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div 
              className='cursor-pointer lg:flex items-center justify-center absolute w-6 h-6 left-[49%] bottom-[-.7rem] z-4 bg-white p border border-gray-300 rounded-full' 
                onClick={toggleDetails}
              >
                <img src={arrow} className={` ${isToggled && 'active'}
                     w-4 h-4 arrow-detail`} alt="" />
            </div>
        </div>

        <div className='bg-white w-full border border-gray-300 px-4 pt-4 py-8 rounded-lg mt-4'>
          <div className='flex items-center justify-between py-2 mb-4'>
            <div className='flex items-center gap-2'>
              <h5 className='text-xl m-0'>Transactions</h5><span className='text-xs mt-2'>{shownTransactions.length} accounts found</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='border flex items-center gap-2 border-gray-300 p-1 rounded-lg'>
                <span className='h-4 w-4'><img src={search} className='' alt="" /></span>
                <input type="text" className='outline-0 text-xs py-[.18rem]' onChange={handleTransactionSearch} placeholder='Search transactions'/>
              </div>
              <button className='p-1 bg-blue-100 flex items-center justify-center rounded-lg'>
                <img src={refresh} alt="" className='w-6 h-6'/>
              </button>
            </div>
          </div>
          <div className='min-w-[800px]'>
            {shownTransactions?.length === 0 ? 
              <div>No Transactions found</div> : 
              
              <table className='w-full'>
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
                  {shownTransactions?.map((transaction)=>{
                    return (
                      <tr className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                        <td className='px-2 py-4 text-sm'>#{transaction.id}</td>
                        <td className='py-4 text-sm'>¢ {transaction.amount}</td>
                        <td className='py-4 text-sm'>{new Date(transaction.createdAt).toDateString()}</td>
                        <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> {transaction.type} </span> </td>
                        <td className='py-4 text-sm'>{transaction.user.firstname} {transaction.user.lastname} {transaction.user.othernames}</td>
                      </tr>
                    )
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

export default LoansAccount