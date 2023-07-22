import React, { useEffect, useState } from 'react'
import './savingsaccount.css'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import refresh from '../../assets/refresh.svg'
import search from '../../assets/search.svg'
import close from '../../assets/close.svg'
import arrow from '../../assets/arrow.svg'
import arrowleft from '../../assets/arrowleft.svg'
import useAxios from '../../hooks/useAxios'


const SavingsAccount = () => {
    const navigate = useNavigate()
    const {id} =useParams()
    const axiosPrivateNew = useAxios()

    const [showTransaction, setShowTransaction] = useState(false)
    const [isToggled, setIsToggled] = useState(false)
    const [account,setAccount] = useState({})
    const [transactions, setTransactions] = useState([])
    const [transactionCount,setTransactionCount] = useState()

    useEffect( ()=>{
      let isMounted = true
      const controller = new AbortController()
  
      const getAccounts = async() => {
        try{
          const response = await axiosPrivateNew.get(`/saving/account/${id}`, {signal: controller.signal})
          console.log(response.data);
          // console.log(response.data.count._count.id)
          // setCountAccount(response.data.count._count.id)
          setTransactions(response.data.transactions) 
          isMounted && setAccount(response.data) 
          
        }catch(err){
          console.log(err);
        }

        // !account.firstname && navigate("../savings")
        if(!account.firstname){
          toast.error("Account does not exist")
          navigate("../savings")
        }
      }

      getAccounts()

      return ()=>{
        isMounted = false
        controller.abort()
      }
    },[])


    function handleShowTransaction(){
        setShowTransaction(!showTransaction)
    }
    function toggleDetails(){
        setIsToggled(!isToggled)
    }
  return (
    <div className='flex flex-col items-center md:items-start md:flex-row relative md:gap-4'>
      <div className={`${!showTransaction && 'hidden'} h-full w-full md:w-[450px] transition md:relative bg-white mt-4 rounded-lg border border-gray-300`}>
        <div className='py-4 px-2'>
          <h4>Make Transaction</h4>
          <button onClick={handleShowTransaction} className='p-1 absolute right-0 top-2'>
            <img className='w-4 h-4'  src={close} alt="" />
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
          <div className='flex items-center gap-4'>
            <button className='p-2 bg-blue-100 flex items-center justify-center rounded-lg' onClick={()=>{navigate(-1)}}>
                <img src={arrowleft} alt="" className='w-4 h-4'/>
              </button>
            <h4 className='m-0 font-bold '>Savings Account</h4>

            <div className='flex items-center gap-2 '>
              <button className='bg-green-500 text-sm lg:text-light text-white p-1 rounded 2xl:p-2 2xl:rounded-lg' onClick={handleShowTransaction}>Make Transaction</button>
            </div>
          </div>
        </div>
        <div className='bg-white my-4 border border-gray-300 rounded-lg h-full relative'>
            <div className='image__bg w-full h-28 bg-gray-200 rounded-lg'></div>
            <div className='pt-4 px-4'>
                <div className='absolute w-28 h-28 rounded-full bg-white border border-gray-200 top-2 left-4'></div>
                <h3>{account.firstname} {account.lastname} {account.othernames}</h3>
                <div className='flex flex-wrap gap-8'>
                    <div>
                        <span className='text-xs text-gray-300'>Account Balance</span>
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
                            <p>{account.nextOfKing?.firstname} {account.nextOfKing?.lastname} {account.nextOfKing?.othernames}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Relation</span>
                            <p>{account.nextOfKing?.relation}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Phone</span>
                            <p>{account.nextOfKing?.phone}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Occupation</span>
                            <p>{account.nextOfKing?.occupation}</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-300 '>Residential Address</span>
                            <p>{account.nextOfKing?.residentialAddress}</p>
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
              <h5 className='text-xl m-0'>Transactions</h5><span className='text-xs mt-2'>{transactionCount} accounts found</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='border flex items-center gap-2 border-gray-300 p-1 rounded-lg'>
                <span className='h-4 w-4'><img src={search} className='' alt="" /></span>
                <input type="text" className='outline-0 text-xs py-[.18rem]' placeholder='Search account'/>
              </div>
              <div className='flex flex-wrap bg-gray-200 p-1 rounded-lg'>
                <button className='active filter text-xs flex whitespace-no-wrap items-center justify-center py-1 px-2'>All</button>
                <button className=' filter text-xs flex whitespace-no-wrap items-center justify-center py-1 px-1'>Deposites</button>
                <button className=' filter text-xs flex whitespace-no-wrap items-center justify-center py-1 px-1'>Debits</button>
              </div>
              <button className='p-1 bg-blue-100 flex items-center justify-center rounded-lg'>
                <img src={refresh} alt="" className='w-6 h-6'/>
              </button>
            </div>
          </div>

          <div className='min-w-[800px]'>
            {transactions.length === 0 ? 
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
                  {transactions.map((transaction)=>{
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
    // <div>SavingsAccount</div>
  )
}

export default SavingsAccount
