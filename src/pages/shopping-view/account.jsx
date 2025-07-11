import { TabsContent, TabsList } from '@radix-ui/react-tabs'
import accImg from '../../assets/account.png'
import { Tabs, TabsTrigger } from "@/components/ui/tabs"
import Address from '@/components/shopping-view/address'
import ShoppingOrders from '@/components/shopping-view/orders'

const ShoppingAccount = () => {
  return (
    <div className='flex flex-col'>
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 ap-9 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value='orders'>
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value='address'>
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount