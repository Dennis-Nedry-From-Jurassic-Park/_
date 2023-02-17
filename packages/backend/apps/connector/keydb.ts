import { createClient } from 'redis';

export const keydb_client: any = createClient();

keydb_client.on('error', (err) => console.log('KeyDB Client Error: ', err));

keydb_client.connect().catch(err => console.log(err));