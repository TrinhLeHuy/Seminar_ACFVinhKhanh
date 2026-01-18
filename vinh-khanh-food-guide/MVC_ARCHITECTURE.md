# Vĩnh Khánh Food Street - MVC Architecture

## Overview

This project implements the **Model-View-Controller (MVC)** architectural pattern, separating concerns for both web (React) and mobile (React Native) applications.

## Architecture Layers

### 1. Models (`client/models/`)

Models define the data structure and types used throughout the application.

```typescript
// client/models/FoodStall.ts
export interface FoodStall {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
  specialty: string[];
  price: "budget" | "moderate" | "upscale";
}

export interface FoodCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}
```

**Responsibilities:**
- Define interfaces and types
- Store constants and mock data
- Business logic related to data transformation

**Benefits:**
- Single source of truth for data structure
- Type safety across web and mobile
- Easy to share between platforms

### 2. Controllers (`client/controllers/`)

Controllers contain the business logic and state management using React hooks.

```typescript
// client/controllers/useFoodStallController.ts
export const useFoodStallController = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  const filteredStalls = useMemo(() => {
    return allStalls.filter(stall => {
      // Filter logic
    });
  }, [selectedCategory, searchQuery, priceFilter]);

  return {
    stalls: filteredStalls,
    categories,
    selectedCategory,
    setSelectedCategory,
    // ... more methods
  };
};
```

**Responsibilities:**
- Manage application state
- Handle data filtering and sorting
- API calls and data fetching
- Business logic implementation

**Benefits:**
- Separation of logic from UI
- Reusable across different views
- Easy to test in isolation
- Can be used in both web and mobile

### 3. Views (`client/pages/` and `client/components/`)

Views are React components responsible for rendering the UI and user interaction.

#### Page Components (`pages/`)
```typescript
// client/pages/Index.tsx
export default function Index() {
  const controller = useFoodStallController();

  return (
    <>
      <Header />
      <section>
        <CategoryFilter
          categories={controller.categories}
          selectedCategory={controller.selectedCategory}
          onCategorySelect={controller.setSelectedCategory}
        />
        <div className="grid">
          {controller.stalls.map(stall => (
            <FoodStallCard key={stall.id} stall={stall} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
```

#### Presentational Components (`components/`)
```typescript
// client/components/FoodStallCard.tsx
interface FoodStallCardProps {
  stall: FoodStall;
}

export const FoodStallCard = ({ stall }: FoodStallCardProps) => {
  return (
    <div className="card">
      <img src={stall.image} alt={stall.name} />
      <h3>{stall.name}</h3>
      <p>{stall.description}</p>
      <Rating rating={stall.rating} />
      {/* More UI elements */}
    </div>
  );
};
```

**Responsibilities:**
- Render UI elements
- Respond to user interactions
- Display data from controllers
- Handle navigation

**Benefits:**
- Clean separation of concerns
- Reusable components
- Easier to test UI logic
- Consistent styling

## Project Structure

```
client/
├── models/                   # M - Data structures and types
│   └── FoodStall.ts
│
├── controllers/              # C - Business logic (hooks)
│   └── useFoodStallController.ts
│
├── components/               # V - Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── FoodStallCard.tsx
│   ├── CategoryFilter.tsx
│   └── ui/                   # Shadcn UI components
│
├── pages/                    # V - Page/Route components
│   ├── Index.tsx             # Home page
│   └── NotFound.tsx          # 404 page
│
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities and helpers
├── App.tsx                   # Main app component with routing
└── global.css                # Global styles (TailwindCSS)

server/                       # Express backend
├── index.ts
└── routes/

shared/                       # Shared types between client & server
└── api.ts
```

## Data Flow

```
User Interaction
    ↓
View Component (e.g., Index.tsx)
    ↓
Controller Hook (useFoodStallController)
    ↓
State Update (useState, useMemo)
    ↓
Model Data (FoodStall interface)
    ↓
View Re-renders
    ↓
User sees updated UI
```

### Example: Search Flow

1. **User Input**: User types in search bar
   ```typescript
   <input onChange={(e) => controller.setSearchQuery(e.target.value)} />
   ```

2. **Controller Update**: Controller updates state
   ```typescript
   const [searchQuery, setSearchQuery] = useState("");
   ```

3. **Filtered Results**: Controller recalculates filtered stalls
   ```typescript
   const filteredStalls = useMemo(() => {
     return allStalls.filter(stall =>
       stall.name.includes(searchQuery)
     );
   }, [searchQuery]);
   ```

4. **View Renders**: Component re-renders with new data
   ```typescript
   {filteredStalls.map(stall => (
     <FoodStallCard key={stall.id} stall={stall} />
   ))}
   ```

## Adding New Features

### Scenario: Add Review System

#### 1. Update Model
```typescript
// client/models/FoodStall.ts
export interface Review {
  id: string;
  stallId: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
}
```

#### 2. Create Controller
```typescript
// client/controllers/useReviewController.ts
export const useReviewController = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const submitReview = async (review: Review) => {
    setLoading(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review),
      });
      const data = await response.json();
      setReviews([...reviews, data]);
    } finally {
      setLoading(false);
    }
  };

  return { reviews, submitReview, loading };
};
```

#### 3. Create View Component
```typescript
// client/components/ReviewForm.tsx
export const ReviewForm = ({ stallId }: { stallId: string }) => {
  const { submitReview, loading } = useReviewController();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    await submitReview({
      stallId,
      rating,
      comment,
      // ... other fields
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Rating value={rating} onChange={setRating} />
      <textarea value={comment} onChange={e => setComment(e.target.value)} />
      <button disabled={loading}>Submit Review</button>
    </form>
  );
};
```

#### 4. Use in Page
```typescript
// client/pages/DetailPage.tsx
export default function DetailPage() {
  const controller = useFoodStallController();

  return (
    <>
      <FoodStallCard stall={controller.getStallById(stallId)} />
      <ReviewForm stallId={stallId} />
      <ReviewList stallId={stallId} />
    </>
  );
}
```

## Best Practices

### Model Layer
- ✅ Define interfaces clearly with JSDoc
- ✅ Keep models as pure data structures
- ✅ Use discriminated unions for complex types
- ❌ Don't put business logic in models
- ❌ Don't import from controllers or views

### Controller Layer
- ✅ Use React hooks for state management
- ✅ Implement business logic here
- ✅ Make controllers reusable
- ✅ Use useMemo for expensive computations
- ❌ Don't mix UI concerns
- ❌ Don't directly manipulate DOM

### View Layer
- ✅ Keep components focused and small
- ✅ Use controller hooks for data
- ✅ Separate layout from content
- ✅ Create reusable components
- ❌ Don't duplicate business logic
- ❌ Don't make API calls directly

## Benefits of MVC Architecture

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Reusability**: Controllers can be used by different views
3. **Testability**: Easy to test models and controllers independently
4. **Maintainability**: Changes in one layer don't affect others
5. **Scalability**: Easy to add new features without refactoring
6. **Code Organization**: Clear folder structure
7. **Team Collaboration**: Different developers can work on different layers

## Adapting MVC for Mobile (React Native)

The same MVC structure works for React Native:

```
mobile/
├── src/
│   ├── models/           # Shared with web
│   │   └── FoodStall.ts
│   ├── controllers/      # Shared with web
│   │   └── useFoodStallController.ts
│   ├── screens/          # V - Mobile screens
│   │   ├── HomeScreen.tsx
│   │   ├── DetailScreen.tsx
│   │   └── ...
│   ├── components/       # V - Mobile components
│   │   ├── FoodStallCard.tsx
│   │   └── ...
│   ├── navigation/
│   │   └── RootNavigator.tsx
│   └── App.tsx
```

**Key Differences:**
- Replace TailwindCSS with React Native StyleSheet
- Use React Navigation instead of React Router
- Native primitives (View, Text, FlatList) instead of HTML
- Platform-specific components when needed

## References

- [MVC Architecture Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
- [React Custom Hooks](https://react.dev/reference/react/hooks)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/)
