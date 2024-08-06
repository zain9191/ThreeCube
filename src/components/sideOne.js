import React, { useEffect, useRef } from "react";

function SideOne() {
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imgRef.current) {
              imgRef.current.classList.add("sidethree__img--animated");
            }
            if (textRef.current) {
              textRef.current.classList.add("sidethree-text--animated");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    return () => {
      if (introRef.current) {
        observer.unobserve(introRef.current);
      }
    };
  }, []);

  return (
    <div className="cubeFace sideOne" id="IDsideOne" ref={introRef}>
      <div className="sideOne__container">
        <div className="sideOne__div1">
          <h1 className="sideOne__h1" ref={imgRef}>
            Hello
            <span className="sideOne__h1__dot">.</span>
          </h1>
          <br />
          <h2 className="sideOne__p" ref={textRef}>
            I am a web developer
            <br /> <br />
            <p>take a look at my portfolio</p>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SideOne;
