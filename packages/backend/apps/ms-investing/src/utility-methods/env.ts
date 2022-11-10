import {getAppRootDir} from "./file";

import * as dotenv from 'dotenv'

const rootDir = getAppRootDir();

dotenv.config({ path: rootDir+'/.env', debug: true });

const secrets = {
	telegramToken: process.env.TELEGRAM_TOKEN,
	telegramInvestingBotId: process.env.TELEGRAM_INVESTING_BOT_ID,

	finnhubKeyApi: process.env.FINNHUB_KEY_API
};

export default secrets;
