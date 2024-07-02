import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

function ProBox({ title, img, date, description, techno, code, scrollY, icon, cName }) {
  return (
    <div className={`pro projects-grid pro__1 ${cName}`}>
      {img && <img src={img} alt={`${title} project`} className="pro__img" />}
      <div className="pro__text">
        <h3>{title} <span className="date-class">{date}</span></h3>
        <p>{description}</p>
        <div className="stack">
         { techno.map((tech) => (
            <p>{tech}</p>
          ))}
        </div>
        <div className="links">
          <a href={code} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github link-icon"></i> View Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProBox;
