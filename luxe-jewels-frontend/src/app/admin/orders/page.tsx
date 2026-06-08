"use client";

import React, { useEffect, useState } from 'react';
import OrderTable from '@/components/admin/OrderTable';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for Phase 2
    // In production, fetch from /api/admin/orders
    setTimeout(() => {
      setOrders([]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-heading tracking-widest uppercase text-gray-900 mb-8">Orders</h1>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <OrderTable orders={orders} />
      )}
    </div>
  );
}
