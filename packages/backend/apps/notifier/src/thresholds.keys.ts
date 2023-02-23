export const NONE = "[]";

export const Source = {
    coingecko: 'coingecko',
    imoex: 'imoex',
    spbe_hkd: 'spbe_hkd',
}

export const ThresholdKey = {
    COINGECKO: 'tresholds.crypto.coingecko',
    IMOEX: 'tresholds.shares.ti.imoex',
    SPBE_HKD: 'tresholds.shares.ti.spbe_hkd',
};

export const getVal = (obj, key) => {
    return obj[key.toUpperCase()];
}

export const ThresholdDir = {
    above: 'above',
    below: 'below',
}
export const ThresholdType = {
    NONE: 'none',
    COINGECKO: 'crypto.coingecko',
    IMOEX: 'shares.imoex',
    SPBE_HKD: 'shares.spbe_hkd',
};

export type NotifierMap = Map<string, {
    price: number,
    thresholds: number[],
    oldIndex: number,
    newIndex: number,
}>

export type Source = typeof Source[keyof typeof Source]
export type ThresholdKey = typeof ThresholdKey[keyof typeof ThresholdKey]
export type ThresholdType = typeof ThresholdType[keyof typeof ThresholdType]