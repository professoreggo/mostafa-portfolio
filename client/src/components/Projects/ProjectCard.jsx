import { useRef, useEffect } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./ProjectCard.css";

function ProjectCard({
  title,
  description,
  tags,
  company,
  index,
}) {
  const revealRef = useScrollReveal({ threshold: 0.2 });
  const cardRef = useRef(null);

  const mouse = useRef({ x: 50, y: 50 });
  const target = useRef({ x: 50, y: 50 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    target.current.x =
      ((e.clientX - rect.left) / rect.width) * 100;

    target.current.y =
      ((e.clientY - rect.top) / rect.height) * 100;
  }

  useEffect(() => {
    let animation;

    const animate = () => {
      // smooth mouse follow
      mouse.current.x +=
        (target.current.x - mouse.current.x) * 0.08;

      mouse.current.y +=
        (target.current.y - mouse.current.y) * 0.08;

      if (cardRef.current) {
        cardRef.current.style.setProperty(
          "--mouse-x",
          `${mouse.current.x}%`
        );

        cardRef.current.style.setProperty(
          "--mouse-y",
          `${mouse.current.y}%`
        );
      }

      animation = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animation);
  }, []);

  // left-to-right stagger
  const delayClass =
    index < 5 ? `reveal--delay-${index + 1}` : "";

  return (
    <div
      className={`project-card reveal ${delayClass}`}
      ref={(el) => {
        revealRef.current = el;
        cardRef.current = el;
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="project-card__body">
        <p className="project-card__company">
          {company}
        </p>

        <h3 className="project-card__title">
          {title}
        </h3>

        <p className="project-card__description">
          {description}
        </p>
      </div>

      <div className="project-card__footer">
        {tags.map((tag) => (
          <span
            key={tag}
            className="project-card__tag"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;