// import Gymate from "../images/gymate-home.webp";
// import Raouf from "../images/ecom.webp";
import ProBox from "./ProBox";
import eventbrite from "../images/event-brite.png";
import synth from "../images/synthG.png";
import memohub from "../images/memohub.png";

function Projects() {
  return (
    <>
      <section id="projects" className="project">
        <div className="container">
          <div className="project-content">
            <p>portfolio</p>
            <h3>Each project is a unique piece of development 🧩</h3>
            <div className="projects-grid">
              <ProBox
                title="LearnAI"
                img={synth}
                date="(January 2024)"
                description="LearnAI is an advanced AI chatbot designed for dynamic discussions on YouTube videos, document analysis, and providing personalized learning paths."
                techno={["React", "Node.js", "Express", "Passport.js"]}
                code="https://github.com/PrabalGupt/SynthG-AI"
                scrollY="-83%"
                icon="🚗"
              />

              <ProBox
                title="Event Brite"
                date="(September 2023)"
                img={eventbrite}
                description="Event Brite helps user create personalized lists of their favorite events and ensure they never miss out on the activities they love."
                techno={["React", "Django","sqlite"]}
                code="https://github.com/PrabalGupt/Event-Management-Project"
                scrollY="-74%"
                icon="🪙"
                cName="reversed-proj"
              />

              <ProBox
                title="Memo Hub"
                date="(July 2023)"
                img={memohub}
                description="Memo Hub is a user-friendly web application designed to help users preserve their memories in an organized and accessible way."
                techno={["React", "Node","MongoDB", "Express"]}
                code="https://github.com/PrabalGupt/memory-Project"
                scrollY="-74%"
                icon="🪙"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;
