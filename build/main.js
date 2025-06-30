"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });
    app.enableCors({
        origin: '*', // ajuste se quiser restringir no futuro
        methods: '*',
        credentials: true,
        allowedHeaders: '*',
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/files/',
    });
    await app.listen(3000);
    console.log(`🚀 Server is running at http://localhost:3000`);
}
bootstrap();
