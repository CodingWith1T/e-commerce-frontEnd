import React from 'react'
import ShoppinHeader from './header'
import { Outlet } from 'react-router-dom'

const ShoppingLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* common header */}
        <ShoppinHeader/>
        <div className='flex flex-col w-full'>
            <Outlet/>
        </div>
    </div>
  )
}

export default ShoppingLayout