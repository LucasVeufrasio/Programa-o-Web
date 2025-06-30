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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZipService = void 0;
const Seven = __importStar(require("node-7z"));
class ZipService {
    /**
     * Cria um arquivo zip protegido por senha
     * @param arquivoPath caminho absoluto do arquivo original
     * @param senha senha do zip
     * @returns caminho do arquivo .zip gerado
     */
    static async ziparArquivoComSenha(arquivoPath, senha) {
        const zipFilePath = `${arquivoPath}.zip`;
        return new Promise((resolve, reject) => {
            const myStream = Seven.add(zipFilePath, arquivoPath, {
                $bin: 'C:\\Program Files\\7-Zip\\7z.exe', // confirme se esse é mesmo o caminho do seu 7z
                password: senha,
                recursive: true,
            });
            myStream.on('end', () => {
                console.log(`Arquivo zip gerado em: ${zipFilePath}`);
                resolve(zipFilePath);
            });
            myStream.on('error', (err) => {
                console.error('Erro ao criar o zip:', err);
                reject(err); // importantíssimo
            });
        });
    }
}
exports.ZipService = ZipService;
