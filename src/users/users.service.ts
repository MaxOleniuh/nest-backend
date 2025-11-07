import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("user");
    if (!role) {
      throw new NotFoundException('Role "user" not found');
    }
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    if (user) {
      return user.get({ plain: true });
    }
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add("roles", role.id);
      return dto;
    }
    throw new NotFoundException("User or role not found");
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.banned = true;
    user.banReason = dto.banReason;

    await user.save();
    console.log(user);
    return user;
  }
}
