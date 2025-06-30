import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UploadModule } from '../upload/upload.module'; // ADICIONE ESTA LINHA

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UploadModule // ADICIONE AQUI também
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
