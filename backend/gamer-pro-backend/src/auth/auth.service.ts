import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
      .withGraphFetched('role');
    if (!employee) {
      const error: IGeneralError = {
        statusCode: 401,
        error: 'No autorizado',
        message: 'Usuario o contraseña inválidos',
      };
      throw new UnauthorizedException(error);
    }
    if ((await this.checkPassword(loginDto.password, employee.encrypted_password))) {
      delete employee.encrypted_password;
      return employee;
    } else {
      const error: IGeneralError = {
        statusCode: 401,
        error: 'No autorizado',
        message: 'Usuario o contraseña inválidos',
      };
      throw new UnauthorizedException(error);
    }
  }

  private async checkPassword(password: string, encryptedPassword: string) {
    console.log(await bcrypt.compare(password, encryptedPassword));
    return await bcrypt.compare(password, encryptedPassword);
  }
}
