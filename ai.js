const axios = require("axios");

async function askQwen(prompt) {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "qwen3:4b",
      prompt,
      stream: false
    }
  );

  return response.data.response;
}

module.exports = askQwen;