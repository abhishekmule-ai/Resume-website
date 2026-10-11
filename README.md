# Modern Personal Resume & Portfolio Website

A sleek, modern developer resume and portfolio website engineered with Next.js App Router, TypeScript, Tailwind CSS, Motion, Lucide React, React Hook Form, and Zod.

## Architecture Highlights

- **Next.js App Router**: Built with React Server Components by default for optimal performance and SEO, and Client Components strictly where user interactivity is required.
- **Centralized Data Source (`src/data/portfolio.ts`)**: All personal information, career timelines, skills, project items, and social links are typed and managed in a single, easily editable configuration file.
- **Strong Typing (`src/types/portfolio.ts`)**: Comprehensive TypeScript interfaces for all resume data entities ensuring strict type safety.
- **Design System & Tailwind CSS**: Sophisticated near-black dark theme, electric blue (`#00d2ff`, `#3b82f6`) and violet (`#8b5cf6`) accents, glassmorphic card overlays, responsive container hierarchy, and modern typography via Google Inter font.
- **Robust Form Validation**: Contact form powered by `react-hook-form` paired with a strict `zod` schema in `src/lib/validations/contact.ts`.
- **Production-Ready Contact API**: Secure API route (`/api/contact`) featuring sliding-window rate limiting, input validation, and hooks for services like Resend or SMTP.
- **SEO & Performance Optimization**: Metadata, Open Graph tags, responsive imagery, and dynamic `sitemap.xml` generation.

## Project Structure

```
├── public/
│   ├── avatar-placeholder.svg
│   └── resume-placeholder.pdf
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts         # Contact endpoint with rate limiting & validation
│   │   ├── globals.css              # Custom styling, dark theme variables & glassmorphism
│   │   ├── layout.tsx               # Root App Router layout with SEO & fonts
│   │   ├── page.tsx                 # Composed Homepage Server Component
│   │   └── sitemap.ts               # Automated dynamic sitemap
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx           # Sticky navigation with mobile menu & CTA
│   │   │   └── footer.tsx           # Footer with social links & copyright
│   │   ├── sections/
│   │   │   ├── hero.tsx             # Hero section with dominant name & stats
│   │   │   ├── about.tsx            # About Me narrative & core values
│   │   │   ├── skills.tsx           # Categorized technical competencies
│   │   │   ├── experience.tsx       # Interactive career timeline
│   │   │   ├── education.tsx        # Academic history & credentials
│   │   │   ├── projects.tsx         # Featured project showcase cards
│   │   │   ├── certifications.tsx   # Accreditations & verification links
│   │   │   └── contact.tsx          # Validated contact form & direct reachout
│   │   └── ui/
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── container.tsx
│   │       ├── input.tsx
│   │       ├── section-heading.tsx
│   │       └── textarea.tsx
│   ├── data/
│   │   └── portfolio.ts             # Centralized editable data source
│   ├── lib/
│   │   ├── utils.ts                 # Classname merge helper (clsx + twMerge)
│   │   └── validations/
│   │       └── contact.ts           # Zod schema for contact form
│   └── types/
│       └── portfolio.ts             # TypeScript definitions
├── .env.example
├── .env.local
├── .eslintrc.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Customizing Your Portfolio
To customize your resume details, simply edit `src/data/portfolio.ts`. No layout or component code changes are required to update your:
- Name and title
- Bio and location
- Work experience and education
- Categorized skills
- Projects and live links
- Certifications
- Social profiles and contact details

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Import the project into [Vercel](https://vercel.com).
3. Set the environment variables defined in `.env.example`.
4. Deploy! Next.js App Router deploys seamlessly with zero configuration.
