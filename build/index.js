"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    create(createUserDto) {
        return { message: 'Usuário criado com sucesso', data: createUserDto };
    }
    findAll() {
        return [{ id: '1', name: 'Exemplo de Usuário' }];
    }
    findOne(id) {
        return { id, name: 'Exemplo de Usuário' };
    }
    update(id, updateUserDto) {
        return { message: 'Usuário atualizado com sucesso', id, data: updateUserDto };
    }
    remove(id) {
        return { message: 'Usuário removido com sucesso', id };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
