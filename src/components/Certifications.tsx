import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const Certifications: React.FC = () => {
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
    <section id="certifications" className="section-container">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Validating my expertise through recognized industry certifications
            and academic achievements.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-effect rounded-2xl overflow-hidden h-full">
                {/* Certification Header */}
                <div
                  className={`relative h-32 bg-gradient-to-br ${cert.color} overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

                  {/* Emoji/Icon */}
                  <div className="absolute top-4 left-6 text-6xl opacity-20">
                    {cert.icon}
                  </div>

                  {/* Issuer and Badge Icon */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/80">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certification Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold group-hover:gradient-text transition-all duration-300">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{cert.date}</span>
                  </div>

                  {/* View Certificate Link */}
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 group/link"
                  >
                    <span className="font-medium">View Certificate</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
