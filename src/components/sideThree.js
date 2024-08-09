import React, { useEffect, useRef } from "react";

import ProjectCard from "../components/ProjectCard";

import KanapHomeSmall from "../assets/Porojects/kanap/KanapHomeSmall.png";
import KanapHome from "../assets/Porojects/kanap/KanapHome.png";
import KanapHome1 from "../assets/Porojects/kanap/KanapHome1.png";
import KanapHome2 from "../assets/Porojects/kanap/KanapHome2.png";
import KanapHome3 from "../assets/Porojects/kanap/KanapHome3.png";
import KanapHomeLarge from "../assets/Porojects/kanap/KanapHomeLarge.png";

import P6HomeSmall from "../assets/Porojects/hotTakes/P6Home-s.png";
import P6Home from "../assets/Porojects/hotTakes/P6Home.png";
import P6Home1 from "../assets/Porojects/hotTakes/P6Home1.png";
import P6Home2 from "../assets/Porojects/hotTakes/P6Home2.png";
import P6Home3 from "../assets/Porojects/hotTakes/P6Home3.png";

import P6HomeLarge from "../assets/Porojects/hotTakes/P6Home-large.png";

const projects = [
  {
    title: "Kanap",
    description:
      "Kanap is an e-commerce website for selling customizable sofas. The project emphasizes JavaScript for dynamic content and user interaction, along with a robust backend for managing product information.",
    subdescription: "E-commerce Website",
    imageUrlSmall: KanapHomeSmall,
    imageUrlLarge: KanapHomeLarge,
    link: "https://github.com/zain9191/P5-Dev-Web-Kanap",
    tools: ["JavaScript", "CSS", "HTML", "Node"],
    images: [KanapHome, KanapHome1, KanapHome2, KanapHome3],
  },
  {
    title: "HotTakes",
    description:
      "HotTakes is a secure API for a gastronomic review application. Developed with Angular and Express, it includes user authentication, secure data handling, and responsive front-end features.",
    subdescription: "Secure API for Gastronomic Reviews",
    imageUrlSmall: P6HomeSmall,
    imageUrlLarge: P6HomeLarge,
    link: "https://github.com/zain9191/Web-Developer-P6",
    tools: ["TypeScript", "CSS", "HTML", "Angular", "Node"],
    images: [P6Home, P6Home1, P6Home2, P6Home3],
  },
];

const SideThree = () => {
  const projectRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sidethree__projects--animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Clean up observer on component unmount
    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="cubeFace">
      <div className="sidethreeMain">
        {projects.map((project, index) => (
          <div
            ref={(el) => (projectRefs.current[index] = el)}
            className={`sidethree__projects ${
              index % 2 === 0 ? "sidethree__img-left" : "sidethree__img-right"
            }`}
            key={index}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              subdescription={project.subdescription}
              imageUrlSmall={project.imageUrlSmall}
              imageUrlLarge={project.imageUrlLarge}
              link={project.link}
              tools={project.tools}
              images={project.images}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideThree;
