"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

export default function AdminHomepageCMS() {
  const [heroTitle, setHeroTitle] = useState('Engagement Rings');
  const [heroSubtitle, setHeroSubtitle] = useState('Lab Grown - IGI Certified');
  const [heroImage, setHeroImage] = useState('/hero-bg.png');
  const [heroButtonText, setHeroButtonText] = useState('Shop Now');
  const [heroButtonLink, setHeroButtonLink] = useState('/collections/engagement-rings');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Fetch current config on mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get('/homepage');
        if (res.data) {
          setHeroTitle(res.data.heroTitle || 'Engagement Rings');
          setHeroSubtitle(res.data.heroSubtitle || 'Lab Grown - IGI Certified');
          setHeroImage(res.data.heroImage || '/hero-bg.png');
          setHeroButtonText(res.data.heroButtonText || 'Shop Now');
          setHeroButtonLink(res.data.heroButtonLink || '/collections/engagement-rings');
        }
      } catch (err) {
        console.error('Failed to fetch homepage config:', err);
      }
    };
    fetchConfig();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = heroImage;
      
      // If a new image file is chosen, upload it to Cloudinary first
      if (imageFile) {
        try {
          const uploadRes = await uploadImageToCloudinary(imageFile);
          finalImageUrl = uploadRes.url;
        } catch (uploadErr) {
          console.error('Image upload failed:', uploadErr);
          alert('Failed to upload the image to Cloudinary. Please check your credentials or try again.');
          setLoading(false);
          return;
        }
      }

      const res = await api.post('/admin/homepage', {
        heroTitle,
        heroSubtitle,
        heroImage: finalImageUrl,
        heroButtonText,
        heroButtonLink
      });

      if (res.data) {
        setHeroImage(res.data.heroImage);
        setImageFile(null);
        setPreviewUrl('');
        alert('Homepage updated successfully!');
      }
    } catch (err: any) {
      console.error('Failed to save homepage config:', err);
      alert(err.response?.data?.message || 'Failed to update homepage configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-heading tracking-widest uppercase text-gray-900 mb-8 font-bold">Homepage CMS</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <p className="text-sm tracking-widest uppercase text-gray-500 mb-6 text-center font-semibold">Update Homepage Hero Section</p>
        
        <form onSubmit={handleSave} className="space-y-6 max-w-2xl mx-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background Image</label>
            <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden mb-4 border border-gray-200 flex items-center justify-center">
              <Image 
                src={previewUrl || heroImage} 
                alt="Hero Background" 
                fill 
                className="object-cover" 
                unoptimized={previewUrl ? true : false}
              />
            </div>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
            <input 
              required
              type="text" 
              value={heroTitle} 
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
            <input 
              required
              type="text" 
              value={heroSubtitle} 
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Button Text</label>
              <input 
                required
                type="text" 
                value={heroButtonText} 
                onChange={(e) => setHeroButtonText(e.target.value)}
                placeholder="e.g. Shop Rings"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Button Link</label>
              <input 
                required
                type="text" 
                value={heroButtonLink} 
                onChange={(e) => setHeroButtonLink(e.target.value)}
                placeholder="e.g. /collections/rings"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900" 
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 px-4 rounded-md font-medium tracking-widest uppercase hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
