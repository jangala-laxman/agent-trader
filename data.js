const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance();

async function getHistoricalData(symbol) {
  try {

    const result = await yahooFinance.chart(symbol, {
      period1: new Date("2025-01-01"),
      interval: "1d"
    });

    if (!result || !result.quotes || result.quotes.length === 0) {
      throw new Error(`Empty data returned for ${symbol}`);
    }

    return result.quotes;

  } catch (err) {

    console.log(`ERROR fetching ${symbol}`);
    console.log(err.message);

    throw err;
  }
}

module.exports = getHistoricalData;