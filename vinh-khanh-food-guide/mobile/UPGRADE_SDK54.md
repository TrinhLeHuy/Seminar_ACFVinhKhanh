# Hướng dẫn nâng cấp lên Expo SDK 54

## Vấn đề
Expo Go trên thiết bị của bạn đang sử dụng SDK 54, nhưng project đang dùng SDK 51.

## Giải pháp

### Bước 1: Cập nhật dependencies
File `package.json` đã được cập nhật với các phiên bản tương thích SDK 54:

```json
{
  "expo": "~54.0.0",
  "react": "18.3.1",
  "react-native": "0.76.5",
  ...
}
```

### Bước 2: Cài đặt lại dependencies

```bash
cd mobile
rm -rf node_modules
rm package-lock.json  # hoặc pnpm-lock.yaml nếu dùng pnpm
pnpm install
# hoặc
npm install
```

### Bước 3: Clear cache và khởi động lại

```bash
# Clear Expo cache
npx expo start --clear

# Hoặc nếu dùng npm
npm start -- --clear
```

### Bước 4: Kiểm tra app.json

Đảm bảo `app.json` không có `sdkVersion` cũ (SDK 54 sẽ tự động detect).

## Lưu ý

1. **iOS Simulator**: Nếu vẫn gặp vấn đề, có thể chạy trên iOS Simulator:
   ```bash
   npx expo start --ios
   ```

2. **Android**: Tương tự cho Android:
   ```bash
   npx expo start --android
   ```

3. **Expo Go**: Sau khi cập nhật, app sẽ tương thích với Expo Go SDK 54 trên thiết bị của bạn.

## Thay đổi chính trong SDK 54

- React Native 0.76.5
- React 18.3.1
- Expo Router 4.0.0
- Các dependencies khác đã được cập nhật để tương thích

## Troubleshooting

Nếu vẫn gặp lỗi:

1. Xóa `.expo` folder:
   ```bash
   rm -rf .expo
   ```

2. Xóa cache:
   ```bash
   npx expo start --clear
   ```

3. Kiểm tra Expo CLI version:
   ```bash
   npx expo --version
   ```
   Nên là version mới nhất.

4. Cập nhật Expo CLI:
   ```bash
   npm install -g @expo/cli@latest
   ```
