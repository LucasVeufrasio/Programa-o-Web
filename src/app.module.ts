import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { Upload } from './upload/upload.entity';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [
    MailModule,
    UploadModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'programacao_web',
      entities: [User, Upload],
      synchronize: true,
    }),
    UserModule, 
  ],
})
export class AppModule {}
