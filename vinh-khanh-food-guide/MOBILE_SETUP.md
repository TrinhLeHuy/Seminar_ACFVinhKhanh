# Vĩnh Khánh Food Street - Mobile App Setup

This guide explains how to set up the React Native mobile app in a separate folder.

## Project Structure

```
vinh-khanh-food-guide/
├── client/                        # ReactJS Web App
│   ├── models/                    # M - Data structures (re-export from shared)
│   │   └── Location.ts
│   ├── controllers/               # C - Business Logic
│   │   ├── useLocationController.ts
│   │   ├── useAudioGuideController.ts
│   │   └── useAuthController.ts
│   ├── components/                # V - Reusable UI Components
│   │   ├── LocationCard.tsx
│   │   ├── AudioPlayer.tsx
│   │   ├── QRScanner.tsx
│   │   └── ui/                    # Shadcn components
│   ├── pages/                     # V - Page Views
│   │   ├── Index.tsx
│   │   ├── LocationDetail.tsx
│   │   └── NotFound.tsx
│   └── App.tsx
│
├── mobile/                        # React Native Mobile App
│   ├── src/
│   │   ├── models/                # M - Models (re-export from shared)
│   │   │   └── index.ts
│   │   ├── controllers/           # C - Business Logic
│   │   │   ├── useLocationController.ts
│   │   │   └── useAuthController.ts
│   │   ├── screens/               # V - Screen Views
│   │   │   ├── HomeScreen.tsx
│   │   │   └── LocationDetailScreen.tsx
│   │   ├── components/            # V - Reusable Components
│   │   │   ├── LocationCard.tsx
│   │   │   └── AudioPlayer.tsx
│   │   └── App.tsx
│   ├── app.json
│   ├── package.json
│   └── tsconfig.json
│
├── shared/                         # Shared Types & Utilities
│   ├── models/                    # Shared Models
│   │   ├── Location.ts
│   │   ├── Food.ts
│   │   ├── AudioGuide.ts
│   │   ├── QRCode.ts
│   │   ├── User.ts
│   │   └── index.ts
│   └── api.ts                      # Shared API Service
│
└── server/                         # Express Backend (optional)
```

## Setting Up React Native App

### Prerequisites
- Node.js 16+
- pnpm
- Xcode (for iOS)
- Android Studio (for Android)

### Creating the Mobile App

```bash
# Navigate to project root
cd vinh-khanh-food-guide

# Create React Native project with Expo (recommended for quick setup)
npx create-expo-app mobile --template blank-typescript

cd mobile

# Install dependencies
pnpm install

# Install required packages
pnpm add @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
pnpm add react-native-screens react-native-safe-area-context
pnpm add @tanstack/react-query
pnpm add @react-native-async-storage/async-storage
pnpm add expo-barcode-scanner expo-av
pnpm add react-native-maps
pnpm add lucide-react-native
```

**Note:** The mobile app structure has already been created. You just need to install dependencies.

### Key Differences from Web

1. **Navigation**: Uses React Navigation (Bottom Tab Navigator, Stack Navigator)
2. **UI Components**: React Native primitives instead of TailwindCSS
3. **Styling**: StyleSheet instead of CSS/TailwindCSS
4. **Shared Logic**: Models and Controllers are reused

### MVC Structure for Mobile

#### Models (Shared with Web)
```typescript
// mobile/src/models/index.ts - Re-export from shared
export * from '../../../shared/models';

// Usage in mobile
import type { Location, Food, AudioGuide } from '@/models';
```

#### Controllers (Business Logic)
```typescript
// mobile/src/controllers/useLocationController.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { locationApi } from '../../../shared/api';

export const useLocationController = () => {
  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: () => locationApi.getAll(),
  });
  
  return { locations, ... };
};
```

#### Views (Mobile-specific Screens)
```typescript
// mobile/src/screens/HomeScreen.tsx
import { useLocationController } from '../controllers/useLocationController';
import { LocationCard } from '../components/LocationCard';

export const HomeScreen = () => {
  const { locations, selectLocation } = useLocationController();
  
  return (
    <FlatList
      data={locations}
      renderItem={({ item }) => (
        <LocationCard
          location={item}
          onPress={() => selectLocation(item.locationId)}
        />
      )}
    />
  );
};
```

## API Communication

Both web and mobile apps communicate with the same Spring Boot backend:

```typescript
// shared/api.ts - Shared API service
import { locationApi } from './api';

// In web or mobile
const locations = await locationApi.getAll();
const location = await locationApi.getById(1);
const locationByQR = await locationApi.getByQRCode('QR_CODE_123');
```

