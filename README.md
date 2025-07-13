# RemoteJobs

A lightweight job board platform for remote tech roles built with [Next.js](https://nextjs.org) bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

Here are some of the current features that app has:

-   [x] Home Page (/) - Shows a list of available job openings
-   [x] Job Details Page (/jobs/[id]) - Show full job description and details (e.g., requirements, benefits, how to apply).
-   [x] Admin Post Job Page (/admin/post) - A simple form with validation where an admin can post a new job.
-   [x] Dark mode toggle.
-   [x] Responsive design (Tailwind)
-   [x] Search/filtering on the homepage (e.g., filter by location or company).
-   [x] Custom 404 page.

The App uses the following technologies:

-   [Next.js](https://nextjs.org/)
-   [React](https://reactjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [ShadCN-UI](https://ui.shadcn.com/)

## Getting Started

### Prerequisites

-   Node.js version 22 or higher

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Run the Development Server

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Future Improvements

-   Save users added job(s) to browser local storage.
-   Save user's theme preference to browser local storage.
