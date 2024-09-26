import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RoleGuard } from 'src/core/decorators/roles.guard';
import { Role } from 'src/core/decorators/role.decorator';

@UseGuards(RoleGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('check-admin')
  @Role('cashier')
  getAdminAuthorization(@Body() adminCredentials: LoginDto) {
    return this.authService.getAdminAuthorization(adminCredentials);
  }
}
