import React, {useState, useEffect} from 'react'
import './transaction.css'
import { useNavigate, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import search from '../../assets/search.svg'
import close from '../../assets/close.svg'
import useAxios from '../../hooks/useAxios'
import { toast } from 'react-toastify';

function Transaction() {
  const {id} =useParams()
  const navigate = useNavigate()
  const [showTransaction, setShowTransaction] = useState(false)
  const [accounts,setAccounts] = useState([])
  const [accountNumber, setAccountNumber] = useState()
  const [transactions, setTransactions] = useState([])
  const [transaction, setTransaction] = useState({
    accountNumber: "",
    transactionType: "DEPOSITE",
    transactedAmount: ""
  })
  const [account,setAccount] = useState({})
  const axiosPrivateNew = useAxios()

  useEffect( ()=>{
    let isMounted = true
    const controller = new AbortController()

    const getTransactions = async() => {
      try{
        const response = await axiosPrivateNew.get(`/transactions/${id}`, {signal: controller.signal})
        console.log(response.data);
        isMounted && setTransactions(response.data) 
      }catch(err){
        console.log(err);
        if(err.response){
          toast.error(err.response.data.error)
          navigate(-1)
        }
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
            <div className='flex items-center gap-2 '>
              <button className='bg-green-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' onClick={handleShowTransaction}>Make Transaction</button>
            </div>
            <div className='flex items-center gap-2'>
              <h4 className='m-0 font-bold '>Transaction</h4>

              <p className='m-0 '>#100001</p>
            </div>
            
          </div>

          <NavLink className='text-blue-500 p-1 border text-sm border-blue-500 rounded lg:text-light 2xl:p-2 2xl:rounded-lg' to="../dashboard">Add Account</NavLink>
        </div>

        <div className='bg-white w-full border border-gray-300 px-4 pt-4 py-8 rounded-lg mt-4 mb-8 overflow-y-auto'>
          <h4 className='text-2xl'>Transaction Information</h4>
          <div className='flex flex-wrap gap-8'>
            <div>
                <span className='text-xs text-gray-300'>Transaction no.</span>
                <p>#{transactions.receipt}</p>
            </div>
            <div>
                <span className='text-xs text-gray-300'>Transaction type</span>
                <p>{transactions.type}</p>
            </div>
            <div>
                <span className='text-xs text-gray-300'>Amount Transacted</span>
                <p>GH¢ {transactions.amount}</p>
            </div>
            <div>
                <span className='text-xs text-gray-300'>Previous Amount</span>
                <p>GH¢ {transactions.previousAmount}</p>
            </div>
            <div>
                <span className='text-xs text-gray-300'>Account Balance</span>
                <p>GH¢ {transactions.balanceAmount}</p>
            </div>
          </div>
          <div className='flex flex-wrap gap-8'>
            <div>
                <span className='text-xs text-gray-300'>Day Transacted</span>
                <p>{new Date(transactions.createdAt).toDateString()}</p>
            </div>
            <div>
                <span className='text-xs text-gray-300'>Transacted By</span>
                <p>{transactions?.user?.firstname} {transactions?.user?.lastname} {transactions?.user?.othernames}</p>
            </div>
          </div>
        </div>

        <div className='bg-white my-4 border border-gray-300 rounded-lg h-full relative'>
          <div className='image__bg w-full h-28 bg-gray-200 rounded-lg'></div>
          <div className='pt-8 px-4'>
            <div className='absolute w-28 h-28 rounded-full bg-white border border-gray-200 top-2 left-4'></div>
            {transactions?.savingAccount && (<>
              <h3>{transactions?.savingAccount?.firstname} {transactions?.savingAccount?.lastname} {transactions?.savingAccount?.othernames}</h3>
              <div className='flex flex-wrap gap-8'>
                <div>
                    <span className='text-xs text-gray-300'>Account Balance</span>
                    <p>GH¢ {transactions?.savingAccount?.balance}</p>
                </div>
                <div>
                    <span className='text-xs text-gray-300'>Account Number</span>
                    <p>{transactions?.savingAccount?.account}</p>
                </div>
                <div>
                    <span className='text-xs text-gray-300'>Email</span>
                    <p>{transactions?.savingAccount?.email}</p>
                </div>
                <div>
                    <span className='text-xs text-gray-300'>Phone</span>
                    <p>{transactions?.savingAccount?.phone ? transactions?.savingAccount?.phone : "-" }</p>
                </div>
                <div>
                    <span className='text-xs text-gray-300'>Ghana Card</span>
                    <p>{transactions?.savingAccount?.card ? transactions?.savingAccount?.card : "-" }</p>
                </div>
              </div>
            </>)}
            {transactions?.account && (<div className='flex flex-wrap gap-8'>
                <h3>{transactions?.account?.firstname} {transactions?.account?.lastname} {transactions?.account?.othernames}</h3>
                <div>
                    <span className='text-xs text-gray-300'>Loan Balance</span>
                    <p>{transactions?.account.balance}</p>
                </div>
                <div>
                    <span className='text-xs text-gray-300'>Account Number</span>
                    <p>{transactions?.account.account}</p>
                </div>
                <div>
                    <span className='text-xs text-gray-300'>Email</span>
                    <p>{transactions?.account.email}</p>
                </div>
                <div>
                    <span className='text-xs text-gray-300'>Phone</span>
                    <p>{transactions?.account.phone ? transactions?.account.phone : "-" }</p>
                </div>
                <div>
                    <span className='text-xs text-gray-300'>Ghana Card</span>
                    <p>{transactions?.account.card ? transactions?.account.card : "-" }</p>
                </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction