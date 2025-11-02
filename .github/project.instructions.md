# Activity Tracker - Project Instructions

## Project Overview

A React-based activity tracking application that allows users to monitor daily and weekly habits with a clean, minimalist design.

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: CSS Modules with design system variables
- **State Management**: React Context + useReducer
- **Date Handling**: date-fns
- **Internationalization**: i18next + react-i18next
- **Code Quality**: ESLint + TypeScript ESLint

## Project Structure

```
src/
├── app/                      # Application root and providers
│   ├── components/          # App-level components (Navigation)
│   ├── app.tsx             # Main app component with routing
│   └── provider.tsx        # Global providers wrapper
├── constants/               # Application constants
│   ├── routes.ts           # Route path constants
│   └── index.ts
├── features/                # Feature-based modules
│   ├── activities/         # Activities feature
│   │   ├── components/     # Feature components
│   │   ├── constants/      # Feature constants
│   │   ├── hooks/          # Feature-specific hooks
│   │   ├── stores/         # State management (Context + Reducer)
│   │   ├── types/          # TypeScript types and interfaces
│   │   └── utils/          # Feature utilities
│   └── week-tracker/       # Week tracker feature
│       ├── components/     # Feature components
│       └── index.ts
├── hooks/                   # Shared custom hooks
├── i18n/                    # Internationalization
│   ├── locales/            # Translation files
│   └── index.ts
├── utils/                   # Shared utilities
├── index.css               # Global styles and design system
└── main.tsx                # Application entry point
```

## Architecture Patterns

### Feature-Based Organization

- Each major feature is self-contained in its own directory
- Features export public API through index.ts
- Internal implementation details remain private
- Promotes modularity and maintainability

### State Management

- **Context + Reducer Pattern**: Used for complex state logic (activities)
- Each feature has its own context and reducer
- Custom hooks (e.g., `useActivities`) encapsulate context access
- State is normalized and immutable

### Component Structure

- **Presentational Components**: Pure UI components in `components/`
- **Container Components**: Connect to state and handle logic
- All components use functional components with hooks
- Props are typed with TypeScript interfaces

### Routing

- Centralized route paths in `constants/routes.ts`
- Type-safe route definitions with `as const`
- Navigation component handles active state styling

## Design System

### CSS Architecture

- **CSS Modules**: Component-scoped styles (.module.css)
- **Design Tokens**: CSS custom properties in index.css
- **Naming Convention**: BEM-inspired for clarity
- **Mobile-First**: Responsive design with breakpoints

### Design Tokens

```css
/* Colors */
--color-white, --color-black
--color-grey-{100-900}

/* Typography */
--font-family
--font-size-{xs|sm|base|lg|xl|2xl|3xl}

/* Spacing */
--space-{1|2|3|4|6|8|12|16}

/* Layout */
--max-width: 1200px
--border-radius: 2px
--transition: 150ms ease
```

## Coding Standards

### TypeScript

- Use `interface` for object shapes
- Use `type` for unions, intersections, and primitives
- Export types alongside components
- Use `ReadonlyArray` for immutable arrays in props
- Avoid `any` - use `unknown` or proper types

### React Patterns

- Functional components only (no class components)
- Custom hooks for reusable logic
- Proper dependency arrays in useEffect
- Memoization only when profiled and necessary
- Controlled components for forms

### Naming Conventions

- **Components**: PascalCase (e.g., `ActivityCard`)
- **Files**: kebab-case (e.g., `activity-card.tsx`)
- **Functions**: camelCase (e.g., `getTodayCompletions`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `INITIAL_ACTIVITY_STATE`)
- **Types**: PascalCase (e.g., `Activity`, `ActivityState`)

### Import Organization (ESLint Rules)

```typescript
// 1. React
import React from "react";

// 2. External dependencies
import { format } from "date-fns";

// 3. Internal aliases (@/)
import { useScopedTranslation } from "@/hooks";

// 4. Relative imports (parent)
import { useActivities } from "../hooks/useActivities";

// 5. Relative imports (sibling)
import { ActivityCard } from "./activity-card";

// 6. Styles (always last)
import styles from "./component.module.css";
```

### Path Aliases

- `@/` maps to `src/` directory
- Use aliases for cross-feature imports
- Use relative imports within same feature

