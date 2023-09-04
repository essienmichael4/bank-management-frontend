import React, {useState, useEffect} from 'react'
import arrowleft from '../../assets/arrowleft.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios'
import search from '../../assets/search.svg'

const CreateLoansAccount = () => {
    const navigate = useNavigate()
    const axiosPrivateNew = useAxios()
    const [guarantedAmount, setGuarantedAmount] = useState(0)

    const [allAccounts,setAllAccounts] = useState([])

    const [work,setWork] = useState({
        employeeId: "",
        occupation: "",
        company: "",
        location: ""
    }) 
    const [address,setAddress] = useState({
        residentialAddress: "",
        homeTown: "",
        city: "",
        region: "",
        country: "",
        nationality: "",
        digital: ""
    })
    const [guarantors, setGuarantors] = useState([{
        accountNumber: "",
        name: "",
        amountGuaranteed: "",
        id: ""
    }])
    const [loanDetail,setLoanDetail] = useState({
        amount: 0,
        interest: 0,
        interestPercent:0,
        appliedAt: "",
        dueAt: "",
        modeOfPayment: "",
        totalAmount: 0,
        state: "NOT_LOANED"
    })
    const [account, setAccount] = useState({
        account: "",
        email: "",
        phone: "",
        firstname: "",
        lastname: "",
        othernames: "",
        dateOfBirth: "",
        gender: "",
        card: "",
        purpose: "",
        status: "PENDING"
    })
    const [sponsor, setSponsor] = useState({
        accountNumber: "",
        name: "",
        id: ""
    })

    useEffect( ()=>{
        let isMounted = true
        const controller = new AbortController()
    
        const getAccountNumber = async() => {
          let accountNumber = 0  
          try{
            const response = await axiosPrivateNew.get(`/loan/accounts/number`, {signal: controller.signal})
            console.log(response.data);
            !response.data[0]?.account ? accountNumber = "3000000000000" : accountNumber = response.data[0].account
            
          }catch(err){
            console.log(err);
          }
  
          accountNumber = parseInt(accountNumber) + 1
          setAccount({...account, account: accountNumber.toString()}) 
        }

        const getAccountNamesAndNumbers = async () =>{
            try{
                const response =  await axiosPrivateNew.get(`/saving/account`, {signal: controller.signal})
                setAllAccounts(response.data)
            }catch(err){
                console.log(err);
            }
        }
  
        getAccountNumber()
        getAccountNamesAndNumbers()
  
        return ()=>{
          isMounted = false
          controller.abort()
        }
      },[])

      const handleInerestPercentChange = (e)=>{
        let interestPercent = e.target.value || 0
        let amount = loanDetail.amount || 0

        let interest = (parseFloat(amount) * (parseFloat(interestPercent) / 100))
        let totalAmount =  (parseFloat(amount) + parseFloat(interest))

        setGuarantedAmount(totalAmount / guarantors.length)

        setLoanDetail({
            ...loanDetail,
            interestPercent: e.target.value,
            interest: interest,
            totalAmount: totalAmount
        })
      }

      const handleAmountChange = (e)=>{
        let interestPercent = loanDetail.interestPercent || 0
        let amount = e.target.value || 0

        let interest = (parseFloat(amount) * (parseFloat(interestPercent) / 100))
        let totalAmount =  (parseFloat(amount) + parseFloat(interest))

        setGuarantedAmount(totalAmount / guarantors.length)

        setLoanDetail({
            ...loanDetail,
            amount: e.target.value,
            interest: interest,
            totalAmount: totalAmount
        })

      }

      const findAccountByName = (name, i)=>{
        let acc = allAccounts.filter(acc =>{
                let names = name.split(" ")

                if(names.length === 2) names.push("")
                
                if( acc.firstname == names[0] && acc.lastname ==names[1] && acc.othernames == names[2] ){
                    return acc
                }
            })
            console.log(acc);
            console.log(i);
        const onChangeValue = [...guarantors]
        onChangeValue[i]['accountNumber'] = acc[0].account
        onChangeValue[i]['id'] = acc[0].id
        setGuarantors(onChangeValue)
        // console.log(guarantors);
      }

      const findAccountByNumber = (number, i)=>{
        let acc = allAccounts.filter(acc => number === acc.account)
        
        const onChangeValue = [...guarantors]
        onChangeValue[i]['id'] = acc[0].id
        onChangeValue[i]['name'] = `${acc[0].firstname} ${acc[0].lastname} ${acc[0].othernames}`
        setGuarantors(onChangeValue)
      }

      const findSponserByName = (name)=>{
        let acc = allAccounts.filter(acc =>{
            let names = name.split(" ")

            if(names.length === 2) names.push("")
            
            if( acc.firstname == names[0] && acc.lastname ==names[1] && acc.othernames == names[2] ){
                return acc
            }
        })

        setSponsor({
            accountNumber: acc[0].account,
            name: name,
            id: acc[0].id
        })
      }

      const findSponserByAccountNumber = (number)=>{
        let acc = allAccounts.filter(acc => number === acc.account)
        setSponsor({
            accountNumber: number,
            name: `${acc[0].firstname} ${acc[0].lastname} ${acc[0].othernames}`,
            id: acc[0].id
        })
      }

      const handleAddNewGuarantor = ()=> {
        setGuarantedAmount(loanDetail.totalAmount / guarantors.length)
        setGuarantors([...guarantors, {
                accountNumber: "",
                name: "",
                amountGuaranteed: "",
                id: ""
            }
        ])
      }

      const handleGuarantorChange = (e,i)=>{
        const {name, value} = e.target
        const onChangeValue = [...guarantors]
        onChangeValue[i][name] = value
        setGuarantors(onChangeValue)
      }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const newAccount = {
            ...account,
            sponsor: sponsor.id,
            work: work,
            address: address,
            guarantor: guarantors.map((guarantor) => {
                return {
                    savingId: guarantor.id,
                    amount: loanDetail.amount / guarantors.length
                }
            }),
            loanDetail: loanDetail
        }

        try{
            const response = await axiosPrivateNew.post("/loan/account",
             JSON.stringify(newAccount)
            );
            console.log(response.data);
            setWork({
                employeeId: "",
                occupation: "",
                company: "",
                location: ""
            }) 
            setLoanDetail({
                amount: 0,
                interest: 0,
                interestPercent:0,
                appliedAt: "",
                dueAt: "",
                modeOfPayment: "",
                totalAmount: 0,
                state: "NEW"
            })
            setGuarantors([{
                accountNumber: "",
                name: "",
                amountGuaranteed: "",
                id: ""
            }])
            setAddress({
                residentialAddress: "",
                homeTown: "",
                city: "",
                region: "",
                country: "",
                nationality: "",
                digital: ""
            })            
            setAccount({
                account: "",
                email: "",
                phone: "",
                firstname: "",
                lastname: "",
                othernames: "",
                dateOfBirth: "",
                status: "",
                gender: "",
                card: "",
            })
            toast.success("Loan Applied Successfully")
            navigate("../loans")
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
            {allAccounts.map(accountNum => {
                return (<option>{accountNum.account}</option>)
            })}
          </datalist>
          <datalist id='accountNames'>
            {allAccounts.map(accountName => {
                return (<option>{accountName.firstname} {accountName.lastname} {accountName.othernames}</option>)
            })}
          </datalist>
          <div className={` py-4 transition w-full `}>
            <div className='flex justify-between items-center pb-4'>
              <div className='flex items-center gap-4'>
                <button className='p-2 bg-blue-100 flex items-center justify-center rounded-lg' onClick={()=>{navigate(-1)}}>
                    <img src={arrowleft} alt="" className='w-4 h-4'/>
                  </button>
                <h4 className='m-0 font-bold '>Apply for Loan</h4>
              </div>
            </div>
            <div className='bg-white my-4 border border-gray-300 rounded-lg h-full relative'>
                <form className='pt-4 px-4' onSubmit={handleSubmit}>
                    <h3 className=''>Personal Information</h3>
                    <div>
                        <div className='flex flex-wrap gap-8'>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <span className='text-xs text-gray-300'>Account Number</span>
                                <input type="text" required onChange={(e)=> setAccount({...account, account: e.target.value})} value={account.account} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>First Name <span className='text-red-500'>*</span></label>
                                <input type="text" minLength={3} required onChange={(e)=> setAccount({...account, firstname: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Last Name <span className='text-red-500'>*</span></label>
                                <input type="text" required onChange={(e)=> setAccount({...account, lastname: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Other Names</label>
                                <input type="text" onChange={(e)=> setAccount({...account, othernames: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4 '>
                            <div className='flex flex-col gap-2 w-[74%] 2xl:w-[64.5%]'>
                                <label className='text-xs text-gray-500'>Email <span className='text-red-500'>*</span></label>
                                <input type="text" required onChange={(e)=> setAccount({...account, email: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Phone <span className='text-red-500'>*</span></label>
                                <input type="text" onChange={(e)=> setAccount({...account, phone: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4'>
                        <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Ghana Card</label>
                                <input type="text" onChange={(e)=> setAccount({...account, card: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Date of Birth <span className='text-red-500'>*</span></label>
                                <input type="date" required onChange={(e)=> setAccount({...account, dateOfBirth: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                            <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                <label className='text-xs text-gray-500'>Gender <span className='text-red-500'>*</span></label>
                                <input type="text" required onChange={(e)=> setAccount({...account, gender: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-8 my-4'>
                            <div className='flex flex-col gap-2 w-full 2xl:w-[87%]'>
                                <span className='text-xs text-gray-300'>Purpose</span>
                                <textarea required onChange={(e)=> setAccount({...account, purpose: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <h4 className='font-bold'>Loan Details</h4>
                        <div>
                            <div className='flex flex-wrap gap-8'>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Amount Requested <span className='text-red-500'>*</span></label>
                                    <input type="number"
                                        required 
                                        onChange={ handleAmountChange } 
                                        className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Interest Percentage <span className='text-red-500'>*</span></label>
                                    <input type="number" 
                                        required 
                                        onChange={ handleInerestPercentChange } 
                                        className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Interest <span className='text-red-500'>*</span></label>
                                    <input type="text" 
                                        value={loanDetail.interest}
                                        disabled 
                                        onChange={(e)=> setLoanDetail({...loanDetail, interest: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Amount to be paid <span className='text-red-500'>*</span></label>
                                    <input type="text" 
                                        value={loanDetail.totalAmount}
                                        disabled 
                                        onChange={(e)=> setLoanDetail({...loanDetail, totalAmount: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-8 my-4 '>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Day Applied</label>
                                    <input type="date" value={loanDetail.appliedAt} onChange={(e)=> setLoanDetail({...loanDetail, appliedAt: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Due Date</label>
                                    <input type="date" value={loanDetail.dueAt} onChange={(e)=> setLoanDetail({...loanDetail, dueAt: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Mode of Payment <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setLoanDetail({...loanDetail, modeOfPayment: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <h4 className='font-bold'>Address</h4>
                        <div>
                            <div className='flex flex-wrap gap-8'>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Nationality</label>
                                    <input type="text" value={address.nationality} onChange={(e)=> setAddress({...address, nationality: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Country <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setAddress({...address, country: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Region <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setAddress({...address, region: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>City <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setAddress({...address, city: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                
                            </div>
                            
                            <div className='flex flex-wrap gap-8 my-4 '>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Home Town <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setAddress({...address, homeTown: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-[54%] 2xl:w-[64.5%]'>
                                    <label className='text-xs text-gray-500'>Residential Address <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setAddress({...address, residentialAddress: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Digital</label>
                                    <input type="text" value={address.digital} onChange={(e)=> setAddress({...address, digital: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                
                            </div>
                            <div className='flex flex-wrap gap-8 my-4 '>
                            </div>
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <h4 className='font-bold'>Work Information</h4>
                        <div>
                            <div className='flex flex-wrap gap-8'>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Occupation <span className='text-red-500'>*</span></label>
                                    <input type="text" required onChange={(e)=> setWork({...work, occupation: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Company</label>
                                    <input type="text" onChange={(e)=> setWork({...work, company: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <label className='text-xs text-gray-500'>Employee Number <label>(if applicable)</label></label>
                                    <input type="text" onChange={(e)=> setWork({...work, employeeId: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-8 my-4 '>
                                <div className='flex flex-col gap-2 w-[74%] 2xl:w-[64.5%]'>
                                    <label className='text-xs text-gray-500'>Location/Address </label>
                                    <input type="text" onChange={(e)=> setWork({...work, location: e.target.value})} className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <div className='flex gap-4'>
                            <h4 className='font-bold'>Guarantor Information</h4>
                            <button type='button' onClick={handleAddNewGuarantor}>Add Guarantor</button>
                        </div>
                        <div>
                            {guarantors.map((guarantor, i)=>{
                                return (
                                    <div className='flex flex-wrap gap-8 mb-4'>
                                        <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                            <span className='text-xs text-gray-300'>Guarantors Account</span>
                                            <div className='border flex gap-2 border-gray-300 p-1 rounded-lg'>
                                                <input type="text"
                                                 name='accountNumber'
                                                 list='accountNumbers'
                                                 value={guarantor.accountNumber}
                                                 onChange={(e)=>handleGuarantorChange(e,i)}
                                                 className='text-xs placeholder:text-xs p-1 outline-0 flex-1 w-20' 
                                                 placeholder='Search by account no.'/>
                                                <button type='button' onClick={()=>findAccountByNumber(guarantor.accountNumber, i)} className='h-6 w-6 bg-blue-100 rounded p-1'><img src={search} className='' alt="" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                            <span className='text-xs text-gray-300'>Guarantors Name</span>
                                            <div className='border flex gap-2 border-gray-300 p-1 rounded-lg'>
                                                <input type="text" 
                                                 value={guarantor.name}
                                                 name='name'
                                                 list='accountNames'
                                                 onChange={(e)=>handleGuarantorChange(e,i)}
                                                 className='text-xs placeholder:text-xs p-1 outline-0 flex-1 w-20' 
                                                 placeholder='Search by name'/>
                                                <button type='button' onClick={()=>findAccountByName(guarantor.name, i)} className='h-6 w-6 bg-blue-100 rounded p-1'><img src={search} className='' alt="" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                            <span className='text-xs text-gray-300'>Amount Guaranteed</span>
                                            <input type="text" 
                                             name='amountGuaranteed'
                                             value={guarantedAmount}
                                             disabled
                                             className='py-1 px-2 text-sm rounded border border-slate-200 w-full' />
                                        </div>
                                    </div> 
                                )
                            })}
                        </div>
                    </div>
                    <div className={` border-t border-gray-200 pt-4`}>
                        <h4 className='font-bold'>Sponsor Information</h4>
                        <div>
                            <div className='flex flex-wrap gap-8 mb-4'>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Sponsor Account</span>
                                    <div className='border flex gap-2 border-gray-300 p-1 rounded-lg'>
                                        <input type="text" value={sponsor.accountNumber} list='accountNumbers' onChange={(e) =>setSponsor({...sponsor, accountNumber: e.target.value})} className='text-xs placeholder:text-xs p-1 outline-0 flex-1 w-20' placeholder='Search by account no.'/>
                                        <button type='button' onClick={()=>findSponserByAccountNumber(sponsor.accountNumber)} className='h-6 w-6 bg-blue-100 rounded p-1'><img src={search} className='' alt="" />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 w-60 2xl:w-[20%]'>
                                    <span className='text-xs text-gray-300'>Sponsor Name</span>
                                    <div className='border flex gap-2 border-gray-300 p-1 rounded-lg'>
                                        <input type="text" value={sponsor.name} list='accountNames' onChange={(e) =>setSponsor({...sponsor, name: e.target.value})} className='text-xs placeholder:text-xs p-1 outline-0 flex-1 w-20' placeholder='Search by name'/>
                                        <button type='button' onClick={()=>findSponserByName(sponsor.name)} className='h-6 w-6 bg-blue-100 rounded p-1'><img src={search} className='' alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button className='mb-8 mt-4 w-1/4 bg-blue-300 py-2 rounded-full text-white'>Create Account</button>
                </form>
            </div>
          </div>
        </div>
      )
}

export default CreateLoansAccount