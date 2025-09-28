import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UserDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { Authorized } from './decorators/authorized.decorator';
import { Auth } from 'prisma/generated/prisma/client';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() dto: UserDto, @Res({passthrough: true}) res: Response){
    return await this.authService.registration(dto, res);
  }

  @Post('/authorization')
  @HttpCode(HttpStatus.OK)
  async authorization(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response){
    return await this.authService.authorization(dto, res);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshDto, @Req() req: Request, @Res({passthrough: true}) res: Response){
    return await this.authService.refresh(req, dto, res);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({passthrough: true}) res: Response){
    return await this.authService.logout(res);
  }
}
