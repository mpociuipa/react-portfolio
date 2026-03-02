import React from "react";
import CV from "../../assets/cv.pdf";

const CTA = ({ onLetsTalkClick }) => {
  return (
    <div className="cta">
      <a href={CV} download className="btn">Download CV</a>
      <a href="#contact" className="btn btn-primary" onClick={onLetsTalkClick}>
        Let's Talk
      </a>
    </div>
  );
};

export default CTA;