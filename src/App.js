import React, { useState, useEffect } from 'react'
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories')
      
      setRepositories(response.data)
    }
    loadRepositories()
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories', 
      {
        "title": "Desafio Jovem Jedi",
        "url": "https://github.com/jrbytes/desafio-conceitos-reactjs",
        "techs": ["React Native"]
      })
      
      setRepositories([...repositories, response.data])
    } catch (error) {
      console.log(error)      
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`)
      console.log(response)
      setRepositories(repositories.filter(repo => repo.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(item => { 
            const {id, title} = item
            return (
            <li key={id}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          )})
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App