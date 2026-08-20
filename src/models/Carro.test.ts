import { Carro } from './Carro';

describe('Modelo Carro', () => {
    it('deve criar um carro corretamente com nome e tipo', () => {
        // 1. Preparação (Arrange)
        const nomeDoCarro = 'Fusca';
        const tipoDoCarro = 'Sedan';

        const carro = new Carro(nomeDoCarro, tipoDoCarro);

        expect(carro.nome).toBe('Fusca');
        expect(carro.tipo).toBe('Sedan');
        expect(carro.id).toBeNull();
    });
});