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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const fs = __importStar(require("fs"));
const upload_service_1 = require("./upload.service");
const passport_1 = require("@nestjs/passport");
const mail_service_1 = require("../mail/mail.service");
const zip_service_1 = require("../utils/zip.service");
const path = __importStar(require("path"));
let UploadController = class UploadController {
    uploadService;
    mailService;
    constructor(uploadService, mailService) {
        this.uploadService = uploadService;
        this.mailService = mailService;
    }
    async uploadFile(file, email, senha, req) {
        try {
            const user = req.user;
            console.log('req.user:', user);
            const userId = user.id;
            if (!userId) {
                throw new common_1.HttpException('Usuário não identificado no token', common_1.HttpStatus.UNAUTHORIZED);
            }
            if (!file) {
                throw new common_1.HttpException('Arquivo não enviado', common_1.HttpStatus.BAD_REQUEST);
            }
            if (!email || !senha) {
                throw new common_1.HttpException('Todos os campos são obrigatórios', common_1.HttpStatus.BAD_REQUEST);
            }
            // salva no banco
            const saved = await this.uploadService.create({
                filename: file.filename,
                email,
                senha,
                userId,
            });
            // gera zip protegido
            const arquivoOriginalPath = (0, path_1.join)(process.cwd(), 'uploads', file.filename);
            const zipPath = await zip_service_1.ZipService.ziparArquivoComSenha(arquivoOriginalPath, senha);
            try {
                await fs.promises.unlink(arquivoOriginalPath);
                console.log('Arquivo original removido com sucesso');
            }
            catch (err) {
                console.error('Erro ao remover o arquivo original:', err);
            }
            await this.mailService.sendMail(email, 'Arquivo criptografado', 'Segue o arquivo zipado. Para abrir, use a senha informada no app.', [
                {
                    filename: path.basename(zipPath),
                    path: zipPath,
                },
            ]);
            return {
                message: 'Arquivo criptografado e enviado com sucesso!',
                filename: saved.filename,
                emailDestino: saved.email,
                id: saved.id,
            };
        }
        catch (error) {
            console.error('Erro no upload controller:', error);
            throw new common_1.HttpException({
                message: 'Erro ao processar upload',
                error: error.message || error,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    listFiles() {
        const directoryPath = (0, path_1.join)(process.cwd(), 'uploads');
        try {
            const files = fs
                .readdirSync(directoryPath, { withFileTypes: true })
                .filter((file) => file.isFile())
                .map((file) => file.name);
            return files;
        }
        catch (err) {
            console.error('Erro ao ler diretório:', err);
            throw new common_1.HttpException('Erro ao listar arquivos', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                const dir = './uploads';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                callback(null, dir);
            },
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('email')),
    __param(2, (0, common_1.Body)('senha')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "listFiles", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService,
        mail_service_1.MailService])
], UploadController);
