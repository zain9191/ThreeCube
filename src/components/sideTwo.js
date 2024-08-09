import React, { useEffect, useRef } from 'react';
import HomeImg from '../assets/image.png';

const SideTwo = () => {
  const imgRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === imgRef.current) {
              imgRef.current.classList.add('sideTwo__animated-img--active');
            }
            if (entry.target === textRef1.current) {
              textRef1.current.classList.add('sideTwo__animated-text--active');
            }
            if (entry.target === textRef2.current) {
              textRef2.current.classList.add('sideTwo__animated-text--active');
            }
            if (entry.target === textRef3.current) {
              textRef3.current.classList.add('sideTwo__animated-text--active');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    if (textRef1.current) observer.observe(textRef1.current);
    if (textRef2.current) observer.observe(textRef2.current);
    if (textRef3.current) observer.observe(textRef3.current);

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
      if (textRef1.current) observer.unobserve(textRef1.current);
      if (textRef2.current) observer.unobserve(textRef2.current);
      if (textRef3.current) observer.unobserve(textRef3.current);
    };
  }, []);

  return (
    <div className="sideTwo cubeFace" id="IDsideTwo">
      <div className="sideTwo-container">
        <h2 className="sideTwo__h2">About</h2>
        <div className="sideTwo__content">
          <div className="sideTwo__div">
            <img 
              ref={imgRef} 
              src={HomeImg} 
              className="sideTwo__img sideTwo__animated-img" 
              alt="Portfolio" 
            />
            <p 
              ref={textRef1} 
              className='sideTwo__animated-text'>
              I am a dedicated web developer specializing in crafting modern, responsive web applications. With a passion for clean code and user-centric design, I bring creativity and technical expertise to every project.
            </p>
          </div>
          <div className="sideTwo__text">
            <p 
              ref={textRef2} 
              className='sideTwo__animated-text sideTwo__animated-text--delay'>
              Whether you're launching a new site, enhancing an existing one, or looking to optimize performance, I'm here to help.
            </p>
            <p 
              ref={textRef3} 
              className='sideTwo__animated-text sideTwo__animated-text--delay-more'>
              Contact me on the last side!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideTwo;
