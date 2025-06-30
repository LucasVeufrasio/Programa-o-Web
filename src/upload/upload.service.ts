import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from './upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>
  ) {}

  async create(data: Partial<Upload>): Promise<Upload> {
    const upload = this.uploadRepository.create(data);
    return await this.uploadRepository.save(upload);
  }

  async findByUser(userId: number): Promise<Upload[]> {
    return this.uploadRepository.find({
      where: { userId },
      order: { created_at: 'DESC' }
    });
  }

  async validateDownload(id: number, senha: string): Promise<boolean> {
    const file = await this.uploadRepository.findOne({ where: { id } });
    if (!file) return false;
    return file.senha?.trim().toLowerCase() === senha?.trim().toLowerCase();
  }

  async findById(id: number): Promise<Upload | null> {
    return await this.uploadRepository.findOne({ where: { id } });
  }
}
