import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  Req, 
  HttpException, 
  HttpStatus, 
  UnauthorizedException 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UploadService } from '../upload/upload.service';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: UploadService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getUploadHistory(@Req() req: Request) {
    const user = req.user as any;
    if (!user || !user.id) {
      throw new UnauthorizedException('Token JWT inválido ou expirado');
    }
    const userId = Number(user.id);
    if (isNaN(userId)) {
      throw new UnauthorizedException('ID de usuário inválido no token');
    }

    try {
      return await this.uploadService.findByUser(userId);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      throw new HttpException(
        'Erro ao carregar histórico do usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const user = req.user as any;
    if (!user || !user.id) {
      throw new UnauthorizedException('Token JWT inválido ou expirado');
    }
    const userId = Number(user.id);
    if (isNaN(userId)) {
      throw new UnauthorizedException('ID de usuário inválido no token');
    }

    const found = await this.userService.findOne(userId);

    return {
      id: found.id,
      name: found.name,
      email: found.email,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
