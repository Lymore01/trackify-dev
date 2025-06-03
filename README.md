# Trackify

Trackify is a modern, full-stack link and webhook management platform built with [Next.js](https://nextjs.org), Prisma, Shadcn UI, Redis (Upstash), and Supabase. It enables users to create, manage, and track shortened links, webhooks, and application API keys with a beautiful dashboard experience.

---

## Features

- **User Dashboard:** Manage your applications, links, and webhooks from a single dashboard.
- **Shortened Links:** Create and track short URLs for your apps.
- **Webhook Management:** Add, update, and delete webhooks for your applications.
- **API Key Management:** Securely generate and manage API keys for your apps.
- **Authentication:** Secure user authentication and session management.
- **Analytics:** Track clicks, device info, and geolocation for your links.
- **Modern UI:** Built with Shadcn UI, Lexend font, and responsive design.
- **Prisma ORM:** Type-safe database access and migrations.
- **Redis (Upstash):** Fast, serverless caching and session storage.
- **Supabase:** Scalable backend services and authentication.
- **TypeScript:** End-to-end type safety for all code.
- **Vercel Ready:** Optimized for deployment on Vercel.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Lymore01/trackify-dev
cd trackify-dev
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following (see `.env.example` if available):

```env
DATABASE_URL=your_database_url
IPINFO_TOKEN=your_ipinfo_token
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
# ...other required env vars
```

### 4. Set up the database

Run Prisma migrations and generate the client:

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🛠️ Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production (`prisma generate && next build`)
- `npm run start` — Start the production server
- `npm run lint` — Lint the codebase

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Database:** [Prisma ORM](https://www.prisma.io/)
- **UI:** [Shadcn UI](https://www.Shadcn-ui.com/), [Geist Font](https://vercel.com/font)
- **State/Data:** [React Query](https://tanstack.com/query/latest)
- **Validation:** [Zod](https://zod.dev/)
- **Email:** [Nodemailer](https://nodemailer.com/)
- **Cache/Session:** [Redis (Upstash)](https://upstash.com/)
- **Backend Services:** [Supabase](https://supabase.com/)
- **Other:** [Framer Motion](https://www.framer.com/motion/), [Lucide Icons](https://lucide.dev/), [date-fns](https://date-fns.org/)

---

## Project Structure

```
app/                # Next.js app directory (routes, pages, API)
components/         # Reusable UI and form components
services/           # Business logic and database access
auth/               # Authentication and session logic
lib/                # Utilities and helpers
prisma/             # Prisma schema and migrations
public/             # Static assets
```

---

## 🧑‍💻 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📦 Deployment

Trackify is ready to deploy on [Vercel](https://vercel.com/):

- Make sure your `build` script includes `prisma generate` (already set up).
- Set all required environment variables in your Vercel dashboard.
- Push to your main branch and Vercel will handle the rest.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Shadcn UI Documentation](https://www.Shadcn-ui.com/docs)
- [Upstash Redis Docs](https://upstash.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

---

**Made with ❤️ using Next.js, Prisma, Tailwind css, Shadcn UI, Upstash Redis, and Supabase.**