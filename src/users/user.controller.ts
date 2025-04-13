import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) { //o @param ta pegadno o id do url e converte para number
    return this.userService.findOne(Number(id));
  }

  @Put(':id')
update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
  return this.userService.update(Number(id), updateUserDto);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.userService.remove(Number(id));
}


}
