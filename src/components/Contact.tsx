import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import emailjs from "@emailjs/browser";
import ProfileImage from "../assets/icons/profile.png";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_iz95hla", // Service ID
        "template_odt096h", // Template ID
        form.current,
        "vTzNzWSr5c01BZMCJ" // Public Key
      )
      .then(() => {
        setStatus("success");
        form.current?.reset();
      })
      .catch(() => {
        setStatus("error");
      });
  };

  const contactInfo = [
    {
      icon: Mail,
      text: "nafeymoiz@gmail.com",
      href: "mailto:nafeymoiz@gmail.com",
    },
    { icon: Phone, text: "+92-302-6402646", href: "tel:+923026402646" },
    { icon: MapPin, text: "Lahore, Pakistan", href: "#" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/nafey7", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/moiz-nafey",
      label: "LinkedIn",
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
    <>
      <FloatingWhatsApp
        phoneNumber="+923026402646"
        accountName="Moiz"
        avatar={ProfileImage}
        chatMessage="Hello there! How can I help?"
        darkMode={true}
        style={{ display: "block" }}
        buttonStyle={{
          background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
          boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
        }}
      />
      <section id="contact" className="section-container">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to collaborate on your next project? Let's discuss how we
              can bring your ideas to life with innovative solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-3xl font-bold gradient-text">
                  Let's Connect
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm always interested in hearing about new opportunities and
                  exciting projects. Whether you have a question or just want to
                  say hi, I'll try my best to get back to you!
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                {contactInfo.map(({ icon: Icon, text, href }, index) => (
                  <motion.a
                    key={text}
                    href={href}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 glass-effect rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <Icon size={20} />
                    </div>
                    <span className="font-medium">{text}</span>
                  </motion.a>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <h4 className="text-xl font-semibold">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 glass-effect rounded-lg hover:bg-white/20 transition-colors duration-300"
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {/* Hidden field for recipient email */}
                <input
                  type="hidden"
                  name="to_email"
                  value="nafeymoiz@gmail.com"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label
                    htmlFor="user_name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    required
                    className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label
                    htmlFor="user_email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    required
                    className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25"
                  style={{
                    color: "white",
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
                  >
                    <p className="text-green-400 font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
                  >
                    <p className="text-red-400 font-medium">
                      Failed to send message. Please try again or contact me
                      directly at nafeymoiz@gmail.com
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
