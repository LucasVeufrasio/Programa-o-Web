import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
// import { User } from './users/user.entity'; 
// import { UserModule } from './users/user.module'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'programacao_web',
      entities: [User], 
      synchronize: true, 
    }),
  ],
})
export class AppModule {}
