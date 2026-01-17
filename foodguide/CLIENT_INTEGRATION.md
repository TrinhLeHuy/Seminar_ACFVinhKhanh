# Hướng dẫn tích hợp Backend với ReactJS và React Native

## ✅ Backend đã sẵn sàng cho cả Web và Mobile

Backend này được thiết kế để hỗ trợ **cả ReactJS (Web)** và **React Native (Mobile)** cùng lúc.

## 🔧 Cấu hình hiện tại

### CORS (Cross-Origin Resource Sharing)
- ✅ Đã cấu hình cho phép tất cả origins (`*`)
- ✅ Hỗ trợ các methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
- ✅ Cho phép tất cả headers
- ✅ Cache preflight requests (1 giờ)

### Authentication
- ✅ JWT Token-based authentication
- ✅ Stateless (phù hợp cho mobile apps)
- ✅ Token expiration: 24 giờ

## 📱 Sử dụng với ReactJS (Web)

### 1. Cài đặt axios
```bash
npm install axios
```

### 2. Tạo API service
```javascript
// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm token vào request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 3. Sử dụng trong component
```javascript
// components/LocationList.js
import { useEffect, useState } from 'react';
import api from '../services/api';

function LocationList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    api.get('/locations')
      .then(response => setLocations(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {locations.map(location => (
        <div key={location.locationId}>
          <h3>{location.name}</h3>
          <p>{location.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### 4. Login
```javascript
// services/auth.js
import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};
```

## 📱 Sử dụng với React Native

### 1. Cài đặt dependencies
```bash
npm install axios
# hoặc
yarn add axios
```

### 2. Tạo API service
```javascript
// services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:8080/api'; // Thay bằng IP thật khi test trên device
// Hoặc: const API_BASE_URL = 'http://192.168.1.100:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Thêm token vào request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 3. Sử dụng trong component
```javascript
// screens/LocationListScreen.js
import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import api from '../services/api';

function LocationListScreen() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const response = await api.get('/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error loading locations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={locations}
      keyExtractor={(item) => item.locationId.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
        </View>
      )}
    />
  );
}
```

### 4. Login
```javascript
// services/auth.js
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

### 5. QR Code Scanner (React Native)
```javascript
// screens/QRScanScreen.js
import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import api from '../services/api';

function QRScanScreen() {
  const [scanned, setScanned] = useState(false);
  const [location, setLocation] = useState(null);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      const response = await api.post('/qr-scan', {
        qrValue: data,
        deviceInfo: 'React Native App',
      });
      setLocation(response.data);
    } catch (error) {
      console.error('Error scanning QR:', error);
    }
  };

  return (
    <View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {location && (
        <View>
          <Text>{location.name}</Text>
          <Text>{location.description}</Text>
        </View>
      )}
    </View>
  );
}
```

## 🌐 Cấu hình cho Production

### 1. CORS cho Production
Trong `SecurityConfig.java`, thay đổi:
```java
// Thay vì "*", chỉ định domains cụ thể
configuration.setAllowedOrigins(Arrays.asList(
    "https://your-web-app.com",
    "https://www.your-web-app.com"
));
configuration.setAllowCredentials(true); // Bật nếu cần
```

### 2. Base URL cho Production
```javascript
// Development
const API_BASE_URL = 'http://localhost:8080/api';

// Production
const API_BASE_URL = 'https://api.your-domain.com/api';
```

## 📋 API Endpoints chính

### Public Endpoints (không cần authentication)
- `POST /api/auth/login` - Đăng nhập
- `GET /api/locations` - Lấy danh sách địa điểm
- `GET /api/locations/{id}` - Lấy chi tiết địa điểm
- `GET /api/locations/qr/{qrValue}` - Lấy địa điểm theo QR code
- `GET /api/foods` - Lấy danh sách món ăn
- `GET /api/audio-guides` - Lấy danh sách audio guide
- `POST /api/qr-scan` - Quét QR code

### Protected Endpoints (cần JWT token)
- `POST /api/locations` - Tạo địa điểm mới
- `PUT /api/locations/{id}` - Cập nhật địa điểm
- `DELETE /api/locations/{id}` - Xóa địa điểm

## 🔐 Authentication Flow

1. **Login**: Gửi username/password → Nhận JWT token
2. **Lưu token**: 
   - Web: `localStorage`
   - Mobile: `AsyncStorage`
3. **Gửi token**: Thêm header `Authorization: Bearer <token>` vào mọi request
4. **Token expiration**: Token hết hạn sau 24 giờ, cần login lại

## ⚠️ Lưu ý quan trọng

### React Native
- **Localhost không hoạt động trên device thật**: Cần dùng IP thật của máy chạy backend
- **Android Emulator**: Dùng `http://10.0.2.2:8080/api`
- **iOS Simulator**: Dùng `http://localhost:8080/api`
- **Device thật**: Dùng `http://<IP-máy-tính>:8080/api`

### CORS
- Backend hiện tại cho phép tất cả origins (`*`)
- Trong production, nên giới hạn origins cụ thể để bảo mật hơn

### Error Handling
```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn, redirect đến login
      AsyncStorage.removeItem('token');
      // Navigate to login screen
    }
    return Promise.reject(error);
  }
);
```

## 📚 Tài liệu tham khảo

- Xem `API_DOCUMENTATION.md` để biết chi tiết tất cả endpoints
- Base URL: `http://localhost:8080/api` (development)
