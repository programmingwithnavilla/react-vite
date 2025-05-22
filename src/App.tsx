import React, { useState } from 'react'
import type { Task } from './types/'
import TaskItem from './components/task-item'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim() === '') return
    const task: Task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    }
    setTasks([...tasks, task])
    setNewTask('')
  }

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Task Manager</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
