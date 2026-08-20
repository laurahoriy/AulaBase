import { Concessionaria } from './Concessionaria';

describe('Modelo Concessionaria', () => {
    it('deve criar uma concessionaria corretamente com nome e tipo', () => {
        // 1. Preparação (Arrange)
        const nomeDaConcessionaria = 'Toyota';
        const cnpjDaConcessionaria = '11111111111';
        const cidadeDaConcessionaria = 'Sorocaba';

        const concessionaria = new Concessionaria(nomeDaConcessionaria, cnpjDaConcessionaria, cidadeDaConcessionaria);

        expect(concessionaria.nome).toBe('Toyota');
        expect(concessionaria.cnpj).toBe('11111111111');
        expect(concessionaria.cidade).toBe('Sorocaba');
        expect(concessionaria.id).toBeNull();
    });
});