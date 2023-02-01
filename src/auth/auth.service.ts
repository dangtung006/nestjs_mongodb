import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly userService : UserService
    ){}
    
    async register(userDto: CreateUserDto) {
        const user = await this.userService.create(userDto);
        return user;

        // const token = await this._createToken(user);
        // return {
        //   email: user.email,
        //   ...token,
        // };
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.userService.findByEmail(loginUserDto.email);
        return 'token';
        // const token = await this._createToken(user);
    
        // return {
        //   email: user.email,
        //   ...token,
        // };
    }

}
