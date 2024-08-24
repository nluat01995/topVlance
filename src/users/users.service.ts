import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthConstants } from 'src/auth/constants/auth.constant';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async login(createUserDto: CreateUserDto) {
    try {
      const { email, password } = createUserDto;
      const user = await this.userRepository.findOne({
        where: {
          email
        }
      })
      if (!user) {
        return null
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) { return null }
      return user;
    } catch (error) {
      throw new BadRequestException('INTERNAL ERROR SERVER')

    }

  }
  async register(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        return {
          code: AuthConstants.EMAIL_EXIST.CODE,
          message: AuthConstants.EMAIL_EXIST.MESSAGE,
          data: []

        }
      }
      const newUser = await this.userRepository.create(createUserDto);
      const user = await this.userRepository.save(newUser);
      if (!user) {
        return {
          code: AuthConstants.REGISTER_FAILED.CODE,
          message: AuthConstants.REGISTER_FAILED.MESSAGE,
          data: []
        }
      }
      return {
        code: AuthConstants.REGISTER_SUCCESS.CODE,
        message: AuthConstants.REGISTER_SUCCESS.MESSAGE,
        data: []
      }
    } catch (error) {
      return {
        code: AuthConstants.ERROR.CODE,
        message: AuthConstants.ERROR.MESSAGE,
        data: []
      }
    }


  }
  async findOne(userId: number) {
    return await this.userRepository.findOne({
      where: {
        id: +userId
      }
    })
  }
}
