# API Documentation - Vinh Khanh Food Guide

## Base URL
```
http://localhost:8080/api
```

## Authentication

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "userId": 1,
  "username": "admin",
  "role": "ADMIN"
}
```

## Locations API

### Get All Locations
```
GET /api/locations
```

### Get Location by ID
```
GET /api/locations/{id}
```

### Get Location by QR Code
```
GET /api/locations/qr/{qrValue}
```

### Create Location (Requires Authentication)
```
POST /api/locations
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Quán Ăn ABC",
  "description": "Mô tả về quán ăn",
  "latitude": 21.0285,
  "longitude": 105.8542,
  "imageUrl": "https://example.com/image.jpg"
}
```

### Update Location
```
PUT /api/locations/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Quán Ăn ABC Updated",
  "description": "Mô tả cập nhật",
  "latitude": 21.0285,
  "longitude": 105.8542,
  "imageUrl": "https://example.com/image.jpg"
}
```

### Delete Location
```
DELETE /api/locations/{id}
Authorization: Bearer {token}
```

### Get Locations by User
```
GET /api/locations/user/{userId}
```

## Food API

### Get All Foods
```
GET /api/foods
```

### Get Food by ID
```
GET /api/foods/{id}
```

### Get Foods by Location
```
GET /api/foods/location/{locationId}
```

### Create Food
```
POST /api/foods
Content-Type: application/json

{
  "name": "Phở Bò",
  "price": 50000,
  "description": "Phở bò truyền thống",
  "locationId": 1
}
```

### Update Food
```
PUT /api/foods/{id}
Content-Type: application/json

{
  "name": "Phở Bò Đặc Biệt",
  "price": 60000,
  "description": "Phở bò với nhiều thịt",
  "locationId": 1
}
```

### Delete Food
```
DELETE /api/foods/{id}
```

## Audio Guide API

### Get All Audio Guides
```
GET /api/audio-guides
```

### Get Audio Guide by ID
```
GET /api/audio-guides/{id}
```

### Get Audio Guides by Location
```
GET /api/audio-guides/location/{locationId}
```

### Get Audio Guide by Location and Language
```
GET /api/audio-guides/location/{locationId}/language/{language}
```

### Get Audio Guides by Language
```
GET /api/audio-guides/language/{language}
```

### Create Audio Guide
```
POST /api/audio-guides
Content-Type: application/json

{
  "audioUrl": "https://example.com/audio/vietnamese.mp3",
  "language": "vi",
  "locationId": 1
}
```

### Update Audio Guide
```
PUT /api/audio-guides/{id}
Content-Type: application/json

{
  "audioUrl": "https://example.com/audio/vietnamese-updated.mp3",
  "language": "vi",
  "locationId": 1
}
```

### Delete Audio Guide
```
DELETE /api/audio-guides/{id}
```

## QR Code API

### Get All QR Codes
```
GET /api/qr-codes
```

### Get QR Code by ID
```
GET /api/qr-codes/{id}
```

### Get QR Code by Value
```
GET /api/qr-codes/value/{qrValue}
```

### Create QR Code
```
POST /api/qr-codes
Content-Type: application/json

{
  "qrValue": "LOCATION_001",
  "locationId": 1
}
```

### Update QR Code
```
PUT /api/qr-codes/{id}
Content-Type: application/json

{
  "qrValue": "LOCATION_001_UPDATED",
  "locationId": 1
}
```

### Delete QR Code
```
DELETE /api/qr-codes/{id}
```

## QR Scan API

### Scan QR Code
```
POST /api/qr-scan
Content-Type: application/json

{
  "qrValue": "LOCATION_001",
  "deviceInfo": "iPhone 13, iOS 15.0"
}

Response: LocationDetailDTO with all location information including foods, audio guides, and QR code
```

### Get Scan Count
```
GET /api/qr-scan/count/{qrId}
```

## Response Format

### Success Response
```json
{
  "locationId": 1,
  "name": "Quán Ăn ABC",
  "description": "Mô tả",
  "latitude": 21.0285,
  "longitude": 105.8542,
  "imageUrl": "https://example.com/image.jpg",
  "foods": [...],
  "audioGuides": [...],
  "qrCode": {...}
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## Supported Languages
- `vi` - Tiếng Việt
- `en` - English
- `zh` - 中文
- `ja` - 日本語
- `ko` - 한국어

## Notes
- Most endpoints are public (no authentication required) for tourist access
- Location creation requires authentication
- Passwords are automatically hashed using BCrypt
- CORS is enabled for all origins
- JWT tokens expire after 24 hours (86400000 ms)
