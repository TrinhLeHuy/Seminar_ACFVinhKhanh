# Fix Dependency Conflicts

## Vấn đề
Có conflicts giữa React 19 và một số testing libraries.

## Giải pháp

### Bước 1: Cài đặt với --legacy-peer-deps

```powershell
npm install --legacy-peer-deps
```

### Bước 2: Cài đặt expo-linking và @types/react

```powershell
npx expo install expo-linking@~8.0.11
npm install --save-dev @types/react@~19.1.10 --legacy-peer-deps
```

### Bước 3: Nếu vẫn lỗi, xóa @testing-library/react-native

Package này không cần thiết cho development và đang gây conflict. Đã được xóa khỏi package.json.

Nếu bạn cần testing sau này, có thể cài lại với:
```powershell
npm install --save-dev @testing-library/react-native@latest --legacy-peer-deps
```

### Bước 4: Start lại Expo

```powershell
npx expo start --clear
```

## Lưu ý

- `@testing-library/react-native` đã được xóa vì gây conflict với React 19
- Bạn có thể thêm lại sau khi app đã chạy ổn định
- Dùng `--legacy-peer-deps` để bypass peer dependency conflicts
