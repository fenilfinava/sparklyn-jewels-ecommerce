"use client";

import React, { useState, useEffect } from 'react';
import ProductForm from '@/components/admin/ProductForm';
import Image from 'next/image';
import { api } from '@/lib/api';

export default function AdminProducts() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (data: any) => {
    try {
      const res = await api.post('/admin/products', data);
      setProducts((prev) => [res.data, ...prev]);
      alert('Product saved successfully');
      setShowForm(false);
    } catch (err) {
      console.error('Failed to save product', err);
      alert('Failed to save product');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-heading tracking-widest uppercase text-gray-900">Products</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white px-4 py-2 text-sm tracking-widest uppercase hover:bg-gray-800 transition rounded-md"
        >
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showForm ? (
        <ProductForm onSubmit={handleAddProduct} />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
              <div className="aspect-square bg-gray-50 relative">
                {p.images?.[0]?.url || p.imageUrl ? (
                  <Image src={p.images?.[0]?.url || p.imageUrl} alt={p.title} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-400 uppercase tracking-widest">No Image</div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-gray-900">{p.title}</h3>
                <p className="text-xs text-gray-500 mt-1 mb-2 flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-[9px] uppercase tracking-widest bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{p.mainCategory}</span>
                  {p.subCategory && (
                    <span className="text-[9px] uppercase tracking-widest bg-gray-200 text-gray-800 px-2 py-0.5 rounded font-medium">{p.subCategory.name}</span>
                  )}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="font-medium text-sm text-gray-900">₹{Number(p.price).toLocaleString('en-IN')}</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-1 rounded">Stock: {p.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
          <p className="mb-4 text-sm tracking-widest uppercase">No products configured yet.</p>
          <button 
            onClick={() => setShowForm(true)}
            className="text-black hover:underline"
          >
            Create your first product
          </button>
        </div>
      )}
    </div>
  );
}
