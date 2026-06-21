const { RSI, EMA, MACD } = require("technicalindicators");

function calculateIndicators(data) {
  const latest = data[data.length - 1];

  const closeNearHigh =
    (latest.close - latest.low) / (latest.high - latest.low);

  const highs = data.map(x=>x.high);
const lows = data.map(x=>x.low);
  const closes = data.map((x) => x.close);
  const volumes = data.map((x) => x.volume);
  const bullishCandle = latest.close > latest.open;
  const rsi = RSI.calculate({
    values: closes,
    period: 14,
  });

  const atr =
    ATR.calculate({
        high: highs,
        low: lows,
        close: closes,
        period: 14
    });

const latestATR =
    atr[atr.length-1];

  const momentum = ((latest.close - latest.open) / latest.open) * 100;

  const ema20 = EMA.calculate({
    values: closes,
    period: 20,
  });

  const ema50 = EMA.calculate({
    values: closes,
    period: 50,
  });

  const macd = MACD.calculate({
    values: closes,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });

  const avgVolume = volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;

  const latestVolume = volumes[volumes.length - 1];

  return {
    rsi: rsi[rsi.length - 1],
    ema20: ema20[ema20.length - 1],
    ema50: ema50[ema50.length - 1],
    macd: macd[macd.length - 1],
    volumeBreakout: latestVolume > avgVolume * 1.5,
    closeNearHigh,
    bullishCandle,
    momentum,
    previousHistogram:
        macd[macd.length-2]?.histogram || 0,
  };
}

module.exports = calculateIndicators;
