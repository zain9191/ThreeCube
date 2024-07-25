import React from "react";
import HomeImg from "../assets/image.png";

function sideOne() {
  return (
    <div className="sideOne" id="IDsideOne">
      <div className="sideOne__container">
        <div className="sideOne__div1">
          <h1 className="sideOne__h1">
            Hello
            <span className="sideOne__h1__dot">.</span>
          </h1>
          <br />
          <h2 className="sideOne__h2">
            I am a web developer
            <br /> <br />
            <p>take a look at my portfolio</p>
          </h2>
        </div>
        <div className="sideOne__div2">
          <img src={HomeImg} className="sideOne__img" alt="Portfolio" />
        </div>
      </div>
    </div>
  );
}

export default sideOne;
