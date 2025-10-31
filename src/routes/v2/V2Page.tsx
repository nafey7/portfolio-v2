import React, { useRef, useEffect, Suspense, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Award,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
} from "lucide-react";
import emailjs from "@emailjs/browser";
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
  const scrollProgress = useRef(0); // Track virtual scroll position (0 to 300)
  const gltf = useLoader(GLTFLoader, "/earth.glb");

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Update scroll progress (0 to 300)
      scrollProgress.current += e.deltaY * 0.05;
      scrollProgress.current = Math.max(
        0,
        Math.min(300, scrollProgress.current)
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
      } else if (progress <= 100) {
        // Phase 2 (50-100%): No rotation, zoom in from 0.3 to 0.8
        const phase2Progress = (progress - 50) / 50; // 0 to 1
        const newScale = 0.3 + phase2Progress * 0.5; // 0.3 -> 0.8
        earthRef.current.scale.set(newScale, newScale, newScale);

        // Keep rotation from phase 1 (no additional rotation)
        earthRef.current.rotation.y = Math.PI * 2;
      } else if (progress <= 150) {
        // Phase 3a (100-150%): Rotate anti-clockwise and scale down
        const phase3aProgress = (progress - 100) / 50; // 0 to 1
        const newScale = 0.8 - phase3aProgress * 0.2; // 0.8 -> 0.6
        earthRef.current.scale.set(newScale, newScale, newScale);

        // Rotate anti-clockwise (decrease rotation.y)
        // Start from Math.PI * 2, rotate backwards by full rotation
        earthRef.current.rotation.y =
          Math.PI * 2 - phase3aProgress * Math.PI * 2;
      } else if (progress <= 200) {
        // Phase 3b (150-200%): Scale up
        const phase3bProgress = (progress - 150) / 50; // 0 to 1
        const newScale = 0.6 + phase3bProgress * 0.2; // 0.6 -> 0.8
        earthRef.current.scale.set(newScale, newScale, newScale);

        // Continue anti-clockwise rotation (from 0 at 150% to -Math.PI * 2 at 200%)
        earthRef.current.rotation.y = 0 - phase3bProgress * Math.PI * 2;
      } else if (progress <= 250) {
        // Phase 4 (200-250%): Slow rotation and maintain scale for certifications
        const phase4Progress = (progress - 200) / 50; // 0 to 1
        earthRef.current.scale.set(0.8, 0.8, 0.8);
        earthRef.current.position.set(0, 0, 0); // Reset position

        // Slow clockwise rotation for certifications phase
        earthRef.current.rotation.y =
          -Math.PI * 2 + phase4Progress * Math.PI * 0.5;
      } else if (progress <= 275) {
        // Phase 5a (250-275%): Fun translation - Figure-8 pattern (infinity symbol)
        const phase5aProgress = (progress - 250) / 25; // 0 to 1
        earthRef.current.scale.set(0.8, 0.8, 0.8);

        // Figure-8 path using parametric equations
        const t = phase5aProgress * Math.PI * 2; // Full loop
        const radius = 3; // Movement radius

        // Figure-8 / Infinity symbol: x = sin(t), y = sin(t * 2) / 2, z = cos(t) * 0.5
        const x = Math.sin(t) * radius;
        const y = (Math.sin(t * 2) / 2) * radius * 0.6; // Vertical component
        const z = Math.cos(t) * radius * 0.8; // Depth component

        earthRef.current.position.set(x, y, z);

        // Add a slow rotation during movement for extra dynamism
        earthRef.current.rotation.y =
          -Math.PI * 1.5 + phase5aProgress * Math.PI;
      } else {
        // Phase 5b (275-300%): Return to original position
        const phase5bProgress = (progress - 275) / 25; // 0 to 1
        earthRef.current.scale.set(0.8, 0.8, 0.8);

        // Smoothly return to center [0, 0, 0]
        const easeOut = 1 - Math.pow(1 - phase5bProgress, 3); // Cubic ease out

        // At end of phase 5a (t = Math.PI * 2), we're back at starting position
        // Calculate end position of figure-8
        const endT = Math.PI * 2;
        const radius = 3;
        const startX = Math.sin(endT) * radius; // ~0
        const startY = (Math.sin(endT * 2) / 2) * radius * 0.6; // ~0
        const startZ = Math.cos(endT) * radius * 0.8; // ~2.4

        // Interpolate from figure-8 end position back to [0, 0, 0]
        earthRef.current.position.set(
          startX * (1 - easeOut),
          startY * (1 - easeOut),
          startZ * (1 - easeOut)
        );

        // Continue rotation and prepare to return to original rotation
        earthRef.current.rotation.y =
          -Math.PI * 0.5 + phase5bProgress * Math.PI * 0.5;
      }
    }
  });

  return <primitive ref={earthRef} object={gltf.scene} position={[0, 0, 0]} />;
}

