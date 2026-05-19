import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Achievements from './components/Achievements/Achievement'
import data from "./data/portfolio.json";

function App() {
  return (
    <div>
      <Navbar />
      <Hero
        name={data.personal.name}
        title={data.personal.title}
        summary={data.personal.summary}
        skills={data.skills.map(s => s.name)}
      />
      <Experience experience={data.experience} />
      <Achievements achievements={data.achievements} />
      <Projects projects={data.projects} />
      <Skills skills={data.skills} />
      <Contact email={data.personal.email} />
    </div>
  );
}
export default App;
