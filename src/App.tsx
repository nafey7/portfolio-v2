import React from "react";
import { Link } from "react-router-dom";
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
    <div className="relative w-full max-w-full overflow-x-hidden">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <BackgroundScene />
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-full">
        {/* Temporary: subtle testing-page link at top for testing purposes */}
        <div className="w-full py-2 text-center">
          <Link
            to="/testing"
            className="text-[10px] text-white/20 hover:text-white/40 transition-colors"
          >
            testing
          </Link>
        </div>
        <Navigation />
        <main className="w-full max-w-full">
          <About />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>
        <footer className="w-full py-4 text-center">
          <Link
            to="/testing"
            className="text-[10px] text-white/20 hover:text-white/40 transition-colors"
          >
            testing
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default App;
