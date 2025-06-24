import { HousePlug } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <div className='sticky bottom-0 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <div className="flex items-center gap-2 mb-5">
                        <HousePlug className='w-6' />
                        <span className='font-bold'>Ecommerce</span>
                    </div>
                    <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae odit necessitatibus aspernatur praesentium obcaecati neque, debitis rerum iusto iure saepe!</p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>Products</li>
                        <li>Men</li>
                        <li>Women</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>
                            <a href="tel:+918448079624" className="hover:underline">+91-844-807-9624</a>
                        </li>
                        <li>
                            <a href="mailto:abhishek.raghav1t@gmail.com" className="hover:underline">abhishek.raghav1t@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ Ecommerce.com - All Right Reserved.</p>
                <p className='py-5 text-sm text-center'>Follow us on Instagram for daily style inspo</p>
            </div>
        </div>


    )
}

export default Footer