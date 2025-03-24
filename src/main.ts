import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return { message: 'Usuário criado com sucesso', data: createUserDto };
  }

  findAll() {
    return [{ id: '1', name: 'Exemplo de Usuário' }];
  }

  findOne(id: string) {
    return { id, name: 'Exemplo de Usuário' };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return { message: 'Usuário atualizado com sucesso', id, data: updateUserDto };
  }

  remove(id: string) {
    return { message: 'Usuário removido com sucesso', id };
  }
}
