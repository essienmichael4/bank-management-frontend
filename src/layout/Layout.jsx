import React, { useEffect, useState } from 'react'
import './layout.css'
import { Outlet, NavLink, useResolvedPath } from 'react-router-dom'
import menu from './menu.svg'
import dashboard from './dashboard.svg'
import users from './users.svg'
import savings from './savings.svg'
import loans from './loans.svg'
import transactions from './transactions.svg'


function Layout() {
    const path = useResolvedPath().pathname.split("/")[2].toLocaleUpperCase()
    const date = useState(new Date().toDateString())

    useEffect(()=>{
        // setDay()
    })

  return (
    <>
        <aside className='fixed w-[220px] top-0 bottom-0 left-0 border-r border-primary-100 p-4'>
            <div className='mb-10'>
                <h1 className='text-xl'>BMS</h1>
            </div>
            <nav className='mt-4'>
                <ul className='flex flex-col gap-2'>
                    <li>
                        <NavLink to="dashboard" className='flex items-center rounded gap-4 p-2 hover:bg-gray-100'><span><img src={dashboard} alt="" className='w-6 h-6'/></span> <p>DASHBOARD</p></NavLink>
                    </li>
                    <li>
                        <NavLink to="savings" className='flex items-center rounded gap-4 p-2 hover:bg-gray-100'><span><img src={savings} alt="" className='w-6 h-6'/></span> <p>SAVINGS</p></NavLink>
                    </li>
                    <li>
                        <NavLink to="loans" className='flex items-center rounded gap-4 p-2 hover:bg-gray-100'><span><img src={loans} alt="" className='w-6 h-6'/></span> <p>LOANS</p></NavLink>
                    </li>
                    <li>
                        <NavLink to="transactions" className='flex items-center rounded gap-4 p-2 hover:bg-gray-100'><span><img src={transactions} alt="" className='w-6 h-6'/></span> <p>TRANSACTIONS</p></NavLink>
                    </li>
                    <li>
                        <NavLink to="users" className='flex items-center rounded gap-4 p-2 text-black hover:bg-gray-100'><span><img src={users} alt="" className='w-6 h-6'/></span> <p>USERS</p></NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
        <main className=''>
            <header className='sticky top-0 shadow mb-2 z-40'>
                <div className='w-full max-w-[1880px] mx-auto flex justify-between items-center py-4 px-4'>
                    <div>
                        <h2 className='text-2xl font-bold'>
                            {path}
                        </h2>
                        <p className='text-xs'>
                            {date}
                        </p>
                    </div>

                    <div className='flex gap-4 items-center'>
                        <form className='flex gap-2 py-2 pl-4 pr-2 border border-gray-300 rounded-lg'>
                            <input type="text" className='w-[400px] outline-0' placeholder='Search for account'/>
                            <button className='bg-gray-300 rounded py-1 px-2 font-semibold'>Search</button>
                        </form>
                        <div>
                            <h3 className='font-bold'>Michael Essien</h3>
                            <p className='text-sm text-gray-400'>Admin</p>
                        </div>
                        <div className='w-12 h-12 rounded-full bg-black'></div>
                    </div>
                </div>
            </header>
            <section>
                <div className='w-full max-w-[1880px] mx-auto flex justify-between items-center py-4 px-4'>
                    <Outlet />
                </div>
            </section>
        </main>
    </>
  )
}

export default Layout