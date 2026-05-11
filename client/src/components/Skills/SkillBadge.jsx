import './SkillBadge.css'

function SkillBadge({ name, category }) {
  return (
    <span className={`skill-badge skill-badge--${category}`}>
      {name}
    </span>
  )
}

export default SkillBadge