### Backend Connection

The frontend connects to the Spring Boot backend at:
- **Development**: `http://localhost:8080/api`
- **Production**: Set via environment variable `VITE_API_URL` (web) or `REACT_APP_API_URL` (mobile)

### Authentication

Both apps use JWT tokens stored in:
- **Web**: `localStorage`
- **Mobile**: `AsyncStorage`

```typescript
// Login
import { authApi } from '../../../shared/api';
const response = await authApi.login({ username: 'admin', password: '123456' });
// Token is automatically stored
```

## Development Workflow

### Web (Existing)
```bash
cd web
pnpm dev
```

### Mobile (New)
```bash
cd mobile

# For Expo
npx expo start

# For iOS
npm run ios

# For Android
npm run android
```

## Building for Production

### Web
```bash
cd web
pnpm build
# Deploy to Netlify/Vercel
```

### Mobile
```bash
cd mobile

# iOS
eas build --platform ios

# Android
eas build --platform android

# Or using native tools
npx react-native build-ios
npx react-native build-android
```

## Shared Dependencies

To avoid duplication, create a `shared/` folder at the root:

```bash
# In web/package.json
{
  "dependencies": {
    "vinh-khanh-shared": "file:../shared"
  }
}

# In mobile/package.json
{
  "dependencies": {
    "vinh-khanh-shared": "file:../shared"
  }
}
```

Then in `shared/package.json`:
```json
{
  "name": "vinh-khanh-shared",
  "version": "1.0.0",
  "main": "index.ts",
  "files": ["models/", "utils/", "types/"]
}
```

## Environment Variables

### Web App
Create `.env` in project root:

```bash
VITE_API_URL=http://localhost:8080/api
```

### Mobile App
Create `.env` in `mobile/` folder:

```bash
REACT_APP_API_URL=http://localhost:8080/api
```

**Important for Mobile:**
- On **Android Emulator**: Use `http://10.0.2.2:8080/api`
- On **iOS Simulator**: Use `http://localhost:8080/api`
- On **Physical Device**: Use your computer's IP address, e.g., `http://192.168.1.100:8080/api`

## Testing

### Web
```bash
cd web
pnpm test
```

### Mobile
```bash
cd mobile
npm run test
```

## CI/CD Deployment

Both apps can be deployed through:

1. **Web**: Netlify, Vercel, GitHub Pages
2. **Mobile**: 
   - iOS: App Store (via Xcode/Fastlane)
   - Android: Google Play Store (via Android Studio/Fastlane)

## Next Steps

✅ **Completed:**
1. ✅ Created `mobile/` folder structure
2. ✅ Implemented screens (HomeScreen, LocationDetailScreen)
3. ✅ Created mobile-specific components (LocationCard, AudioPlayer)
4. ✅ Set up shared models and API utilities
5. ✅ Connected to Spring Boot backend APIs
6. ✅ Implemented MVC architecture

**Remaining Tasks:**
1. Install dependencies: `cd mobile && pnpm install`
2. Add QR Scanner screen (using expo-barcode-scanner)
3. Add Map view (using react-native-maps)
4. Add authentication screens (Login)
5. Test on iOS and Android devices
6. Configure CI/CD pipelines
7. Deploy to App Stores

## Key Features Implemented

### Web App
- ✅ Location listing with cards
- ✅ Location detail page
- ✅ Audio player for multi-language guides
- ✅ QR code scanner
- ✅ Authentication (JWT)
- ✅ Responsive design with TailwindCSS

### Mobile App
- ✅ Location listing screen
- ✅ Location detail screen
- ✅ Audio player component
- ✅ Navigation with React Navigation
- ✅ Pull-to-refresh
- ✅ Loading and error states

## Backend Integration

The frontend connects to the Spring Boot backend with these endpoints:

- `GET /api/locations` - Get all locations
- `GET /api/locations/{id}` - Get location by ID
- `GET /api/locations/qr/{qrValue}` - Get location by QR code
- `POST /api/qr-scan` - Scan QR code
- `GET /api/foods/location/{locationId}` - Get foods by location
- `GET /api/audio-guides/location/{locationId}` - Get audio guides by location
- `POST /api/auth/login` - Login and get JWT token

See `shared/api.ts` for complete API documentation.

## Resources

- [React Native Documentation](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [Expo Documentation](https://docs.expo.dev)
- [TypeScript in React Native](https://reactnative.dev/docs/typescript)

## Support

For questions or issues, refer to the main `README.md` or contact the development team.
