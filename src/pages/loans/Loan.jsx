import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Overview from '../../components/overview/Overview'
import users from '../../assets/users.svg'
import refresh from '../../assets/refresh.svg'
import search from '../../assets/search.svg'
import close from '../../assets/close.svg'
import useAxios from '../../hooks/useAxios'
import axios from '../../api/axios'


function Loan() {
  const [showTransaction, setShowTransaction] = useState(false)
  const [overview, setOverview] = useState([])
  const [transaction, setTransaction] = useState({
    accountNumber: "",
    transactionType: "LOAN_PAYMENT",
    transactedAmount: ""
  })
  const [loans, setLoans] = useState([])
  const [shownAccounts,setShownAccounts] = useState([])
  const [accountNumber, setAccountNumber] = useState()
  const [loanAccount, setLoanAccount] = useState({})
  const [countLoans,setCountLoans] = useState()
  const axiosPrivateNew = useAxios()
  const navigate = useNavigate()

  useEffect( ()=>{
    let isMounted = true
    const controller = new AbortController()

    const getOverview = async() => {
      try{
        const response = await axios.get("/overview/loans", {signal: controller.signal})
        isMounted && setOverview(response.data)
      }catch(err){
        console.log(err);
      }
    }

    const getAccounts = async() => {
      try{
        const response = await axiosPrivateNew.get("/loan/accounts", {signal: controller.signal})
        setCountLoans(response.data.count._count.id)
        setShownAccounts(response.data.loans)
        isMounted && setLoans(response.data.loans) 
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

  const getOverview = async() => {
    try{
      const response = await axios.get("/overview/loans")
      setOverview(response.data)
    }catch(err){
      console.log(err);
    }
  }

  const getAccounts = async() => {
    try{
      const response = await axiosPrivateNew.get("/loan/accounts")
      setCountLoans(response.data.count._count.id)
      setShownAccounts(response.data.loans)
      setLoans(response.data.loans) 
    }catch(err){
      console.log(err);
    }
  }

  const findAccountByNumber = (number)=>{
    let acc = loans.filter(acc => number === acc.account)
    setLoanAccount(acc[0])
    setTransaction({...transaction, accountNumber:acc[0].account, transactedAmount: ""})
  }

  function handleShowTransaction(){
    setShowTransaction(!showTransaction)
  }

  const makeTransaction = async (e)=>{
    e.preventDefault()
    try{
      const response = await axiosPrivateNew.post("/transactions",
       JSON.stringify(transaction)
      );
      getOverview()
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

  const handleAccountSearch = (e)=>{
    const filteredAccounts = loans.filter(account =>{
      return account.account.toLowerCase().includes(e.target.value) || account.firstname.toLowerCase().includes(e.target.value)
        ||  account.lastname.toLowerCase().includes(e.target.value) || account.othernames.toLowerCase().includes(e.target.value) 
        || account.email.toLowerCase().includes(e.target.value)
    })
    setShownAccounts(filteredAccounts)
  }

  return (
    <div className='flex flex-col items-center md:items-start md:flex-row relative md:gap-4'>
      <datalist id='accountNumbers'>
            {loans.map(accountNum => {
                return (<option>{accountNum.account}</option>)
            })}
          </datalist>
      <div className={`${!showTransaction && 'hidden'} h-full w-full md:w-[450px] transition md:relative bg-white mt-4 rounded-lg border border-gray-300`}>
        <div className='py-4 px-2'>
          <h4>Loans Payment</h4>
          <button onClick={handleShowTransaction} className='p-1 absolute right-2 top-6 lg:right-0 lg:top-2 '>
            <img className='w-4 h-4 ' src={close} alt="" />
          </button>
          <div className='border flex gap-2 border-gray-300 p-1 rounded-lg'>
            <input type="text" 
              list='accountNumbers'
              className='p-1 outline-0 flex-1' 
              value={accountNumber}
              onChange={(e)=>{
                setAccountNumber(e.target.value)
              }} 
              placeholder='Search account'/>
            <button className='h-8 w-8 bg-blue-100 rounded p-1' 
             onClick={() => findAccountByNumber(accountNumber)}
            >
              <img src={search} className='' alt="" />
            </button></div>
          <form onSubmit={makeTransaction} className='mt-4 flex flex-col gap-2'>
            <h5 className='font-bold'>Account Details</h5>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Number</span>
                <p className='m-0'>{loanAccount?.account ? loanAccount.account : `-`}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Name</span>
                <p className='m-0'>{loanAccount?.firstname ? `${loanAccount?.firstname} ${loanAccount?.lastname} ${loanAccount?.othernames}` : `-`}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Status</span>
                {loanAccount?.status ? <span> {loanAccount.status} </span> : <span>-</span>}
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Balance</span>
                <p className='m-0'>{loanAccount?.balance ? `GH¢ ${loanAccount.balance}` : `GH¢ 0.00`}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Transaction Type</span>
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
              <button className='w-full rounded-full bg-blue-300 py-2 text-white mt-4'>Proceed with Loan Transaction</button>
          </form>
        </div>
      </div>
      <div className={`${showTransaction && 'md:pl-4 md:border-l md:border-gray-200'} py-4 transition w-full `}>
        <div className='flex justify-between items-center pb-4'>
          <div className='flex items-center gap-8'>
            <h4 className='m-0 font-bold '>Loans Payment</h4>

            <div className='flex items-center gap-2 '>
              <button className='bg-green-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' onClick={handleShowTransaction}>Make Transaction</button>
              {/* <button>Debit</button> */}
            </div>
          </div>

          <NavLink className='text-blue-500 p-1 border text-sm border-blue-500 rounded lg:text-light 2xl:p-2 2xl:rounded-lg' to="create">Add Account</NavLink>
        </div>
        <><Overview overviews={overview}/></>
        <div className='bg-white w-full border border-gray-300 px-4 pt-4 py-8 rounded-lg mt-4  mb-8 overflow-y-auto'>
          <div className='flex flex-wrap items-center relative justify-between py-2 mb-4'>
            <div className='flex items-center gap-2'>
              <h5 className='text-xl m-0'>Loans</h5><span className='text-xs text-gray-300 mt-2'>{countLoans} Loans found</span>
            </div>
            <div className='flex flex-wrap justify-between items-center gap-2'>
              <div className='border flex gap-2 border-gray-300 p-2 rounded-lg'>
                <span className='h-6 w-6'><img src={search} className='' alt="" /></span>
                <input type="text" className='outline-0 text-sm' onChange={handleAccountSearch} placeholder='Search account'/>
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
          <div className='min-w-[900px]'>
            {shownAccounts.length == 0 ? 
              <div>No Loans found</div> 
              :
              <table className='w-full'>
                <thead className=' border-y border-gray-300'>
                  <tr className=''>
                    <th className='px-2 text-start py-4 text-gray-500 font-light text-xs font-medium'>ID</th>
                    <th className='text-start py-4 text-gray-500 font-light text-xs font-medium'>Name</th>
                    <th className='text-start py-4 text-gray-500 font-light text-xs font-medium'>Amount</th>
                    <th className='text-start py-4 text-gray-500 font-light text-xs font-medium'>Balance</th>
                    <th className='text-start py-4 text-gray-500 font-light text-xs font-medium'>Phone</th>
                    <th className='text-start py-4 text-gray-500 font-light text-xs font-medium'>Status</th>
                    <th className='text-start py-4 text-gray-500 font-light text-xs font-medium'>Due Date</th>
                    <th className='text-start py-4 text-gray-500 font-light text-xs font-medium'>Payment Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {shownAccounts.map(loan=>{
                    return(
                      <tr key={loan.id} onClick={()=>{navigate(`./${loan.id}`)}} className='py-6 border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                        <td className='px-2 py-6 text-sm'>#{loan.account}</td>
                        <td className='py-4 text-sm flex items-center gap-2'>
                        <div className='p-2 border border-gray-200 rounded-full overflow-hidden'>
                          <img className='w-4 h-4' src={users} alt="" />
                        </div>
                        <div>
                          <p className='-mb-1 font-medium'>{loan.firstname} {loan.lastname} {loan.othernames}</p>
                          <span className='-mt-2 text-xs text-gray-300'>{loan.email}</span>
                        </div>
                      </td>
                        <td className='py-6 text-sm'>¢ {loan?.loanDetail?.amount}</td>
                        <td className='py-6 text-sm'>¢ {loan.balance}</td>
                        <td className='py-6 text-sm'>{loan.phone ? loan.phone : "-"}</td>
                        <td className='py-4 text-sm'><span className='rounded-lg relative text-sm py-2 px-6 bg-green-100 text-green-500 before:block before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:left-2 before:top-[.9rem]'> {loan.status} </span> </td>
                        <td className='py-6 text-sm'>{new Date(loan?.loanDetail?.dueAt).toDateString()}</td>
                        <td className='py-6 text-sm'>{loan?.loanDetail?.modeOfPayment}</td>
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

export default Loan
