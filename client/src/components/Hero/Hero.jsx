import { useRef, useEffect } from "react";
import "./Hero.css";
import Typewriter from "./Typewriter";

function Hero({ name, title, summary, skills }) {
  const heroRef = useRef(null);

  const mouse = useRef({ x: 50, y: 50 });
  const target = useRef({ x: 50, y: 50 });

  function handleMouseMove(e) {
    const rect = heroRef.current.getBoundingClientRect();

    target.current.x = ((e.clientX - rect.left) / rect.width) * 100;
    target.current.y = ((e.clientY - rect.top) / rect.height) * 100;
  }

  useEffect(() => {
    let animation;

    const animate = () => {
      // smooth follow (the magic)
      mouse.current.x += (target.current.x - mouse.current.x) * 0.08;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.08;

      if (heroRef.current) {
        heroRef.current.style.setProperty("--mouse-x", `${mouse.current.x}%`);
        heroRef.current.style.setProperty("--mouse-y", `${mouse.current.y}%`);
      }

      animation = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero"
      id="about"
      onMouseMove={handleMouseMove}
    >
      <div className="hero__content">
        <p className="hero__greeting">Hi, I'm</p>
        <h1 className="hero__name">{name}</h1>
        <h2 className="hero__title">{title}</h2>
        <p className="hero__summary">{summary}</p>
        <Typewriter words={skills} />
        <div className="hero__actions">
          <a
            href="https://www.linkedin.com/in/mostafa-tarek-abdeljawad/"
            className="btn btn--primary"
          >
            LinkedIn
          </a>
          <a href="#contact" className="btn btn--secondary">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
