"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const upload_entity_1 = require("./upload.entity");
let UploadService = class UploadService {
    uploadRepository;
    constructor(uploadRepository) {
        this.uploadRepository = uploadRepository;
    }
    async create(data) {
        const upload = this.uploadRepository.create(data);
        return await this.uploadRepository.save(upload);
    }
    async findByUser(userId) {
        return this.uploadRepository.find({
            where: { userId },
            order: { created_at: 'DESC' }
        });
    }
    async validateDownload(id, senha) {
        const file = await this.uploadRepository.findOne({ where: { id } });
        if (!file)
            return false;
        return file.senha?.trim().toLowerCase() === senha?.trim().toLowerCase();
    }
    async findById(id) {
        return await this.uploadRepository.findOne({ where: { id } });
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(upload_entity_1.Upload)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UploadService);
