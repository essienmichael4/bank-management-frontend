import React from 'react'
import './layout.css'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <aside className='fixed w-[220px] top-0 bottom-0 left-0 border-r border-primary-100 p-4'>
            <h1>BMS</h1>
            <nav className='mt-4'>
                <ul>
                    <li>
                        <a href=""><span></span> <p>DASHBOARD</p></a>
                    </li>
                    <li>
                        <a href=""><span></span> <p>SAVINGS</p></a>
                    </li>
                    <li>
                        <a href=""><span></span> <p>LOANS</p></a>
                    </li>
                    <li>
                        <a href=""><span></span> <p>TRANSACTIONS</p></a>
                    </li>
                    <li>
                        <a href=""><span></span> <p>USERS</p></a>
                    </li>
                </ul>
            </nav>
        </aside>
        <main className='container'>

            <div><Outlet /></div>
        </main>
    </div>
  )
}

export default Layout