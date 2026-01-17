# Danh sách công việc kiểm tra Backend

## Bảng tổng hợp

| STT | Công việc | Mô tả | Ưu tiên |
|-----|----------|-------|---------|
| 1 | Kiểm tra kết nối Database | Xác minh kết nối MySQL thành công, database `vinh_khanh_food_guide` tồn tại và có thể truy vấn | **Cao** |
| 2 | Kiểm tra khởi động ứng dụng | Ứng dụng Spring Boot khởi động thành công không có lỗi, port 8080 hoạt động | **Cao** |
| 3 | Kiểm tra API Authentication | Test đăng nhập với username/password, nhận JWT token hợp lệ | **Cao** |
| 4 | Kiểm tra JWT Token | Verify token được tạo đúng, có thể extract thông tin user, token có expiration | **Cao** |
| 5 | Kiểm tra API Locations - GET | Test lấy danh sách locations, lấy location theo ID, lấy location theo QR code | **Cao** |
| 6 | Kiểm tra API Locations - POST | Test tạo location mới với authentication, validate dữ liệu đầu vào | **Trung bình** |
| 7 | Kiểm tra API Locations - PUT/DELETE | Test cập nhật và xóa location, kiểm tra authorization | **Trung bình** |
| 8 | Kiểm tra API Foods | Test CRUD operations cho foods, lấy foods theo location | **Cao** |
| 9 | Kiểm tra API Audio Guides | Test CRUD operations, lấy audio guide theo location và language | **Cao** |
| 10 | Kiểm tra API QR Codes | Test tạo, đọc, cập nhật QR codes, kiểm tra unique constraint | **Cao** |
| 11 | Kiểm tra API QR Scan | Test quét QR code, log được ghi vào database, trả về location details | **Cao** |
| 12 | Kiểm tra CORS Configuration | Test từ browser và mobile app, verify headers được set đúng | **Trung bình** |
| 13 | Kiểm tra Validation | Test validation cho các required fields, invalid data types | **Trung bình** |
| 14 | Kiểm tra Error Handling | Test các trường hợp lỗi (404, 400, 500), error messages rõ ràng | **Trung bình** |
| 15 | Kiểm tra Security - Unauthorized Access | Test truy cập protected endpoints không có token, token invalid | **Cao** |
| 16 | Kiểm tra Security - Token Expiration | Test token hết hạn, refresh token flow (nếu có) | **Trung bình** |
| 17 | Kiểm tra Database Relationships | Verify foreign keys, cascade operations, data integrity | **Cao** |
| 18 | Kiểm tra Performance - Response Time | Đo thời gian phản hồi của các API endpoints | **Thấp** |
| 19 | Kiểm tra Performance - Concurrent Requests | Test nhiều requests đồng thời, kiểm tra connection pool | **Thấp** |
| 20 | Kiểm tra Data Initialization | Verify users mặc định (admin/guest) được tạo, passwords được hash | **Cao** |
| 21 | Kiểm tra API Response Format | Verify JSON structure, data types, null handling | **Trung bình** |
| 22 | Kiểm tra Logging | Kiểm tra logs được ghi đúng, không có sensitive data trong logs | **Thấp** |
| 23 | Kiểm tra Transaction Management | Test rollback khi có lỗi, verify @Transactional hoạt động | **Trung bình** |
| 24 | Kiểm tra Multi-language Support | Test audio guides với nhiều ngôn ngữ khác nhau (vi, en, zh, ja, ko) | **Cao** |
| 25 | Kiểm tra Edge Cases | Test với dữ liệu boundary (null, empty, max length, special characters) | **Trung bình** |

---

## Chi tiết từng công việc

### 1. Kiểm tra kết nối Database
**Mô tả chi tiết:**
- Kiểm tra file `application.properties` có cấu hình đúng database URL, username, password
- Verify database `vinh_khanh_food_guide` tồn tại
- Test kết nối bằng cách query một bảng đơn giản
- Kiểm tra HikariCP connection pool khởi tạo thành công

**Cách kiểm tra:**
```sql
-- Chạy trong MySQL
SHOW DATABASES;
USE vinh_khanh_food_guide;
SHOW TABLES;
SELECT * FROM user LIMIT 1;
```

**Kết quả mong đợi:** Không có lỗi connection, có thể query được dữ liệu

---

### 2. Kiểm tra khởi động ứng dụng
**Mô tả chi tiết:**
- Ứng dụng Spring Boot khởi động không có exception
- Port 8080 không bị chiếm dụng
- Tất cả beans được khởi tạo thành công
- JPA repositories được scan và load

