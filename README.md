# Dahab Divers Website

A premium, multi-language diving website built with Next.js 15, TypeScript, TailwindCSS, and Framer Motion.

## Features

- **Next.js 15 App Router**: Modern architecture with server components.
- **Internationalization (i18n)**: URL-based routing for English, French, German, and Dutch (`/en`, `/fr`, `/de`, `/nl`).
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop.
- **Animations**: Smooth scroll reveals and transitions using Framer Motion.
- **Design System**: Custom TailwindCSS configuration with a premium color palette.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+ installed.
- Package manager (npm, pnpm, or yarn).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dahab-divers
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `/src/app`: App Router pages and layouts.
  - `/[lang]`: Localized routes.
- `/src/components`: Reusable UI components.
- `/src/dictionaries`: JSON translation files.
- `/src/data`: Dummy data for courses, dive sites, etc.
- `/src/lib`: Utility functions.

## Customization

- **Colors**: Edit `src/app/globals.css` to change the color palette.
- **Content**: Update JSON files in `src/dictionaries` for text content.
- **Data**: Update JSON files in `src/data` for dynamic content.

## License

MIT
