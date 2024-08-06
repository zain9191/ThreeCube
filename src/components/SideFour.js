import React, { useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard";

import PantherHomeSmall from "../assets/Porojects/Panther/pantherHomeSmall.png";
import PantherHome from "../assets/Porojects/Panther/pantherHome.png";
import PantherHome1 from "../assets/Porojects/Panther/pantherHome1.png";
import PantherHome2 from "../assets/Porojects/Panther/pantherHome2.png";
import PantherHome3 from "../assets/Porojects/Panther/pantherHome3.png";

import KasaHomeSmall from "../assets/Porojects/kasa/Kasa-home-s.png";
import KasaHome from "../assets/Porojects/kasa/Kasa-home.png";
import Kasa1 from "../assets/Porojects/kasa/Kasa-1.png";
import Kasa2 from "../assets/Porojects/kasa/Kasa-2.png";
import Kasa3 from "../assets/Porojects/kasa/Kasa-3.png";
import Kasa4 from "../assets/Porojects/kasa/Kasa-4.png";
import Kasa5 from "../assets/Porojects/kasa/Kasa-5.png";

const projects = [
  {
    title: "Kasa",
    description: "Kasa project is a rental platform for properties, allowing users to browse and view detailed information about various rental options. Built with React, the application features a responsive design and smooth user interactions, including a carousel for property images, a detailed property description, and integrated tools for enhanced user experience.",
    subdescription: "Real Estate Rental Platform",
    imageUrlSmall: KasaHomeSmall,
    imageUrlLarge: KasaHome,
    link: "https://github.com/zain9191/P7-Kasa",
    tools: ["JavaScript", "CSS", "HTML", "React", "Node"],
    images: [KasaHome, Kasa1, Kasa2, Kasa3, Kasa4, Kasa5],
  },
  {
    title: "La Panthère",
    description: "La Panthère is a project focused on improving the SEO of an existing website. The project includes optimizing content, improving page load speed, and ensuring a mobile-friendly design.",
    subdescription: "SEO Optimization Project",
    imageUrlSmall: PantherHomeSmall,
    imageUrlLarge: PantherHome,
    link: "https://github.com/zain9191/La-Panthere",
    tools: ["CSS", "HTML"],
    images: [PantherHome, PantherHome1, PantherHome2, PantherHome3],
    website: "https://zain9191.github.io/La-Panthere/",
  },
];

const SideFour = () => {
  const introRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imgRef.current) {
              imgRef.current.classList.add("sidefour__img--animated");
            }
            if (textRef.current) {
              textRef.current.classList.add("sidefour-text--animated");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentIntroRef = introRef.current;

    if (currentIntroRef) {
      observer.observe(currentIntroRef);
    }

    // Clean up observer on component unmount
    return () => {
      if (currentIntroRef) {
        observer.unobserve(currentIntroRef);
      }
    };
  }, []);

  return (
    <div className="cubeFace">
      <div className="sidefourMain">
        {projects.map((project, index) => (
          <div
            className={`sidefour__projects ${index % 2 === 0 ? "sidefour__img-left" : "sidefour__img-right"}`}
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

export default SideFour;
