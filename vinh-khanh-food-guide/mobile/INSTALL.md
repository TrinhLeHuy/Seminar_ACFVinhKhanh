# Hướng dẫn cài đặt Mobile App (PowerShell)

## Bước 1: Xóa node_modules (PowerShell)

```powershell
# Trong PowerShell, dùng lệnh này thay vì rm -rf
Remove-Item -Recurse -Force node_modules
```

Hoặc nếu node_modules không tồn tại, bỏ qua bước này.

## Bước 2: Cài đặt dependencies

### Nếu dùng npm:
```powershell
npm install --legacy-peer-deps
```

### Nếu dùng pnpm:
```powershell
npx pnpm install
```

### Nếu dùng yarn:
```powershell
yarn install
```

## Bước 3: Khởi động Expo

```powershell
npx expo start --clear
```

## Lưu ý cho PowerShell

- PowerShell không hỗ trợ `rm -rf`, dùng `Remove-Item -Recurse -Force` thay thế
- Nếu gặp lỗi permission, chạy PowerShell as Administrator
- Nếu gặp lỗi dependency conflicts, dùng `--legacy-peer-deps` với npm

## Troubleshooting

### Lỗi peer dependencies:
```powershell
npm install --legacy-peer-deps
```

### Clear cache:
```powershell
npx expo start --clear
```

### Xóa toàn bộ và cài lại:
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json  # nếu có
npm install --legacy-peer-deps
```
