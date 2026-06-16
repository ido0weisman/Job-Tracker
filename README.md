# Job Application Tracker

A kanban-style board for tracking job applications, built with React, Tailwind CSS, and Supabase.

## Features

- Five-stage kanban board (Wishlist, Applied, Technical Test, Interview, Offer/Rejected), with drag-and-drop between stages.
- Quick-add jobs with just a company name, role name, and application date; everything else can be filled in later.
- A read-only "showcase" view for browsing a job's details, separate from the edit view (opened via the pencil icon).
- Optional modular fields per job (contact person, interview questions, company website, job rating, and more), plus fully custom fields.
- A "Next Step Date" you can set while a job is Applied, in Technical Test, or in Interview. The card shows a live countdown, turning orange when it's close and red if it's overdue.
- A "Generate Prompt" button that turns what you've already filled in into a ready-to-copy prompt for researching the rest with an AI chat.
- Right-to-left text support — typing Hebrew, Arabic, or other RTL scripts into any field automatically aligns that field right-to-left.
- Light and dark mode, persisted across visits.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (class-based dark mode)
- Lucide React (icons)
- Supabase (Postgres database + client library)

## Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Set up Supabase

Create a project at [supabase.com](https://supabase.com), then run the contents of `schema.sql` in the Supabase SQL editor to create the `jobs` table.

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your project's URL and anon key (found in your Supabase project settings):

```
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

`.env` is gitignored and should never be committed.

### 4. Run the app

```
npm run dev
```

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Project Structure

```
src/
  api/            supabase CRUD calls for jobs
  components/     UI components (board, columns, cards, modals)
  data/           static/mock data (not used at runtime)
  hooks/          custom hooks (theme)
  lib/            supabase client setup
  utils/          date helpers and prompt-building logic
  constants.js    shared constants (columns, modular field pool)
schema.sql        Supabase/Postgres schema for the jobs table
```
