import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)
  // console.log("user Dashboard", user)
  return (
    <section className='bg-white dark:bg-gray-800 dark:text-gray-200'>
        <div className='container mx-auto p-3 flex gap-0 justify-between w-full'>
            {/* left for menu */}
             <div className='py-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto hidden
              w-1/4 lg:block border-r border-blue-200'>
              <UserMenu/>
             </div>
          
          {/* right for menu */}
             <div className='bg-white dark:bg-gray-800 min-h-[75vh] w-full p-4'>
             <Outlet/>
             </div>
        </div>
    </section>
  )
}

export default Dashboard