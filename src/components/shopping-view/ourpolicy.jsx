import { BadgeCheck, CircleCheckBig, Handshake } from 'lucide-react'
import React from 'react'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-center gap-12 sm:gap-2 text-center py-12 text-xs sm:text-sm md:text-base text-gray-700'>
        <div className='px-10'>
            <CircleCheckBig className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>we offer hassle free exchange policy</p>
        </div>
        <div className='px-10'>
            <BadgeCheck className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>
        <div className='px-10'>
            <Handshake className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Best customer support</p>
            <p className='text-gray-400'>we provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy