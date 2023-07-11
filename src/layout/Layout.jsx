import React, { useEffect, useState } from 'react'
import './layout.css'
import { Outlet, NavLink, useResolvedPath } from 'react-router-dom'
import menu from './menu.svg'
import dashboard from './dashboard.svg'
import users from './users.svg'
import savings from './savings.svg'
import loans from './loans.svg'
import transactions from './transactions.svg'
import close from './close.svg'
import arrow from './arrow.svg'


function Layout() {
    const path = useResolvedPath().pathname.split("/")[2].toLocaleUpperCase()
    const date = useState(new Date().toDateString())
    const [isToggled, setIsToggled] = useState(false)

    function toggleMenu(){
        setIsToggled(!isToggled)
    }

    useEffect(()=>{
        // setDay()
    })

  return (
    <>
        <aside className={`${isToggled && 'active'} lg:fixed lg:w-[220px] lg:top-0 bottom-0 left-0 lg:border-r lg:border-primary-100 p-4 overflow-hidden`}>
            <img src={close} className='w-6 h-6 absolute right-2 top-2 lg:hidden' alt="" onClick={toggleMenu}/>
            <div className='mb-10 mt-4'>
                <h1 className='text-xl font-bold'>BMS</h1>
            </div>
            <nav className='mt-4'>
                <ul className='flex flex-col gap-2'>
                    <li>
                        <NavLink to="dashboard" className='text-xs flex items-center rounded gap-4 p-2 hover:bg-gray-100'><img src={dashboard} alt="" className='w-6 h-6 mr-2'/> <span>DASHBOARD</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="savings" className='text-xs flex items-center rounded gap-4 p-2 hover:bg-gray-100'><img src={savings} alt="" className='w-6 h-6 mr-2'/> <span>SAVINGS</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="loans" className='text-xs flex items-center rounded gap-4 p-2 hover:bg-gray-100'><img src={loans} alt="" className='w-6 h-6 mr-2'/> <span>LOANS</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="transactions" className='text-xs flex items-center rounded gap-4 p-2 hover:bg-gray-100'><img src={transactions} alt="" className='w-6 h-6 mr-2'/> <span>TRANSACTIONS</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="users" className='text-xs flex items-center rounded gap-4 p-2 text-black hover:bg-gray-100'><img src={users} alt="" className='w-6 h-6 mr-2'/> <span>USERS</span></NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
        <main className={`${isToggled && 'active'} bg-gray-100`}>
            <header className='sticky top-0 bg-white shadow  z-10'>
                <div className='hidden cursor-pointer lg:flex items-center justify-center absolute w-6 h-6 left-[-.8rem] top-4 2xl:top-6 z-2 bg-white p border border-gray-300 rounded-full' onClick={toggleMenu}>
                    <img src={arrow} className={`${!isToggled && 'active'} w-4 h-4 arrow`} alt="" />
                </div>
                <div className='w-full max-w-[1880px] mx-auto flex justify-between items-center py-2 2xl:py-4 px-2 md:px-4'>
                    
                    <img src={menu} className='w-6 h-6 lg:hidden mr-2' alt="" onClick={toggleMenu} />
                    
                    <div className='hidden md:flex md:flex-col md:gap-0'>
                        <h2 className='text-2xl font-bold m-0'>
                            {path}
                        </h2>
                        <p className='text-xs m-0'>
                            {date}
                        </p>
                    </div>

                    <div className='flex gap-2 lg:gap-4 items-center'>
                        <form className='flex gap-1 md:gap-2 py-1 md:py-1 2xl:py-2 pl-1 md:pl-4 pr-1 2xl:pr-2 border border-gray-300 rounded-lg '>
                            <input type="text" className='max-w-xl flex-1 text-xs min-w-[100px] outline-0 md:text-base' placeholder='Search for account'/>
                            <button className='bg-gray-300 text-xs rounded py-1 px-1 md:px-2 font-semibold md:text-base'>Search</button>
                        </form>
                        <div className='hidden md:block'>
                            <h3 className='font-bold m-0'>Michael Essien</h3>
                            <p className='text-sm text-gray-400 m-0'>Admin</p>
                        </div>
                        <div className='w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12 rounded-full bg-black'></div>
                    </div>
                </div>
            </header>
            <section>
                <div className='w-full max-w-[1880px] mx-auto z-0 py-0 px-4'>
                    <Outlet />
                </div>
            </section>
        </main>
    </>
  )
}

export default Layout