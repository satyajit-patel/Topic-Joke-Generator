const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const Groq = require('groq-sdk');

app.use(express.json());
app.use(express.static('dist'))
app.use(cors()); // no need when dist folder is present



const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

async function getJoke(topic) {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "You are a witty humorist who crafts short, simple, and clever jokes using everyday language. Your jokes should have a clean setup and a sharp, unexpected punchline that delivers the 'last laugh.' Keep the wording minimal, avoiding complexity while ensuring the joke lands well. When the user provides a topic, generate a joke that fits this style."
      },
      {
        "role": "user",
        "content": `Tell me a joke about ${topic}.`
      }
    ],
    "model": "mixtral-8x7b-32768",
    "temperature": 0.05,
    "max_completion_tokens": 1040,
    "top_p": 1,
    "stream": false
  });

  return chatCompletion.choices[0]?.message?.content || "No joke found!";
}

app.post("/api/v1/get-joke", async (req, res) => {
    const topic = req.body.topic;
    const joke = await getJoke(topic);
    res.json({joke});
});

app.use("/api/ping", (req, res) => {
  res.send("Server is UP");
});

// avoid when dist folder is present
// app.use("/", (req, res) => {
//     res.send("Server is UP");
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
