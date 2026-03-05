import { useState } from 'react'
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi'

const ExperienceForm = ({ data, onChange }) => {
  const [expandedId, setExpandedId] = useState(null)
  const [newTech, setNewTech] = useState('')

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: '',
      role: '',
      duration: '',
      description: '',
      technologies: []
    }
    onChange([...data, newExp])
    setExpandedId(newExp.id)
  }

  const removeExperience = (id) => {
    onChange(data.filter(e => e.id !== id))
  }

  const updateExperience = (id, field, value) => {
    onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  const addTech = (id) => {
    if (!newTech.trim()) return
    onChange(data.map(e =>
      e.id === id ? { ...e, technologies: [...e.technologies, newTech.trim()] } : e
    ))
    setNewTech('')
  }

  const removeTech = (expId, techIndex) => {
    onChange(data.map(e =>
      e.id === expId
        ? { ...e, technologies: e.technologies.filter((_, i) => i !== techIndex) }
        : e
    ))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Work Experience</h3>
        <button
          onClick={addExperience}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
        >
          <FiPlus /> Add Experience
        </button>
      </div>

      <div className="space-y-3">
        {data?.map((exp) => (
          <div key={exp.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            >
              <div>
                <span className="text-white font-medium">
                  {exp.role || 'Untitled Role'}
                </span>
                {exp.company && (
                  <span className="text-slate-500 ml-2">@ {exp.company}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); removeExperience(exp.id) }}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                >
                  <FiTrash2 size={16} />
                </button>
                {expandedId === exp.id ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
              </div>
            </div>

            {expandedId === exp.id && (
              <div className="p-4 pt-0 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Role / Position</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Senior Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Tech Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="2022 - Present"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    placeholder="Describe your role and achievements..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Technologies Used</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {exp.technologies?.map((tech, i) => (
                      <span key={i} className="flex items-center gap-1 px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20">
                        {tech}
                        <button onClick={() => removeTech(exp.id, i)} className="hover:text-red-400 transition-colors">
                          <FiX size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addTech(exp.id)}
                      className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Add technology"
                    />
                    <button
                      onClick={() => addTech(exp.id)}
                      className="px-3 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceForm
