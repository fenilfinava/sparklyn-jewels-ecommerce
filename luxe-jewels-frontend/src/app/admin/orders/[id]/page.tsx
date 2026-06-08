"use client";

import React, { use } from 'react';
import Link from 'next/link';

export default function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  // Mock order details for phase 2.
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin/orders" className="text-gray-500 hover:text-black text-sm mb-2 inline-block">&larr; Back to Orders</Link>
          <h1 className="text-2xl font-heading tracking-widest uppercase text-gray-900">Order #{orderId}</h1>
        </div>
        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Processing
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Items Summary</h2>
            <div className="divide-y divide-gray-100">
              <div className="py-4 flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Solitaire Engagement Ring</p>
                  <p className="text-xs text-gray-500">18K White Gold, Size 6</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$1599.00</p>
                  <p className="text-xs text-gray-500">Qty: 1</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">$1599.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-base font-bold mt-4 pt-4 border-t border-gray-100">
                <span>Total</span>
                <span>$1599.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Customer Details</h2>
            <div className="space-y-3 text-sm">
              <p><span className="text-gray-500 w-20 inline-block">Name:</span> John Doe</p>
              <p><span className="text-gray-500 w-20 inline-block">Email:</span> john@example.com</p>
              <p><span className="text-gray-500 w-20 inline-block">Phone:</span> +1 234 567 8900</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Shipping Address</h2>
            <address className="not-italic text-sm text-gray-600 leading-relaxed">
              123 Jewelry Lane<br />
              Suite 400<br />
              New York, NY 10001<br />
              United States
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}
