import * as Seven from 'node-7z';
import * as path from 'path';

export class ZipService {
  /**
   * Cria um arquivo zip protegido por senha
   * @param arquivoPath caminho absoluto do arquivo original
   * @param senha senha do zip
   * @returns caminho do arquivo .zip gerado
   */
  static async ziparArquivoComSenha(arquivoPath: string, senha: string): Promise<string> {
    const zipFilePath = `${arquivoPath}.zip`;

    return new Promise((resolve, reject) => {
      const myStream = Seven.add(
        zipFilePath,
        arquivoPath,
        {
          $bin: 'C:\\Program Files\\7-Zip\\7z.exe', // confirme se esse é mesmo o caminho do seu 7z
          password: senha,
          recursive: true,
        }
      );

      myStream.on('end', () => {
        console.log(`Arquivo zip gerado em: ${zipFilePath}`);
        resolve(zipFilePath);
      });
      myStream.on('error', (err: any) => {
        console.error('Erro ao criar o zip:', err);
        reject(err);  // importantíssimo
      });
    });
  }
}
