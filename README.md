# ReqView — Requirement-Aware AI Code Review

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12-purple?style=flat-square)](https://motion.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

A premium, dark-mode landing page and waitlist application for **ReqView**, an upcoming requirement-aware AI code review platform.

---

## 1. Product Overview

Traditional code reviews and automated linters focus on syntax, code style, formatting, and unit test pass rates. However, code can be 100% bug-free and cleanly written while implementing the completely incorrect business logic or missing critical acceptance criteria.

**ReqView** is engineered to bridge this gap:
- **Core Value Proposition**: Helps developers evaluate code changes and pull requests directly against the original task specifications, user stories, and acceptance criteria.
- **Target Audience**: Small startup engineering teams, software developers, technical founders, and engineering leads.
- **Current Stage**: Active development / private alpha waitlist.

---

## 2. Technology Stack

- **Framework**: Next.js 14 (App Router, Server Components by default)
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS with dark-mode aesthetic (`#08090B` canvas, `#101216` secondary, `#12151B` cards)
- **Animation System**: Modern Framer Motion (`motion/react`) with full reduced-motion accessibility
- **Database**: MongoDB Atlas using the official `mongodb` Node.js driver (with connection pooling)
- **Validation**: Zod (client and server-side validation)
- **Icons**: Lucide React

---

## 3. Project Structure

```text
Landing Page/
├── public/
│   └── favicon.svg               # RV monogram SVG favicon
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── waitlist/
│   │   │       └── route.ts      # POST /api/waitlist handler
│   │   ├── globals.css           # Global CSS, scrollbars, reduced-motion rules
│   │   ├── layout.tsx            # Root layout, metadata & OG tags
│   │   └── page.tsx              # Main landing page
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky responsive nav with mobile drawer
│   │   ├── Hero.tsx              # Staggered entrance hero section
│   │   ├── ProductPreview.tsx    # Interactive illustrative preview mockup
│   │   ├── ProblemSection.tsx    # 3 Problem cards with staggered entrance
│   │   ├── HowItWorks.tsx        # 3 Workflow steps with desktop connector line
│   │   ├── Features.tsx          # 6 Planned capabilities grid
│   │   ├── WaitlistForm.tsx      # Accessible waitlist form with live feedback
│   │   ├── FAQ.tsx               # Accessible accordion with keyboard navigation
│   │   ├── Footer.tsx            # Minimal footer with dynamic copyright year
│   │   └── motion/
│   │       ├── motion-variants.ts # Centralized motion curves and tokens
│   │       ├── Reveal.tsx        # Reusable scroll reveal component
│   │       └── Stagger.tsx       # Reusable stagger container and items
│   └── lib/
│       ├── mongodb.ts            # Cached MongoDB client and index setup
│       └── validation.ts         # Zod schema and email normalization
├── .env.local.example            # Environment template
├── .eslintrc.json               # ESLint configuration
├── next.config.mjs               # Next.js configuration
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 4. Environment Variables

Create a `.env.local` file in the root directory based on `.env.local.example`:

```dotenv
# MongoDB Configuration
MONGODB_USERNAME="mohammadanas51_db_user"
MONGODB_PASSWORD="IgKmV9eymTxblDCc"
MONGODB_URI="mongodb+srv://mohammadanas51_db_user:IgKmV9eymTxblDCc@reqview.5p4nj8l.mongodb.net"
MONGODB_DB_NAME="ReqViewDB"
MONGODB_COLLECTION_NAME="WaitlistEntries"
```

> **Security Note**: Never expose database credentials to the client. None of these variables use `NEXT_PUBLIC_`, ensuring they are only accessible within Server Components and Next.js Route Handlers.

---

## 5. MongoDB Atlas Setup & Database Indexing

The application connects to MongoDB Atlas using connection pooling configured in `src/lib/mongodb.ts`.

### Schema Structure

Each waitlist entry is stored as:

```typescript
{
  _id: ObjectId,
  email: string,               // Original submitted email (trimmed)
  emailNormalized: string,     // Lowercased, trimmed email
  createdAt: Date,             // UTC timestamp
  source: "landing_page",      // Submission source
  status: "active"             // Registration status
}
```

### Unique Indexing & Duplicate Handling

- A unique index is automatically ensured on the `emailNormalized` field:
  ```typescript
  collection.createIndex(
    { emailNormalized: 1 },
    { unique: true, background: true, name: "uniq_email_normalized" }
  );
  ```
- **Idempotency**: The index is verified once per runtime instance and catches duplicate submissions with status `409 Conflict` (handling both pre-insert lookups and MongoDB error code `11000` race conditions).

---

## 6. Waitlist API Specification

### `POST /api/waitlist`

#### Headers
```http
Content-Type: application/json
```

#### Request Body
```json
{
  "email": "developer@example.com"
}
```

#### Responses

- **`201 Created`**: New email successfully registered.
  ```json
  {
    "success": true,
    "message": "You're on the waitlist! We're thrilled to have you along for the journey."
  }
  ```
- **`400 Bad Request`**: Malformed JSON or invalid email address.
  ```json
  {
    "error": "Please provide a valid email address.",
    "details": { "formErrors": [], "fieldErrors": { "email": ["..."] } }
  }
  ```
- **`409 Conflict`**: Email already registered.
  ```json
  {
    "error": "You're already on the waitlist! We'll notify you as soon as early access opens.",
    "code": "ALREADY_REGISTERED"
  }
  ```
- **`413 Payload Too Large`**: Request body exceeds 10 KB limit.
- **`415 Unsupported Media Type`**: Missing `application/json` Content-Type.
- **`500 Internal Server Error`**: Unexpected database connection error (credentials or stack traces are never leaked).

---

## 7. Framer Motion Architecture & Reduced-Motion Support

Animations are implemented with performance and accessibility as first-class constraints:

1. **Modern Imports**: Uses `motion/react` imports compatible with Framer Motion v12.
2. **Motion Tokens**:
   - Micro-interactions: `150–220ms`
   - Standard transitions: `250–450ms`
   - Hero entrance sequence: `500–600ms` staggered by `90ms`
   - Scroll reveals: Viewport threshold triggered once (`once: true`)
3. **Respecting `prefers-reduced-motion`**:
   - Every animated component queries Framer Motion's `useReducedMotion()`.
   - When reduced motion is enabled:
     - The continuous floating effect on the code mockup is disabled.
     - Transform translations (`y`, `x`) are removed.
     - Stagger delays and animation durations collapse to instantaneous visibility.
     - Form interactions and FAQ accordions continue functioning with full accessibility.
   - CSS fallback rules in `globals.css` enforce instantaneous transitions for browser accessibility compliance.

---

## 8. Local Development & Verification

### Install Dependencies
```bash
npm install
```

### Run Type Checking
```bash
npm run type-check
```

### Run Linter
```bash
npm run lint
```

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

---

## 9. Security & Production Rate-Limiting Recommendations

- **Payload Protection**: The route handler enforces strict Content-Type checking and a maximum 10 KB payload size.
- **Production Rate Limiting**: In multi-instance serverless environments (e.g. Vercel, AWS Amplify), an in-memory rate limiter does not share state across lambdas. For production deployment, implement:
  - **Upstash Redis** (`@upstash/ratelimit`) for token-bucket rate limiting per IP (e.g., max 5 requests per hour per IP).
  - **Cloudflare Turnstile** or **reCAPTCHA v3** to prevent automated bot signups.
- **Database Connection Pooling**: Connection caching is implemented on `global._mongoClientPromise` during development to prevent connection exhaustion during hot reloads.

