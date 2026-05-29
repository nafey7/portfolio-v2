import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Projects: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    images: string[];
  } | null>(null);
  const swiperRef = useRef<any>(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesLoadedCountRef = useRef(0);

  // Reset states when modal or project changes
  useEffect(() => {
    if (isModalOpen && selectedProject) {
      setSwiperReady(false);
      setImagesLoaded(false);
      imagesLoadedCountRef.current = 0;
    }
  }, [isModalOpen, selectedProject?.title]);

  // Handle image loading
  const handleImageLoad = () => {
    if (!selectedProject) return;
    imagesLoadedCountRef.current += 1;
    if (imagesLoadedCountRef.current >= selectedProject.images.length) {
      setImagesLoaded(true);
    }
  };

  // Initialize Swiper when images are loaded and Swiper is ready
  useEffect(() => {
    if (isModalOpen && swiperRef.current && imagesLoaded) {
      // Ensure Swiper is reset to slide 0 after images load
      const resetToFirstSlide = () => {
        if (swiperRef.current) {
          swiperRef.current.slideTo(0, 0);
          swiperRef.current.update();
          swiperRef.current.updateSlides();
        }
      };

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resetToFirstSlide();
          setTimeout(() => {
            resetToFirstSlide();
            setSwiperReady(true);
          }, 100);
        });
      });
    }
  }, [isModalOpen, selectedProject?.title, imagesLoaded]);

  const openModal = (project: { title: string; images: string[] }) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const nextImage = (projectTitle: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectTitle]: ((prev[projectTitle] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (projectTitle: string, totalImages: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectTitle]:
        ((prev[projectTitle] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const projects = [
    {
      title: "Voya",
      description:
        "AI-powered travel planning platform with agentic flight, hotel, and itinerary workflows. Architected FlightLogic GDS/NDC booking flows, LangGraph + Gemini multi-agent orchestration, Google Maps itinerary enrichment, and AWS Terraform infrastructure.",
      images: [
        "/images/projectImages/optimized/voya_1.jpg",
        "/images/projectImages/optimized/voya_2.jpg",
        "/images/projectImages/optimized/voya_3.jpg",
        "/images/projectImages/optimized/voya_4.jpg",
        "/images/projectImages/optimized/voya_5.jpg",
        "/images/projectImages/optimized/voya_6.jpg",
        "/images/projectImages/optimized/voya_7.jpg",
        "/images/projectImages/optimized/voya_8.jpg",
      ],
      tech: ["FastAPI", "LangGraph", "Gemini", "React", "AWS"],
      live: "https://www.myvoya.ai/",
    },
    {
      title: "The Leading Practice",
      description:
        "AI-powered marketing automation platform built as a microservices-based multi-tenant SaaS with three-level RBAC authorization using Supabase Auth and row-level security. Architected AI-powered conversation hub with unified messaging across email, SMS, and live chat.",
      images: [
        "/images/projectImages/optimized/tlp_1.jpg",
        "/images/projectImages/optimized/tlp_2.jpg",
        "/images/projectImages/optimized/tlp_3.jpg",
        "/images/projectImages/optimized/tlp_4.jpg",
      ],
      tech: ["React", "Supabase", "CrewAI", "Pinecone", "Node.js"],
      live: "#",
      inDev: true,
    },
    {
      title: "SimplifyVms",
      description:
        "Microservices based architecture product for managing contingent workforce, SOW, and talent. Worked on Front End, Backend Integrations, and collaborated directly with major US-based clients including RXO, AMFAM, and Marriott.",
      images: [
        "/images/projectImages/optimized/Simplify_1.jpg",
        "/images/projectImages/optimized/Simplify_2.jpg",
        "/images/projectImages/optimized/Simplify_3.jpg",
        "/images/projectImages/optimized/Simplify_4.jpg",
        "/images/projectImages/optimized/Simplify_5.jpg",
        "/images/projectImages/optimized/Simplify_6.jpg",
        "/images/projectImages/optimized/Simplify_7.jpg",
        "/images/projectImages/optimized/Simplify_8.jpg",
        "/images/projectImages/optimized/Simplify_9.jpg",
        "/images/projectImages/optimized/Simplify_10.jpg",
        "/images/projectImages/optimized/Simplify_11.jpg",
      ],
      tech: ["React", "Django", "Flask", "Python", "PostgreSQL"],
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="gradient-text">Products</span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of my recent work showcasing modern web development
            techniques and innovative solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group"
            >
              <div className="glass-effect rounded-2xl overflow-hidden h-full">
                {/* Project Image Carousel */}
                <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                  {/* Navigation Arrows - positioned above image with higher z-index */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          prevImage(project.title, project.images.length)
                        }
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/80 rounded-lg hover:bg-black/90 transition-colors duration-300 text-white"
                        title="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() =>
                          nextImage(project.title, project.images.length)
                        }
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black/80 rounded-lg hover:bg-black/90 transition-colors duration-300 text-white"
                        title="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image Container */}
                  <div
                    className="relative w-full h-full cursor-pointer"
                    onClick={() =>
                      openModal({
                        title: project.title,
                        images: project.images,
                      })
                    }
                  >
                    <img
                      key={`${project.title}-${
                        currentImageIndex[project.title] || 0
                      }`}
                      src={
                        project.images[currentImageIndex[project.title] || 0]
                      }
                      alt={`${project.title} screenshot ${
                        (currentImageIndex[project.title] || 0) + 1
                      }`}
                      className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = document.createElement("div");
                        fallback.className =
                          "absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center";
                        fallback.innerHTML = `<div class="text-6xl font-bold gradient-text opacity-50">${project.title.charAt(
                          0
                        )}</div>`;
                        target.parentNode?.appendChild(fallback);
                      }}
                    />
                  </div>

                  {/* Image Counter */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 z-10 px-3 py-1 bg-black/80 rounded-lg text-xs font-medium text-white">
                      {(currentImageIndex[project.title] || 0) + 1} /{" "}
                      {project.images.length}
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-4 xs:p-5 sm:p-6 space-y-3 xs:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg xs:text-xl sm:text-2xl font-bold group-hover:gradient-text transition-all duration-300">
                        {project.title}
                      </h3>
                      {project.inDev && (
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium">
                          In Development
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
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
                  <p className="text-gray-300 leading-relaxed">
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
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-6xl mx-4 sm:mx-6 max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 xs:p-5 sm:p-6 border-b border-gray-700">
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold gradient-text">
                {selectedProject.title}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body with Swiper */}
            <div className="p-4 xs:p-5 sm:p-6">
              <div
                style={{
                  opacity: swiperReady && imagesLoaded ? 1 : 0,
                  transition: "opacity 0.2s",
                }}
              >
                <Swiper
                  key={`${selectedProject.title}-${isModalOpen}`}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onInit={(swiper) => {
                    // Swiper is initialized - wait for images to load before showing
                    // The useEffect will handle resetting to slide 0 after images load
                  }}
                  navigation={true}
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView="auto"
                  initialSlide={0}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[EffectCoverflow, Pagination, Navigation]}
                  className="mySwiper"
                  style={{
                    width: "100%",
                    height: "60vh",
                  }}
                >
                  {selectedProject.images.map((image, index) => (
                    <SwiperSlide key={index} style={{ width: "80%" }}>
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={image}
                          alt={`${selectedProject.title} screenshot ${
                            index + 1
                          }`}
                          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                          fetchPriority={index === 0 ? "high" : "low"}
                          onLoad={handleImageLoad}
                          onError={handleImageLoad}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
