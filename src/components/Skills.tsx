import React from "react";
import { motion } from "framer-motion";

const Skills: React.FC = () => {
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
    <section id="skills" className="section-container">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency
            across various technologies and frameworks.
          </p>
        </motion.div>

        {/* Skills Content - Center Aligned */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="space-y-4"
            >
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold gradient-text">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3,
                        }}
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
