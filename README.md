# Devora Frontend

<p align="center">
  <img src="https://img.shields.io/badge/Devora-Frontend-6366F1?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Devora Frontend" />
</p>

<p align="center">
  <strong>Build together. Learn together. Grow together.</strong>
  <br />
  The web experience for Devora — a student-focused developer community built to connect, share, and collaborate.
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.4-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://lucide.dev/"><img src="https://img.shields.io/badge/lucide--react-1.59-F56565?style=flat-square" alt="lucide-react" /></a>
  <a href="https://github.com/3mrkhalid/Devora_Frontend"><img src="https://img.shields.io/badge/Status-In_Development-orange?style=flat-square" alt="In Development" /></a>
</p>

<p align="center">
  <a href="https://github.com/3mrkhalid/Devora_Frontend">Frontend Repository</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/3mrkhalid/Devora_Backend">Backend Repository</a>
</p>

---

## <img src="https://img.shields.io/badge/-Overview-6366F1?style=flat-square" alt="Overview" />

Devora is a platform concept designed to help university students and early-career developers connect, share knowledge, find teammates, and build real projects together.

This repository contains the frontend application: the public landing experience, the authentication flows, and the client-side foundation that will connect to the Devora API. It is built with the Next.js App Router, React, TypeScript, and Tailwind CSS, with a dark, developer-focused visual language.

> **Project status:** Active development. Some interfaces are complete while their backend integrations are still in progress. The **Current Features** section below documents the exact state of each area.

## <img src="https://img.shields.io/badge/-About_Devora-6366F1?style=flat-square" alt="About Devora" />

Devora is being built around a simple idea: students learn and build better when they do it together. The product vision brings community, collaboration, and career growth into one place.

- **Connect** — Help university students and developers meet peers with shared interests, skills, and goals.
- **Collaborate** — Make it easier to find teammates for university coursework, side projects, and graduation projects.
- **Share** — Create space for technical knowledge, learning experiences, code snippets, and project progress.
- **Grow** — Surface opportunities for mentorship, feedback, collaboration, and career development.
- **Build with AI** — Explore AI-assisted collaboration and learning as the platform matures.

These are product goals, not claims that every capability is available today. The frontend currently implements the landing experience and the authentication interface, with backend integration still underway.

## <img src="https://img.shields.io/badge/-Current_Features-6366F1?style=flat-square" alt="Current Features" />

### Routes

| Route | Status | Description |
|---|---|---|
| `/` | Implemented | Responsive landing page composed of hero, features, tech hubs, community feed preview, testimonials, CTA, and footer sections. |
| `/auth` | Implemented (UI) | Authentication experience with login, registration, and password recovery views. The active view is controlled by the `mode` query parameter. |

### Landing page

- Dark, responsive marketing page with a sticky navigation bar and mobile menu.
- Hero section with an interactive code-snippet preview, language tabs, and a local like toggle.
- Feature grid covering code posts, project showcases, tech hubs, pair-coding, profiles, and mentorship as the intended product direction.
- Tech hub cards and a community feed preview with category filters (`All`, `Snippets`, `Launches`, `Tech Q&A`) and local like interactions.
- Stats, testimonials, and a handle-reservation form with client-side input normalization.
- Custom Tailwind theme tokens, grid-pattern backgrounds, glow utilities, and reduced-motion support in `app/globals.css`.

The landing page content, metrics, posts, hubs, testimonials, and handle reservation are illustrative sample data. They are not fetched from the backend or persisted.

### Authentication UI

The `/auth` route supports three modes through the URL:

```text
/auth                    → login (default)
/auth?mode=register      → registration
/auth?mode=forgot-password → password recovery
```

- **Login** — Email or username and password fields, password visibility toggle, “remember this device” checkbox, and client-side success state.
- **Registration** — Full name, handle, email, password, primary stack selection, and terms agreement, with handle normalization and client-side success state.
- **Forgot password** — A three-step interface:
  1. Enter the account email.
  2. Enter the six-digit recovery code.
  3. Set and confirm a new password.