**Cách kiểm tra:**
```bash
mvn spring-boot:run
# Hoặc
java -jar target/foodguide-0.0.1-SNAPSHOT.jar
```

**Kết quả mong đợi:** 
- Log hiển thị "Started FoodguideApplication"
- Không có ERROR trong logs
- Có thể truy cập http://localhost:8080

---

### 3. Kiểm tra API Authentication
**Mô tả chi tiết:**
- Test endpoint `POST /api/auth/login` với credentials hợp lệ
- Verify response chứa JWT token
- Test với credentials không hợp lệ
- Kiểm tra password được hash đúng (BCrypt)

**Cách kiểm tra:**
```bash
# Test với Postman hoặc curl
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'
```

**Kết quả mong đợi:**
- Status code: 200
- Response có token, userId, username, role
- Invalid credentials trả về 400/401

---

### 4. Kiểm tra JWT Token
**Mô tả chi tiết:**
- Verify token structure (header.payload.signature)
- Decode token và kiểm tra claims (username, userId, role)
- Test token expiration (24 giờ)
- Verify token signature validation

**Cách kiểm tra:**
- Sử dụng JWT.io để decode token
- Test gửi request với token hết hạn
- Test gửi request với token bị sửa đổi

**Kết quả mong đợi:**
- Token có đầy đủ claims
- Token hết hạn trả về 401
- Token invalid trả về 401

---

### 5. Kiểm tra API Locations - GET
**Mô tả chi tiết:**
- Test `GET /api/locations` - lấy tất cả locations
- Test `GET /api/locations/{id}` - lấy location theo ID
- Test `GET /api/locations/qr/{qrValue}` - lấy location theo QR code
- Verify response có đầy đủ thông tin (foods, audioGuides, qrCode)

**Cách kiểm tra:**
```bash
# Lấy tất cả locations
curl http://localhost:8080/api/locations

# Lấy location theo ID
curl http://localhost:8080/api/locations/1

# Lấy location theo QR code
curl http://localhost:8080/api/locations/qr/LOCATION_001
```

**Kết quả mong đợi:**
- Status code: 200
- Response có đầy đủ fields
- Location không tồn tại trả về 404

---

### 6. Kiểm tra API Locations - POST
**Mô tả chi tiết:**
- Test tạo location mới với authentication
- Validate required fields (name, latitude, longitude)
- Kiểm tra user_id được gán đúng từ JWT token
- Test với dữ liệu không hợp lệ

**Cách kiểm tra:**
```bash
curl -X POST http://localhost:8080/api/locations \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Location",
    "description": "Test Description",
    "latitude": 21.0285,
    "longitude": 105.8542,
    "imageUrl": "https://example.com/image.jpg"
  }'
```

**Kết quả mong đợi:**
- Status code: 200
- Location được tạo trong database
- Missing required fields trả về 400

---

### 7. Kiểm tra API Locations - PUT/DELETE
**Mô tả chi tiết:**
- Test cập nhật location với authentication
- Test xóa location (cascade với foods, audioGuides, qrCodes)
- Kiểm tra authorization (chỉ owner mới được sửa/xóa)

**Cách kiểm tra:**
```bash
# Update location
curl -X PUT http://localhost:8080/api/locations/1 \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name",...}'

# Delete location
curl -X DELETE http://localhost:8080/api/locations/1 \
  -H "Authorization: Bearer {token}"
```

**Kết quả mong đợi:**
- Update thành công: 200
- Delete thành công: 204
- Unauthorized: 401/403

---

### 8. Kiểm tra API Foods
**Mô tả chi tiết:**
- Test CRUD operations cho foods
- Test `GET /api/foods/location/{locationId}` - lấy foods theo location
- Verify foreign key relationship với location
- Test validation (price phải > 0)

**Cách kiểm tra:**
```bash
# Tạo food
curl -X POST http://localhost:8080/api/foods \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Phở Bò",
    "price": 50000,
    "description": "Phở bò truyền thống",
    "locationId": 1
  }'

# Lấy foods theo location
curl http://localhost:8080/api/foods/location/1
```

**Kết quả mong đợi:**
- CRUD operations hoạt động đúng
- Foods được lọc theo location
- Invalid locationId trả về 400

---

### 9. Kiểm tra API Audio Guides
**Mô tả chi tiết:**
- Test CRUD operations
- Test `GET /api/audio-guides/location/{locationId}` - lấy theo location
- Test `GET /api/audio-guides/location/{locationId}/language/{language}` - lấy theo location và language
- Test `GET /api/audio-guides/language/{language}` - lấy theo language
- Verify hỗ trợ nhiều ngôn ngữ

**Cách kiểm tra:**
```bash
# Tạo audio guide
curl -X POST http://localhost:8080/api/audio-guides \
  -H "Content-Type: application/json" \
  -d '{
    "audioUrl": "https://example.com/audio/vi.mp3",
    "language": "vi",
    "locationId": 1
  }'

# Lấy audio guide theo location và language
curl http://localhost:8080/api/audio-guides/location/1/language/vi
```

**Kết quả mong đợi:**
- Có thể tạo nhiều audio guides cho cùng location với languages khác nhau
- Query theo language hoạt động đúng

---

### 10. Kiểm tra API QR Codes
**Mô tả chi tiết:**
- Test tạo QR code với unique constraint
- Test không thể tạo QR code trùng value
- Test lấy QR code theo value
- Verify relationship với location

**Cách kiểm tra:**
```bash
# Tạo QR code
curl -X POST http://localhost:8080/api/qr-codes \
  -H "Content-Type: application/json" \
  -d '{
    "qrValue": "LOCATION_001",
    "locationId": 1
  }'

# Thử tạo QR code trùng (phải fail)
curl -X POST http://localhost:8080/api/qr-codes \
  -H "Content-Type: application/json" \
  -d '{
    "qrValue": "LOCATION_001",
    "locationId": 2
  }'
```

**Kết quả mong đợi:**
- QR code unique constraint hoạt động
- Duplicate qrValue trả về 400

---

### 11. Kiểm tra API QR Scan
**Mô tả chi tiết:**
- Test `POST /api/qr-scan` với qrValue hợp lệ
- Verify scan log được ghi vào database
- Verify response trả về location details đầy đủ
- Test với QR code không tồn tại

**Cách kiểm tra:**
```bash
curl -X POST http://localhost:8080/api/qr-scan \
  -H "Content-Type: application/json" \
  -d '{
    "qrValue": "LOCATION_001",
    "deviceInfo": "iPhone 13, iOS 15.0"
  }'

# Kiểm tra log trong database
SELECT * FROM qr_scan_log ORDER BY scan_time DESC LIMIT 1;
```

**Kết quả mong đợi:**
- Status code: 200
- Response có location details với foods, audioGuides, qrCode
- Scan log được ghi với timestamp và device info
- Invalid QR code trả về 400

---

### 12. Kiểm tra CORS Configuration
**Mô tả chi tiết:**
- Test từ browser (ReactJS) - verify CORS headers
- Test từ mobile app (React Native)
- Verify preflight OPTIONS request hoạt động
- Kiểm tra exposed headers

**Cách kiểm tra:**
```bash
# Test OPTIONS request (preflight)
curl -X OPTIONS http://localhost:8080/api/locations \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

**Kết quả mong đợi:**
- CORS headers được set đúng
- Preflight request trả về 200
- Không có CORS errors trong browser console

---

### 13. Kiểm tra Validation
**Mô tả chi tiết:**
- Test các required fields (@NotBlank, @NotNull)
- Test invalid data types (string thay vì number)
- Test validation messages rõ ràng
- Test min/max constraints (nếu có)

**Cách kiểm tra:**
```bash
# Test missing required field
curl -X POST http://localhost:8080/api/locations \
  -H "Content-Type: application/json" \
  -d '{"latitude": 21.0285}'  # Missing name

# Test invalid data type
curl -X POST http://localhost:8080/api/foods \
  -H "Content-Type: application/json" \
  -d '{"name": "Food", "price": "invalid", "locationId": 1}'
```

**Kết quả mong đợi:**
- Status code: 400
- Error message chỉ rõ field nào invalid
- Validation errors trong response body

---

### 14. Kiểm tra Error Handling
**Mô tả chi tiết:**
- Test 404 - Resource not found
- Test 400 - Bad request
- Test 401 - Unauthorized
- Test 500 - Internal server error
- Verify error messages không expose sensitive info

**Cách kiểm tra:**
```bash
# 404 - Location không tồn tại
curl http://localhost:8080/api/locations/99999

# 400 - Invalid data
curl -X POST http://localhost:8080/api/locations \
  -H "Content-Type: application/json" \
  -d '{}'

# 401 - No token
curl -X POST http://localhost:8080/api/locations \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'
```

**Kết quả mong đợi:**
- Status codes đúng
- Error messages rõ ràng, user-friendly
- Không có stack traces trong production

---

### 15. Kiểm tra Security - Unauthorized Access
**Mô tả chi tiết:**
- Test truy cập protected endpoints không có token
- Test với token invalid/expired
- Test với token bị sửa đổi
- Verify JWT filter hoạt động đúng

**Cách kiểm tra:**
```bash
# No token
curl -X POST http://localhost:8080/api/locations

# Invalid token
curl -X POST http://localhost:8080/api/locations \
  -H "Authorization: Bearer invalid_token"

# Expired token (sau 24 giờ)
curl -X POST http://localhost:8080/api/locations \
  -H "Authorization: Bearer {expired_token}"
```

**Kết quả mong đợi:**
- Status code: 401 Unauthorized
- Error message không tiết lộ thông tin nhạy cảm

---

### 16. Kiểm tra Security - Token Expiration
**Mô tả chi tiết:**
- Verify token expiration time (24 giờ = 86400000 ms)
- Test token sau khi hết hạn
- Test refresh token mechanism (nếu có)

**Cách kiểm tra:**
- Tạo token và lưu lại
- Đợi 24 giờ hoặc sửa expiration trong code để test nhanh
- Gửi request với token hết hạn

**Kết quả mong đợi:**
- Token hết hạn trả về 401
- Cần login lại để lấy token mới

---

### 17. Kiểm tra Database Relationships
**Mô tả chi tiết:**
- Verify foreign keys hoạt động đúng
- Test cascade delete (xóa location → xóa foods, audioGuides, qrCodes)
- Test orphan records không tồn tại
- Verify data integrity

**Cách kiểm tra:**
```sql
-- Kiểm tra foreign keys
SHOW CREATE TABLE food;
SHOW CREATE TABLE audio_guide;
SHOW CREATE TABLE qr_code;

-- Test cascade delete
DELETE FROM location WHERE location_id = 1;
-- Verify foods, audio_guides, qr_codes cũng bị xóa
```

**Kết quả mong đợi:**
- Foreign keys được enforce
- Cascade operations hoạt động đúng
- Không có orphan records

---

### 18. Kiểm tra Performance - Response Time
**Mô tả chi tiết:**
- Đo thời gian phản hồi của các API endpoints
- Identify slow queries
- Optimize nếu response time > 1 giây

**Cách kiểm tra:**
```bash
# Sử dụng curl với time
time curl http://localhost:8080/api/locations

# Hoặc sử dụng Postman/Insomnia với timing
```

**Kết quả mong đợi:**
- Response time < 500ms cho simple queries
- Response time < 1s cho complex queries

---

### 19. Kiểm tra Performance - Concurrent Requests
**Mô tả chi tiết:**
- Test nhiều requests đồng thời
- Kiểm tra connection pool không bị exhausted
- Verify application không crash

**Cách kiểm tra:**
- Sử dụng Apache Bench hoặc JMeter
```bash
ab -n 1000 -c 10 http://localhost:8080/api/locations
```

**Kết quả mong đợi:**
- Application xử lý được concurrent requests
- Không có connection pool errors
- Response time vẫn acceptable

---

### 20. Kiểm tra Data Initialization
**Mô tả chi tiết:**
- Verify users mặc định (admin, guest) được tạo
- Verify passwords được hash bằng BCrypt
- Test login với users mặc định

**Cách kiểm tra:**
```sql
-- Kiểm tra users
SELECT * FROM user;

-- Verify password hash (phải bắt đầu với $2a$)
SELECT username, password FROM user;
```

**Kết quả mong đợi:**
- Users admin và guest tồn tại
- Passwords được hash (không phải plain text)
- Có thể login với credentials mặc định

---

### 21. Kiểm tra API Response Format
**Mô tả chi tiết:**
- Verify JSON structure đúng với DTOs
- Kiểm tra data types (numbers, strings, booleans)
- Test null handling
- Verify nested objects (foods trong location)

**Cách kiểm tra:**
- Inspect response từ Postman/curl
- Verify JSON schema

**Kết quả mong đợi:**
- JSON structure đúng
- Data types chính xác
- Null values được handle đúng

---

### 22. Kiểm tra Logging
**Mô tả chi tiết:**
- Verify logs được ghi đúng
- Kiểm tra không có sensitive data (passwords, tokens) trong logs
- Verify log levels (INFO, ERROR, WARN)

**Cách kiểm tra:**
- Xem log files hoặc console output
- Search cho passwords/tokens

**Kết quả mong đợi:**
- Logs có thông tin hữu ích
- Không có sensitive data trong logs
- Log levels phù hợp

---

### 23. Kiểm tra Transaction Management
**Mô tả chi tiết:**
- Test rollback khi có exception
- Verify @Transactional hoạt động
- Test nested transactions

**Cách kiểm tra:**
- Tạo test case gây exception trong transaction
- Verify data không được commit

**Kết quả mong đợi:**
- Transactions rollback khi có lỗi
- Data integrity được maintain

---

### 24. Kiểm tra Multi-language Support
**Mô tả chi tiết:**
- Test tạo audio guides với nhiều ngôn ngữ (vi, en, zh, ja, ko)
- Test query audio guide theo language
- Verify có thể có nhiều audio guides cho cùng location

**Cách kiểm tra:**
```bash
# Tạo audio guides với nhiều ngôn ngữ
curl -X POST http://localhost:8080/api/audio-guides \
  -d '{"audioUrl":"...","language":"vi","locationId":1}'
curl -X POST http://localhost:8080/api/audio-guides \
  -d '{"audioUrl":"...","language":"en","locationId":1}'
curl -X POST http://localhost:8080/api/audio-guides \
  -d '{"audioUrl":"...","language":"zh","locationId":1}'
```

**Kết quả mong đợi:**
- Có thể tạo nhiều audio guides với languages khác nhau
- Query theo language hoạt động đúng

---

### 25. Kiểm tra Edge Cases
**Mô tả chi tiết:**
- Test với null values
- Test với empty strings
- Test với max length strings
- Test với special characters
- Test với negative numbers (nếu không hợp lệ)

**Cách kiểm tra:**
```bash
# Test null
curl -X POST http://localhost:8080/api/locations \
  -d '{"name":null,"latitude":21.0285,"longitude":105.8542}'

# Test empty string
curl -X POST http://localhost:8080/api/locations \
  -d '{"name":"","latitude":21.0285,"longitude":105.8542}'

# Test special characters
curl -X POST http://localhost:8080/api/locations \
  -d '{"name":"Test <script>alert(1)</script>","latitude":21.0285,"longitude":105.8542}'
```

**Kết quả mong đợi:**
- Edge cases được handle đúng
- Không có SQL injection vulnerabilities
- XSS prevention (nếu có frontend)

---

## Checklist tổng hợp

### ✅ Phải hoàn thành trước khi deploy (Ưu tiên Cao)
- [ ] 1. Kiểm tra kết nối Database
- [ ] 2. Kiểm tra khởi động ứng dụng
- [ ] 3. Kiểm tra API Authentication
- [ ] 4. Kiểm tra JWT Token
- [ ] 5. Kiểm tra API Locations - GET
- [ ] 8. Kiểm tra API Foods
- [ ] 9. Kiểm tra API Audio Guides
- [ ] 10. Kiểm tra API QR Codes
- [ ] 11. Kiểm tra API QR Scan
- [ ] 15. Kiểm tra Security - Unauthorized Access
- [ ] 17. Kiểm tra Database Relationships
- [ ] 20. Kiểm tra Data Initialization
- [ ] 24. Kiểm tra Multi-language Support

### ⚠️ Nên hoàn thành (Ưu tiên Trung bình)
- [ ] 6. Kiểm tra API Locations - POST
- [ ] 7. Kiểm tra API Locations - PUT/DELETE
- [ ] 12. Kiểm tra CORS Configuration
- [ ] 13. Kiểm tra Validation
- [ ] 14. Kiểm tra Error Handling
- [ ] 16. Kiểm tra Security - Token Expiration
- [ ] 21. Kiểm tra API Response Format
- [ ] 23. Kiểm tra Transaction Management
- [ ] 25. Kiểm tra Edge Cases

### 📊 Có thể làm sau (Ưu tiên Thấp)
- [ ] 18. Kiểm tra Performance - Response Time
- [ ] 19. Kiểm tra Performance - Concurrent Requests
- [ ] 22. Kiểm tra Logging

---

## Công cụ kiểm tra đề xuất

1. **Postman/Insomnia** - Test API endpoints
2. **curl** - Command line testing
3. **JWT.io** - Decode và verify JWT tokens
4. **MySQL Workbench** - Kiểm tra database
5. **Apache Bench (ab)** - Load testing
6. **JMeter** - Performance testing
7. **Browser DevTools** - Kiểm tra CORS, network requests

---

## Ghi chú

- **Ưu tiên Cao**: Phải hoàn thành trước khi deploy production
- **Ưu tiên Trung bình**: Nên hoàn thành để đảm bảo chất lượng
- **Ưu tiên Thấp**: Có thể làm sau, tối ưu hóa
