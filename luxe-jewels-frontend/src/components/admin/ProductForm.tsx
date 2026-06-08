"use client";

import React, { useState, useEffect } from 'react';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

export default function ProductForm({ initialData = null, onSubmit }: { initialData?: any, onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    price: '',
    stock: '',
    mainCategory: '',
    subCategory: '',
    shapes: [],
    metals: [],
    sizes: [],
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hoverImageFile, setHoverImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [subcategories, setSubcategories] = useState<any[]>([]);

  // Inline Subcategory creation states
  const [isAddingNewSubCategory, setIsAddingNewSubCategory] = useState(false);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [creatingSubCategory, setCreatingSubCategory] = useState(false);

  useEffect(() => {
    import('@/lib/api').then(({ api }) => {
      api.get('/subcategories')
        .then(res => setSubcategories(res.data))
        .catch(console.error);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleShapeChange = (shape: string) => {
    setFormData((prev: any) => {
      const shapes = prev.shapes || [];
      if (shapes.includes(shape)) {
        return { ...prev, shapes: shapes.filter((s: string) => s !== shape) };
      } else {
        return { ...prev, shapes: [...shapes, shape] };
      }
    });
  };

  const handleCreateSubCategory = async () => {
    if (!newSubCategoryName.trim()) {
      alert('Please enter a subcategory name');
      return;
    }
    setCreatingSubCategory(true);
    try {
      const { api } = await import('@/lib/api');
      const res = await api.post('/admin/subcategories', {
        name: newSubCategoryName.trim(),
        mainCategory: formData.mainCategory
      });
      alert('Subcategory created successfully!');
      // Append to the subcategories list
      setSubcategories((prev: any[]) => [...prev, res.data]);
      // Select the newly created subcategory ID
      setFormData((prev: any) => ({ ...prev, subCategory: res.data._id }));
      setIsAddingNewSubCategory(false);
      setNewSubCategoryName('');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to create subcategory');
    } finally {
      setCreatingSubCategory(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let images = formData.images || [];
      
      if (imageFile) {
        try {
          const uploadRes = await uploadImageToCloudinary(imageFile);
          // If editing, this might replace the first image. For now just push or set at index 0
          if (images.length > 0) {
            images[0] = { url: uploadRes.url, isMain: true };
          } else {
            images.push({ url: uploadRes.url, isMain: true });
          }
        } catch (uploadErr) {
          console.warn('Main Image upload failed:', uploadErr);
          const proceed = confirm('Main Image upload failed. Do you want to proceed anyway?');
          if (!proceed) return setLoading(false);
        }
      }

      if (hoverImageFile) {
        try {
          const hoverUploadRes = await uploadImageToCloudinary(hoverImageFile);
          if (images.length > 1) {
            images[1] = { url: hoverUploadRes.url, isMain: false };
          } else {
            images.push({ url: hoverUploadRes.url, isMain: false });
          }
        } catch (uploadErr) {
          console.warn('Hover Image upload failed:', uploadErr);
        }
      }

      await onSubmit({ ...formData, images });
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg border border-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input 
          required 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black text-gray-900"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          rows={4}
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Main Category</label>
          <select 
            required 
            name="mainCategory" 
            value={formData.mainCategory || ''} 
            onChange={(e) => {
              const val = e.target.value;
              setFormData((prev: any) => ({
                ...prev,
                mainCategory: val,
                subCategory: '' // reset subCategory
              }));
              setIsAddingNewSubCategory(false);
            }} 
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black text-gray-900"
          >
            <option value="">Select Main Category</option>
            <option value="Rings">Rings</option>
            <option value="Bracelets">Bracelets</option>
            <option value="Earrings">Earrings</option>
            <option value="Necklaces">Necklaces</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
          <select 
            required={!isAddingNewSubCategory} 
            name="subCategory" 
            value={isAddingNewSubCategory ? 'new' : (formData.subCategory || '')} 
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'new') {
                setIsAddingNewSubCategory(true);
                setFormData((prev: any) => ({ ...prev, subCategory: '' }));
              } else {
                setIsAddingNewSubCategory(false);
                setFormData((prev: any) => ({ ...prev, subCategory: val }));
              }
            }} 
            disabled={!formData.mainCategory}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black text-gray-900 disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">Select Subcategory</option>
            {subcategories
              .filter((sub: any) => sub.mainCategory === formData.mainCategory)
              .map((sub: any) => (
                <option key={sub._id} value={sub._id}>{sub.name}</option>
              ))
            }
            {formData.mainCategory && (
              <option value="new" className="font-bold text-black bg-gray-50">+ Add New Subcategory</option>
            )}
          </select>
        </div>
      </div>

      {isAddingNewSubCategory && (
        <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 space-y-2">
          <label className="block text-sm font-medium text-gray-700">New Subcategory Name</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={newSubCategoryName}
              onChange={(e) => setNewSubCategoryName(e.target.value)}
              placeholder="e.g. Halo Rings" 
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black text-gray-900"
            />
            <button 
              type="button"
              disabled={creatingSubCategory}
              onClick={handleCreateSubCategory}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm disabled:opacity-50"
            >
              {creatingSubCategory ? 'Creating...' : 'Create'}
            </button>
            <button 
              type="button"
              onClick={() => {
                setIsAddingNewSubCategory(false);
                setNewSubCategoryName('');
              }}
              className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Shapes (Select multiple)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Round', 'Emerald', 'Princess', 'Cushion', 'Oval', 'Pear', 'Marquise', 'Asscher', 'Heart'].map(shape => (
            <label key={shape} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={(formData.shapes || []).includes(shape)} 
                onChange={() => handleShapeChange(shape)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <span>{shape}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹)</label>
          <input 
            required 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input 
            required 
            type="number" 
            name="stock" 
            value={formData.stock} 
            onChange={handleChange} 
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black text-gray-900"
          />
        </div>
      </div>

      {/* Dynamic Metals */}
      <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
        <label className="block text-sm font-medium text-gray-700 mb-2">Metals & Prices</label>
        <p className="text-xs text-gray-500 mb-4">Select the metals available for this product and set their specific price. The Base Price above will be the default displayed.</p>
        
        {['18K White Gold', '18K Yellow Gold', '18K Rose Gold', '24K Yellow Gold', 'Platinum'].map((metalOption) => {
          const isSelected = formData.metals?.some((m: any) => m.metalType === metalOption);
          const currentMetal = formData.metals?.find((m: any) => m.metalType === metalOption);

          return (
            <div key={metalOption} className="flex items-center space-x-4 mb-2">
              <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer min-w-[150px]">
                <input 
                  type="checkbox" 
                  checked={isSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData((prev: any) => ({ ...prev, metals: [...(prev.metals || []), { metalType: metalOption, price: prev.price || 0 }] }));
                    } else {
                      setFormData((prev: any) => ({ ...prev, metals: (prev.metals || []).filter((m: any) => m.metalType !== metalOption) }));
                    }
                  }}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <span>{metalOption}</span>
              </label>
              
              {isSelected && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">₹</span>
                  <input 
                    type="number" 
                    value={currentMetal?.price || ''}
                    onChange={(e) => {
                      const newPrice = Number(e.target.value);
                      setFormData((prev: any) => ({
                        ...prev,
                        metals: prev.metals.map((m: any) => m.metalType === metalOption ? { ...m, price: newPrice } : m)
                      }));
                    }}
                    className="w-32 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-black focus:border-black text-gray-900"
                    placeholder="Price"
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Custom metal addition logic */}
        <div className="mt-4 pt-4 border-t border-gray-200">
           <label className="block text-xs font-medium text-gray-700 mb-1">Add Custom Metal</label>
           <div className="flex gap-2">
             <input id="customMetalName" type="text" placeholder="e.g. 14K Rose Gold" className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-900" />
             <input id="customMetalPrice" type="number" placeholder="Price" className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-900" />
             <button 
               type="button" 
               onClick={() => {
                 const nameInput = document.getElementById('customMetalName') as HTMLInputElement;
                 const priceInput = document.getElementById('customMetalPrice') as HTMLInputElement;
                 if (nameInput.value && priceInput.value) {
                   setFormData((prev: any) => ({ ...prev, metals: [...(prev.metals || []), { metalType: nameInput.value, price: Number(priceInput.value) }] }));
                   nameInput.value = '';
                   priceInput.value = '';
                 }
               }}
               className="bg-gray-200 text-gray-900 px-3 py-1 text-xs rounded-md"
             >
               Add
             </button>
           </div>
           {/* render custom ones */}
           {formData.metals?.filter((m: any) => !['18K White Gold', '18K Yellow Gold', '18K Rose Gold', '24K Yellow Gold', 'Platinum'].includes(m.metalType)).map((m: any) => (
             <div key={m.metalType} className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-700 min-w-[150px]">{m.metalType}</span>
                <span className="text-sm text-gray-700">₹{m.price}</span>
                <button type="button" className="text-red-500 text-xs" onClick={() => setFormData((prev: any) => ({ ...prev, metals: prev.metals.filter((x: any) => x.metalType !== m.metalType) }))}>Remove</button>
             </div>
           ))}
        </div>
      </div>

      {/* Dynamic Sizes */}
      <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
        <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
        <p className="text-xs text-gray-500 mb-4">Enter available sizes (e.g. 4, 4.5, 6 inches, etc.).</p>
        <div className="flex gap-2 mb-2">
          <input id="newSizeInput" type="text" placeholder="e.g. 5.5" className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-900" />
          <button 
            type="button" 
            onClick={() => {
              const sizeInput = document.getElementById('newSizeInput') as HTMLInputElement;
              if (sizeInput.value) {
                setFormData((prev: any) => ({ ...prev, sizes: [...(prev.sizes || []), sizeInput.value] }));
                sizeInput.value = '';
              }
            }}
            className="bg-gray-200 text-gray-900 px-3 py-1 text-xs rounded-md"
          >
            Add Size
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(formData.sizes || []).map((size: string, idx: number) => (
            <div key={idx} className="bg-white border border-gray-300 px-2 py-1 rounded-md text-xs flex items-center space-x-2">
              <span className="text-gray-900">{size}</span>
              <button type="button" onClick={() => setFormData((prev: any) => ({ ...prev, sizes: prev.sizes.filter((_: any, i: number) => i !== idx) }))} className="text-gray-400 hover:text-red-500">&times;</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Main Product Image</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Hover Image (Optional)</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setHoverImageFile(e.target.files?.[0] || null)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-black focus:border-black text-gray-900"
        />
        <p className="text-xs text-gray-500 mt-1">This image will appear when users hover over the product card.</p>
      </div>

      <div className="flex items-center">
        <input 
          type="checkbox" 
          id="isActive" 
          name="isActive" 
          checked={formData.isActive} 
          onChange={handleChange} 
          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
          Active (Visible on store)
        </label>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
}
