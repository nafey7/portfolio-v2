import React, { useRef, useEffect, Suspense, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import "./V2Page.css";

// Particle field background component
const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Memoize positions array so it's only created once
  const positions = useMemo(() => {
    const particleCount = 1000;
    const pos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    return pos;
  }, []); // Empty dependency array means this only runs once

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#3B82F6"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

interface EarthModelProps {
  onScrollUpdate: (progress: number) => void;
}

function EarthModel({ onScrollUpdate }: EarthModelProps) {
  const earthRef = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0); // Track virtual scroll position (0 to 100)
  const gltf = useLoader(GLTFLoader, "/earth.glb");

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Update scroll progress (0 to 100)
      scrollProgress.current += e.deltaY * 0.05;
      scrollProgress.current = Math.max(
        0,
        Math.min(100, scrollProgress.current)
      );

      // Notify parent component of scroll update
      onScrollUpdate(scrollProgress.current);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [onScrollUpdate]);

  useFrame(() => {
    if (earthRef.current) {
      const progress = scrollProgress.current;

      if (progress <= 50) {
        // Phase 1 (0-50%): Rotate and zoom out from 0.5 to 0.3
        const phase1Progress = progress / 50; // 0 to 1
        const newScale = 0.5 - phase1Progress * 0.2; // 0.5 -> 0.3
        earthRef.current.scale.set(newScale, newScale, newScale);

        // Rotate based on progress
        earthRef.current.rotation.y = phase1Progress * Math.PI * 2; // Full rotation
      } else {
        // Phase 2 (50-100%): No rotation, zoom in from 0.3 to 0.8
        const phase2Progress = (progress - 50) / 50; // 0 to 1
        const newScale = 0.3 + phase2Progress * 0.5; // 0.3 -> 0.8
        earthRef.current.scale.set(newScale, newScale, newScale);

        // Keep rotation from phase 1 (no additional rotation)
        earthRef.current.rotation.y = Math.PI * 2;
      }
    }
  });

  return <primitive ref={earthRef} object={gltf.scene} position={[0, 0, 0]} />;
}

function V2Page() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate text position based on scroll (0-50%)
  const getTextTransform = () => {
    if (scrollProgress <= 50) {
      // Move from bottom (100vh) to top (-100vh) during 0-50%
      const progress = scrollProgress / 50; // 0 to 1
      const translateY = 100 - progress * 200; // 100vh to -100vh
      const opacity = scrollProgress < 45 ? 1 : 1 - (scrollProgress - 45) / 5; // Fade out at 45-50%
      return {
        transform: `translateY(${translateY}vh) translateX(-50%)`,
        opacity: opacity,
      };
    }
    // Hide completely after 50%
    return {
      transform: `translateY(-100vh) translateX(-50%)`,
      opacity: 0,
    };
  };

  return (
    <div className="v2-page-earth">
      <nav className="v2-nav">
        <div className="nav-content">
          <h1 className="logo">Portfolio V2</h1>
          <div className="nav-links">
            <a href="/">Back to Home</a>
          </div>
        </div>
      </nav>

      <div className="earth-container">
        {/* <div className="earth-overlay">
          <h1 className="earth-title">Explore Earth</h1>
          <p className="earth-subtitle">Scroll to explore • Rotate → Zoom</p>
        </div> */}

        {/* Animated text that appears during 0-50% scroll */}
        <div className="scroll-text" style={getTextTransform()}>
          <h2 className="scroll-text-heading">Moiz Nafey</h2>
          <p className="scroll-text-paragraph">
            Software Engineer based in Lahore, Pakistan. As a dedicated and
            versatile full-stack software engineer, I bring a comprehensive
            skill set that bridges both front-end and back-end development,
            ensuring seamless integration and exceptional user experiences.
          </p>
        </div>

        {/* Dark overlay to reduce brightness */}
        {/* <div className="canvas-overlay"></div> */}

        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.6,
          }}
        >
          {/* Background particles and lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#3B82F6" />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.3}
            color="#8B5CF6"
          />
          <ParticleField />

          {/* Earth-specific lighting */}
          <directionalLight position={[10, 10, 5]} intensity={0.3} />
          <directionalLight position={[-10, -10, -5]} intensity={0.2} />

          <Suspense fallback={null}>
            <EarthModel onScrollUpdate={setScrollProgress} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default V2Page;
