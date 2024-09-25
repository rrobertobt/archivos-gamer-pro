import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ModelClass } from 'objection';
import { Role } from './role.decorator';
import { RoleModel } from 'src/database/models/RoleModel';
import { EmployeeModel } from 'src/database/models/EmployeeModel';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(RoleModel.name)
    private readonly roleModel: ModelClass<RoleModel>,
    @Inject(EmployeeModel.name)
    private readonly employeeModel: ModelClass<EmployeeModel>,
  ) {}
  async canActivate(context: ExecutionContext) {
    const role = this.reflector.get(Role, context.getHandler());
    const request = context.switchToHttp().getRequest();
    // get the user id from the authorization header
    const userId = request.headers.authorization;
    if (!userId) {
      throw new UnauthorizedException('Autenticacion invalida');
      // return false;
    }
    // First, find the specified role from the decorator in the database
    const roleToCheck = await this.roleModel
      .query()
      .findOne({ name: role })
      .select('id');

    if (!roleToCheck) {
      return false;
    }

    const emplyeeWithRole = await this.employeeModel
      .query()
      .findOne({ id: userId })
      .withGraphFetched('role')
      .where('role_id', roleToCheck.id);

    if (!emplyeeWithRole)
      throw new UnauthorizedException('Usuario no autorizado');
    else return true;
  }
}
