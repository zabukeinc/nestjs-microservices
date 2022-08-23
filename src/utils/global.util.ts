export const PORT = 3000;

export const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';
export const KAFKA_RETRIES = process.env.KAFKA_RETRIES || 100000;
export const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || 'hope-service';
export const KAFKA_GROUP_ID = process.env.GROUP_ID || 'hope-consumer';
export const KAFKA_NAME = process.env.KAFKA_NAME || 'hope-service';

export const JUBELIO_HOST = 'https://api.jubelio.com';
export const JUBELIO_USER = 'technology@lifepack.id';
export const JUBELIO_PASSWORD = 'devItmi!123';
export const JUBELIO_PRODUCT_SYNC_SWITCH = 1;
export const JUBELIO_WEBHOOK_SECRET = 'jubelio-dev';
export const JUBELIO_TIMEOUT = 40000;
