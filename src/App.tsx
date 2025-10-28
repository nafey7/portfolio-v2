import React from "react";
import { Canvas } from "@react-three/fiber";
import Navigation from "./components/Navigation.tsx";
import About from "./components/About.tsx";
import Projects from "./components/Projects.tsx";
import Skills from "./components/Skills.tsx";
import Certifications from "./components/Certifications.tsx";
import Contact from "./components/Contact.tsx";
import BackgroundScene from "./components/BackgroundScene.tsx";

function App() {
  return (
    <div className="relative">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <BackgroundScene />
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <About />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
