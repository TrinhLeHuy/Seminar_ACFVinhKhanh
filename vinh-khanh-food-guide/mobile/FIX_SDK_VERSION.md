# Fix SDK Version Mismatch

## Vấn đề
Expo Go vẫn detect project đang dùng SDK 51 thay vì SDK 54.

## Giải pháp

### Bước 1: Xóa cache và node_modules

```powershell
# Xóa node_modules
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

# Xóa .expo folder (cache)
Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue

# Xóa package-lock.json hoặc pnpm-lock.yaml
Remove-Item package-lock.json -ErrorAction SilentlyContinue
Remove-Item pnpm-lock.yaml -ErrorAction SilentlyContinue
```

### Bước 2: Cài đặt lại dependencies

```powershell
npm install --legacy-peer-deps
```

### Bước 3: Clear Expo cache và khởi động lại

```powershell
npx expo start --clear
```

### Bước 4: Nếu vẫn không được, thử:

```powershell
# Xóa toàn bộ cache
npx expo start --clear --reset-cache

# Hoặc
npm start -- --clear
```

## Kiểm tra SDK Version

Sau khi cài đặt, kiểm tra:

```powershell
npx expo --version
```

Và kiểm tra trong package.json:
- `expo` phải là `~54.0.0`
- `app.json` đã có `"sdkVersion": "54.0.0"`

## Alternative: Sử dụng iOS Simulator

Nếu vẫn gặp vấn đề với Expo Go trên device:

```powershell
npx expo start --ios
```

Điều này sẽ mở iOS Simulator với SDK version phù hợp.

## Troubleshooting

### Nếu vẫn báo SDK 51:

1. Kiểm tra `package.json` - đảm bảo `expo` là `~54.0.0`
2. Kiểm tra `app.json` - đảm bảo có `"sdkVersion": "54.0.0"`
3. Xóa `.expo` folder hoàn toàn
4. Restart terminal và chạy lại `npx expo start --clear`

### Force upgrade SDK:

```powershell
npx expo install --fix
```

Lệnh này sẽ tự động fix các dependencies để match với Expo SDK version.
