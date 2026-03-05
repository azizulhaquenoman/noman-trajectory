import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiBriefcase, FiAward } from 'react-icons/fi'

const About = ({ data }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { personalInfo, projects, experience } = data

  const stats = [
    { icon: <FiCode />, value: projects?.length || 0, label: 'Projects' },
    { icon: <FiBriefcase />, value: experience?.length || 0, label: 'Companies' },
    { icon: <FiAward />, value: `${experience?.length || 0}+`, label: 'Years Exp.' },
  ]

  return (
    <section id="about" className="py-20 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {personalInfo.bio}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-4 text-center">
                  <div className="text-cyan-400 text-2xl mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative flex justify-center"
          >
            {personalInfo.avatar ? (
              <div className="relative">
                {/* Glowing gradient ring */}
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full p-[3px] bg-gradient-to-br from-cyan-500 to-blue-500 shadow-xl shadow-cyan-500/20">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-900">
                    <img
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                {/* Subtle outer glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-2xl -z-10 scale-110" />
              </div>
            ) : (
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full p-[3px] bg-gradient-to-br from-cyan-500 to-blue-500 shadow-xl shadow-cyan-500/20">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-900 bg-slate-800 flex flex-col items-center justify-center gap-2">
                    <div className="text-6xl font-bold text-gradient">
                      {personalInfo.name?.split(' ').map(n => n[0]).join('') || '?'}
                    </div>
                    <p className="text-slate-500 text-xs px-4 text-center">Add your photo via the admin panel</p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-2xl -z-10 scale-110" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
