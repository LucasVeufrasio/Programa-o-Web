import { 
  Controller, 
  Post, 
  Body, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { ZipService } from '../utils/zip.service'; // ajuste o caminho se precisar
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

    const result = await this.uploadService.validateDownload(fileId, senha);

    if (!result) {
      throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);
    }

    // buscar info do arquivo para zipar
    const arquivoInfo = await this.uploadService.findById(fileId);
    if (!arquivoInfo) {
      throw new HttpException('Arquivo não encontrado', HttpStatus.NOT_FOUND);
    }

    const arquivoPath = path.join(process.cwd(), 'uploads', arquivoInfo.filename);

    if (!fs.existsSync(arquivoPath)) {
      throw new HttpException('Arquivo físico não encontrado', HttpStatus.NOT_FOUND);
    }

    // zipar o arquivo
    try {
      const zipPath = await ZipService.ziparArquivoComSenha(arquivoPath, senha);
      return {
        allowed: true,
        zipFile: `/files/${path.basename(zipPath)}`  // o frontend vai baixar esse .zip
      };
    } catch (err) {
      console.error('Erro ao zipar:', err);
      throw new HttpException('Erro ao gerar arquivo zip', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
