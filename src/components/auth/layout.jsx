import React from 'react'
import { Outlet } from 'react-router-dom'
import banner from '../../assets/login.jpg'

const AuthLayout = () => {
    return (
<div className="flex min-h-screen w-full">

  <div className="relative hidden w-1/2 lg:flex items-center justify-center bg-black px-12">
    <img src={banner} alt="Banner" className="w-full h-full object-cover" />

    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-6">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Welcome to Shopping
      </h1>
    </div>
  </div>

  <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <Outlet />
  </div>
</div>

    )
}

export default AuthLayout

