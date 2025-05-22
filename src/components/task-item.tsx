import React from 'react'
import type { Task } from '../types'

interface Props {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  return (
    <li
      style={{
        padding: '0.5rem',
        border: '1px solid #ccc',
        marginBottom: '0.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: task.completed ? '#e0ffe0' : '#fff',
      }}
    >
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          cursor: 'pointer',
        }}
        onClick={() => onToggle(task.id)}
      >
        {task.title}
      </span>
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: '1rem' }}>
        Delete
      </button>
    </li>
  )
}

export default TaskItem
