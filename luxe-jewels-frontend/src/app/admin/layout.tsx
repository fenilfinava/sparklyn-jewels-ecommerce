"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { isAdminAuthenticated } from '@/lib/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Check authentication on client side
    const authenticated = isAdminAuthenticated();
    
    if (!authenticated && !isLoginPage) {
      router.push('/admin/login');
    } else if (authenticated && isLoginPage) {
      router.push('/admin/dashboard');
    }
    
    setIsAuthChecking(false);
  }, [pathname, router, isLoginPage]);

  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If on login page, just render the login view without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For all other admin routes, wrap with the Dashboard sidebar layout
  return <DashboardLayout>{children}</DashboardLayout>;
}
