import "./ExperienceItem.css";

function ExperienceItem({ company, role, period, bullets }) {
  return (
    <div className="experience-item">
      <div className="experience-item__header">
        <div>
          <h3 className="experience-item__role">{role}</h3>
          <p className="experience-item__company">{company}</p>
        </div>
        <span className="experience-item__period">{period}</span>
      </div>

        <ul className="experience-item__bullets">
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      </div>
  );
}
export default ExperienceItem