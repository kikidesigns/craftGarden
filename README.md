# craftGarden
Virtual World for Witchcraft and Wizardry

## Project Overview

craftGarden is an immersive React Three Fiber (R3F) web application that brings the mystical world of tarot to life in a virtual space. Our goal is to create an engaging, interactive experience that combines the depth of tarot readings with the social aspects of online communities.

### Key Features

1. **Virtual Tarot Experience**
   - Choose from 3 different tarot spreads
   - Cards are randomly pulled from our deck
   - Animated card movements inspired by MTG Arena
   - Interactive 3D viewing of cards and spreads

2. **User Accounts and Privacy**
   - Guest access for basic tarot readings
   - User registration and login for enhanced features
   - Varying levels of social and private experiences

3. **Tarot Reading Management**
   - Save readings (for registered users)
   - Email reading results (available for guests and registered users)

4. **Social Integration**
   - Share thoughts and experiences using Nostr protocol
   - Community pages for user interaction

5. **Neopets-inspired Features**
   - Different pages with varying levels of social/private experiences
   - Creature Breeder game-like elements (planned feature)

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

This project is built with TypeScript, React, and Vite. The `src/` directory contains the main source code, while the `public/` directory may contain static assets.

## Source Files Description

- `App.tsx`: Main component that sets up routing between the landing page and the Tarot experience.
- `TarotExperience.tsx`: Component that creates a 3D scene using Three.js for the Tarot card experience.
- `main.tsx`: Entry point of the application, renders the App component within React's StrictMode.
- `App.css`: Styles for the main App component.
- `index.css`: Global styles for the application.
- `vite-env.d.ts`: TypeScript declaration file for Vite-specific types.
- `assets/`: Directory for storing static assets like images, fonts, etc.

## Getting Started

(Add instructions for setting up and running the project locally)

## Contributing

(Add guidelines for contributing to the project)

## License

(Add license information)

---

craftGarden is currently under development. We're excited to bring this magical experience to life and welcome contributions from the community!