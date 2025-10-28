import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FloatingSphere: React.FC<{
  position: [number, number, number];
  color: string;
  speed: number;
}> = ({ position, color, speed }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={0.5}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

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

const BackgroundScene: React.FC = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#3B82F6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8B5CF6" />

      {/* Floating Spheres */}
      <FloatingSphere position={[-3, 2, -5]} color="#3B82F6" speed={0.5} />
      <FloatingSphere position={[3, -1, -8]} color="#8B5CF6" speed={0.8} />
      <FloatingSphere position={[0, 3, -6]} color="#EC4899" speed={0.3} />
      <FloatingSphere position={[-2, -2, -10]} color="#10B981" speed={0.6} />
      <FloatingSphere position={[4, 1, -7]} color="#F59E0B" speed={0.4} />

      {/* Particle Field */}
      <ParticleField />
    </>
  );
};

export default BackgroundScene;
