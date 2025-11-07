import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  app.useGlobalPipes(new ValidationPipe());
}

start();
