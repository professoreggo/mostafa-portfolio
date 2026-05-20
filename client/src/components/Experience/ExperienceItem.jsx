import { useRef, useEffect } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./ExperienceItem.css";

function ExperienceItem({
  company,
  role,
  period,
  bullets,
  logo,
  image,
  index,
}) {
  const revealRef = useScrollReveal({ threshold: 0.25 });
  const experienceRef = useRef(null);

  const mouse = useRef({ x: 50, y: 50 });
  const target = useRef({ x: 50, y: 50 });

  function handleMouseMove(e) {
    if (!experienceRef.current) return;

    const rect = experienceRef.current.getBoundingClientRect();

    target.current.x = ((e.clientX - rect.left) / rect.width) * 100;
    target.current.y = ((e.clientY - rect.top) / rect.height) * 100;
  }

  useEffect(() => {
    let animation;

    const animate = () => {
      // smooth mouse follow
      mouse.current.x += (target.current.x - mouse.current.x) * 0.08;
      mouse.current.y += (target.current.y - mouse.current.y) * 0.08;

      if (experienceRef.current) {
        experienceRef.current.style.setProperty(
          "--mouse-x",
          `${mouse.current.x}%`
        );

        experienceRef.current.style.setProperty(
          "--mouse-y",
          `${mouse.current.y}%`
        );
      }

      animation = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animation);
  }, []);

  const delayClass = index < 5 ? `reveal--delay-${index + 1}` : "";

  return (
    <div
      className={`experience-item reveal ${delayClass}`}
      ref={(el) => {
        revealRef.current = el;
        experienceRef.current = el;
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="experience-item__body">
        <div className="experience-item__header">
          {logo && (
            <div className="experience-item__logo-wrapper">
              <img
                src={logo}
                alt={`${company} logo`}
                className="experience-item__logo"
              />
            </div>
          )}

          <div className="experience-item__info">
            <h3 className="experience-item__role">{role}</h3>
            <p className="experience-item__company">{company}</p>
          </div>

          <span className="experience-item__period">
            {period}
          </span>
        </div>

        <ul className="experience-item__bullets">
          {bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>

      {image && (
        <div className="experience-item__image-wrapper">
          <img
            src={image}
            alt={`${company} workplace`}
            className="experience-item__image"
          />
        </div>
      )}
    </div>
  );
}

export default ExperienceItem;