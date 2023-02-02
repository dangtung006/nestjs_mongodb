import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly userService : UserService,
        private readonly jwtService : JwtService
    ){}
    
    async register(userDto: CreateUserDto) {

        const password = await bcrypt.hash(userDto.password, 10);
        userDto = {...userDto , password}

        const user = await this.userService.create(userDto);
        console.log(user);

        return 'active link';
    
        // const token = await this._generateToken(user);

        // return {
        //   email: user.email,
        //   ...token,
        // };
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.userService.findByEmail(loginUserDto.email);

        
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        
        const isValidPassword = bcrypt.compareSync(loginUserDto.password, user.password);
        
        if(!isValidPassword) 
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        
        const token = await this._generateToken(user);

        return {
            email: user.email,
            ...token,
        };
    }

    async validateUser(email: string){
        const user = await this.userService.findByEmail(email);

        if (!user) 
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
            
        return user;
    }

    private async _generateToken({ email }, isSecondFactorAuthenticated = false, refresh = false,){

        const accessToken = this.jwtService.sign({  
            email,
            isSecondFactorAuthenticated
        })

        // return  {
        //     expiresIn: process.env.EXPIRESIN,
        //     accessToken,
        // }

        return  {
            expiresIn: 60,
            accessToken,
        }
    }
}