// Projects data
const projects = [
  {
    title: "The Leading Practice",
    description:
      "AI-powered marketing automation platform built as a microservices-based multi-tenant SaaS with three-level RBAC authorization using Supabase Auth and row-level security. Architected AI-powered conversation hub with unified messaging across email, SMS, and live chat.",
    images: [
      "/images/projectImages/tlp_1.png",
      "/images/projectImages/tlp_2.png",
      "/images/projectImages/tlp_3.png",
      "/images/projectImages/tlp_4.png",
    ],
    tech: ["React", "Supabase", "CrewAI", "Pinecone", "Node.js"],
    github: "#",
    live: "#",
    inDev: true,
  },
  {
    title: "Relevic",
    description:
      "A self-service no-code web personalisation tool that provides a complete suite to help create relevant & personalized web experiences. Developed drag-and-drop canvas using React Flow and React DnD with A/B and multivariant testing features.",
    images: [
      "/images/projectImages/relevic_1.png",
      "/images/projectImages/relevic_2.png",
      "/images/projectImages/relevic_3.png",
    ],
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Material UI"],
    github: "#",
    live: "https://dashboard.relevic.com/",
  },
  {
    title: "SimplifyVms",
    description:
      "Microservices based architecture product for managing contingent workforce, SOW, and talent. Worked on Front End, Backend Integrations, and collaborated directly with major US-based clients including RXO, AMFAM, and Marriott.",
    images: [
      "/images/projectImages/Simplify_1.png",
      "/images/projectImages/Simplify_2.png",
      "/images/projectImages/Simplify_3.png",
      "/images/projectImages/Simplify_4.png",
      "/images/projectImages/Simplify_5.png",
      "/images/projectImages/Simplify_6.png",
      "/images/projectImages/Simplify_7.png",
      "/images/projectImages/Simplify_8.png",
      "/images/projectImages/Simplify_9.png",
      "/images/projectImages/Simplify_10.png",
      "/images/projectImages/Simplify_11.png",
    ],
    tech: ["React", "Django", "Flask", "Python", "PostgreSQL"],
    github: "#",
    live: "https://app.simplifyvms.com/",
  },
];

interface ProjectCardProps {
  project: (typeof projects)[0];
  scrollProgress: number;
  projectIndex: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  scrollProgress,
  projectIndex,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Calculate when this project should appear (divide 50-100% into equal parts for each project)
  const totalProjects = projects.length;
  const progressPerProject = 50 / totalProjects;
  const startProgress = 50 + projectIndex * progressPerProject;
  const endProgress = startProgress + progressPerProject;

