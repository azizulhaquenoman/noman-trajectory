import { motion } from 'framer-motion'
import { FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

const Hero = ({ data }) => {
  const { personalInfo, contact } = data

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-cyan-400 font-mono text-sm sm:text-base mb-4">
            Hello, I&apos;m
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-gradient">{personalInfo.name}</span>
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-300 font-light mb-6">
            {personalInfo.title}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg mb-8">
            {personalInfo.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-6 py-3 border border-slate-600 rounded-lg font-medium text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-6"
        >
          {contact?.social?.github && (
            <a href={contact.social.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors text-xl">
              <FiGithub />
            </a>
          )}
          {contact?.social?.linkedin && (
            <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors text-xl">
              <FiLinkedin />
            </a>
          )}
          {contact?.social?.twitter && (
            <a href={contact.social.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors text-xl">
              <FiTwitter />
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 flex justify-center"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-slate-500 hover:text-cyan-400 transition-colors animate-bounce inline-block"
          >
            <FiArrowDown className="text-2xl" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
