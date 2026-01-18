/**
 * Mobile Authentication Controller
 */

import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../../../shared/api';
import type { LoginRequest, JwtResponse } from '../../../shared/models/User';

export const useAuthController = () => {
  const [user, setUser] = useState<JwtResponse | null>(null);

  // Load user from AsyncStorage on init
  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('token');
        if (stored && token) {
          setUser(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
    loadUser();
  }, []);

  // Mutation: Login
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: async (data: JwtResponse) => {
      // Store token and user info
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    },
  });

  // Logout
  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
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

// Fix React import
import React from 'react';
