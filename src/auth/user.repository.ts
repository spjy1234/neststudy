import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export class UserRepository extends Repository<User> {
  constructor(@InjectRepository(User) private dataSource: DataSource) {
    super(User, dataSource.manager);
  }
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = this.create({
      username,
      password,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Exisring username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
