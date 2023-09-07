import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Overview from '../../components/overview/Overview'
import users from '../../assets/users.svg'
import refresh from '../../assets/refresh.svg'
import search from '../../assets/search.svg'
import close from '../../assets/close.svg'
import axios from '../../api/axios'
import useAxios from '../../hooks/useAxios'
import { toast } from 'react-toastify';

function Transactions() {
  const navigate = useNavigate()
  const [showTransaction, setShowTransaction] = useState(false)
  const [accounts,setAccounts] = useState([])
  const [accountNumber, setAccountNumber] = useState()
  const [transactions, setTransactions] = useState([])
  const [shownTransactions, setShownTransactions] = useState([])
  const [transaction, setTransaction] = useState({
    accountNumber: "",
    transactionType: "DEPOSITE",
    transactedAmount: ""
  })
  const [account,setAccount] = useState({})
  const [overview, setOverview] = useState([])
  const axiosPrivateNew = useAxios()

  useEffect( ()=>{
    let isMounted = true
    const controller = new AbortController()

    const getOverview = async() => {
      try{
        const response = await axios.get("/overview/savings", {signal: controller.signal})
        isMounted && setOverview(response.data)
      }catch(err){
        console.log(err);
      }
    }

    const getTransactions = async() => {
      try{
        const response = await axiosPrivateNew.get("/transactions", {signal: controller.signal})
        setShownTransactions(response.data.transactions)
        isMounted && setTransactions(response.data.transactions) 
      }catch(err){
        console.log(err);
      }
    }

    const getAccounts = async() => {
      try{
        const response = await axiosPrivateNew.get("/transactions/accounts", {signal: controller.signal})
        isMounted && setAccounts(response.data) 
      }catch(err){
        console.log(err);
      }
    }

    getOverview()
    getTransactions()
    getAccounts()

    return ()=>{
      isMounted = false
      controller.abort()
    }
  },[])

  function handleShowTransaction(){
    setShowTransaction(!showTransaction)
  }

  const findAccountByNumber = (number)=>{
    let acc = accounts.filter(acc => number === acc.account)
    
    setAccount(acc[0])
    setTransaction({accountNumber:acc[0].account, transactedAmount: "",transactionType: "DEPOSITE"})
  }

  const makeTransaction = async (e)=>{
    e.preventDefault()
    console.log(transaction);
    try{
      const response = await axiosPrivateNew.post("/transactions",
       JSON.stringify(transaction)
      );
      toast.success(response.data.message)
    }catch(err){
      if(!err.response){
        toast.error("Server not found")
      }else{
        toast.error(err.response.data.error)
      }
    }
  }

  const handleTransactionSearch = (e)=>{
    const filteredAccounts = transactions.filter(transaction =>{
      return transaction.receipt.toLowerCase().includes(e.target.value) || transaction?.account?.firstname.toLowerCase().includes(e.target.value)
        ||  transaction?.account?.lastname.toLowerCase().includes(e.target.value) || transaction?.account?.othernames.toLowerCase().includes(e.target.value) 
        || transaction?.account?.email.toLowerCase().includes(e.target.value) || transaction?.savingAccount?.firstname.toLowerCase().includes(e.target.value)
        ||  transaction?.savingAccount?.lastname.toLowerCase().includes(e.target.value) || transaction?.savingAccount?.othernames.toLowerCase().includes(e.target.value) 
        || transaction?.savingAccount?.email.toLowerCase().includes(e.target.value)
    })
    setShownTransactions(filteredAccounts)
  }

  return (
    <div className='flex flex-col items-center md:items-start md:flex-row relative md:gap-4'>
      <datalist id='accountNumbers'>
        {accounts.map(accountNum => {
            return (<option>{accountNum.account}</option>)
        })}
      </datalist>
      <div className={`${!showTransaction && 'hidden'} w-full md:w-[450px] transition md:relative bg-white mt-4 rounded-lg border border-gray-300`}>
        <div className='py-4 px-2'>
          <h4>Make Transaction</h4>
          <button onClick={handleShowTransaction} className='p-1 absolute right-0 top-2'>
            <img className='w-4 h-4 ' src={close} alt="" />
          </button>
          <div className='border flex gap-2 border-gray-300 p-1 rounded-lg'>
            <input type="text" 
             list='accountNumbers'
             value={accountNumber}
             onChange={(e)=>{
                setAccountNumber(e.target.value)
              }
             } 
             className='p-1 outline-0 flex-1' 
             placeholder='Search account'/>
            <button className='h-8 w-8 bg-blue-100 rounded p-1' onClick={()=>findAccountByNumber(accountNumber)}>
              <img src={search} className='' alt="" />
            </button>
          </div>
          <form className='mt-4 flex flex-col gap-2' onSubmit={makeTransaction}>
            <h5 className='font-bold'>Account Details</h5>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Number</span>
                <p className='m-0'>{account?.account ? account.account : `-`}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Name</span>
                <p className='m-0'>{account?.firstname ? `${account?.firstname} ${account?.lastname} ${account?.othernames}` : `-`}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Status</span>
                {account?.status ? <span> {account.status} </span> : <span>-</span>}
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Account Balance</span>
                <p className='m-0'>{account?.balance ? `GH¢ ${account.balance}` : `GH¢ 0.00`}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-sm text-gray-500'>Transaction Type</span>
                <select name="" className='rounded border border-gray-200 p-2' id="" value={transaction.transactionType} onChange={(e)=>{
                  setTransaction({...transaction, transactionType:e.target.value})
                }}>
                  <option value="DEPOSITE">Deposite</option>
                  <option value="DEBIT">Debit</option>
                  <option value="LOAN_PAYMENT">Loan Payment</option>
                </select>
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
      <div className={`${showTransaction && 'md:pl-4 md:border-l md:border-gray-200'} py-4 transition w-full `}>
        <div className='flex justify-between items-center pb-4'>
          <div className='flex items-center gap-8'>
            <h4 className='m-0 font-bold '>Transactions</h4>

            <div className='flex items-center gap-2 '>
              <button className='bg-green-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' onClick={handleShowTransaction}>Make Transaction</button>
            </div>
          </div>

          <NavLink className='text-blue-500 p-1 border text-sm border-blue-500 rounded lg:text-light 2xl:p-2 2xl:rounded-lg' to="../dashboard">Add Account</NavLink>
        </div>
        <><Overview overviews={overview} /></>
        <div className='bg-white w-full border border-gray-300 px-4 pt-4 py-8 rounded-lg mt-4'>
          <div className='flex items-center justify-between py-2 mb-4'>
            <div className='flex items-center gap-2'>
              <h5 className='text-xl m-0'>Transactions</h5><span className='text-xs text-gray-300 mt-2'>{shownTransactions.length} transactions found</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='border flex gap-2 border-gray-300 p-2 rounded-lg'>
                <span className='h-6 w-6'><img src={search} className='' alt="" /></span>
                <input type="text" className='outline-0' onChange={handleTransactionSearch} placeholder='Search account'/>
              </div>
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
            {shownTransactions.length === 0 ? 
              <div>No Transactions found</div> : 
              
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
                  {shownTransactions.map((transaction)=>{
                    return (
                      <tr onClick={()=>{navigate(`./${transaction.id}`)}} className='border-b border-gray-100 cursor-pointer hover:bg-gray-100'>
                    <td className='px-2 py-4 text-sm'>#{transaction.receipt}</td>
                    <td className='py-4 text-sm flex items-center gap-2'>
                      
                      {transaction.account && 
                        <>
                          <div className='p-2 border border-gray-200 rounded-full overflow-hidden'>
                            <img className='w-4 h-4' src={users} alt="" />
                          </div>
                          <div>
                            <p className='-mb-1 font-medium'>{transaction.account.firstname} {transaction.account.lastname} {transaction.account.othernames}</p>
                            <span className='-mt-2 text-xs text-gray-300'>{transaction.account.email}</span>
                          </div>
                        </>
                      }
                      {transaction.savingAccount && 
                        <>
                          <div className='p-2 border border-gray-200 rounded-full overflow-hidden'>
                            <img className='w-4 h-4' src={users} alt="" />
                          </div>
                          <div>
                            <p className='-mb-1 font-medium'>{transaction.savingAccount.firstname} {transaction.savingAccount.lastname} {transaction.savingAccount.othernames}</p>
                            <span className='-mt-2 text-xs text-gray-300'>{transaction.savingAccount.email}</span>
                          </div>
                        </>
                      }
                    </td>
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

export default Transactions