import { 
  Controller, 
  Post, 
  Body, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { UploadService } from './upload.service';
import * as path from 'path';
import * as fs from 'fs';

@Controller('validate-download')
export class ValidateDownloadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  async validateDownload(@Body() body: any) {
    const fileId = parseInt(body.id, 10);
    const senha = body.senha;

    if (isNaN(fileId) || !senha) {
      throw new HttpException('Dados inválidos', HttpStatus.BAD_REQUEST);
    }

    const isValid = await this.uploadService.validateDownload(fileId, senha);
    if (!isValid) {
      throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);
    }

    // busca info
    const arquivoInfo = await this.uploadService.findById(fileId);
    if (!arquivoInfo) {
      throw new HttpException('Arquivo não encontrado', HttpStatus.NOT_FOUND);
    }

    // o nome do zip
    const zipFileName = arquivoInfo.filename + '.zip';
    const zipPath = path.join(process.cwd(), 'uploads', zipFileName);

    if (!fs.existsSync(zipPath)) {
      throw new HttpException('Arquivo zip não encontrado', HttpStatus.NOT_FOUND);
    }

    return {
      allowed: true,
      zipFile: `/files/${zipFileName}`
    };
  }
}
