import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiCode, FiFolder, FiBriefcase, FiBookOpen, FiMail, FiSave, FiEye, FiCheck, FiAlertCircle } from 'react-icons/fi'
import PersonalInfoForm from '../components/admin/PersonalInfoForm'
import SkillsForm from '../components/admin/SkillsForm'
import ProjectsForm from '../components/admin/ProjectsForm'
import ExperienceForm from '../components/admin/ExperienceForm'
import EducationForm from '../components/admin/EducationForm'
import ContactForm from '../components/admin/ContactForm'

const tabs = [
  { id: 'personal', label: 'Personal Info', icon: FiUser },
  { id: 'skills', label: 'Skills', icon: FiCode },
  { id: 'projects', label: 'Projects', icon: FiFolder },
  { id: 'experience', label: 'Experience', icon: FiBriefcase },
  { id: 'education', label: 'Education', icon: FiBookOpen },
  { id: 'contact', label: 'Contact', icon: FiMail },
]

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)
  const isDev = import.meta.env.DEV

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/portfolio')
      if (!res.ok) throw new Error('Server not running')
      const json = await res.json()
      setData(json)
    } catch {
      // Fallback: try loading from static file
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/portfolioData.json`)
        if (res.ok) {
          const json = await res.json()
          setData(json)
        }
      } catch {
        setData(getEmptyData())
      }
    } finally {
      setLoading(false)
    }
  }

  const saveData = async () => {
    if (!isDev) {
      setStatus({ type: 'error', message: 'Saving is only available in local development mode. Run: npm run dev:all' })
      return
    }
    try {
      setSaving(true)
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Failed to save')
      setStatus({ type: 'success', message: 'Saved successfully!' })
    } catch {
      setStatus({ type: 'error', message: 'Failed to save. Make sure the server is running: npm run server' })
    } finally {
      setSaving(false)
      setTimeout(() => setStatus(null), 4000)
    }
  }

  const updateField = (section, value) => {
    setData(prev => ({ ...prev, [section]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 glass border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gradient">Admin Panel</h1>
            {!isDev && (
              <span className="px-2 py-0.5 text-xs bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/20">
                Read-only (not in dev mode)
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
            >
              <FiEye /> View Portfolio
            </Link>
            <button
              onClick={saveData}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50"
            >
              <FiSave /> {saving ? 'Saving...' : 'Save All'}
            </button>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {status && (
        <div className={`max-w-7xl mx-auto px-4 mt-4`}>
          <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm ${
            status.type === 'success'
              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {status.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
            {status.message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-56 flex-shrink-0">
            <nav className="space-y-1 md:sticky md:top-20">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="glass-card p-6 sm:p-8">
              {activeTab === 'personal' && (
                <PersonalInfoForm
                  data={data?.personalInfo}
                  onChange={(val) => updateField('personalInfo', val)}
                />
              )}
              {activeTab === 'skills' && (
                <SkillsForm
                  data={data?.skills || []}
                  onChange={(val) => updateField('skills', val)}
                />
              )}
              {activeTab === 'projects' && (
                <ProjectsForm
                  data={data?.projects || []}
                  onChange={(val) => updateField('projects', val)}
                />
              )}
              {activeTab === 'experience' && (
                <ExperienceForm
                  data={data?.experience || []}
                  onChange={(val) => updateField('experience', val)}
                />
              )}
              {activeTab === 'education' && (
                <EducationForm
                  data={data?.education || []}
                  onChange={(val) => updateField('education', val)}
                />
              )}
              {activeTab === 'contact' && (
                <ContactForm
                  data={data?.contact}
                  onChange={(val) => updateField('contact', val)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getEmptyData() {
  return {
    personalInfo: { name: '', title: '', subtitle: '', bio: '', avatar: '', resumeUrl: '' },
    skills: [],
    projects: [],
    experience: [],
    education: [],
    contact: { email: '', phone: '', location: '', social: { github: '', linkedin: '', twitter: '', website: '' } }
  }
}

export default AdminPage
