// src/App.js
import React, { useState } from 'react';
import './App.css';
import { FaEdit, FaTrash, FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const addTask = () => {
    if (title && description) {
      const newTask = { title, description };
      if (editIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? newTask : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, newTask]);
      }
      setTitle('');
      setDescription('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setEditIndex(index);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>To-Do List</h1>
      <div className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? <FaSun className="icon bold-icon" /> : <FaMoon className="icon bold-icon" />}
      </div>
      <div className="input-container">
        <label htmlFor="title">TITLE</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <label htmlFor="description">DESCRIPTION</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
        <button onClick={addTask}>{editIndex !== null ? 'Update' : 'Add'} Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <div className="task-content">
              <h2 className="task-title">{task.title}</h2>
              <p className="task-description">{task.description}</p>
            </div>
            <div className="icons">
              <FaEdit onClick={() => editTask(index)} className="icon bold-icon" />
              <FaTrash onClick={() => removeTask(index)} className="icon bold-icon" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;