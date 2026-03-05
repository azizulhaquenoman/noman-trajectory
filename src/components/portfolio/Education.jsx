import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBookOpen } from 'react-icons/fi'

const Education = ({ education }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-20 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {education?.map((edu, index) => (
            <motion.div
              key={edu.id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glass-card p-6 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <FiBookOpen className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{edu.degree}</h3>
                  <p className="text-cyan-400 font-medium mb-1">{edu.institution}</p>
                  <p className="text-slate-500 text-sm mb-2">{edu.year}</p>
                  {edu.description && (
                    <p className="text-slate-400 text-sm">{edu.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
