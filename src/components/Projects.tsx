import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "The Leading Practice",
      description:
        "AI-powered marketing automation platform built as a microservices-based multi-tenant SaaS with three-level RBAC authorization using Supabase Auth and row-level security. Architected AI-powered conversation hub with unified messaging across email, SMS, and live chat.",
      image: "/api/placeholder/400/300",
      tech: ["React", "Supabase", "CrewAI", "Pinecone", "Node.js"],
      github: "#",
      live: "#",
      inDev: true,
    },
    {
      title: "Relevic",
      description:
        "A self-service no-code web personalisation tool that provides a complete suite to help create relevant & personalized web experiences. Developed drag-and-drop canvas using React Flow and React DnD with A/B and multivariant testing features.",
      image: "/api/placeholder/400/300",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Material UI"],
      github: "#",
      live: "https://dashboard.relevic.com/",
    },
    {
      title: "SimplifyVms",
      description:
        "Microservices based architecture product for managing contingent workforce, SOW, and talent. Worked on Front End, Backend Integrations, and collaborated directly with major US-based clients including RXO, AMFAM, and Marriott.",
      image: "/api/placeholder/400/300",
      tech: ["React", "Django", "Flask", "Python", "PostgreSQL"],
      github: "#",
      live: "https://app.simplifyvms.com/",
    },
  ];

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

  return (
    <section id="products" className="section-container">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Featured <span className="gradient-text">Products</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of my recent work showcasing modern web development
            techniques and innovative solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-effect rounded-2xl overflow-hidden h-full">
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-6xl font-bold gradient-text opacity-50"
                    >
                      {project.title.charAt(0)}
                    </motion.div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 glass-effect rounded-lg hover:bg-white/20 transition-colors duration-300"
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target={project.inDev ? "_self" : "_blank"}
                      rel={project.inDev ? "" : "noopener noreferrer"}
                      whileHover={{ scale: project.inDev ? 1 : 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 glass-effect rounded-lg transition-colors duration-300 ${
                        project.inDev
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-white/20"
                      }`}
                      onClick={(e) => project.inDev && e.preventDefault()}
                      title={
                        project.inDev ? "Coming soon - In development" : ""
                      }
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold group-hover:gradient-text transition-all duration-300">
                      {project.title}
                    </h3>
                    {project.inDev && (
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium">
                        In Development
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
