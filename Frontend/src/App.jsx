import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [joke, setJoke] = useState("");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setJoke("");
    try {
      const response = await axios.post(`${VITE_BACKEND_URL}/api/v1/get-joke`, {
        topic,
      });
      setJoke(response.data.joke);
    } catch (error) {
      setJoke("Failed to fetch joke. Try again!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    async function wakeUPCall() {
      try {
        await axios.post(`${VITE_BACKEND_URL}/api/v1/get-joke`, { topic });
      } catch (error) {
        console.error("Backend wake-up call failed", error);
      }
    }
    wakeUPCall();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#121212",
        color: "#fff",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#1e1e1e",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.1)",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ marginBottom: "15px", fontSize: "22px", color: "#ffcc00" }}>
          Write a Topic | Get a Joke
        </h1>
        <input
          type="text"
          required
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your Topic"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #333",
            backgroundColor: "#222",
            color: "#fff",
            marginBottom: "12px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#ffcc00",
            color: "#121212",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e6b800")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ffcc00")}
        >
          {isLoading ? "Loading.." : "Submit"}
        </button>
      </form>
      {joke && (
        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: "400px",
            color: "#ffcc00",
          }}
        >
          {joke}
        </p>
      )}
    </div>
  );
}

export default App;
