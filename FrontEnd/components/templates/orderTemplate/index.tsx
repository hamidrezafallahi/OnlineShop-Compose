"use client"
import { useState } from 'react';

import OrderDetails from './orderDetails';
import OrderList from './orderList';

export default function OrderTemplate() {

  const [selectedOrderId,setSelectedOrderId]=useState<null|number>(null)
  return (
  <div className="bg-black p-4 h-screen overflow-hidden text-white">
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 mx-auto max-w-7xl h-full">

        {/* LEFT – Orders List */}
          <OrderList setSelectedOrderId={setSelectedOrderId} selectedOrderId={selectedOrderId} />
        {/* RIGHT – Order Details */}
        <div className="lg:col-span-2 bg-zinc-900 p-4 rounded-lg h-full overflow-hidden">
          <OrderDetails selectedOrderId={selectedOrderId} />
        </div>

      </div>
    </div>
  );
}
