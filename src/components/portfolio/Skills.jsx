import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Skills = ({ skills }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-20 sm:py-32 relative">
      <div className="absolute inset-0 bg-slate-900/50" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills?.map((skillGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * groupIndex }}
              className="glass-card p-6 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
