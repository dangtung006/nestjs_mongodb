import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guard/jwt-auth.guard';


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
    
    @UseGuards(JwtAuthGuard)
    @Get('test')
    getTest(){
        return 'aaaaaaaa';
    }
}