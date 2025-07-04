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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("../dto/create-user.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const upload_service_1 = require("../upload/upload.service");
let UserController = class UserController {
    userService;
    uploadService;
    constructor(userService, uploadService) {
        this.userService = userService;
        this.uploadService = uploadService;
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    async getUploadHistory(req) {
        const user = req.user;
        if (!user || !user.id) {
            throw new common_1.UnauthorizedException('Token JWT inválido ou expirado');
        }
        const userId = Number(user.id);
        if (isNaN(userId)) {
            throw new common_1.UnauthorizedException('ID de usuário inválido no token');
        }
        try {
            return await this.uploadService.findByUser(userId);
        }
        catch (error) {
            console.error('Erro ao buscar histórico:', error);
            throw new common_1.HttpException('Erro ao carregar histórico do usuário', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findAll() {
        return this.userService.findAll();
    }
    async getProfile(req) {
        const user = req.user;
        if (!user || !user.id) {
            throw new common_1.UnauthorizedException('Token JWT inválido ou expirado');
        }
        const userId = Number(user.id);
        if (isNaN(userId)) {
            throw new common_1.UnauthorizedException('ID de usuário inválido no token');
        }
        const found = await this.userService.findOne(userId);
        return {
            id: found.id,
            name: found.name,
            email: found.email,
        };
    }
    findOne(id) {
        return this.userService.findOne(Number(id));
    }
    update(id, updateUserDto) {
        return this.userService.update(Number(id), updateUserDto);
    }
    remove(id) {
        return this.userService.remove(Number(id));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUploadHistory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        upload_service_1.UploadService])
], UserController);