  // Calculate opacity and transform based on scroll progress
  const getProjectStyle = () => {
    if (scrollProgress < startProgress) {
      // Not yet visible
      return {
        opacity: 0,
        transform: "translateY(100px) scale(0.9)",
        pointerEvents: "none" as const,
      };
    } else if (
      scrollProgress >= startProgress &&
      scrollProgress < endProgress
    ) {
      // Fading in
      const progress = (scrollProgress - startProgress) / progressPerProject;
      return {
        opacity: Math.min(progress * 2, 1), // Fade in quickly
        transform: `translateY(${100 - progress * 100}px) scale(${
          0.9 + progress * 0.1
        })`,
        pointerEvents: "auto" as const,
      };
    } else if (scrollProgress >= 95 && scrollProgress <= 100) {
      // Fade out near 100%
      const fadeProgress = (scrollProgress - 95) / 5; // 0 to 1 over 95-100%
      return {
        opacity: 1 - fadeProgress,
        transform: `translateY(-${fadeProgress * 100}px) scale(${
          1 - fadeProgress * 0.1
        })`,
        pointerEvents: "auto" as const,
      };
    } else if (scrollProgress > 100) {
      // Hidden after 100%
      return {
        opacity: 0,
        transform: "translateY(-100px) scale(0.9)",
        pointerEvents: "none" as const,
      };
    } else {
      // Fully visible
      return {
        opacity: 1,
        transform: "translateY(0) scale(1)",
        pointerEvents: "auto" as const,
      };
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  const scrollToContact = () => {
    // You can implement this to navigate to contact section if needed
    alert("Contact feature - to be implemented");
  };

  return (
    <div
      className="project-card"
      style={{
        ...getProjectStyle(),
        transition: "all 0.3s ease-out",
      }}
    >
      <div className="glass-effect rounded-2xl overflow-hidden h-full">
        {/* Project Image Carousel */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          {/* Navigation Arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/80 rounded-lg hover:bg-black/90 transition-colors duration-300 text-white"
                title="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/80 rounded-lg hover:bg-black/90 transition-colors duration-300 text-white"
                title="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image Container */}
          <div className="relative w-full h-full">
            <img
              key={`${project.title}-${currentImageIndex}`}
              src={project.images[currentImageIndex]}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>

          {/* Image Counter */}
          {project.images.length > 1 && (
            <div className="absolute bottom-2 right-2 z-10 px-3 py-1 bg-black/80 rounded-lg text-xs font-medium text-white">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-4 xs:p-5 sm:p-6 space-y-3 xs:space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white">
                {project.title}
              </h3>
              {project.inDev && (
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium">
                  In Development
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={scrollToContact}
                className="p-2 glass-effect rounded-lg hover:bg-white/20 transition-colors duration-300"
                title="Contact me for GitHub access"
              >
                <Github size={18} />
              </button>
              <a
                href={project.live}
                target={project.inDev ? "_self" : "_blank"}
                rel={project.inDev ? "" : "noopener noreferrer"}
                className={`p-2 glass-effect rounded-lg transition-colors duration-300 ${
                  project.inDev
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white/20"
                }`}
                onClick={(e) => project.inDev && e.preventDefault()}
                title={
                  project.inDev
                    ? "Coming soon - In development"
                    : "View live project"
                }
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 xs:gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 xs:px-3 xs:py-1 bg-white/10 rounded-full text-xs xs:text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Skills data
const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "Python", level: 90 },
      { name: "TypeScript", level: 88 },
    ],
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Frontend Frameworks & Libraries",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Material UI", level: 90 },
      { name: "Redux Toolkit", level: 88 },
      { name: "RTK Query", level: 85 },
    ],
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Backend & Middleware Technologies",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "Django", level: 85 },
      { name: "Flask", level: 82 },
      { name: "Fast API", level: 80 },
    ],
    color: "from-pink-400 to-pink-600",
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 80 },
      { name: "CI/CD", level: 85 },
      { name: "Digital Ocean", level: 75 },
      { name: "Render", level: 78 },
    ],
    color: "from-green-400 to-green-600",
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "Supabase", level: 88 },
      { name: "Pinecone DB", level: 82 },
      { name: "MySQL", level: 80 },
    ],
    color: "from-orange-400 to-orange-600",
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "CrewAI", level: 85 },
      { name: "LLMs", level: 80 },
      { name: "Multiagent Systems", level: 82 },
      { name: "RAG", level: 85 },
    ],
    color: "from-cyan-400 to-cyan-600",
  },
];

