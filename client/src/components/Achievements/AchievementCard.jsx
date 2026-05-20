import { useRef, useEffect } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./AchievementCard.css";

function AchievementCard({
  place,
  title,
  location,
  year,
  image,
  description,
  index,
}) {
  const revealRef = useScrollReveal({ threshold: 0.25 });
  const cardRef = useRef(null);

  const mouse = useRef({ x: 50, y: 50 });
  const target = useRef({ x: 50, y: 50 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    target.current.x = ((e.clientX - rect.left) / rect.width) * 100;

    target.current.y = ((e.clientY - rect.top) / rect.height) * 100;
  }

  useEffect(() => {
    let animation;

    const animate = () => {
      // smooth mouse follow
      mouse.current.x += (target.current.x - mouse.current.x) * 0.08;

      mouse.current.y += (target.current.y - mouse.current.y) * 0.08;

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

  const delayClass = index < 5 ? `reveal--delay-${index + 1}` : "";

  return (
    <div
      className={`achievement-card reveal ${delayClass}`}
      ref={(el) => {
        revealRef.current = el;
        cardRef.current = el;
      }}
      onMouseMove={handleMouseMove}
    >
      {image && (
        <div className="achievement-card__image-wrapper">
          <img
            src={image}
            alt={title}
            className="achievement-card__image"
          />
        </div>
      )}

      <div className="achievement-card__body">
        <h3 className="achievement-card__title">
          {title + " 🏆 " + place + " Place "}
        </h3>

        <h3 className="achievement-card__description">
          {description}
        </h3>

        <div className="achievement-card__meta">
          <span className="achievement-card__location">
            📍 {location}
          </span>

          <span className="achievement-card__year">
            {year}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AchievementCard;