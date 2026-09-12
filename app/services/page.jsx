"use client";

import { FaCode, FaNode, FaLayerGroup, FaCodeBranch } from 'react-icons/fa';
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Front-end Web Development",
    description:
      "I build responsive, scalable, and maintainable user interfaces using Angular, React, and TypeScript. I focus on clean architecture, performance, reusable components, and seamless integration with back-end services.",
    icon: <FaCode style={{ fontSize: '3rem' }} />, 
    href: "",
  },
  {
    num: "02",
    title: "Back-end & API Development",
    description:
      "I develop secure and scalable server-side applications using Node.js, NestJS, and Express.js, including REST APIs, authentication, database integration, and third-party service integrations.",
    icon: <FaNode style={{ fontSize: '2rem' }} />, 
    href: "",
  },
  {
    num: "03",
    title: "Full-Stack Application Development",
    description:
      "I build complete web applications from front end to back end, combining modern JavaScript technologies, APIs, databases, authentication, and deployment-ready architecture.",
    icon: <FaLayerGroup style={{ fontSize: '3rem' }} />,
    href: "",
  },
  {
    num: "04",
    title: "Application Modernization & Integration",
    description:
      "I improve and extend existing applications through API integrations, code refactoring, performance optimization, Docker-based environments, and modernization of legacy functionality.",
    icon: <FaCodeBranch style={{ fontSize: '3rem' }} />,
    href: "",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <div key={index} className="flex-1 flex flex-col justify-center gap-6 group">
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  <div className="w-[70px] h-[70px] rounded-full bg-white transition-all duration-500 flex justify-center items-center group-hover:bg-accent hover:-rotate-45">
                    <div className="text-black group-hover:text-white transition-colors duration-500">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                  {service.title}
                </h2>
                <p className="text-white/60 ">
                  {service.description}
                </p>
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
