import './ProjectCard.css';

function ProjectCard({ title, description, tags, company }){
    return(
        <div className='project-card'>

            <div className='project-card__body'>
                <p className='project-card__company'>{company}</p>
                <h3 className='project-card__title'>{title}</h3>
                <p className='project-card__description'>{description}</p>
            </div>

            <div className='project-card__fotter'>
                {
                    tags.map(tag=>(
                        <span key={tag} className='project-card__tag'>
                            {tag}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}export default ProjectCard