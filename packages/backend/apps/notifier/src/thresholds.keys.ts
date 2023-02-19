export const NONE = "[]";

export const ThresholdKey = {
    COINGECKO: 'tresholds.crypto.coingecko',
    IMOEX: 'tresholds.shares.ti.imoex',
    SPBE_HKD: 'tresholds.shares.ti.spbe_hkd',
};

export const getVal = (obj, key) => {
    return obj[key.toUpperCase()];
}

export const ThresholdType = {
    NONE: 'none',
    COINGECKO: 'crypto.coingecko',
    IMOEX: 'shares.imoex',
    SPBE_HKD: 'shares.spbe_hkd',
};

export type ThresholdKey = typeof ThresholdKey[keyof typeof ThresholdKey]
export type ThresholdType = typeof ThresholdType[keyof typeof ThresholdType]