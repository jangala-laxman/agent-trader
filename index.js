require("dotenv").config();
const axios = require("axios");

async function testDeepSeek() {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1",
        messages: [
          {
            role: "user",
            content:
              "Analyze this stock. RSI=62 EMA20=150 EMA50=145 Volume breakout=true"
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data.choices[0].message.content);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

testDeepSeek();