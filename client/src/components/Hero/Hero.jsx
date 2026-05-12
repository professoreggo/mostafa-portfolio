import "./Hero.css";
import Typewriter from "./TypeWriter";

function Hero({ name, title, summary, skills }) {
  return(<section className="hero" id="about">
    <div className="hero__content">
      <p className="hero__greeting">Hi, I'm</p>

      <h1 className="hero__name">{name}</h1>

      <h2 className="hero__title">{title}</h2>

      <p className="hero__summary">{summary}</p>
      <Typewriter words={skills} />

      <div className="hero__actions">
        <a href="https://www.linkedin.com/in/mostafa-tarek-abdeljawad/" className="btn btn--primary">
          LinkedIn
        </a>
        <a href="#contact" className="btn btn--secondary">
          Contact Me
        </a>
      </div>
    </div>
  </section>)
}
export default Hero;
