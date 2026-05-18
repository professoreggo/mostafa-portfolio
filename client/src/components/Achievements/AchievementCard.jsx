import './AchievementCard.css'

function AchievementCard({ place, title, location, year, image, description }) {
  return (
    <div className="achievement-card">

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
        <h3 className="achievement-card__title">{title + " 🏆 "+place+" Place "}</h3>
        <h3 className="achievement-card__description">{description}</h3>
        <div className="achievement-card__meta">
          <span className="achievement-card__location">
            📍 {location}
          </span>
          <span className="achievement-card__year">{year}</span>
        </div>
        
      </div>

    </div>
  )
}

export default AchievementCard