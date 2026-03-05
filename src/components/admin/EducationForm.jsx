import { useState } from 'react'
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi'

const EducationForm = ({ data, onChange }) => {
  const [expandedId, setExpandedId] = useState(null)

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      institution: '',
      degree: '',
      year: '',
      description: ''
    }
    onChange([...data, newEdu])
    setExpandedId(newEdu.id)
  }

  const removeEducation = (id) => {
    onChange(data.filter(e => e.id !== id))
  }

  const updateEducation = (id, field, value) => {
    onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Education</h3>
        <button
          onClick={addEducation}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
        >
          <FiPlus /> Add Education
        </button>
      </div>

      <div className="space-y-3">
        {data?.map((edu) => (
          <div key={edu.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
              onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
            >
              <span className="text-white font-medium">
                {edu.degree || 'Untitled Degree'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); removeEducation(edu.id) }}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                >
                  <FiTrash2 size={16} />
                </button>
                {expandedId === edu.id ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
              </div>
            </div>

            {expandedId === edu.id && (
              <div className="p-4 pt-0 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Degree / Program</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="University of Technology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Year / Duration</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="2016 - 2020"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Description (optional)</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    placeholder="Notable achievements, GPA, etc."
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EducationForm