## State Management Patterns

### Reducer Pattern

```typescript
// Action types
export const ActionType = {
  Add: "ADD_ITEM",
  Delete: "DELETE_ITEM",
} as const;

// Actions (discriminated union)
export type Action =
  | { type: typeof ActionType.Add; payload: Item }
  | { type: typeof ActionType.Delete; payload: string };

// Reducer
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Add:
      return { ...state, items: [...state.items, action.payload] };
    case ActionType.Delete:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
```

### Context Pattern

```typescript
// 1. Create context type
interface ContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// 2. Create context
export const Context = createContext<ContextType | null>(null);

// 3. Create provider
export const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

// 4. Create custom hook
export const useFeature = () => {
  const context = useContext(Context);
  if (!context) throw new Error("useFeature must be used within Provider");
  return context;
};
```

## Component Patterns

### Basic Component Structure

```typescript
import React from "react";

import styles from "./component.module.css";

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
    </div>
  );
};
```

### Form Component Pattern

```typescript
export const FormComponent: React.FC = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};
```

## Internationalization

### Usage Pattern

```typescript
// 1. Import scoped translation hook
import { useScopedTranslation } from "@/hooks/useScopedTranslation";

// 2. Use in component
const { t } = useScopedTranslation("feature.section");

// 3. Access translations
t("key"); // => "feature.section.key"
t("key", { count: 5 }); // Pluralization support
```

### Translation File Structure

```json
{
  "feature": {
    "section": {
      "key": "Translation text",
      "pluralized_one": "{{count}} item",
      "pluralized_other": "{{count}} items"
    }
  }
}
```

## Utilities

### Date Utilities

- Use `date-fns` for all date operations
- Consistent date formatting across the app
- Helper functions in `utils/date.ts`

### ID Generation

- Use `crypto.randomUUID()` for secure unique IDs
- Utility function: `generateId()`

## CSS Patterns

### Component Styles

```css
/* Container/wrapper */
.container {
  /* Layout */
  display: flex;
  flex-direction: column;

  /* Spacing */
  padding: var(--space-4);
  gap: var(--space-3);

  /* Visual */
  background: var(--color-white);
  border: 1px solid var(--color-grey-200);

  /* Transitions */
  transition: all var(--transition);
}

/* Modifiers */
.container.active {
  border-color: var(--color-black);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: var(--space-3);
  }
}
```

## Testing Guidelines

- Test component behavior, not implementation
- Use descriptive test names
- Test accessibility features
- Mock external dependencies
- Test error states and edge cases

## Performance Considerations

- Lazy load routes with React.lazy
- Use React.memo judiciously (only when profiled)
- Optimize large lists with proper keys
- Minimize re-renders with proper state structure
- Use CSS for animations over JS when possible

## Accessibility Requirements

- Semantic HTML elements
- Proper heading hierarchy
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Alt text for images

## Development Workflow

1. **Feature Development**

   - Create feature directory structure
   - Define types and interfaces
   - Implement components
   - Add state management if needed
   - Style with CSS Modules
   - Add translations

2. **Component Development**

   - Start with TypeScript interface
   - Build presentational layer
   - Add interactivity and state
   - Style responsively
   - Test in different scenarios

3. **Code Review Checklist**
   - TypeScript types are correct and complete
   - No console.logs or debugging code
   - Imports are properly ordered
   - CSS follows design system
   - Accessibility is considered
   - Responsive design works
   - No unnecessary re-renders

## Future Considerations

- Local storage persistence for activities
- PWA support with service workers
- Dark mode theme
- Export/import data functionality
- Activity statistics and charts
- Backend integration (optional)
- User authentication (optional)

## Common Pitfalls to Avoid

- ❌ Magic strings for routes (use ROUTES constant)
- ❌ Inline styles (use CSS Modules)
- ❌ Direct context usage (use custom hooks)
- ❌ Missing dependency arrays in useEffect
- ❌ Mutating state directly
- ❌ Not handling loading/error states
- ❌ Hardcoded text (use i18n)
- ❌ Inconsistent spacing/naming

## Resources

- React Documentation: https://react.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- date-fns Documentation: https://date-fns.org/
- React Router: https://reactrouter.com/
- i18next: https://www.i18next.com/
