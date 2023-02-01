import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, LoginUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async create(user : CreateUserDto){
        const userInDb = await this.userRepository.findOneByCondition({ email :  user.email });
        
        if(userInDb) 
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        
        return this.userRepository.create(user);
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOneByCondition({
            email: email
        });
    }


    // update user;
    async update(filter, update) {
        // if (update.refreshToken) {
        //   update.refreshToken = await bcrypt.hash(
        //     this.reverse(update.refreshToken),
        //     10,
        //   );
        // }

        return await this.userRepository.findByConditionAndUpdate(filter, update);
    }

    async setTwoFactorAuthenticationSecret(secret, user_id) {
        return this.userRepository.findByIdAndUpdate(user_id, {
          twoFactorAuthenticationSecret: secret,
        });
    }
    
    async turnOnTwoFactorAuthentication(user_id: string) {
        return this.userRepository.findByIdAndUpdate(user_id, {
            isTwoFactorAuthenticationEnabled: true,
        });
    }
}
