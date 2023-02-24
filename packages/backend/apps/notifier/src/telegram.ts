import { Telegraf } from 'telegraf';

export const TELEGRAM_BOT_ID = process.env.TELEGRAM_BOT_ID + ''
const bot: any = new Telegraf(process.env.TELEGRAM_TOKEN + '');
// https://telegrafjs.org/#/
delete process.env.TELEGRAM_BOT_ID;
delete process.env.TELEGRAM_TOKEN;

export default bot;