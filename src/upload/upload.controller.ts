import {
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
    Res,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname, join } from 'path';
  import * as fs from 'fs';
  import { Response } from 'express';
  
  @Controller('upload')
  export class UploadController {
    @Post()
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      return {
        message: 'Arquivo enviado com sucesso!',
        filename: file.filename,
      };
    }
  
    @Get('list')
    listFiles() {
      const directoryPath = join(__dirname, '..', '..', 'uploads');
      const files = fs.readdirSync(directoryPath);
      return files;
    }
  
    @Get('view')
    viewPage(@Res() res: Response) {
        res.sendFile(join(process.cwd(), 'src', 'upload', 'upload.html'));
    }
  }
  