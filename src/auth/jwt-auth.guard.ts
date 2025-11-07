import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new UnauthorizedException({ message: "User is not authorized" });
      }

      const user = this.jwtService.verify(token);
      request.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: "User is not authorized" });
    }
  }
}
