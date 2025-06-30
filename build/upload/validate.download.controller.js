"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateDownloadController = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const zip_service_1 = require("../utils/zip.service"); // ajuste o caminho se precisar
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let ValidateDownloadController = class ValidateDownloadController {
    uploadService;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async validateDownload(body) {
        const fileId = parseInt(body.id, 10);
        const senha = body.senha;
        if (isNaN(fileId) || !senha) {
            throw new common_1.HttpException('Dados inválidos', common_1.HttpStatus.BAD_REQUEST);
        }
        const result = await this.uploadService.validateDownload(fileId, senha);
        if (!result) {
            throw new common_1.HttpException('Senha inválida', common_1.HttpStatus.UNAUTHORIZED);
        }
        // buscar info do arquivo para zipar
        const arquivoInfo = await this.uploadService.findById(fileId);
        if (!arquivoInfo) {
            throw new common_1.HttpException('Arquivo não encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const arquivoPath = path.join(process.cwd(), 'uploads', arquivoInfo.filename);
        if (!fs.existsSync(arquivoPath)) {
            throw new common_1.HttpException('Arquivo físico não encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        // zipar o arquivo
        try {
            const zipPath = await zip_service_1.ZipService.ziparArquivoComSenha(arquivoPath, senha);
            return {
                allowed: true,
                zipFile: `/files/${path.basename(zipPath)}` // o frontend vai baixar esse .zip
            };
        }
        catch (err) {
            console.error('Erro ao zipar:', err);
            throw new common_1.HttpException('Erro ao gerar arquivo zip', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ValidateDownloadController = ValidateDownloadController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ValidateDownloadController.prototype, "validateDownload", null);
exports.ValidateDownloadController = ValidateDownloadController = __decorate([
    (0, common_1.Controller)('validate-download'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], ValidateDownloadController);
