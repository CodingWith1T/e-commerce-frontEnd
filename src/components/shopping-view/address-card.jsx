import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress}) => {

  return (
   <Card onClick={()=>setCurrentSelectedAddress ? setCurrentSelectedAddress(addressInfo) : null }>
    <CardContent className="grid p-4 gap-4">
        <Label>{addressInfo?.address}</Label>
        <Label>{addressInfo?.city}</Label>
        <Label>{addressInfo?.phone}</Label>
        <Label>{addressInfo?.pincode}</Label>
        <Label>{addressInfo?.notes}</Label>
    </CardContent>
    <CardFooter className="flex justify-between gap-2">
        <Button className="w-1/2" onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
        <Button className="w-1/2" onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
    </CardFooter>
   </Card> 
  )
}

export default AddressCard