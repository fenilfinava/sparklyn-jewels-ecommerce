import { jwtDecode } from 'jwt-decode';

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export const setAdminToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminToken', token);
  }
};

export const getAdminToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

export const removeAdminToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
  }
};

export const getAdminUser = (): AdminUser | null => {
  const token = getAdminToken();
  if (!token) return null;
  
  try {
    const decoded = jwtDecode<AdminUser & { exp: number }>(token);
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      removeAdminToken();
      return null;
    }
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const isAdminAuthenticated = (): boolean => {
  return getAdminUser() !== null;
};
