import ProjectCard from './ProjectCard';
import './Projects.css';

function Projects({projects}){
    return(
        <section className='projects' id='projects'>
            <div className='projects__container'>

                <h2 className='section__title'>Projects</h2>
                <div className='projects__grid'>
                    {projects.map(project=>(
                        <ProjectCard
                            key={project.key}
                            title={project.title}
                            description={project.description}
                            tags={project.tags}
                            company={project.company}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}export default Projects