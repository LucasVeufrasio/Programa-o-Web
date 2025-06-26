import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from './upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepo: Repository<Upload>,
  ) {}

  async create(data: Partial<Upload>) {
    const novoUpload = this.uploadRepo.create(data);
    return this.uploadRepo.save(novoUpload);
  }

  async findAll() {
    return this.uploadRepo.find({
      order: { created_at: 'DESC' },
    });
  }
}