- Shared recovery progress indicator, accessible labels, `aria-invalid` / `role="alert"` error states, disabled/busy states, and focus management.
- The recovery flow validates email format and passwords between 8 and 72 characters, aligned with the backend's documented limits.
- Mode state stays in sync with the URL, including browser back/forward navigation. The legacy `?mode=forgot` link still resolves to the recovery flow.

### Integration status

| Capability | Frontend | Backend integration |
|---|---|---|
| Landing page | Implemented | Not applicable — sample content |
| Login form | UI complete | **Not connected** — submission is simulated |
| Registration form | UI complete | **Not connected** — submission is simulated |
| GitHub / Google sign-in | Buttons present | **Not connected** — no OAuth flow |
| Password recovery | Three-step UI, validation, and API client complete | **Not available yet** — requests fail closed while backend routes are missing |
| Social feed and tech hubs | Preview UI only | **Not implemented** |

> Login and registration currently use a short client-side timeout to display a success message. No credentials are sent to the backend, and no session is created. The password recovery flow is the only part of the app with a real API client, but the backend endpoints it expects are not implemented yet.

## <img src="https://img.shields.io/badge/-Screenshots-6366F1?style=flat-square" alt="Screenshots" />

> **Preview assets are not included yet.** This repository does not currently contain product screenshots.

To add them, capture the implemented views and save them under a new `docs/screenshots/` directory, then reference them here with relative Markdown image paths. Suggested captures:

| View | Route |
|---|---|
| Landing page — desktop | `/` |
| Landing page — mobile | `/` |
| Sign in | `/auth` |
| Create account | `/auth?mode=register` |
| Password recovery — email step | `/auth?mode=forgot-password` |
| Password recovery — verification and reset steps | `/auth?mode=forgot-password` |

Keep images reasonably compressed and avoid committing screenshots that contain real account data.

## <img src="https://img.shields.io/badge/-Tech_Stack-6366F1?style=flat-square" alt="Tech Stack" />

