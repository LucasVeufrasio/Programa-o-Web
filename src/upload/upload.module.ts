import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Upload } from './upload.entity';
import { MailModule } from '../mail/mail.module';  // <-- importe aqui
import { ValidateDownloadController } from './validate.download.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Upload]), MailModule],
  controllers: [UploadController, ValidateDownloadController],
  providers: [UploadService],
  exports: [UploadService],
  
})
export class UploadModule {}
