"use client";

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function AdminSubcategories() {
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSubcategories = async () => {
    try {
      const res = await api.get('/admin/subcategories/admin-list');
      setSubcategories(res.data);
    } catch (err) {
      console.error('Failed to fetch subcategories:', err);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !mainCategory) {
      alert('Please fill out both Name and Main Category.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/admin/subcategories', { 
        name: newName, 
        mainCategory 
      });
      setNewName('');
      setMainCategory('');
      setShowAdd(false);
      await fetchSubcategories();
      alert('Subcategory added successfully!');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to save subcategory');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return;
    try {
      await api.delete(`/admin/subcategories/${id}`);
      setSubcategories(subcategories.filter(sub => sub._id !== id));
      alert('Subcategory deleted successfully');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete subcategory');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-heading tracking-widest uppercase text-gray-900 font-bold">Subcategories</h1>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-black text-white px-4 py-2 text-sm tracking-widest uppercase hover:bg-gray-800 transition rounded-md"
        >
          {showAdd ? 'Cancel' : 'Add Subcategory'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="mb-8 bg-white p-6 rounded-lg border border-gray-200 max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory Name</label>
            <input 
              required
              type="text" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Solitaire Rings" 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Category</label>
            <select
              required
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black text-gray-900"
            >
              <option value="">Select Main Category</option>
              <option value="Rings">Rings</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Earrings">Earrings</option>
              <option value="Necklaces">Necklaces</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Subcategory'}
          </button>
        </form>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Main Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subcategories.map((sub) => (
              <tr key={sub._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.mainCategory}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <button 
                    onClick={() => handleDelete(sub._id)}
                    className="text-red-600 hover:text-red-900 font-medium text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {subcategories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">
                  No subcategories configured yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
