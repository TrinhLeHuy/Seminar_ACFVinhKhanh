/**
 * Shared API Service - Compatible with Spring Boot Backend
 * Can be used by both web and mobile apps
 */

import type { Location, LocationDetail, LocationRequest } from './models/Location';
import type { Food, FoodRequest } from './models/Food';
import type { AudioGuide, AudioGuideRequest } from './models/AudioGuide';
import type { QRCode, QRCodeRequest, QRScanRequest } from './models/QRCode';
import type { LoginRequest, JwtResponse } from './models/User';

// Get API base URL from environment or use default
const getApiBaseUrl = (): string => {
  // React Native / Mobile environment - check process.env first
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL;
    }
    if (process.env.EXPO_PUBLIC_API_URL) {
      return process.env.EXPO_PUBLIC_API_URL;
    }
  }
  
  // Web environment - use Vite env (only available in Vite builds)
  // For React Native, this branch won't execute
  if (typeof window !== 'undefined') {
    // In Vite, we can access env variables through global
    // But to avoid import.meta issues in React Native, we use process.env fallback
    return 'http://localhost:8088/api';
  }
  
  // Default fallback
  return 'http://localhost:8088/api';
};

const API_BASE_URL = getApiBaseUrl();

// Helper function to get auth token
// For React Native, AsyncStorage will be injected by mobile controllers
let getAuthTokenFn: (() => Promise<string | null>) | null = null;

export const setGetAuthTokenFn = (fn: () => Promise<string | null>) => {
  getAuthTokenFn = fn;
};

const getAuthToken = async (): Promise<string | null> => {
  if (getAuthTokenFn) {
    // React Native: use injected function
    return await getAuthTokenFn();
  }
  if (typeof window !== 'undefined') {
    // Web: use localStorage
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to make API requests
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const token = await getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        error: `HTTP error! status: ${response.status}`,
        message: `Failed to fetch ${endpoint}` 
      }));
      throw new Error(error.error || error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error: any) {
    // Handle network errors
    if (error.message?.includes('fetch') || error.message?.includes('Network')) {
      throw new Error(`Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc đảm bảo backend đang chạy tại ${API_BASE_URL}`);
    }
    // Re-throw other errors
    throw error;
  }
};

// ==================== Authentication API ====================

export const authApi = {
  login: async (credentials: LoginRequest): Promise<JwtResponse> => {
    return apiRequest<JwtResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// ==================== Location API ====================

export const locationApi = {
  getAll: async (): Promise<Location[]> => {
    return apiRequest<Location[]>('/locations');
  },

  getById: async (id: number): Promise<LocationDetail> => {
    return apiRequest<LocationDetail>(`/locations/${id}`);
  },

  getByQRCode: async (qrValue: string): Promise<LocationDetail> => {
    return apiRequest<LocationDetail>(`/locations/qr/${qrValue}`);
  },

  // ========== SEARCH API ==========
  // Gọi BE endpoint: GET /api/locations/search?keyword=...
  search: async (keyword: string): Promise<Location[]> => {
    // Nếu keyword rỗng, lấy tất cả
    if (!keyword || keyword.trim() === '') {
      return apiRequest<Location[]>('/locations');
    }
    // Encode keyword để xử lý tiếng Việt
    return apiRequest<Location[]>(`/locations/search?keyword=${encodeURIComponent(keyword)}`);
  },

  create: async (data: LocationRequest): Promise<Location> => {
    return apiRequest<Location>('/locations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: LocationRequest): Promise<Location> => {
    return apiRequest<Location>(`/locations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<void> => {
    return apiRequest<void>(`/locations/${id}`, {
      method: 'DELETE',
    });
  },

  getByUser: async (userId: number): Promise<Location[]> => {
    return apiRequest<Location[]>(`/locations/user/${userId}`);
  },
};

// ==================== Food API ====================

export const foodApi = {
  getAll: async (): Promise<Food[]> => {
    return apiRequest<Food[]>('/foods');
  },

  getById: async (id: number): Promise<Food> => {
    return apiRequest<Food>(`/foods/${id}`);
  },

  getByLocation: async (locationId: number): Promise<Food[]> => {
    return apiRequest<Food[]>(`/foods/location/${locationId}`);
  },

  create: async (data: FoodRequest): Promise<Food> => {
    return apiRequest<Food>('/foods', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: FoodRequest): Promise<Food> => {
    return apiRequest<Food>(`/foods/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<void> => {
    return apiRequest<void>(`/foods/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== Audio Guide API ====================

export const audioGuideApi = {
  getAll: async (): Promise<AudioGuide[]> => {
    return apiRequest<AudioGuide[]>('/audio-guides');
  },

  getById: async (id: number): Promise<AudioGuide> => {
    return apiRequest<AudioGuide>(`/audio-guides/${id}`);
  },

  getByLocation: async (locationId: number): Promise<AudioGuide[]> => {
    return apiRequest<AudioGuide[]>(`/audio-guides/location/${locationId}`);
  },

  getByLocationAndLanguage: async (
    locationId: number,
    language: string
  ): Promise<AudioGuide> => {
    return apiRequest<AudioGuide>(
      `/audio-guides/location/${locationId}/language/${language}`
    );
  },

  getByLanguage: async (language: string): Promise<AudioGuide[]> => {
    return apiRequest<AudioGuide[]>(`/audio-guides/language/${language}`);
  },

  create: async (data: AudioGuideRequest): Promise<AudioGuide> => {
    return apiRequest<AudioGuide>('/audio-guides', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: AudioGuideRequest): Promise<AudioGuide> => {
    return apiRequest<AudioGuide>(`/audio-guides/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<void> => {
    return apiRequest<void>(`/audio-guides/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== QR Code API ====================

export const qrCodeApi = {
  getAll: async (): Promise<QRCode[]> => {
    return apiRequest<QRCode[]>('/qr-codes');
  },

  getById: async (id: number): Promise<QRCode> => {
    return apiRequest<QRCode>(`/qr-codes/${id}`);
  },

  getByValue: async (qrValue: string): Promise<QRCode> => {
    return apiRequest<QRCode>(`/qr-codes/value/${qrValue}`);
  },

  create: async (data: QRCodeRequest): Promise<QRCode> => {
    return apiRequest<QRCode>('/qr-codes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: QRCodeRequest): Promise<QRCode> => {
    return apiRequest<QRCode>(`/qr-codes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<void> => {
    return apiRequest<void>(`/qr-codes/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== QR Scan API ====================

export const qrScanApi = {
  scan: async (data: QRScanRequest): Promise<LocationDetail> => {
    return apiRequest<LocationDetail>('/qr-scan', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getScanCount: async (qrId: number): Promise<number> => {
    return apiRequest<number>(`/qr-scan/count/${qrId}`);
  },
};

// Export all APIs
export const api = {
  auth: authApi,
  location: locationApi,
  food: foodApi,
  audioGuide: audioGuideApi,
  qrCode: qrCodeApi,
  qrScan: qrScanApi,
};
