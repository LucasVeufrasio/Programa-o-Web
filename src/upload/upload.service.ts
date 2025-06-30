import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from './upload.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepo: Repository<Upload>,
    private readonly mailService: MailService,  // injeta aqui
  ) {}

  async create(data: Partial<Upload>) {
    const novoUpload = this.uploadRepo.create(data);
    const saved = await this.uploadRepo.save(novoUpload);

    return saved;
  }

  async findAll() {
    return this.uploadRepo.find({
      order: { created_at: 'DESC' },
    });
  }

  async findByUser(userId: number) {
    return this.uploadRepo.find({
      where: { userId },
      order: { created_at: 'DESC' },
    });
  }
  async findById(id: number) {
  return this.uploadRepo.findOne({ where: { id } });
}
async validateDownload(fileId: number, senha: string): Promise<boolean> {
  const file = await this.uploadRepo.findOneBy({ id: fileId });
  if (!file) return false;
  return file.senha === senha;
}


}
