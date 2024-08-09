import React, { useEffect, useRef } from 'react';

const SideFive = () => {
  const logoData = [
    { name: "JavaScript", imageUrl: require("../assets/Logos/javaScriptLogo.png") },
    { name: "TypeScript", imageUrl: require("../assets/Logos/typeScriptLogo.png") },
    { name: "Python", imageUrl: require("../assets/Logos/python.png") },
    { name: "React", imageUrl: require("../assets/Logos/React.png") },
    { name: "Angular", imageUrl: require("../assets/Logos/angularLogo.png") },
    { name: "Vue", imageUrl: require("../assets/Logos/VueLogo.png") },
    { name: "Node", imageUrl: require("../assets/Logos/NodeLogo.png") },
    { name: "Express.js", imageUrl: require("../assets/Logos/ExpressLogo.png") },
    { name: "MongoDB", imageUrl: require("../assets/Logos/MongoDBLogo.png") },
    { name: "SCSS", imageUrl: require("../assets/Logos/SCSSLogo.png") },
    { name: "JQuery", imageUrl: require("../assets/Logos/JQueryLogo.png") },
    { name: "Git", imageUrl: require("../assets/Logos/githubLogo.png") },
    { name: "NPM", imageUrl: require("../assets/Logos/NPMLogo.png") },
    { name: "Postman", imageUrl: require("../assets/Logos/PostmanLogo.png") },
    { name: "Rest", imageUrl: require("../assets/Logos/RestLogo.png") },
    { name: "JSON", imageUrl: require("../assets/Logos/JsonLogo.png") },
  ];

  const logoRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("logo-animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    logoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      logoRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="grid-container cubeFace">
      {logoData.map((logo, index) => (
        <div
          className="grid-item"
          key={index}
          ref={(el) => (logoRefs.current[index] = el)}
        >
          <img src={logo.imageUrl} alt={logo.name} className="logo-image" />
          <p className="logo-name">{logo.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SideFive;
