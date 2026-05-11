import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import data from "./data/portfolio.json";

function App() {
  return (
    <div>
      <Navbar />
      <Hero
        name={data.personal.name}
        title={data.personal.title}
        summary={data.personal.summary}
      />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
    </div>
  );
}
export default App;
