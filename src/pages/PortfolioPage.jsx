import usePortfolioData from '../hooks/usePortfolioData'
import Navbar from '../components/portfolio/Navbar'
import Hero from '../components/portfolio/Hero'
import About from '../components/portfolio/About'
import Skills from '../components/portfolio/Skills'
import Projects from '../components/portfolio/Projects'
import Experience from '../components/portfolio/Experience'
import Education from '../components/portfolio/Education'
import Contact from '../components/portfolio/Contact'
import Footer from '../components/portfolio/Footer'

const PortfolioPage = () => {
  const { data, loading, error } = usePortfolioData()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-slate-400">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-2">Failed to load portfolio data</p>
          <p className="text-slate-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar name={data.personalInfo?.name} />
      <Hero data={data} />
      <About data={data} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Experience experience={data.experience} />
      <Education education={data.education} />
      <Contact contact={data.contact} />
      <Footer data={data} />
    </div>
  )
}

export default PortfolioPage
