import Address from '@/components/shopping-view/address'
import accImg from '../../assets/account.png'
import { useSelector } from 'react-redux'
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ShoppingCheckOut = () => {

  const { cartItems } = useSelector(state => state.shopCart);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
    cartItems.items.reduce((sum, currentItem) => sum + (
      currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
    ) * currentItem?.quantity, 0) : 0

  const shippingCharge = 49;

  return (

    <div className='flex flex-col'>
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={accImg}
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ?
              cartItems.items.map(item => (
                <UserCartItemsContent cartItem={item} />
              )) : null
          }
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
              <span className='font-bold'>Rs.{totalCartAmount && totalCartAmount > 0 ? totalCartAmount + shippingCharge : 0}</span>
            </div>
          </div>
          <div className='flex justify-end mt-4 w-full'>
            <Button className="w-1/2">
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckOut