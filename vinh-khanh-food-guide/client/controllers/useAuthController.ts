/**
 * Authentication Controller - Business Logic for Auth
 */

import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@shared/api';
import type { LoginRequest, JwtResponse } from '@shared/models/User';

export const useAuthController = () => {
  const [user, setUser] = useState<JwtResponse | null>(() => {
    // Load user from localStorage on init
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (stored && token) {
        return JSON.parse(stored);
      }
    }
    return null;
  });

  // Mutation: Login
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data: JwtResponse) => {
      // Store token and user info
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
      }
      setUser(data);
    },
  });

  // Logout
  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setUser(null);
  }, []);

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return user !== null && user.token !== undefined;
  }, [user]);

  // Check if user is admin
  const isAdmin = useCallback(() => {
    return user?.role === 'ADMIN';
  }, [user]);

  return {
    user,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
