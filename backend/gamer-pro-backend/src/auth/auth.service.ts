import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { EmployeeModel } from 'src/database/models/EmployeeModel';
import { ModelClass } from 'objection';
import { BaseService } from 'src/core/base-service';
import * as bcrypt from 'bcrypt';
import { IGeneralError } from 'src/core/types/general-error.interface';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    @Inject(EmployeeModel.name)
    private readonly employeeModel: ModelClass<EmployeeModel>,
  ) {
    super(AuthService.name);
  }

  /*
   * Method to check the credentials of an admin when being a cashier user to perform actions like:
   * - Modify customer data
   * @param {LoginDto}
   * @returns {Promise<any>}
   */
  async getAdminAuthorization(adminCredentials: LoginDto) {
    const { username, password } = adminCredentials;

    if (!username || !password) {
      const error: IGeneralError = {
        statusCode: 400,
        error: 'Petición incorrecta',
        message: 'Se necesita un usuario y una contraseña',
      };
      throw new BadRequestException(error);
    }

    const adminEmployee = await this.employeeModel
      .query()
      .findOne({ username })
      .andWhere('role_id', 1);
    console.log('adminEmployee', adminEmployee);

    if (!adminEmployee) {
      const error: IGeneralError = {
        statusCode: 401,
        error: 'No autorizado',
        message: 'Usuario o contraseña inválidos',
      };
      throw new UnauthorizedException(error);
    }

    if (
      !(await this.checkPassword(password, adminEmployee.encrypted_password))
    ) {
      console.log('password incorrecto');
      const error: IGeneralError = {
        statusCode: 401,
        error: 'No autorizado',
        message: 'Usuario o contraseña inválidos',
      };
      throw new UnauthorizedException(error);
    }

    return {
      message: 'Usuario autorizado',
    };
  }

  async login(loginDto: LoginDto) {
    if (!loginDto.username || !loginDto.password) {
      const error: IGeneralError = {
        statusCode: 400,
        error: 'Petición incorrecta',
        message: 'Se necesita un usuario y una contraseña',
      };
      throw new BadRequestException(error);
    }

    const employee = await this.employeeModel
      .query()
      .findOne({ username: loginDto.username })
      .withGraphFetched('role')
      .withGraphFetched('branch');

    if (
      !employee ||
      !(await this.checkPassword(
        loginDto.password,
        employee.encrypted_password,
      ))
    ) {
      const error: IGeneralError = {
        statusCode: 401,
        error: 'No autorizado',
        message: 'Usuario o contraseña inválidos',
      };
      throw new UnauthorizedException(error);
    }

    delete employee.encrypted_password;
    return employee;
  }

  private async checkPassword(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
