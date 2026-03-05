import { FiPlus, FiTrash2, FiFileText } from 'react-icons/fi'

const socialPlatforms = [
  { key: 'github',    label: 'GitHub',          placeholder: 'https://github.com/username' },
  { key: 'linkedin',  label: 'LinkedIn',        placeholder: 'https://linkedin.com/in/username' },
  { key: 'twitter',   label: 'Twitter / X',     placeholder: 'https://twitter.com/username' },
  { key: 'instagram', label: 'Instagram',       placeholder: 'https://instagram.com/username' },
  { key: 'facebook',  label: 'Facebook',        placeholder: 'https://facebook.com/username' },
  { key: 'youtube',   label: 'YouTube',         placeholder: 'https://youtube.com/@channel' },
  { key: 'dribbble',  label: 'Dribbble',        placeholder: 'https://dribbble.com/username' },
  { key: 'behance',   label: 'Behance',         placeholder: 'https://behance.net/username' },
  { key: 'website',   label: 'Personal Website', placeholder: 'https://yourwebsite.com' },
]

const ContactForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const handleSocialChange = (platform, value) => {
    onChange({ ...data, social: { ...data.social, [platform]: value } })
  }

  const addEmail = () => onChange({ ...data, emails: [...(data?.emails || []), ''] })
  const updateEmail = (i, value) => {
    const emails = [...(data?.emails || [])]
    emails[i] = value
    onChange({ ...data, emails })
  }
  const removeEmail = (i) => onChange({ ...data, emails: (data?.emails || []).filter((_, idx) => idx !== i) })

  const addPhone = () => onChange({ ...data, phones: [...(data?.phones || []), ''] })
  const updatePhone = (i, value) => {
    const phones = [...(data?.phones || [])]
    phones[i] = value
    onChange({ ...data, phones })
  }
  const removePhone = (i) => onChange({ ...data, phones: (data?.phones || []).filter((_, idx) => idx !== i) })

  const inputClass = 'w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors'

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Contact Information</h3>

      {/* Emails */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-slate-300">Email Address(es)</label>
          <button
            onClick={addEmail}
            className="flex items-center gap-1 px-2.5 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
          >
            <FiPlus size={12} /> Add Email
          </button>
        </div>
        <div className="space-y-2">
          {(data?.emails || []).map((email, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => updateEmail(i, e.target.value)}
                className={inputClass}
                placeholder="hello@example.com"
              />
              {(data?.emails || []).length > 1 && (
                <button onClick={() => removeEmail(i)} className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg border border-slate-600 transition-colors">
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Phones */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-slate-300">Phone Number(s)</label>
          <button
            onClick={addPhone}
            className="flex items-center gap-1 px-2.5 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
          >
            <FiPlus size={12} /> Add Phone
          </button>
        </div>
        <div className="space-y-2">
          {(data?.phones || []).map((phone, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => updatePhone(i, e.target.value)}
                className={inputClass}
                placeholder="+1 (555) 000-0000"
              />
              {(data?.phones || []).length > 1 && (
                <button onClick={() => removePhone(i)} className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg border border-slate-600 transition-colors">
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
        <input
          type="text"
          value={data?.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          className={inputClass}
          placeholder="San Francisco, CA"
        />
      </div>

      <hr className="border-slate-700" />

      {/* Documents */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FiFileText className="text-cyan-400" />
          <h4 className="text-sm font-semibold text-slate-200">Documents</h4>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Resume URL</label>
            <input
              type="url"
              value={data?.resumeUrl || ''}
              onChange={(e) => handleChange('resumeUrl', e.target.value)}
              className={inputClass}
              placeholder="https://drive.google.com/your-resume"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">CV URL</label>
            <input
              type="url"
              value={data?.cvUrl || ''}
              onChange={(e) => handleChange('cvUrl', e.target.value)}
              className={inputClass}
              placeholder="https://drive.google.com/your-cv"
            />
          </div>
        </div>
      </div>

      <hr className="border-slate-700" />

      {/* Social Links */}
      <div>
        <h4 className="text-sm font-semibold text-slate-200 mb-3">Social & Professional Links</h4>
        <div className="space-y-3">
          {socialPlatforms.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
              <input
                type="url"
                value={data?.social?.[key] || ''}
                onChange={(e) => handleSocialChange(key, e.target.value)}
                className={inputClass}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactForm
