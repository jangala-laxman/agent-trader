const askQwen = require("./ai");

async function analyzeTopStocks(topStocks) {

    const prompt = `
You are a professional NSE BTST trader.

Analyze the following stocks.

${JSON.stringify(topStocks, null, 2)}

Rules:

- Use ONLY the data provided.
- Do NOT invent support levels.
- Do NOT invent moving averages.
- Compare RSI, EMA trend, MACD and Volume.

Return:

1. Best Stock
2. Confidence (1-10)
3. Why
4. Risk
5. BTST Verdict

`;

    return await askQwen(prompt);
}

module.exports = analyzeTopStocks;