import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import Lottie from "lottie-react";
import responsiveDeveloper from "../assets/animations/responsiveDeveloperTwo.json";
import cvFile from "../assets/files/Moiz_Nafey_Resume.pdf";
import { Canvas } from "@react-three/fiber";
// @ts-ignore - drei exports may not be fully typed
import { useGLTF, OrbitControls } from "@react-three/drei";

// Add AboutGLB component to load /assets/icons/about.glb
function AboutGLB() {
  // Use the relative path from public, so `/about.glb` if you move the file to public, or use import.meta.url if handled via Vite.
  // To keep consistent with vite/react conventions, and avoid asset loading issues, place about.glb in /public directory.
  // For now, assume public path:
  const { scene } = useGLTF("/about.glb");
  return <primitive object={scene} scale={[1.0, 1.0, 1.0]} />;
}

const About: React.FC = () => {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = cvFile;
    link.download = "Moiz_Nafey_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/nafey7", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/moiz-nafey",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:nafeymoiz@gmail.com", label: "Email" },
  ];

  return (
    <section id="about" className="section-container-mobile-padding">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold">
              <span className="gradient-text">Moiz</span>
              <br />
              Nafey
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Software Engineer based in Lahore, Pakistan. As a dedicated and
              versatile full-stack software engineer, I bring a comprehensive
              skill set that bridges both front-end and back-end development,
              ensuring seamless integration and exceptional user experiences.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-wrap gap-4">
              {["React", "Node.js", "Python", "Supabase", "CrewAI"].map(
                (tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="px-4 py-2 glass-effect text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={handleDownloadCV}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Download size={20} />
                Download CV
              </motion.button>

              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, label }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? "_self" : "_blank"}
                    rel={
                      href.startsWith("mailto:") ? "" : "noopener noreferrer"
                    }
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 glass-effect rounded-lg hover:bg-white/20 transition-colors duration-300"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          {/*
          <div className="max-w-md mx-auto">
            <Lottie
              animationData={responsiveDeveloper}
              loop={true}
              className="w-full h-full"
            />
          </div>
          */}
          <div className="w-full h-[350px] sm:h-[400px] md:h-[480px] lg:h-[500px] xl:h-[550px] max-w-md mx-auto">
            <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[8, 10, 10]} intensity={0.8} />
              <directionalLight position={[-5, 7, 7]} intensity={1} />
              <Suspense fallback={null}>
                <AboutGLB />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
