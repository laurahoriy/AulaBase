import { ConcessionariaRepository } from './ConcessionariaRepository';
import { Concessionaria } from '../models/Concessionaria';
import prisma from '../lib/prisma';

// 1. "Sequestramos" o arquivo prisma.js.
// O Jest vai substituir o Prisma real por essas funções vazias (jest.fn())
jest.mock('../lib/prisma', () => ({
    __esModule: true,
    default: {
        carro: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        }
    }
}));

describe('Repositório ConcessionariaRepository', () => {
    let repository: ConcessionariaRepository;

    beforeEach(() => {
        repository = new ConcessionariaRepository();
        jest.clearAllMocks(); // limpa o histórico de chamadas do Jest antes de cada teste
    });

    describe('Método salvar', () => {
        it('deve chamar o prisma.concessionaria.create com os dados corretos', async () => {
            // Arrange
            const novaConcessionaria = new Concessionaria('Sorocaba', 'Auto Center', '12345678901234');
            const retornoDoBanco = { id: 1, nome: 'Auto Center', cnpj: '12345678901234' };

            // Forçamos o prisma "falso" a devolver esse objeto quando o create for chamado
            (prisma.concessionaria.create as jest.Mock).mockResolvedValue(retornoDoBanco);

            // Act
            const resultado = await repository.salvar(novaConcessionaria);

            // Assert
            // Verifica se a função create do Prisma foi chamada 1 vez
            expect(prisma.concessionaria.create).toHaveBeenCalledTimes(1);

            // Verifica se o Repository montou o objeto exatamente como o Prisma exige
            expect(prisma.concessionaria.create).toHaveBeenCalledWith({
                data: { nome: 'Auto Center', cnpj: '12345678901234' }
            });

            // Verifica se o resultado devolvido é o que o banco (mock) entregou
            expect(resultado).toEqual(retornoDoBanco);
        });
    });

    describe('Método buscarPorId', () => {
        it('deve retornar uma nova instância de Concessionaria se encontrar no banco', async () => {
            // Arrange
            const concessionariaNoBanco = { id: 10, nome: 'Auto Center', cnpj: '12345678901234' };
            (prisma.concessionaria.findUnique as jest.Mock).mockResolvedValue(concessionariaNoBanco);

            // Act
            const resultado = await repository.buscarPorId(10);

            // Assert
            expect(prisma.concessionaria.findUnique).toHaveBeenCalledWith({
                where: { id: 10 }
            });
            // O grande teste: o Repository converteu o dado puro do Prisma para a Classe Concessionaria?
            expect(resultado).toBeInstanceOf(Concessionaria);
            expect(resultado?.nome).toBe('Auto Center');
        });

        it('deve retornar null se a concessionaria não for encontrada', async () => {
            // Arrange
            (prisma.concessionaria.findUnique as jest.Mock).mockResolvedValue(null);

            // Act
            const resultado = await repository.buscarPorId(99);

            // Assert
            expect(resultado).toBeNull();
        });
    });
});