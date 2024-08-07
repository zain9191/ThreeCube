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
            H<span className="sideOne__h1__eye">e</span>ll
            <span className="sideOne__h1__eye">o</span>
            <span className="sideOne__h1__dot">.</span>
          </h1>
          <br />
          <h2 className="sideOne__smiley" ref={textRef}>
  <svg width="100%" height="100%" viewBox="0 0 1000 200">
    <path id="curve" d="M150,150 Q525,500 900,150" fill="transparent"></path>
    <text className="text">
      <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
        I am a web developer
      </textPath>
    </text>
  </svg>
</h2>

          <p className="sideOne__p">take a look at my portfolio</p>
        </div>
      </div>
    </div>
  );
}

export default SideOne;
