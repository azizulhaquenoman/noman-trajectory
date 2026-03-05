import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiGlobe,
  FiInstagram, FiFacebook, FiYoutube, FiFileText
} from 'react-icons/fi'

const socialIcons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  instagram: FiInstagram,
  facebook: FiFacebook,
  youtube: FiYoutube,
  dribbble: FiGlobe,
  behance: FiGlobe,
  website: FiGlobe,
}

const Contact = ({ contact }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const emails = contact?.emails?.filter(Boolean) || (contact?.email ? [contact.email] : [])
  const phones = contact?.phones?.filter(Boolean) || (contact?.phone ? [contact.phone] : [])

  return (
    <section id="contact" className="py-20 sm:py-32 relative">
      <div className="absolute inset-0 bg-slate-900/50" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-12" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — contact details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-slate-300 text-lg mb-8">
              I&apos;m always open to new opportunities and interesting projects.
              Feel free to reach out!
            </p>

            <div className="space-y-4">
              {emails.map((email, i) => (
                <a
                  key={i}
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 text-slate-400 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-12 h-12 glass-card flex items-center justify-center group-hover:border-cyan-500/50 transition-colors flex-shrink-0">
                    <FiMail className="text-xl" />
                  </div>
                  <span>{email}</span>
                </a>
              ))}

              {phones.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone}`}
                  className="flex items-center gap-4 text-slate-400 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-12 h-12 glass-card flex items-center justify-center group-hover:border-cyan-500/50 transition-colors flex-shrink-0">
                    <FiPhone className="text-xl" />
                  </div>
                  <span>{phone}</span>
                </a>
              ))}

              {contact?.location && (
                <div className="flex items-center gap-4 text-slate-400">
                  <div className="w-12 h-12 glass-card flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-xl" />
                  </div>
                  <span>{contact.location}</span>
                </div>
              )}

              {(contact?.resumeUrl || contact?.cvUrl) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {contact.resumeUrl && (
                    <a
                      href={contact.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors text-sm font-medium"
                    >
                      <FiFileText /> Resume
                    </a>
                  )}
                  {contact.cvUrl && (
                    <a
                      href={contact.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors text-sm font-medium"
                    >
                      <FiFileText /> CV
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right — social links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-3">
                {contact?.social && Object.entries(contact.social).map(([platform, url]) => {
                  if (!url) return null
                  const Icon = socialIcons[platform] || FiGlobe
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 transition-all duration-200"
                    >
                      <Icon className="text-xl flex-shrink-0" />
                      <span className="capitalize text-sm font-medium truncate">{platform}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
