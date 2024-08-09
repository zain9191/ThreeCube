import React, { useEffect, useRef } from "react";

function SideOne() {
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const introRef = useRef(null);
  const textPathRef = useRef(null);
  const hRef = useRef(null); 
  const lRefs = useRef([]); 

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
            animateText();
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

  const animateText = () => {
    let startOffset = 100; 
    const endOffset = 50; // Stop at 50%
    const duration = 1000; // 5 seconds
    const fps = 60; // frames per second
    const totalFrames = (duration / 1000) * fps;
    let frame = 0;

    const animate = () => {
      frame++;
      startOffset = 100 - ((frame / totalFrames) * (50)); // Move from 100% to 50%
      if (textPathRef.current) {
        textPathRef.current.setAttribute('startOffset', startOffset + '%');
      }

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        if (hRef.current) {
          hRef.current.style.opacity = '0.1'; // Change opacity of H after animation
        }
        lRefs.current.forEach((l) => {
          if (l) {
            l.style.transform = 'translateY(350px)'; // Move l elements down 
          }
        });
      }
    };

    animate();
  };

  return (
    <div className="cubeFace sideOne" id="IDsideOne" ref={introRef}>
      <div className="sideOne__container">
        <div className="sideOne__div1">
          <h1 className="sideOne__h1" ref={imgRef}>
            <span ref={hRef} style={{ transition: 'opacity 1s' }}>
              H
            </span>
            <span className="sideOne__h1__eye">e</span>
            <span
              ref={(el) => (lRefs.current[0] = el)}
              className="sideOne__h1__l"
              style={{ display: 'inline-block', transition: 'transform 1s' }}
            >
              l
            </span>
            <span
              ref={(el) => (lRefs.current[1] = el)}
              className="sideOne__h1__l"
              style={{ display: 'inline-block', transition: 'transform 1s' }}
            >
              l
            </span>
            <span className="sideOne__h1__eye">o</span>
            <span className="sideOne__h1__dot">.</span>
          </h1>
          <br />
          <h2 className="sideOne__smiley" ref={textRef}>
            <svg width="100%" height="100%" viewBox="0 0 1000 200">
              <path id="curve" d="M150,150 Q525,500 900,150" fill="transparent"></path>
              <text className="text">
                <textPath xlinkHref="#curve" ref={textPathRef} startOffset="100%" textAnchor="middle">
                  I am a web developer
                </textPath>
              </text>
            </svg>
          </h2>

          <p className="sideOne__p">Take a look at my portfolio</p>
        </div>
      </div>
    </div>
  );
}

export default SideOne;
