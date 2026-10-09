# Bhargavi Security Portfolio

A personal portfolio built with React, TypeScript, and Vite. It presents selected projects, cybersecurity interests, education, experience, certifications, and contact information. An interactive portfolio terminal displays site information without running system commands or requiring a backend.

## Requirements

- Node.js 18 or later
- npm

## Run locally

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Open the local URL printed by Vite.

## Build

Create a production build:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Project structure

- `src/App.tsx` contains the portfolio content and interactions.
- `src/main.tsx` starts the React application.
- `styles.css` contains the site styles and responsive layouts.
- `public/kali-dragon.svg` is the Kali dragon image used in the laptop animation.

The portfolio terminal accepts `help`, `--help`, `whoami`, `about`, `projects`, `skills`, `experience`, `education`, `contact`, and `clear`. Commands are handled in the browser and do not execute in a system shell.
