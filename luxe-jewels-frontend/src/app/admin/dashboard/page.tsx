"use client";

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Mock data for Phase 2
    // In production, fetch from /api/admin/analytics
    setStats({
      totalOrders: 0,
      totalRevenue: 0,
      totalProducts: 0,
      activeUsers: 0
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-heading tracking-widest uppercase text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-3xl font-light text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Total Orders</h3>
          <p className="text-3xl font-light text-gray-900">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Total Products</h3>
          <p className="text-3xl font-light text-gray-900">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Active Users</h3>
          <p className="text-3xl font-light text-gray-900">{stats.activeUsers.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
