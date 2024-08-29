# craftGarden
Virtual World for Witchcraft and Wizardry

## Project Structure

```
craftGarden/
│
├── .gitignore
├── README.md
├── READMEvite.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public/
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── TarotExperience.tsx
│   ├── assets/
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

This project appears to be a web application built with TypeScript, React, and Vite. The `src/` directory contains the main source code, while the `public/` directory may contain static assets.

## Source Files Description

- `App.tsx`: Main component that sets up routing between the landing page and the Tarot experience.
- `TarotExperience.tsx`: Component that creates a 3D scene using Three.js for the Tarot card experience.
- `main.tsx`: Entry point of the application, renders the App component within React's StrictMode.
- `App.css`: Styles for the main App component.
- `index.css`: Global styles for the application.
- `vite-env.d.ts`: TypeScript declaration file for Vite-specific types.
- `assets/`: Directory for storing static assets like images, fonts, etc.

The application features a galaxy-themed landing page and a 3D Tarot card experience using Three.js.