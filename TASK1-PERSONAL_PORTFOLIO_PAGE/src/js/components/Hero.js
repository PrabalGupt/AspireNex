// import "../dist/styles.css";
import Waving from "../images/waving.png";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const frontendIcons = [
  { img: "https://skillicons.dev/icons?i=react,css,html,materialui,redux,bootstrap", name: "React, CSS, HTML, Material-UI, Redux, Bootstrap", id: 1 },
];

const backendIcons = [
  { img: "https://skillicons.dev/icons?i=nodejs,express,mongodb,django,postgresql,mysql", name: "Node.js, Express, MongoDB, Django, PostgreSQL, MySQL", id: 2 },
];

const toolsIcons = [
  { img: "https://skillicons.dev/icons?i=git,github,postman,vercel,docker", name: "Git, GitHub, Postman, Vercel, Docker", id: 3 },
];

const programmingLanguagesIcons = [
  { img: "https://skillicons.dev/icons?i=js,python,java,c", name: "JavaScript, Python, Java, C", id: 4 },
];

function Hero() {
  return (
    <>
      <section id="home" className="hero">
        <div className="container">
          <div className="content">
            <div className="hero-main">
              <div className="hero-text">
                <h1>Full Stack Web Developer</h1>
                <img src={Waving} alt="waving_hand" />
                <p>
                  Hi, I'm Prabal Gupta. A passionate Full Stack Web Developer
                  based in Delhi, India. 📍
                </p>
                <span>
                  <a
                    aria-label="linkedin"
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/in/prabal-gupta0/"
                  >
                    <IconBrandLinkedin width={32} height={32} />
                  </a>
                  <a
                    aria-label="github"
                    rel="noreferrer"
                    target="_blank"
                    href="https://github.com/PrabalGupt"
                  >
                    <IconBrandGithub width={32} height={32} />
                  </a>
                </span>
              </div>

              <div className="hero-img"></div>
            </div>

            <div className="skills">
              <p>TECH STACK </p>
              <div className="logos">
                <h3 className="skill">Frontend</h3>
                <ul>
                  {frontendIcons.map((icon) => (
                    <li key={icon.id} className="icon-container">
                      <img className="logo" src={icon.img} alt="frontend-icons" />
                    </li>
                  ))}
                </ul>
                <h3 className="skill">Backend</h3>
                <ul>
                  {backendIcons.map((icon) => (
                    <li key={icon.id} className="icon-container">
                      <img className="logo" src={icon.img} alt="backend-icons" />
                    </li>
                  ))}
                </ul>
                <h3 className="skill">Tools</h3>
                <ul>
                  {toolsIcons.map((icon) => (
                    <li key={icon.id} className="icon-container">
                      <img className="logo" src={icon.img} alt="tools-icons" />
                    </li>
                  ))}
                </ul>
                <h3 className="skill">Programming Languages</h3>
                <ul>
                  {programmingLanguagesIcons.map((icon) => (
                    <li key={icon.id} className="icon-container">
                      <img className="logo" src={icon.img} alt="programming-languages-icons" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;

