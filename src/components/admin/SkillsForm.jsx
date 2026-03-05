import { useState } from 'react'
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi'

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('')
  const [activeGroup, setActiveGroup] = useState(0)

  const addCategory = () => {
    onChange([...data, { category: 'New Category', items: [] }])
    setActiveGroup(data.length)
  }

  const removeCategory = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
    if (activeGroup >= updated.length) setActiveGroup(Math.max(0, updated.length - 1))
  }

  const updateCategoryName = (index, name) => {
    const updated = [...data]
    updated[index] = { ...updated[index], category: name }
    onChange(updated)
  }

  const addSkill = (groupIndex) => {
    if (!newSkill.trim()) return
    const updated = [...data]
    updated[groupIndex] = {
      ...updated[groupIndex],
      items: [...updated[groupIndex].items, newSkill.trim()]
    }
    onChange(updated)
    setNewSkill('')
  }

  const removeSkill = (groupIndex, skillIndex) => {
    const updated = [...data]
    updated[groupIndex] = {
      ...updated[groupIndex],
      items: updated[groupIndex].items.filter((_, i) => i !== skillIndex)
    }
    onChange(updated)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Skills</h3>
        <button
          onClick={addCategory}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
        >
          <FiPlus /> Add Category
        </button>
      </div>

      {data?.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            {data.map((group, index) => (
              <button
                key={index}
                onClick={() => setActiveGroup(index)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  activeGroup === index
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                {group.category}
              </button>
            ))}
          </div>

          {data[activeGroup] && (
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={data[activeGroup].category}
                  onChange={(e) => updateCategoryName(activeGroup, e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Category name"
                />
                <button
                  onClick={() => removeCategory(activeGroup)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove category"
                >
                  <FiTrash2 />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {data[activeGroup].items?.map((skill, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/50 text-sm"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(activeGroup, i)}
                      className="text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill(activeGroup)}
                  className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Type a skill and press Enter"
                />
                <button
                  onClick={() => addSkill(activeGroup)}
                  className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default SkillsForm
