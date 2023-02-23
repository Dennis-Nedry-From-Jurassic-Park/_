export type Alert = {
    dir: string,
    val: number,
}
export type TickerAlert = {
    ticker: string,
    alerts: Alert[],
}

export type Threshold = {
    type: string,
    data: Array<TickerAlert>
}

export type TickerPrice = { "ticker": string, "price": number }
export type TickerThreshold = { "ticker": string, "thresholds": number[] }
