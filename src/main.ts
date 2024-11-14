import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import * as bodyParser from "body-parser";
import { removePath } from "./shared/utils/path.utils";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>("PORT");
  const options = new DocumentBuilder()
    .setTitle("ap-api-products")
    .setDescription("A documentation for ap-api-products")
    .setVersion("1.0")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT", in: "header" },
      "jwt",
    )
    .build();
  const excludedFromPrefix = [
    removePath(config.get<string>("GOOGLE_CALLBACK_URL") ?? ""),
    removePath(config.get<string>("FACEBOOK_CALLBACK_URL") ?? ""),
    "auth/login_social/facebook",
    "auth/login_social/google",
  ];
  app.setGlobalPrefix("api/v1", {
    exclude: excludedFromPrefix,
  });
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // Apply the response interceptor globally
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(port, () => {
    console.log(
      "[WEB]",
      `${config.get<string>("BASE_URL")}:${config.get<string>("PORT")}` +
        "/swagger",
    );
  });
}
bootstrap();
