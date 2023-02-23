import {NestFactory} from '@nestjs/core';
import {FastifyAdapter, NestFastifyApplication,} from '@nestjs/platform-fastify';
import {HttpExceptionFilter} from "./notifier/src/http-exception.filter";
import {ThresholdsModule} from "./notifier/src/app.threshold.module";

const ms_name = 'ms:notifier'
const ms_description = ''
const port = 9205

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(ThresholdsModule, new FastifyAdapter());

    await app.enableCors();
    await app.enableShutdownHooks();
    await app.useGlobalFilters(new HttpExceptionFilter());
    await app.startAllMicroservices();

    await app.listen(port, '0.0.0.0');
}

bootstrap()
    .then(() => {
        //console.log(` 🚀 ${ms_name} ${ms_description} is running on: http://localhost:${port}`);
        process.stdout.write(` 🚀 ${ms_name} ${ms_description} is running on: http://localhost:${port}`);
    }).catch(err => { console.error(err); });