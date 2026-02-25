# Repository Guidelines & Coding Standards

## 1. Project Structure & Module Organization

We follow a **Feature-based Architecture**. Code related to a specific domain (e.g., Auth, Event, User) should be grouped together in `src/features/`.

- **`src/app/`**: Next.js App Router (routes, layouts, pages). **Keep logic minimal here**.
- **`src/features/`**: Feature-specific modules. Structure each feature as:
  - `src/features/[feature]/components/`: UI components (Forms, Views).
  - `src/features/[feature]/services/`: API calls (e.g., `AuthService.ts`).
  - `src/features/[feature]/[feature].schema.ts`: Zod schemas & Types.
- **`src/components/ui/`**: Shadcn UI components (Do not modify logic, only styles if necessary).
- **`src/components/common/`**: Shared components used across multiple features.
- **`src/config/`**: App constants, routes (`ROUTES`), env variables.
- **`src/lib/`**: Library configurations (axios, utils, etc.).

---

## 2. Tech Stack & Core Libraries

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI (Radix Primitives) + Lucide React (Icons)
- **Form Management**: React Hook Form + Zod Resolver
- **Animations**: Framer Motion
- **Fonts**: Be Vietnam Pro (configured in `layout.tsx`)

---

## 2.1 Backend Collaboration Rules (FE ↔ BE)

When wiring new features, follow BE conventions:

- **Controller → Service → Repository** (no business logic in controllers).
- **DTOs/Responses** live in `Contract`.
- **Mapster** is used for mapping (prefer mapping profiles in `Application/Mappers`).
- **DI** via `[RegisterService]` and explicit interfaces in `Application`.
- FE should call **service layer** only (no direct axios in UI).

---

## 3. Coding Standards & Best Practices

### A. Forms & Validation (Strict)

1.  **Separation of Concerns**: Never define Zod schemas inside the component file.
    - Create a `[feature].schema.ts` file.
    - Export both the `schema` and the `Type` (via `z.infer`).
2.  **Form Components**:
    - Use `Form`, `FormControl`, `FormField` from Shadcn.
    - **Input Spacing Fix**: Always wrap `FormControl` and `FormError` inside a `relative div` to prevent layout shifts or spacing issues when errors appear.
3.  **Password Inputs**:
    - Hide the browser's default "eye" icon using the class: 
      ```css
      [&::-ms-reveal]:hidden [&::-ms-clear]:hidden
      ```

### B. API & Service Layer

1.  **Service Pattern**: Do not call `axios`/`fetch` directly in UI components.
    - Create a `[Feature]Service.ts` class (e.g., `AuthService`).
    - Handle API calls and return processed data.
2.  **Response Handling**:
    - Backend standard response format:
      ```ts
      { isSuccess: boolean, statusCode: number, message: string, data: T, errors: any }
      ```
    - **Frontend Check**: Check `if (response.statusCode === 200)` or `if (response.isSuccess)`. Do NOT rely solely on `try/catch` for logic flow.

### C. UI/UX Patterns

1.  **Shadcn UI First**: Always use Shadcn components (`Card`, `Button`, `Input`).
    - **Contextual Styling**: If a `Card` is placed inside a Layout that already has borders/shadows, use the following classes to blend in:
      ```tsx
      <Card className="border-0 shadow-none bg-transparent">
      ```
2.  **Feedback**:
    - Use `sonner` (`toast.success`, `toast.error`) for notifications.
    - Use `Loader2` (`animate-spin`) for loading states.
    - Always disable buttons (`disabled={isLoading}`) during API submissions.
3.  **Client Components**:
    - Use `'use client'` at the very top of the file.
    - **Critical**: If a component uses `useSearchParams`, you **MUST** wrap it in `<Suspense>` in the parent `page.tsx` to avoid de-opting to client-side rendering for the whole route.

---

## 4. Naming Conventions

- **Folders**: `kebab-case` (e.g., `verify-email`, `reset-password`)
- **Files**: `kebab-case` (e.g., `auth.schema.ts`, `login-form.tsx`)
- **Components**: `PascalCase` (e.g., `LoginForm`, `VerifyEmailView`)
- **Functions/Variables**: `camelCase` (e.g., `onSubmit`, `isLoading`)
- **Interfaces/Types**: `PascalCase` (e.g., `LoginFormValues`, `ApiResponse`)

---

## 5. Build & Development Commands

- `npm run dev`: Start development server on `http://localhost:3000`.
- `npm run build`: Create a production build.
- `npm run start`: Run the production server from `.next`.
- `npm run lint`: Run ESLint checks.

---

## 6. Commit Guidelines

Format: `type(scope): description`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `docs`: Documentation only changes

**Examples:**
- `feat(auth): add verify email page and service`
- `fix(ui): hide browser default password eye icon`
- `refactor(auth): separate login schema to auth.schema.ts`
