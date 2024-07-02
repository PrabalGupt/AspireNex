import AboutImg from "../images/about_me.webp";
// import RoundedText from "../images/text2.svg";
import WorkingEmoji from "../images/working-emoji.png";

function AboutMe() {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="img-side">
              <img src={WorkingEmoji} alt="emoji" className="work-emoji" />
              <img src={AboutImg} alt="mee" className="img-side__main-img" />
              {/* <span>
                <img src={RoundedText} alt="text" />
              </span> */}
            </div>
            <div className="text-side">
              <h3>About me</h3>
              <h4>
                Full-Stack Developer <br /> based in Delhi, India 📍
              </h4>
              <p>
                Hey, my name is Prabal, and I'm a Full Stack Developer. My passion
                is to create, develop clean and utility based website for users.
                <br />
                <br />
                I immerse myself in the suspense of thriller mysteries, and when I'm not unraveling plots, I practice the disciplined art of martial arts.               
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutMe;
