# 🍜 Vĩnh Khánh Food Street - Automated Guide App

A modern, responsive, full-stack application for an interactive guide to Vinh Khanh Food Street. Built with **React/TypeScript (Web)** and **React Native (Mobile)** using **MVC Architecture**.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-In%20Development-yellow)

## 🌟 Features

- 🏪 **Browse Food Stalls**: Explore 6+ restaurants and food vendors
- 🔍 **Smart Search**: Find restaurants by name or cuisine
- 📂 **Category Filtering**: Filter by food type (Phở, Bánh Mì, Hải Sản, etc.)
- ⭐ **Ratings & Reviews**: See customer ratings and reviews
- 🕐 **Operating Hours**: Check real-time status and opening hours
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 💰 **Price Filtering**: Budget, moderate, or upscale options
- 🎯 **Optimized Performance**: Fast loading with TypeScript + MVC
- 🌐 **Web & Mobile**: Single codebase for web and native mobile
- 🏗️ **MVC Architecture**: Clean separation of concerns

## 📁 Project Structure

```
vinh-khanh-food-street/
├── client/                      # Web React App
│   ├── models/                  # M - Data structures
│   │   └── FoodStall.ts
│   ├── controllers/             # C - Business logic
│   │   └── useFoodStallController.ts
│   ├── components/              # V - Reusable UI
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FoodStallCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── ui/                  # Shadcn components
│   ├── pages/                   # V - Page views
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── hooks/
│   ├── lib/
│   ├── App.tsx
│   └── global.css
│
├── mobile/                      # React Native App (coming soon)
│   ├── src/
│   │   ├── models/              # Shared with web
│   │   ├── controllers/         # Shared with web
│   │   ├── screens/
│   │   ├── components/
│   │   └── navigation/
│   └── app.json
│
├── server/                      # Express Backend
│   ├── index.ts
│   └── routes/
│
├── shared/                      # Shared Types
│   └── api.ts
│
├── MVC_ARCHITECTURE.md          # Architecture guide
├── MOBILE_SETUP.md              # Mobile setup guide
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ 
- **pnpm** 8+
- **Git**

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd vinh-khanh-food-street

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:8080`

## 📖 Usage

### Web App

#### View all food stalls
- Navigate to the homepage
- Browse all 6+ restaurants in the featured grid

#### Search for a restaurant
1. Enter restaurant name in the search bar
2. Press "Tìm" or Enter
3. Results filter in real-time

#### Filter by category
1. Click a category button (Phở, Bánh Mì, etc.)
2. Grid updates to show restaurants in that category
3. Click "Tất Cả" to reset filter

#### Filter by price
- Click specialty tags to see more about dishes
- View "Xem Chi Tiết" for full restaurant details

## 🏗️ Architecture Overview

### MVC Pattern

**Models** (`models/`)
- Define data structures and types
- Store mock data and constants
- Pure TypeScript interfaces

**Controllers** (`controllers/`)
- Business logic using React hooks
- State management
- Data filtering and transformation
- API communication

**Views** (`pages/` and `components/`)
- React components for UI
- Consume controller hooks
- Handle user interactions
- Responsive design with TailwindCSS

See [MVC_ARCHITECTURE.md](./MVC_ARCHITECTURE.md) for detailed explanation.

### Tech Stack

**Web**
- React 18
- React Router 6
- TypeScript
- Vite
- TailwindCSS 3
- Shadcn UI
- Lucide React Icons

**Mobile** (Coming Soon)
- React Native
- React Navigation
- TypeScript
- Expo (or native build)

**Backend**
- Express.js
- Node.js
- TypeScript

## 📚 Key Files

| File | Purpose |
|------|---------|
| `client/models/FoodStall.ts` | Data structures and types |
| `client/controllers/useFoodStallController.ts` | Business logic & state management |
| `client/pages/Index.tsx` | Homepage view |
| `client/components/FoodStallCard.tsx` | Restaurant card component |
| `client/App.tsx` | Main app entry point |
| `server/index.ts` | Express server setup |
| `tailwind.config.ts` | TailwindCSS configuration |

## 🎨 Design System

### Colors

| Purpose | Color | HSL |
|---------|-------|-----|
| Primary | Red-Orange | `14 89% 48%` |
| Secondary | Golden | `39 100% 60%` |
| Background | Cream | `48 14% 97%` |
| Text | Dark | `21 84% 15%` |

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold (700-800)
- **Body**: Regular (400) & Semi-bold (600)

### Components

- Card designs with hover effects
- Gradient buttons (primary action)
- Category pill buttons
- Food stall cards with image, rating, hours

## 🔧 Development

### Start Dev Server
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
pnpm start
```

### Run Tests
```bash
pnpm test
```

### Type Check
```bash
pnpm typecheck
```

### Format Code
```bash
pnpm format.fix
```

## 📱 Mobile Setup

To set up the React Native mobile app:

1. Read [MOBILE_SETUP.md](./MOBILE_SETUP.md)
2. Create `mobile/` folder with React Native
3. Share models and controllers with web
4. Implement mobile-specific screens using React Navigation

## 🚢 Deployment

### Web
- Push to repository
- Deploy to **Netlify** or **Vercel**
- Automatic builds and deployments

### Mobile
- Build APK/AAB for Android via EAS Build
- Build IPA for iOS via EAS Build
- Submit to App Stores

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Keep MVC structure in mind
4. Test thoroughly
5. Submit pull request

## 📝 Code Guidelines

- **Models**: Pure data, no logic
- **Controllers**: Business logic, no UI
- **Views**: UI only, use controllers
- **Components**: Small, reusable, focused
- **Naming**: Clear and descriptive
- **Comments**: JSDoc for functions
- **Types**: Always use TypeScript

## 🔐 Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:8080
VITE_GOOGLE_MAPS_KEY=your_key_here
VITE_STRIPE_KEY=your_key_here
```

## 📊 Data Model

### FoodStall
```typescript
{
  id: string;
  name: string;
  description: string;
  category: string;          // pho, banh-mi, seafood, etc.
  image: string;
  rating: number;            // 1-5
  reviews: number;           // count
  location: string;
  openTime: string;          // HH:MM
  closeTime: string;         // HH:MM
  isOpen: boolean;
  specialty: string[];       // signature dishes
  price: "budget" | "moderate" | "upscale";
}
```

## 🎯 Roadmap

- [x] Web homepage with food stalls
- [x] Search and filtering
- [x] Category system
- [x] MVC architecture
- [ ] Mobile app (React Native)
- [ ] Backend API endpoints
- [ ] Database integration
- [ ] User authentication
- [ ] Reservation system
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Analytics

## 📞 Support

For questions or issues:
1. Check [MVC_ARCHITECTURE.md](./MVC_ARCHITECTURE.md)
2. Review code examples in components
3. Check [MOBILE_SETUP.md](./MOBILE_SETUP.md) for mobile questions
4. Open an issue on GitHub

## 📄 License

MIT License - see LICENSE file

## 👥 Team

- **Designer**: UI/UX for Food Street Guide
- **Frontend**: React + TypeScript
- **Backend**: Express + Node.js
- **Mobile**: React Native (coming soon)

## 🙏 Acknowledgments

- Vĩnh Khánh Food Street community
- Inspired by modern food guide apps
- Built with modern web technologies

---

**Status**: Active Development 🚀

Last Updated: January 2024

For more details, see:
- [MVC Architecture Guide](./MVC_ARCHITECTURE.md)
- [Mobile Setup Guide](./MOBILE_SETUP.md)
- [Project Components](./client/components/)
