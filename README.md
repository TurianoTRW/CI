This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying to Netlify (with Postgres)

1. Create a Postgres database (Neon or Supabase). Copy the connection string with `sslmode=require`.
2. In Netlify site settings → Environment variables, set:
   - `NEXTAUTH_URL` → your Netlify URL (e.g. `https://your-site.netlify.app`)
   - `NEXTAUTH_SECRET` → random string
   - `DATABASE_URL` → your Postgres URL
   - `PRISMA_SCHEMA_PATH` → `prisma/schema.postgres.prisma`
3. Build settings:
   - Build command: `npm run netlify:build`
   - Publish directory: `.next`
4. The build runs Prisma generate and pushes the schema to create tables.

Local dev remains SQLite for simplicity. To test against Postgres locally, set `DATABASE_URL` to your Postgres URL and run:

```bash
npm run db:push:pg && npm run dev
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
