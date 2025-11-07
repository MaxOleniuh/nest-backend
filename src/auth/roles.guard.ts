import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ROLES_KEY } from "./roles-auth.decorator";
import { Role } from "src/roles/roles.model";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      );
      if (!requiredRoles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new UnauthorizedException({ message: "User is not authorized" });
      }

      const user = this.jwtService.verify(token);
      request.user = user;

      return user.roles.some((role: Role) =>
        requiredRoles.includes(role.value)
      );
    } catch (e) {
      throw new HttpException(
        { message: "User is not authorized" },
        HttpStatus.FORBIDDEN
      );
    }
  }
}
