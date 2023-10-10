import React, { useEffect, useState } from 'react'
import AccountTransactionTable from '../../components/accountTransactionsTable/AccountTransactionTable';
import './savingsaccount.css'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import refresh from '../../assets/refresh.svg'
import search from '../../assets/search.svg'
import close from '../../assets/close.svg'
import arrow from '../../assets/arrow.svg'
import arrowleft from '../../assets/arrowleft.svg'
import useAxios from '../../hooks/useAxios'
import useAuth from '../../hooks/useAuth';


const SavingsAccount = () => {
    const navigate = useNavigate()
    const {auth} = useAuth()
    const {id} =useParams()
    const axiosPrivateNew = useAxios()

    const [transaction, setTransaction] = useState({
      accountNumber: "",
      transactionType: "DEPOSITE",
      transactedAmount: ""
    })
    const [filters, setFilters] = useState({
      all: true,
      deposite: false,
      debit: false,
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
          const response = await axiosPrivateNew.get(`/saving/account/${id}`, {signal: controller.signal})
          setTransactions(response.data.transactions) 
          setShownTransactions(response.data.transactions) 
          setTransaction({...transaction, accountNumber: response.data.account})
          isMounted && setAccount(response.data) 
          
        }catch(err){
          if(err.response){
            toast.error(err.response.data.error)
            navigate("../savings")
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
        const response = await axiosPrivateNew.get(`/saving/account/${id}`)
        setTransactions(response.data.transactions) 
        setShownTransactions(response.data.transactions) 
        setTransaction({...transaction, accountNumber: response.data.account})
        setAccount(response.data) 
        
      }catch(err){
        if(err.response){
          toast.error(err.response.data.error)
          navigate("../savings")
        }
      }
    }

  function handleShowTransaction(){
      setShowTransaction(!showTransaction)
  }

  function toggleDetails(){
      setIsToggled(!isToggled)
  }

  const makeTransaction = async (e)=>{
    e.preventDefault()
    console.log(transaction);
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

  const handleFilters = (filter)=>{
    const filteredAccounts = transactions.filter(transaction =>{
      if(filter == "all") return transaction

      return transaction.type.toLowerCase() == filter
    })
    setShownTransactions(filteredAccounts)
    setFilters({
        all: filter == "all",
        deposite: filter == "deposite",
        debit: filter == "debit",
    })
  }

  const handleDisableAccount = async () => {
    try{
      const response = await axiosPrivateNew.put(`/saving/disable/${account?.account}`)
      toast.success(response.data.message)
      getAccounts()
    }catch(err){
      console.log(err);
      if(err.response){
        toast.error(err.response.data.error)
      }
    }
  }

  const handleCloseAccount = async () => {
    try{
      const response = await axiosPrivateNew.put(`/saving/close/${account?.account}`)
      toast.success(response.data.message)
      getAccounts()
    }catch(err){
      console.log(err);
      if(err.response){
        toast.error(err.response.data.error)
      }
    }
  }

  const handleEnableAccount = async () => {
    try{
      const response = await axiosPrivateNew.put(`/saving/activate/${account?.account}`)
      toast.success(response.data.message)
      getAccounts()
    }catch(err){
      console.log(err);
      if(err.response){
        toast.error(err.response.data.error)
      }
    }
  }

  const handleTransactionSearch = (e)=>{
    const filteredAccounts = transactions.filter(transaction =>{
      return transaction.receipt.toLowerCase().includes(e.target.value)
    })
    setShownTransactions(filteredAccounts)
  }

  return (
    <div className='flex flex-col items-center md:items-start md:flex-row relative md:gap-4'>
      
      <div className={`${!showTransaction && 'hidden'} h-full w-full md:w-[450px] transition md:relative bg-white mt-4 rounded-lg border border-gray-300`}>
        <div className='py-4 px-2'>
          <h4>Make Transaction</h4>
          <button onClick={handleShowTransaction} className='p-1 absolute right-0 top-2'>
            <img className='w-4 h-4'  src={close} alt="" />
          </button>
          <form className='mt-4 flex flex-col gap-2' onSubmit={makeTransaction}>
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
                <select name="" id="" value={transaction.transactionType} onChange={(e)=>{
                  setTransaction({...transaction, transactionType:e.target.value})
                }}>
                  <option value="Deposite">Deposite</option>
                  <option value="Debit">Debit</option>
                </select>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-xs text-gray-500'>Transacted Amount</span>
                <input type="text" 
                  value={transaction.transactedAmount} 
                  onChange={e =>{setTransaction({...transaction, transactedAmount:e.target.value})}} className='border border-gray-300 p-2 outline-0 rounded-lg'/>
              </div>
            </div>
            <button className='rounded-full bg-blue-300 py-2 text-white mt-4'>Proceed with Transaction</button>
          </form>
          </div>
      </div>
      <div className={`${showTransaction && ''} py-4 transition w-full `}>
        <div className='flex justify-between items-center pb-4'>
          <div className='flex items-center gap-4'>
            <button className='p-2 bg-blue-100 flex items-center justify-center rounded-lg' onClick={()=>{navigate(-1)}}>
                <img src={arrowleft} alt="" className='w-4 h-4'/>
              </button>
            <h4 className='m-0 font-bold '>Savings Account</h4>

            <div className='flex items-center gap-2 '>
              <button className='bg-green-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' onClick={handleShowTransaction}>Make Transaction</button>
            </div>
          
          </div>
          <div>
            {auth?.user?.role !== "USER" && <div className='flex gap-2'>
              {
                account?.status !== "CLOSED" &&
                <button onClick={handleCloseAccount} className='bg-red-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' >Close Account</button>
              }
              {
                account?.status !== "DISABLED" && account?.status !== "CLOSED" &&
                <button onClick={handleDisableAccount} className='bg-yellow-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' >Disable Account</button>
              }
              {
                account?.status !== "CLOSED" && account?.status !== "ACTIVE" &&
                <button onClick={handleEnableAccount} className='bg-green-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' >Enable Account</button>
              }
            </div>}
          </div>
        </div>
        <div className='bg-white my-4 border border-gray-300 rounded-lg h-full relative'>
            <div className='image__bg w-full h-28 bg-gray-200 rounded-lg relative'>
              <span className={`${account.status == "ACTIVE" && "bg-green-400"} ${account.status == "DISABLED" && "bg-yellow-400"} ${account.status == "CLOSED" && "bg-red-400"} rounded-lg text-white absolute right-2 top-2 py-2 px-4`}>{account.status}</span>
            </div>
            <div className='pt-4 px-4'>
                <div className='absolute w-28 h-28 rounded-full bg-white border border-gray-200 top-2 left-4'></div>
                <h3>{account?.firstname} {account?.lastname} {account?.othernames}</h3>
                <div className='flex flex-wrap gap-8'>
                    <div>
                        <span className='text-xs text-gray-300'>Account Balance</span>
                        <p>GH¢ {account?.balance}</p>
                    </div>
                    <div>
                        <span className='text-xs text-gray-300'>Account Number</span>
                        <p>{account?.account}</p>
                    </div>
                    <div>
                        <span className='text-xs text-gray-300'>Email</span>
                        <p>{account?.email}</p>
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
                    <h4 className='font-bold'>Family Details</h4>
                    <div className='flex gap-8 flex-wrap'>
                        <div>
                            <span className='text-xs text-gray-300 '>Marital Status</span>
                            <p>{account.family?.maritalStatus}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Spouse Name</span>
                            <p>{account.family?.spouseName ? account.family.spouseName : "-"}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>No. of Children</span>
                            <p>{account.family?.noOfChildren ? account.family.noOfChildren : "-"}</p>
                        </div>
                    </div>
                </div>
                <div className={`${!isToggled && 'hidden'} border-t border-gray-200 pt-4`}>
                    <h4 className='font-bold'>Next of Kin Details</h4>
                    <div className='flex gap-8 flex-wrap'>
                        <div>
                            <span className='text-xs text-gray-300 '>Name</span>
                            <p>{account.nextOfKin?.firstname} {account.nextOfKing?.lastname} {account.nextOfKing?.othernames}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Relation</span>
                            <p>{account.nextOfKin?.relation}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Phone</span>
                            <p>{account.nextOfKin?.phone}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Occupation</span>
                            <p>{account.nextOfKin?.occupation}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Residential Address</span>
                            <p>{account.nextOfKin?.residentialAddress}</p>
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
              <h5 className='text-xl m-0'>Transactions</h5><span className='text-xs mt-2 text-gray-300'>{shownTransactions.length} transactions found</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='border flex items-center gap-2 border-gray-300 p-2 rounded-lg'>
                <span className='h-6 w-6'><img src={search} className='' alt="" /></span>
                <input type="text" className='outline-0 py-[.18rem]' onChange={handleTransactionSearch} placeholder='Search account'/>
              </div>
              <div className='flex flex-wrap bg-gray-200 p-1 rounded-lg'>
              <button onClick={()=> handleFilters("all")} className={`${filters.all && 'active'} filter filter text-sm flex whitespace-no-wrap items-center justify-center py-2 px-2`}>All</button>
                <button onClick={()=> handleFilters("deposite")} className={`${filters.deposite && 'active'} filter filter text-sm flex whitespace-no-wrap items-center justify-center py-2 px-2`}>Deposite</button>
                <button onClick={()=> handleFilters("debit")} className={`${filters.debit && 'active'} filter filter text-sm flex whitespace-no-wrap items-center justify-center py-2 px-2`}>Debit</button>
              </div>
              <button className='p-1 bg-blue-100 flex items-center justify-center rounded-lg'>
                <img src={refresh} alt="" className='w-6 h-6'/>
              </button>
            </div>
          </div>

          <div className='min-w-[800px]'>
            {shownTransactions.length === 0 ? 
              <div>No Transactions found</div> : 
              
              <AccountTransactionTable shownTransactions={shownTransactions} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavingsAccount
