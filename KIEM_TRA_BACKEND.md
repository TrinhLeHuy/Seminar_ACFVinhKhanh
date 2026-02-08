# 🔍 HƯỚNG DẪN KIỂM TRA BACKEND SPRING BOOT

## 📋 Thông tin cấu hình hiện tại

Từ file `foodguide/src/main/resources/application.properties`:

```properties
# Backend chạy ở port:
server.port=8088

# Database MySQL chạy ở port:
spring.datasource.url=jdbc:mysql://localhost:3307/vinh_khanh_food_guide
spring.datasource.username=root
spring.datasource.password=
```

---

## ✅ CÁCH 1: KIỂM TRA BACKEND ĐÃ CHẠY CHƯA

### Bước 1: Kiểm tra port 8088 có đang được sử dụng không

Mở **Command Prompt** hoặc **PowerShell** và chạy:

```bash
netstat -ano | findstr :8088
```

**Kết quả:**
- ✅ **Có output** → Backend đang chạy (hoặc port bị chiếm bởi app khác)
- ❌ **Không có output** → Backend chưa chạy

**Ví dụ output khi backend đang chạy:**
```
TCP    0.0.0.0:8088           0.0.0.0:0              LISTENING       12345
TCP    [::]:8088              [::]:0                 LISTENING       12345
```

### Bước 2: Kiểm tra bằng trình duyệt

Mở trình duyệt và truy cập:

```
http://localhost:8088/api/locations
```

**Kết quả mong đợi:**
- ✅ **Thấy JSON data** → Backend chạy thành công! 🎉
  ```json
  [
    {
      "id": 1,
      "name": "Phở Vĩnh Khánh",
      "description": "...",
      ...
    }
  ]
  ```
- ❌ **"This site can't be reached"** → Backend chưa chạy
- ❌ **Error 500** → Backend chạy nhưng có lỗi database

---

## 🚀 CÁCH 2: CHẠY BACKEND

### Option A: Chạy từ Command Prompt

```bash
cd c:\Users\Ha\Desktop\Seminar_ACFVinhKhanh\foodguide
mvnw.cmd spring-boot:run
```

### Option B: Chạy từ IDE (IntelliJ IDEA / Eclipse)

1. Mở project `foodguide` trong IDE
2. Tìm file `FoodguideApplication.java`
3. Click chuột phải → **Run 'FoodguideApplication'**

---

## 📊 DẤU HIỆU BACKEND CHẠY THÀNH CÔNG

Khi chạy `mvnw.cmd spring-boot:run`, bạn sẽ thấy các dòng log như sau:

### ✅ Dấu hiệu THÀNH CÔNG:

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.5.9)

2026-02-05T23:02:48.670+07:00  INFO 880 --- [foodguide] [main] c.v.foodguide.FoodguideApplication : Starting FoodguideApplication
...
2026-02-05T23:02:49.853+07:00  INFO 880 --- [foodguide] [main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat initialized with port 8088 (http)
...
Started FoodguideApplication in 5.123 seconds (process running for 5.456)
```

**Dòng quan trọng nhất:**
```
Started FoodguideApplication in X.XXX seconds
```

### ❌ Dấu hiệu LỖI:

#### Lỗi 1: Port đã bị chiếm
```
***************************
APPLICATION FAILED TO START
***************************

Description:
Web server failed to start. Port 8088 was already in use.

Action:
Identify and stop the process that's listening on port 8088 or configure this application to listen on another port.
```

**Giải pháp:**
- **Option 1**: Tắt ứng dụng đang chiếm port 8088
  ```bash
  # Tìm PID của process
  netstat -ano | findstr :8088
  # Kết quả: TCP ... LISTENING 12345
  
  # Kill process (thay 12345 bằng PID thực tế)
  taskkill /PID 12345 /F
  ```

- **Option 2**: Đổi port trong `application.properties`
  ```properties
  server.port=8089  # Hoặc port khác
  ```

#### Lỗi 2: Không kết nối được MySQL
```
Error creating bean with name 'dataSource'
...
Communications link failure
```

**Giải pháp:**
1. Kiểm tra MySQL đang chạy:
   ```bash
   # Kiểm tra port 3307
   netstat -ano | findstr :3307
   ```

2. Kiểm tra username/password trong `application.properties`

3. Hoặc chuyển sang dùng **H2 Database** (in-memory, không cần MySQL):
   ```properties
   # Comment out MySQL config
   #spring.datasource.url=jdbc:mysql://localhost:3307/vinh_khanh_food_guide
   
   # Add H2 config
   spring.datasource.url=jdbc:h2:mem:testdb
   spring.datasource.driverClassName=org.h2.Driver
   spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
   spring.h2.console.enabled=true
   ```

---

## 🧪 KIỂM TRA CÁC API ENDPOINTS

Sau khi backend chạy thành công, test các endpoints sau:

### 1. Lấy tất cả locations
```
GET http://localhost:8088/api/locations
```

### 2. Lấy location theo ID
```
GET http://localhost:8088/api/locations/1
```

### 3. Lấy foods theo location
```
GET http://localhost:8088/api/foods/location/1
```

### 4. Lấy audio guides theo location
```
GET http://localhost:8088/api/audio-guides/location/1
```

### 5. Login (POST request)
```
POST http://localhost:8088/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Công cụ test API:**
- Trình duyệt (cho GET requests)
- Postman
- Thunder Client (VS Code extension)
- curl command

---

## 🔧 TROUBLESHOOTING

### Vấn đề: Backend chạy nhưng API trả về empty array []

**Nguyên nhân:** Database chưa có data

**Giải pháp:**
1. Import file SQL: `vinh_khanh_food_guide.sql`
2. Hoặc kiểm tra `DataInitializer.java` có chạy không

### Vấn đề: CORS error khi gọi từ web app

**Giải pháp:** Đã cấu hình CORS trong `application.properties`:
```properties
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
```

Nếu vẫn lỗi, kiểm tra `SecurityConfig.java`

---

## 📝 CHECKLIST BACKEND HOẠT ĐỘNG

- [ ] MySQL đang chạy ở port 3307 (hoặc dùng H2)
- [ ] Database `vinh_khanh_food_guide` đã được tạo
- [ ] Backend chạy thành công ở port 8088
- [ ] Truy cập `http://localhost:8088/api/locations` thấy JSON data
- [ ] Không có error trong console logs
- [ ] Web app có thể gọi API thành công

---

## 🎯 KẾT QUẢ MONG ĐỢI

Khi mọi thứ hoạt động:

1. **Terminal backend** hiển thị:
   ```
   Started FoodguideApplication in X.XXX seconds
   ```

2. **Browser** tại `http://localhost:8088/api/locations` hiển thị:
   ```json
   [
     {
       "id": 1,
       "name": "Phở Vĩnh Khánh",
       "latitude": 10.762622,
       "longitude": 106.660172,
       ...
     }
   ]
   ```

3. **Web app** tại `http://localhost:5174/` hiển thị danh sách locations từ backend

---

## 💡 MẸO HAY

### Xem logs chi tiết hơn
Thêm vào `application.properties`:
```properties
logging.level.root=INFO
logging.level.com.vinhkhanh.foodguide=DEBUG
```

### Kiểm tra nhanh backend có chạy không
```bash
curl http://localhost:8088/api/locations
```

### Restart backend nhanh
- Nhấn `Ctrl + C` trong terminal đang chạy backend
- Chạy lại: `mvnw.cmd spring-boot:run`

---

**Chúc bạn chạy backend thành công!** 🚀
