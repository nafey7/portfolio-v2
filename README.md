# Modern Interactive Portfolio

A stunning, modern portfolio website built with React 19, Three.js, and TypeScript. Features interactive 3D animations, smooth scrolling, and a responsive design.

## Features

- **Modern Tech Stack**: React 19, TypeScript, Three.js r178
- **3D Visualizations**: Interactive Three.js scenes with floating spheres and particle effects
- **Smooth Animations**: Framer Motion for fluid page transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Glass Morphism**: Modern glass-effect UI components
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content

## Tech Stack

- **Frontend**: React 19.2.0, TypeScript
- **3D Graphics**: Three.js 0.178.0, @react-three/fiber 9.4.0, @react-three/drei 10.7.6
- **Animations**: Framer Motion 11.0.0
- **Styling**: Tailwind CSS 3.4.0
- **Build Tool**: Vite 5.4.0
- **Icons**: Lucide React 0.400.0

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio-v2
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx       # Sticky navigation with smooth scrolling
│   ├── About.tsx           # Hero section with 3D animations
│   ├── Projects.tsx        # Project showcase with hover effects
│   ├── Skills.tsx          # Skills section with 3D visualizations
│   ├── Contact.tsx         # Contact form with animations
│   └── BackgroundScene.tsx # Three.js background scene
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## Components Overview

### Navigation

- Sticky navigation bar with glass morphism effect
- Smooth scrolling to sections
- Mobile-responsive hamburger menu
- Dynamic background based on scroll position

### About

- Hero section with gradient text effects
- Animated 3D elements
- Social media links
- Technology badges

### Projects

- Grid layout showcasing featured projects
- Hover effects with overlay animations
- Technology stack indicators
- Links to GitHub and live demos

### Skills

- Interactive 3D sphere animations
- Animated progress bars
- Categorized skill sets
- Real-time Three.js visualizations

### Contact

- Animated contact form
- Contact information cards
- Social media links
- Form validation and submission handling

## Customization

### Colors

The color scheme can be customized in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#EC4899',
    }
  }
}
```

### 3D Elements

Modify the Three.js scenes in the respective components:

- `BackgroundScene.tsx` - Main background animations
- `Skills.tsx` - Skills visualization spheres

### Content

Update the content in each component:

- Personal information in `About.tsx`
- Project details in `Projects.tsx`
- Skills and technologies in `Skills.tsx`
- Contact information in `Contact.tsx`

## Performance Optimization

- Lazy loading for 3D components
- Optimized Three.js scenes
- Efficient animations with Framer Motion
- Responsive images and assets

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
