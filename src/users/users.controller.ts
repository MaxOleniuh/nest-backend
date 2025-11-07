import { Body, Controller, Post, Get, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @UseGuards(RolesGuard)
  @Roles("admin")
  @Post("/ban")
  banUser(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto);
  }
}
