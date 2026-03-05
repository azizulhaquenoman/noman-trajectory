import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCalendar } from 'react-icons/fi'

const Experience = ({ experience }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-20 sm:py-32 relative">
      <div className="absolute inset-0 bg-slate-900/50" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-700 transform md:-translate-x-1/2" />

          {experience?.map((exp, index) => (
            <motion.div
              key={exp.id || index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * index }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="hidden md:block md:w-1/2" />

              <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-cyan-500 rounded-full transform md:-translate-x-1/2 translate-y-2 ring-4 ring-slate-900" />

              <div className="ml-6 md:ml-0 md:w-1/2 glass-card p-6 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-center gap-2 text-cyan-400 text-sm mb-2">
                  <FiCalendar />
                  <span>{exp.duration}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{exp.role}</h3>
                <p className="text-slate-400 font-medium mb-3">{exp.company}</p>
                <p className="text-slate-400 text-sm mb-3">{exp.description}</p>
                {exp.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
