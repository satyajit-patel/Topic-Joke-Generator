import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [joke, setJoke] = useState('');
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setJoke('');
    const response = await axios.post('/api/v1/get-joke', {topic});
    setIsLoading(false);
    setJoke(response.data.joke);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Write a Topic | Get a joke</h1>
        <input 
          type="text" 
          required 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your Topic" 
        />
        <button>{isLoading ? "Loading.." : "Submit"}</button>
      </form>
      <p>{joke}</p>
    </div>
  )
}

export default App
