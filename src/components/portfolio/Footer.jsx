import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi'

const Footer = ({ data }) => {
  const { personalInfo, contact } = data

  return (
    <footer className="py-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} {personalInfo?.name || 'Portfolio'}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {contact?.social?.github && (
              <a href={contact.social.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <FiGithub />
              </a>
            )}
            {contact?.social?.linkedin && (
              <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <FiLinkedin />
              </a>
            )}
            {contact?.social?.twitter && (
              <a href={contact.social.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
                <FiTwitter />
              </a>
            )}
          </div>

          <p className="text-slate-500 text-sm flex items-center gap-1">
            Built with <FiHeart className="text-red-500" /> using React
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
