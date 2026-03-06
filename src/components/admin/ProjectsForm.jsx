import { useState } from 'react'
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi'

const ProjectsForm = ({ data, onChange }) => {
  const [expandedId, setExpandedId] = useState(null)
  const [newTech, setNewTech] = useState('')

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      subtitle: '',
      description: '',
      image: '',
      technologies: [],
      liveUrl: '',
      githubUrl: ''
    }
    onChange([...data, newProject])
    setExpandedId(newProject.id)
  }

  const removeProject = (id) => {
    onChange(data.filter(p => p.id !== id))
  }

  const updateProject = (id, field, value) => {
    onChange(data.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const addTech = (id) => {
    if (!newTech.trim()) return
    onChange(data.map(p =>
      p.id === id ? { ...p, technologies: [...p.technologies, newTech.trim()] } : p
    ))
    setNewTech('')
  }

  const removeTech = (projectId, techIndex) => {
    onChange(data.map(p =>
      p.id === projectId
        ? { ...p, technologies: p.technologies.filter((_, i) => i !== techIndex) }
        : p
    ))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Projects</h3>
        <button
          onClick={addProject}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      <div className="space-y-3">
        {data?.map((project) => (
          <div key={project.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
            >
              <span className="text-white font-medium">
                {project.title || 'Untitled Project'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); removeProject(project.id) }}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                >
                  <FiTrash2 size={16} />
                </button>
                {expandedId === project.id ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
              </div>
            </div>

            {expandedId === project.id && (
              <div className="p-4 pt-0 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Project name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={project.subtitle || ''}
                    onChange={(e) => updateProject(project.id, 'subtitle', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Short subtitle for the project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    placeholder="Describe the project..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={project.image}
                    onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="https://example.com/project-image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Technologies</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="flex items-center gap-1 px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20">
                        {tech}
                        <button onClick={() => removeTech(project.id, i)} className="hover:text-red-400 transition-colors">
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
                      onKeyDown={(e) => e.key === 'Enter' && addTech(project.id)}
                      className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Add technology"
                    />
                    <button
                      onClick={() => addTech(project.id)}
                      className="px-3 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Live URL</label>
                    <input
                      type="url"
                      value={project.liveUrl}
                      onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={project.githubUrl}
                      onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="https://github.com/..."
                    />
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

export default ProjectsForm
