import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import UserCartItemsContent from './cart-items-content';
import { useNavigate } from 'react-router-dom';

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {

    const navigate = useNavigate();

    const totalCartAmount = cartItems && cartItems.length > 0 ?
        cartItems.reduce((sum, currentItem) => sum + (
            currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
        ) * currentItem?.quantity, 0) : 0

    const shippingCharge = 49;

    return (
        <SheetContent className="sm:max-w-md">
            <SheetHeader className="flex flex-row items-center gap-4">
                <SheetTitle className="text-gray-600">Your <span className='text-black text-xl font-extrabold'>Cart</span></SheetTitle>
                <div className='h-[3px] w-[100px] bg-black'></div>
            </SheetHeader>
            <div className='p-4'>
                <div className='space-y-4'>
                    {
                        cartItems && cartItems.length > 0 ?
                            cartItems.map(item =>
                                <UserCartItemsContent cartItem={item} />
                            ) : null
                    }
                </div>
                <div className='mt-8 space-y-4'>
                    <div className="flex justify-between mb-8">
                       <span className='text-gray-600'>CART <span className='text-black'>TOTALS</span></span>
                    </div>
                 
                    <div className="flex text-xs justify-between">
                        <span className='font-bold  "text-gray-600'>Subtotal</span>
                        <span className='font-bold'>Rs.{totalCartAmount}</span>
                    </div>
                       <hr />
                    <div className="flex text-xs justify-between">
                        <span className='font-bold  "text-gray-600'>Shipping Fee</span>
                        <span className='font-bold'>Rs.{shippingCharge}</span>
                    </div>
                       <hr />
                    <div className="flex font-extrabold justify-between">
                        <span className='font-bold  "text-black-600'>Total</span>
                        <span className='font-bold'>Rs.{totalCartAmount && totalCartAmount > 0 ? totalCartAmount+shippingCharge : 0}</span>
                    </div>
                </div>
                <Button
                    onClick={() => {navigate('/shop/checkout'); setOpenCartSheet(false)}}
                    className="w-full mt-6"
                    
                >
                    Checkout
                </Button>
            </div>
        </SheetContent>
    )
}

export default UserCartWrapper;