function calculateBTSTScore(indicators) {

    let score = 0;

    if (indicators.rsi > 60)
        score += 2;

    if (indicators.ema20 > indicators.ema50)
        score += 2;

    if (indicators.macd.histogram > 0)
        score += 2;

    if (indicators.volumeBreakout)
        score += 3;

    return score;
}

module.exports = calculateBTSTScore;