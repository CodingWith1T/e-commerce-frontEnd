import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, deleteAddress, editAddress, fetchAddress } from '@/store/shop/address-slice'
import AddressCard from './address-card'
import { toast } from 'sonner'

const initialAddressFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: ''
}

const Address = ({ selectedId, setCurrentSelectedAddress }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { addressList } = useSelector(state => state.shopAddress);

  function handleMangeAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3) {
      setFormData(initialAddressFormData)
      toast("You can add only 3 addresses")
      return;
    }

    currentEditedId !== null ?
      dispatch(editAddress({
        userId: user?.id, addressID: currentEditedId, formData
      })).then((data => {
        if (data?.payload?.success) {
          dispatch(fetchAddress(user?.id))
          setCurrentEditedId(null)
          setFormData(initialAddressFormData)
          toast("Address updated successfully")
        }
      })) :

      dispatch(addAddress({
        ...formData,
        userId: user?.id
      })).then(data => {
        if (data?.payload?.success) {
          dispatch(fetchAddress(user?.id))
          setFormData(initialAddressFormData)
          toast("Address added successfully")
        }
      })
  }

  function isFormValid() {
    return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item)
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id }))
    if (data?.payload?.success) {
      dispatch(fetchAddress(user?.id))
      toast("Address deleted successfully")
    }
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress._id)
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    })
  }

  useEffect(() => {
    dispatch(fetchAddress(user?.id))
  }, [dispatch]);

  return (
    <Card>
      <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2'>
        {
          addressList && addressList.length > 0 ?
            addressList.map(singleAddressItem => (
              <AddressCard
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
                selectedId={selectedId}
                 />)) : null
        }
      </div>
      <CardHeader>
        <CardTitle>
          {
            currentEditedId !== null ? 'Edit Address' : 'Add New Address'
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={
            currentEditedId !== null ? 'Edit' : 'Add'
          }
          onSubmit={handleMangeAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  )
}

export default Address