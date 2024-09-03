# craftGarden
Virtual World for Witchcraft and Wizardry

## Project Overview

craftGarden is an immersive React Three Fiber (R3F) web application that brings the mystical world of tarot to life in a virtual space. Our goal is to create an engaging, interactive experience that combines the depth of tarot readings with the social aspects of online communities.

### Key Features

1. **Virtual Tarot Experience**
   - Choose from 2 different tarot spreads (Three Card Spread and Celtic Cross)
   - Interactive 3D viewing of cards and spreads
   - Immersive skybox environment using panoramic imagery

2. **User Interface**
   - Landing page with entrance to the Tarot Experience
   - HotBar component for spread selection
   - Responsive design for various screen sizes

3. **3D Interactions**
   - OrbitControls for camera manipulation
   - Dynamic visibility of tarot spreads based on user selection

## Project Structure

```
craftGarden/
│
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── panoramic.jpg
└── src/
    ├── App.tsx
    ├── TarotExperience.tsx
    ├── App.css
    └── index.css
```

This project is built with TypeScript, React, and Vite. The `src/` directory contains the main source code, while the `public/` directory contains static assets.

## Technology Stack

- React
- TypeScript
- Three.js / React Three Fiber
- Vite

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open `http://localhost:5173` in your browser

## Current Status

The application currently features:
- A landing page with a link to the Tarot Experience
- Two tarot spreads: Three Card Spread and Celtic Cross
- A 3D environment with a skybox and interactive camera controls
- A HotBar for selecting different tarot spreads

## Future Enhancements

- Implement actual tarot card models or textures
- Add animations for card drawing and placement
- Enhance lighting and materials for a more atmospheric scene
- Implement interactivity for card selection and interpretation
- Add user accounts and saved readings
- Integrate social features and community interactions

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

[Add license information]

---

craftGarden is currently under development. We're excited to bring this magical experience to life and welcome contributions from the community!