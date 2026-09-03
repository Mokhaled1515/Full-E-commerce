import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoCloseSharp } from "react-icons/io5";

const UserMenuMobile = () => {
  return (
    <section className='bg-white dark:bg-gray-600 dark:text-teal-50 h-full w-full py-2'>
      <button onClick={()=>window.history.back()} className='text-neutral-800 block w-fit ml-auto p-4 '>
      <IoCloseSharp size={25} className='cursor-pointer dark:text-white'/>

      </button>
        <div className='container mx-auto px-3 pb-8'>
        <UserMenu/>
        </div>
    </section>
  )
}

export default UserMenuMobile