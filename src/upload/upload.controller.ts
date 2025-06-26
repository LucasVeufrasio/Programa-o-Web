import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const dir = './uploads';
          // Garante que o diretório existe
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          callback(null, dir);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('email') email: string,
    @Body('senha') senha: string,
  ) {
    try {
      if (!file) {
        throw new HttpException('Arquivo não enviado', HttpStatus.BAD_REQUEST);
      }
      if (!email || !senha) {
        throw new HttpException('Email e senha são obrigatórios', HttpStatus.BAD_REQUEST);
      }

      const saved = await this.uploadService.create({
        filename: file.filename,
        email,
        senha,
      });

      return {
        message: 'Arquivo enviado com sucesso!',
        filename: saved.filename,
        emailDestino: saved.email,
        id: saved.id,
      };
    } catch (error: any) {
      console.error('Erro no upload:', error); // <-- essencial para debug
      throw new HttpException(
        {
          message: 'Erro ao processar upload',
          error: error.message || error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('list')
  listFiles() {
    const directoryPath = join(__dirname, '..', '..', 'uploads');
    try {
      const files = fs.readdirSync(directoryPath, { withFileTypes: true })
        .filter(file => file.isFile())
        .map(file => file.name);
      return files;
    } catch (err) {
      console.error('Erro ao ler diretório:', err);
      throw new HttpException('Erro ao listar arquivos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('history')
  async getUploadHistory() {
    return this.uploadService.findAll();
  }

  @Get('view')
  viewPage(@Res() res: Response) {
    res.sendFile(join(process.cwd(), 'src', 'upload', 'upload.html'));
  }
}
