import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { PostsModule } from "./posts/posts.module";
import { Post } from "./posts/posts.model";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      synchronize: true,
      models: [User, Role, UserRoles, Post],
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET_KEY",
      signOptions: { expiresIn: "24h" },
    }),
    PostsModule,
    FilesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
