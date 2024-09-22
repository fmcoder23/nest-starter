import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { LoginDto, RegisterDto, VerifyOtpDto } from './dto';
import { Role } from '@prisma/client';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register as a User' })
  async userRegister(@Body() registerDto: RegisterDto) {
    return this.authService.sendOtpForRegister(registerDto, Role.USER);
  }

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  async userLogin(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto);
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'Admin Login' })
  async adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.adminLogin(loginDto);
  }

}
