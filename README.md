# craftGarden
Virtual World for Witchcraft and Wizardry

## Project Overview

craftGarden is an immersive React Three Fiber (R3F) web application that brings the mystical world of tarot to life in a virtual 3D space. Our goal is to create an engaging, interactive experience that combines the depth of tarot readings with the visual appeal of 3D graphics.

### Key Features

1. **Virtual Tarot Experience**
   - Choose from 2 different tarot spreads (Three Card Spread and Celtic Cross)
   - Interactive 3D viewing of cards and spreads
   - Immersive skybox environment using panoramic imagery
   - Dynamic card placement based on selected spread

2. **User Interface**
   - Landing page with entrance to the Tarot Experience
   - HotBar component for spread selection
   - Responsive design for various screen sizes

3. **3D Environment**
   - Skybox background using panoramic imagery
   - Black cube platform for card placement
   - Red plane beneath the platform for visual depth
   - OrbitControls for camera manipulation

4. **Dynamic Tarot Spreads**
   - Three Card Spread with 3 cards in a horizontal layout
   - Celtic Cross Spread with 10 cards in the traditional layout

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
└── src/
    ├── assets/
    │   └── panoramic.jpg
    ├── App.tsx
    ├── TarotExperience.tsx
    ├── App.css
    └── index.css
```

This project is built with TypeScript, React, and Vite. The `src/` directory contains the main source code, while the `src/assets/` directory contains static assets like the panoramic image for the skybox.

## Technology Stack

- React
- TypeScript
- Three.js / React Three Fiber
- @react-three/drei
- Vite

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open `http://localhost:5173` in your browser

## Current Status

The application currently features:
- A landing page with a link to the Tarot Experience
- Two interactive tarot spreads: Three Card Spread and Celtic Cross
- A 3D environment with a skybox, black cube platform, and red base plane
- Dynamic card placement based on the selected spread
- OrbitControls for interactive camera movement
- A HotBar for selecting different tarot spreads

## Future Enhancements

- Implement detailed tarot card models or textures
- Add animations for card drawing and placement
- Enhance lighting and materials for a more atmospheric scene
- Implement interactivity for card selection and interpretation
- Add card information display when selected
- Improve performance and optimize for mobile devices
- Add user accounts and saved readings
- Integrate social features and community interactions

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

[Add license information]

---

craftGarden is actively under development. We're excited to continue enhancing this magical experience and welcome contributions from the community!