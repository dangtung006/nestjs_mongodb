import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginUserDto){
        return await this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('test')
    getTest(@Req() req : Request){
        return req.user;
    }
}