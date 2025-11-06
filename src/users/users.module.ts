import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { UserRoles } from "src/roles/user-roles.model";
import { Role } from "src/roles/roles.model";
import { RolesService } from "src/roles/roles.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles])],
})
export class UsersModule {}
