import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrderdetailsView from './order-details'

const AdminOrdersView = () => {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (
     <Card>
      <CardHeader>
        <CardTitle>All Orders History</CardTitle>
      </CardHeader>
        <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className='sr-only'>Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>123</TableCell>
              <TableCell>20/06/2025</TableCell>
              <TableCell>Process</TableCell>
              <TableCell>15430</TableCell>
              <TableCell>
                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                <Button onClick={()=>setOpenDetailsDialog(true)}>View Details</Button>
                <AdminOrderdetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrdersView