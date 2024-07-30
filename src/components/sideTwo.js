import React from 'react';
import HomeImg from "../assets/image.png";

function SideTwo() {
  return (
    <div className="sideTwo cubeFace" id="IDsideTwo">
      <div className="sideTwo-container">
        <h2 className="sideTwo__h2">About</h2>
        <div className="sideTwo__content">
          <div className="sideTwo__div">
            <img src={HomeImg} className="sideTwo__img sideTwo__animated-img" alt="Portfolio" />
            <p className='sideTwo__animated-text'>
              I am a dedicated frontend developer specializing in crafting modern, responsive web applications. With a passion for clean code and user-centric design, I bring creativity and technical expertise to every project.
            </p>
          </div>
          <div className="sideTwo__text">
            <p className='sideTwo__animated-text sideTwo__animated-text--delay'>
              Whether you're launching a new site, enhancing an existing one, or looking to optimize performance, I'm here to help.
            </p>
            <p className='sideTwo__animated-text sideTwo__animated-text--delay-more'>
              Contact me on the last side!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideTwo;
