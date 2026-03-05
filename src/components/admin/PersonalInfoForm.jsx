const PersonalInfoForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
        <input
          type="text"
          value={data?.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Job Title</label>
        <input
          type="text"
          value={data?.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          placeholder="Full Stack Developer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Subtitle / Tagline</label>
        <input
          type="text"
          value={data?.subtitle || ''}
          onChange={(e) => handleChange('subtitle', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          placeholder="Building digital experiences that matter"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Bio / About</label>
        <textarea
          value={data?.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
          rows={4}
          className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          placeholder="Write a short bio about yourself..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Avatar URL</label>
        <input
          type="url"
          value={data?.avatar || ''}
          onChange={(e) => handleChange('avatar', e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          placeholder="https://example.com/your-photo.jpg"
        />
      </div>

      <p className="text-xs text-slate-500">Resume &amp; CV links can be added in the <span className="text-cyan-400">Contact</span> tab.</p>
    </div>
  )
}

export default PersonalInfoForm
