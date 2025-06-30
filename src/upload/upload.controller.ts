import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { UploadService } from './upload.service';
import { AuthGuard } from '@nestjs/passport';
import { MailService } from '../mail/mail.service';
import { ZipService } from '../utils/zip.service';
import * as path from 'path';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly mailService: MailService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const dir = './uploads';
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
    @Req() req: any,
  ) {
    try {
     const user = req.user as any;
      console.log('req.user:', user);
      const userId = user.id;

      if (!userId) {
        throw new HttpException('Usuário não identificado no token', HttpStatus.UNAUTHORIZED);
      }




      if (!file) {
        throw new HttpException('Arquivo não enviado', HttpStatus.BAD_REQUEST);
      }
      if (!email || !senha) {
        throw new HttpException('Todos os campos são obrigatórios', HttpStatus.BAD_REQUEST);
      }

      // salva no banco
      const saved = await this.uploadService.create({
        filename: file.filename,
        email,
        senha,
        userId,
      });

      // gera zip protegido
      const arquivoOriginalPath = join(process.cwd(), 'uploads', file.filename);
      const zipPath = await ZipService.ziparArquivoComSenha(arquivoOriginalPath, senha);

      try {
        await fs.promises.unlink(arquivoOriginalPath);
        console.log('Arquivo original removido com sucesso');
      } catch (err) {
        console.error('Erro ao remover o arquivo original:', err);
      }



    await this.mailService.sendMail(
        email,
        'Arquivo criptografado',
        'Segue o arquivo zipado. Para abrir, use a senha informada no app.',
        [
          {
          filename: path.basename(zipPath),
          path: zipPath,
          },
        ]
      );



      return {
        message: 'Arquivo criptografado e enviado com sucesso!',
        filename: saved.filename,
        emailDestino: saved.email,
        id: saved.id,
      };
    } catch (error: any) {
      console.error('Erro no upload controller:', error);
      throw new HttpException(
        {
          message: 'Erro ao processar upload',
          error: error.message || error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  listFiles() {
    const directoryPath = join(process.cwd(), 'uploads');
    try {
      const files = fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((file) => file.isFile())
        .map((file) => file.name);
      return files;
    } catch (err) {
      console.error('Erro ao ler diretório:', err);
      throw new HttpException('Erro ao listar arquivos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
