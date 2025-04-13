import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable() 
export class UserService {
  constructor(
    @InjectRepository(User)  //injetando O repositório no typeORM
    private readonly userRepository: Repository<User>, //para acessar o banco de fato
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: Partial<User>) {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return { message: `Usuário com ID ${id} foi removido.` };
  }
  
  
}
