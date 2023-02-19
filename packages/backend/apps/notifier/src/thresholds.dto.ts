export type TickerValue = {
    ticker: string;
    values: number[];
}

export type Threshold = {
    type: string,
    data: Array<TickerValue>
}