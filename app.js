const askQwen = require("./ai");
const getHistoricalData = require("./data");
const calculateIndicators = require("./indicators");
const analyzeStock = require("./analyze");
const calculateBTSTScore = require("./score");
const stocks = require("./universe");
const analyzeTopStocks = require("./analyze");

async function run() {
  const results = [];

  for (const stock of stocks) {
    try {
      console.log(`Fetching: ${stock}`);

      const data = await getHistoricalData(stock);

      console.log(`SUCCESS: ${stock} (${data.length} candles)`);

      if (!data || data.length === 0) {
        console.log(`No data: ${stock}`);
        continue;
      }

      const indicators = calculateIndicators(data);

      const latestClose = data[data.length - 1].close;

      const entry = latestClose;

      const stopLoss = +(entry * 0.98).toFixed(2);

      const risk = entry - stopLoss;

      const target = +(entry + risk * 2).toFixed(2);
      const stopLoss =
    +(entry - latestATR * 1.5).toFixed(2);
      let score = 0;

      if (indicators.rsi > 50) score += 2;
      if (indicators.ema20 > indicators.ema50) score += 3;
      if (indicators.macd.histogram > 0) score += 2;
      if (indicators.volumeBreakout) score += 2;
      if (indicators.rsi > 55 && indicators.rsi < 70) score += 2;
      if (latestClose > indicators.ema20) score += 1;
      if (indicators.macd.histogram > indicators.previousHistogram) {
        score += 1;
      }

      results.push({
        stock,
        score,
        rsi: indicators.rsi,
        ema20: indicators.ema20,
        ema50: indicators.ema50,
        volumeBreakout: indicators.volumeBreakout,
        macdHistogram: indicators.macd.histogram,
        entry,
        stopLoss,
        target,
      });
      // your indicator logic
    } catch (err) {
      console.log(`FAILED: ${stock}`);
      console.log(err.message);
      continue;
    }
  }

  results.sort((a, b) => b.score - a.score);

  const topStocks = results.slice(0, 3);

  console.log("\n===== TOP BTST CANDIDATES =====\n");

  topStocks.forEach((stock) => {
    console.log(`
Stock: ${stock.stock}
Score: ${stock.score}
RSI: ${stock.rsi.toFixed(2)}

Entry: ${stock.entry}
Stop Loss: ${stock.stopLoss}
Target: ${stock.target}

Volume Breakout: ${stock.volumeBreakout}
MACD Histogram: ${stock.macdHistogram.toFixed(2)}
----------------------------------
`);
  });
  const analysis = await analyzeTopStocks(topStocks);

  console.log("\n===== QWEN ANALYSIS =====\n");

  console.log(analysis);
}

run();