| Technology | Version | Role |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.4 | App Router, routing, server components, and production builds with Turbopack |
| [React](https://react.dev/) | 19.3 | Component model and client-side interactivity |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type-safe application and component code with `strict` mode enabled |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling through `@tailwindcss/turbopack` |
| [lucide-react](https://lucide.dev/) | 1.59 | Interface icon set |
| [react-icons](https://react-icons.github.io/react-icons/) | 5.7 | Brand icons for GitHub and Google |
| [ESLint](https://eslint.org/) | 9 | Linting with `eslint-config-next` |

Additional implementation details:

- **Fonts:** Geist and Geist Mono are loaded with `next/font/google` and exposed as CSS variables.
- **Styling:** Theme tokens and custom utilities live in `app/globals.css` using Tailwind's `@theme`. There is no `tailwind.config` file.
- **Next.js config:** `next.config.ts` enables Cache Components, partial prefetching, and the Tailwind Turbopack CSS loader.
- **Package manager:** npm, indicated by `package-lock.json` (lockfile version 3).
- **Path alias:** `@/*` maps to the project root through `tsconfig.json`.

## <img src="https://img.shields.io/badge/-Project_Structure-6366F1?style=flat-square" alt="Project Structure" />

```text
.
├── app/
│   ├── _components/              # Landing page sections and shared page UI
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TechHubsSection.tsx
│   │   ├── CommunityFeedPreview.tsx
│   │   ├── StatsAndTestimonials.tsx
│   │   ├── CtaSection.tsx
│   │   └── Footer.tsx
│   ├── auth/
│   │   ├── _components/          # Auth shell, login, register, recovery steps
│   │   ├── _lib/
│   │   │   ├── password-recovery.ts  # Backend recovery API client
│   │   │   └── validation.ts         # Email and password validation
│   │   ├── auth-mode.ts          # Supported modes and URL parsing
│   │   └── page.tsx              # /auth route
│   ├── globals.css               # Tailwind import, theme tokens, utilities
│   ├── layout.tsx                # Root layout, fonts, and metadata
│   └── page.tsx                  # Landing page composition
├── public/                       # Static assets
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

Key responsibilities:

- **App routes and layouts** — `app/layout.tsx` defines the document shell, fonts, and metadata. `app/page.tsx` composes the landing sections, while `app/auth/page.tsx` renders the authentication route and reads the `mode` search parameter.
- **Landing components** — `app/_components/` contains the page-level sections. The underscore prefix marks a private folder that Next.js does not expose as a route.
- **Authentication components** — `app/auth/_components/` holds the auth shell and each form step. `auth-mode.ts` normalizes the URL mode, and `_lib/` contains validation and the backend client.
- **Styles and assets** — `app/globals.css` contains the design tokens and custom visual utilities. `public/` is reserved for static files.
- **API integration** — `app/auth/_lib/password-recovery.ts` is the single integration point for password recovery. It keeps request construction, timeouts, and error mapping out of the UI components.

## <img src="https://img.shields.io/badge/-Getting_Started-6366F1?style=flat-square" alt="Getting Started" />

### Prerequisites

- [Node.js](https://nodejs.org/) 20.9 or newer (required by Next.js 16)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/3mrkhalid/Devora_Frontend.git
cd Devora_Frontend
```

### 2. Install dependencies

The repository includes a lockfile, so a clean install is recommended:

```bash
npm ci
```

For a regular local install, `npm install` also works.

### 3. Configure environment variables

The frontend currently uses one public environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Create a `.env.local` file in the project root to override the default. The variable is only read by the password recovery client; if it is omitted, the app falls back to `http://localhost:8080`.

> `NEXT_PUBLIC_` variables are bundled into client-side code. Never put secrets, private keys, or server credentials in them. No `.env.example` file is committed yet.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The authentication experience is available at [http://localhost:3000/auth](http://localhost:3000/auth).

### 5. Build and validate

```bash
# Lint the project
npm run lint

# Type-check without emitting files
npx tsc --noEmit

# Create an optimized production build
npm run build

# Serve the production build
npm run start
```

Available npm scripts are `dev`, `build`, `start`, and `lint`. There is no automated test suite configured yet.

## <img src="https://img.shields.io/badge/-Backend_Integration-6366F1?style=flat-square" alt="Backend Integration" />

The frontend and backend are separate repositories with distinct responsibilities:

| Frontend | Backend |
|---|---|
| Rendering, routing, layouts, and responsive design | Authentication and authorization |
| Form state, client-side validation, and accessible error feedback | Password hashing, recovery codes, and session management |
| API requests and error presentation | Data persistence, business rules, and data validation |
| User-facing collaboration and community interfaces | Feed, profiles, projects, messaging, and AI services as they are built |

The backend lives at [3mrkhalid/Devora_Backend](https://github.com/3mrkhalid/Devora_Backend).

### Password recovery contract

The frontend expects the following API endpoints. They are documented in `app/auth/_lib/password-recovery.ts` as the intended contract, but at the time of writing the backend does not expose them yet.

| Method |          Endpoint            |                        Purpose               |
|---     |------------------------------|----------------------------------------------|
| `POST` | `/auth/forgot-password`      | Request a recovery code for an email address |
| `POST` | `/auth/verify-reset-code`    | Verify a submitted recovery code             |
| `POST` | `/auth/reset-password`       | Re-validate the code and set a new password  |

The client:

- Sends JSON with `credentials: "include"` to match the backend's cookie-based refresh-token convention.
- Uses a 15-second request timeout.
- Does not reveal whether an email address is registered.
- Treats `404` and `501` responses as “temporarily unavailable.”
- Never fakes a successful verification or password reset.

### Current gaps

- **Login and registration** do not call the API yet; their success states are simulated on the client.
- **GitHub and Google buttons** are visual placeholders with no OAuth flow.
- **Password recovery** is fully wired on the client but cannot complete until the backend routes are implemented.
- **Landing page data** (posts, hubs, testimonials, metrics) is static sample content.
- **Search, handle reservation, and some feed controls** are local UI demonstrations without persistence.
- **Footer links** to `/about_us`, `/privacy`, and `/contact_us` point to routes that have not been implemented yet.
- **The `Snippets` navigation item** does not have a matching on-page section yet.

## <img src="https://img.shields.io/badge/-Roadmap-6366F1?style=flat-square" alt="Roadmap" />

### Completed

- [x] Responsive landing page with a dark, developer-focused visual system
- [x] Responsive navigation with a mobile menu
- [x] Interactive landing previews using sample data (feed filters, likes, snippet tabs, handle form)
- [x] Authentication route with URL-synced login, registration, and recovery modes
- [x] Three-step password recovery UI with validation, progress, and accessible error handling
- [x] Password recovery API client prepared for the backend contract
- [x] TypeScript, ESLint, and production build configuration

### Next

- [ ] Connect login and registration to the backend authentication endpoints
- [ ] Persist sessions and protect authenticated routes
- [ ] Implement GitHub and Google OAuth sign-in
- [ ] Activate password recovery when the backend routes are available
- [ ] Replace sample landing data with live community data
- [ ] Wire landing page “Sign in” and “Join” actions to `/auth`
- [ ] Build the main social feed and post interactions
- [ ] Add developer profiles, skills, and connections
- [ ] Add project discovery and team formation
- [ ] Add messaging and notifications
- [ ] Introduce AI-assisted collaboration and learning features
- [ ] Add automated tests
- [ ] Add screenshots and visual documentation of the main flows
- [ ] Implement the remaining footer routes

## <img src="https://img.shields.io/badge/-Development_Guidelines-6366F1?style=flat-square" alt="Development Guidelines" />

- **Prefer server components.** Add `"use client"` only when a component needs state, effects, or browser APIs, as the interactive landing sections and auth forms do.
- **Keep route code co-located.** Route-specific components belong in a private `_components` folder; helpers and integration code belong in `_lib`. Folders prefixed with `_` are not treated as routes.
- **Keep API logic out of components.** Follow `password-recovery.ts`: centralize request construction, timeouts, and error mapping, then let components handle loading and presentation.
- **Use TypeScript consistently.** The project runs in `strict` mode and uses the `@/*` path alias. Avoid introducing `any` or bypassing validation types.
- **Use the existing styling system.** Prefer Tailwind utilities and the tokens/utilities in `app/globals.css`. Keep the dark palette, spacing, and border treatments consistent with the landing and auth screens.
- **Use the established icon libraries.** UI icons come from `lucide-react`; brand icons come from `react-icons`.
- **Preserve accessibility.** Keep labels, focus states, `aria-*` attributes, keyboard behavior, and reduced-motion handling intact when changing forms or interactive sections.
- **Validate before submitting a change.** Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`.

## <img src="https://img.shields.io/badge/-Contributing-6366F1?style=flat-square" alt="Contributing" />

Devora is under active development, and contributions, feedback, and suggestions are welcome.

1. Fork the repository or create a focused branch from `main`.
2. Install dependencies with `npm ci`.
3. Make one focused change that follows the existing component and styling conventions.
4. Run the available checks: `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
5. Open a pull request describing the change. Include screenshots for visible UI updates and note any backend dependency.

For significant architectural or UI changes, please open an issue or discuss the proposal before implementing it so the work stays aligned with the project direction.

## <img src="https://img.shields.io/badge/-License-6366F1?style=flat-square" alt="License" />

No license has been specified for this repository yet. Until a license is added, the source code is not licensed for reuse or redistribution.

---

<p align="center">
  <strong>DEVORA</strong>
  <br />
  <sub>Build together. Learn together. Grow together.</sub>
</p>
