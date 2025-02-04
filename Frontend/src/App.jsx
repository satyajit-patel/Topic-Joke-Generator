import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [joke, setJoke] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setJoke('');
    // const response = await axios.post('http://localhost:3000/api/v1/data', {inputValue});
    const URL = import.meta.env.VITE_URL;
    // console.log(URL);
    const response = await axios.post(`${URL}/api/v1/data`, {inputValue});
    setIsLoading(false);
    console.log(response.data);
    setJoke(response.data.joke);
  }

  return (
    <div style={{backgroundColor: "slate"}}>
      <form onSubmit={handleSubmit}>
        <h1>Write a Topic | Get a joke</h1>
        <input 
          type="text" 
          required 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your Topic" 
        />
        <button>Submit</button>
      </form>
      <p>{joke}</p>
      {isLoading && <p>Loading please wait..</p>}
    </div>
  )
}

export default App
