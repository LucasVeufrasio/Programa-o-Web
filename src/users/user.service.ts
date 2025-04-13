import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable() 
export class UserService {
  constructor(
    @InjectRepository(User)  //injetando O repositório no typeORM
    private readonly userRepository: Repository<User>, //para acessar o banco de fato
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const novoUsuario = this.userRepository.create(createUserDto);
    return this.userRepository.save(novoUsuario);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
}