interface SkillCategoryProps {
  category: (typeof skillCategories)[0];
  scrollProgress: number;
  categoryIndex: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({
  category,
  scrollProgress,
  categoryIndex,
}) => {
  // Calculate when this skill category should appear (divide 100-200% into equal parts)
  const totalCategories = skillCategories.length;
  const progressPerCategory = 100 / totalCategories; // 100% range / 6 categories = ~16.67% each
  const startProgress = 100 + categoryIndex * progressPerCategory;
  const endProgress = startProgress + progressPerCategory;

  // Calculate opacity and transform - only one visible at a time
  const getSkillStyle = () => {
    if (scrollProgress < startProgress) {
      // Not yet visible
      return {
        opacity: 0,
        transform: "translateX(100px) scale(0.95)",
        pointerEvents: "none" as const,
      };
    } else if (
      scrollProgress >= startProgress &&
      scrollProgress < endProgress
    ) {
      // Currently active - fade in and out
      const progress = (scrollProgress - startProgress) / progressPerCategory;

      if (progress < 0.2) {
        // Fade in (first 20% of the range)
        const fadeIn = progress / 0.2;
        return {
          opacity: fadeIn,
          transform: `translateX(${100 - fadeIn * 100}px) scale(${
            0.95 + fadeIn * 0.05
          })`,
          pointerEvents: "auto" as const,
        };
      } else if (progress > 0.8) {
        // Fade out (last 20% of the range)
        const fadeOut = (progress - 0.8) / 0.2;
        return {
          opacity: 1 - fadeOut,
          transform: `translateX(-${fadeOut * 100}px) scale(${
            1 - fadeOut * 0.05
          })`,
          pointerEvents: "auto" as const,
        };
      } else {
        // Fully visible (middle 60% of the range)
        return {
          opacity: 1,
          transform: "translateX(0) scale(1)",
          pointerEvents: "auto" as const,
        };
      }
    } else {
      // Already passed
      return {
        opacity: 0,
        transform: "translateX(-100px) scale(0.95)",
        pointerEvents: "none" as const,
      };
    }
  };

  return (
    <div
      className="skill-category-card"
      style={{
        ...getSkillStyle(),
        transition: "all 0.3s ease-out",
      }}
    >
      <div className="glass-effect rounded-2xl p-8">
        <h3 className="text-3xl font-bold mb-6 gradient-text">
          {category.title}
        </h3>
        <div className="space-y-4">
          {category.skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg text-white">
                  {skill.name}
                </span>
                <span className="text-sm text-gray-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Certifications data
const certifications = [
  {
    issuer: "Amazon Web Services (AWS)",
    title: "AWS Cloud Technical Essentials",
    date: "July 2023",
    link: "https://www.coursera.org/account/accomplishments/certificate/RADDA7K62W76",
    color: "from-yellow-400 to-orange-500",
    icon: "☁️",
  },
  {
    issuer: "Yale University",
    title: "Managing Emotions",
    date: "September 2023",
    link: "https://www.coursera.org/account/accomplishments/verify/PY68MEHVEKE9?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    color: "from-blue-400 to-purple-500",
    icon: "🎓",
  },
];

// Contact data
const contactInfo = [
  {
    icon: Mail,
    text: "nafeymoiz@gmail.com",
    href: "mailto:nafeymoiz@gmail.com",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Phone,
    text: "+92-302-6402646",
    href: "tel:+923026402646",
    color: "from-green-500 to-green-600",
  },
  {
    icon: MapPin,
    text: "Lahore, Pakistan",
    href: "#",
    color: "from-purple-500 to-purple-600",
  },
];

interface CertificationCardProps {
  certification: (typeof certifications)[0];
  scrollProgress: number;
  certIndex: number;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
  scrollProgress,
  certIndex,
}) => {
  // Calculate when this certification should appear (divide 200-250% into equal parts)
  const totalCerts = certifications.length;
  const progressPerCert = 50 / totalCerts; // 50% range / 2 certs = 25% each
  const startProgress = 200 + certIndex * progressPerCert;
  const endProgress = startProgress + progressPerCert;

  // Calculate opacity, transform, and rotation based on scroll progress
  const getCertStyle = () => {
    if (scrollProgress < startProgress) {
      // Not yet visible
      return {
        opacity: 0,
        transform: "translateY(100px) scale(0.5) rotate(-10deg)",
        pointerEvents: "none" as const,
      };
    } else if (
      scrollProgress >= startProgress &&
      scrollProgress < endProgress
    ) {
      // Fading in with creative animation
      const progress = (scrollProgress - startProgress) / progressPerCert;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out for smooth animation

      return {
        opacity: Math.min(easeOut * 1.2, 1), // Slight overshoot then settle
        transform: `translateY(${100 - easeOut * 100}px) scale(${
          0.5 + easeOut * 0.5
        }) rotate(${-10 + easeOut * 10}deg)`,
        pointerEvents: "auto" as const,
      };
    } else if (scrollProgress >= 245 && scrollProgress <= 250) {
      // Fade out near 250%
      const fadeProgress = (scrollProgress - 245) / 5; // 0 to 1 over 245-250%
      return {
        opacity: 1 - fadeProgress,
        transform: `translateY(-${fadeProgress * 50}px) scale(${
          1 - fadeProgress * 0.2
        }) rotate(${fadeProgress * 5}deg)`,
        pointerEvents: "auto" as const,
      };
    } else if (scrollProgress > 250) {
      // Hidden after 250%
      return {
        opacity: 0,
        transform: "translateY(-50px) scale(0.8) rotate(5deg)",
        pointerEvents: "none" as const,
      };
    } else {
      // Fully visible with slight hover effect
      const pulse = Math.sin(scrollProgress * 0.1) * 2; // Subtle pulse
      return {
        opacity: 1,
        transform: `translateY(0) scale(${1 + pulse * 0.01}) rotate(0deg)`,
        pointerEvents: "auto" as const,
      };
    }
  };

  return (
    <div
      className="certification-card"
      style={{
        ...getCertStyle(),
        transition: "all 0.3s ease-out",
      }}
    >
      <div className="glass-effect rounded-2xl overflow-hidden h-full">
        {/* Certification Header */}
        <div
          className={`relative h-32 bg-gradient-to-br ${certification.color} overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

          {/* Emoji/Icon */}
          <div className="absolute top-4 left-6 text-6xl opacity-20">
            {certification.icon}
          </div>

          {/* Issuer and Badge Icon */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">
                  {certification.issuer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certification Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white">
            {certification.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{certification.date}</span>
          </div>

          {/* View Certificate Link */}
          <a
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 group/link"
          >
            <span className="font-medium">View Certificate</span>
            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

interface ContactCardProps {
  contactItem: (typeof contactInfo)[0];
  scrollProgress: number;
  contactIndex: number;
}

const ContactInfoCard: React.FC<ContactCardProps> = ({
  contactItem,
  scrollProgress,
  contactIndex,
}) => {
  // Contact info appears together at 250-260%
  const startProgress = 250;
  const endProgress = 260;

  // Calculate opacity and transform based on scroll progress
  const getContactStyle = () => {
    if (scrollProgress < startProgress) {
      return {
        opacity: 0,
        transform: "translateY(20px) scale(0.95)",
        pointerEvents: "none" as const,
      };
    } else if (
      scrollProgress >= startProgress &&
      scrollProgress < endProgress
    ) {
      const progress =
        (scrollProgress - startProgress) / (endProgress - startProgress);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      return {
        opacity: easeOut,
        transform: `translateY(${20 - easeOut * 20}px) scale(${
          0.95 + easeOut * 0.05
        })`,
        pointerEvents: "auto" as const,
      };
    } else if (scrollProgress >= 295) {
      // Fade out from 295% onwards
      const fadeProgress = Math.min(1, (scrollProgress - 295) / 5);
      return {
        opacity: Math.max(0, 1 - fadeProgress),
        transform: `translateY(${-fadeProgress * 20}px) scale(${
          1 - fadeProgress * 0.05
        })`,
        pointerEvents:
          scrollProgress > 300 ? ("none" as const) : ("auto" as const),
      };
    } else {
      return {
        opacity: 1,
        transform: "translateY(0) scale(1)",
        pointerEvents: "auto" as const,
      };
    }
  };

  const Icon = contactItem.icon;

  return (
    <a
      href={contactItem.href}
      className="contact-info-card-small"
      style={{
        ...getContactStyle(),
        transition: "all 0.3s ease-out",
      }}
      onClick={(e) => {
        if (contactItem.href === "#") {
          e.preventDefault();
        }
      }}
    >
      <div className="glass-effect rounded-lg p-3 hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
        <Icon size={16} className={`text-white`} />
        <span className="font-medium text-sm text-white whitespace-nowrap">
          {contactItem.text}
        </span>
      </div>
    </a>
  );
};

// Contact Form Component
interface ContactFormProps {
  scrollProgress: number;
}

const ContactForm: React.FC<ContactFormProps> = ({ scrollProgress }) => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  // Form appears at 260-270%
  const startProgress = 260;
  const endProgress = 270;

  const getFormStyle = () => {
    if (scrollProgress < startProgress) {
      return {
        opacity: 0,
        transform: "translateY(30px)",
        pointerEvents: "none" as const,
      };
    } else if (
      scrollProgress >= startProgress &&
      scrollProgress < endProgress
    ) {
      const progress =
        (scrollProgress - startProgress) / (endProgress - startProgress);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      return {
        opacity: easeOut,
        transform: `translateY(${30 - easeOut * 30}px)`,
        pointerEvents: "auto" as const,
      };
    } else if (scrollProgress >= 295) {
      // Fade out from 295% onwards
      const fadeProgress = Math.min(1, (scrollProgress - 295) / 5);
      return {
        opacity: Math.max(0, 1 - fadeProgress),
        transform: `translateY(${-fadeProgress * 30}px)`,
        pointerEvents:
          scrollProgress > 300 ? ("none" as const) : ("auto" as const),
      };
    } else {
      return {
        opacity: 1,
        transform: "translateY(0)",
        pointerEvents: "auto" as const,
      };
    }
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_iz95hla",
        "template_odt096h",
        form.current,
        "vTzNzWSr5c01BZMCJ"
      )
      .then(() => {
        setStatus("success");
        form.current?.reset();
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="contact-form"
      style={{
        ...getFormStyle(),
        transition: "all 0.3s ease-out",
      }}
    >
      <input type="hidden" name="to_email" value="nafeymoiz@gmail.com" />

      <div className="form-group">
        <label htmlFor="user_name" className="form-label">
          Name *
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          className="form-input"
          placeholder="Your name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="user_email" className="form-label">
          Email Address *
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          className="form-input"
          placeholder="your@email.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="form-textarea"
          placeholder="Tell me about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="form-submit-btn"
      >
        {status === "sending" ? (
          <>
            <div className="loading-spinner" />
            Sending...
          </>
        ) : (
          <>
            <Send size={20} />
            Send Message
          </>
        )}
      </button>

      {status === "success" && (
        <div className="form-message success">
          <p>Message sent successfully! I'll get back to you soon.</p>
        </div>
      )}

      {status === "error" && (
        <div className="form-message error">
          <p>
            Failed to send message. Please try again or contact me directly at
            nafeymoiz@gmail.com
          </p>
        </div>
      )}
    </form>
  );
};

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

        {/* Projects that appear during 50-100% scroll */}
        {scrollProgress > 50 && scrollProgress <= 100 && (
          <div className="projects-container">
            <div className="projects-header">
              <h2 className="projects-title">Featured Projects</h2>
              <p className="projects-subtitle">
                A collection of my recent work showcasing modern web development
              </p>
            </div>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  scrollProgress={scrollProgress}
                  projectIndex={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Skills that appear during 100-200% scroll */}
        {scrollProgress > 100 && scrollProgress <= 200 && (
          <div className="skills-container">
            <div className="skills-header">
              <h2 className="skills-title">Technical Skills</h2>
              <p className="skills-subtitle">
                A comprehensive overview of my technical expertise
              </p>
            </div>
            <div className="skills-display">
              {skillCategories.map((category, index) => (
                <SkillCategory
                  key={category.title}
                  category={category}
                  scrollProgress={scrollProgress}
                  categoryIndex={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Certifications that appear during 200-250% scroll */}
        {scrollProgress > 200 && scrollProgress <= 250 && (
          <div className="certifications-container">
            <div className="certifications-header">
              <h2 className="certifications-title">
                Professional{" "}
                <span className="gradient-text">Certifications</span>
              </h2>
              <p className="certifications-subtitle">
                Validating my expertise through recognized industry
                certifications and academic achievements.
              </p>
            </div>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <CertificationCard
                  key={cert.title}
                  certification={cert}
                  scrollProgress={scrollProgress}
                  certIndex={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Contact that appears during 250-300% scroll */}
        {scrollProgress > 250 && (
          <div
            className="contact-container"
            style={{
              opacity:
                scrollProgress > 295
                  ? Math.max(0, 1 - (scrollProgress - 295) / 5)
                  : 1,
              transition: "opacity 0.3s ease-out",
              pointerEvents: scrollProgress > 300 ? "none" : "auto",
            }}
          >
            <div className="contact-header">
              <h2 className="contact-title">
                Get In <span className="gradient-text">Touch</span>
              </h2>
              <p className="contact-subtitle">
                Ready to collaborate on your next project? Let's discuss how we
                can bring your ideas to life with innovative solutions.
              </p>
            </div>
            <div className="contact-content">
              {/* Contact Info Row - Small, in one row */}
              <div className="contact-info-row">
                {contactInfo.map((contact, index) => (
                  <ContactInfoCard
                    key={contact.text}
                    contactItem={contact}
                    scrollProgress={scrollProgress}
                    contactIndex={index}
                  />
                ))}
              </div>

              {/* Contact Form */}
              <ContactForm scrollProgress={scrollProgress} />
            </div>
          </div>
        )}

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
