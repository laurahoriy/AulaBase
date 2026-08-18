import { Concessionaria } from '@/src/models/Concessionaria';

export class ConcessionariaService {
    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(nome, cnpj, cidade) {
        if (!nome || nome.length < 2)
            throw new Error("O nome deve ter no mínimo 2 caracteres");

        if (!cnpj)
            throw new Error("O CNPJ é obrigatório.");

        if (!cidade)
            throw new Error("A cidade é obrigatória.");

        return await this.repository.salvar(new Concessionaria(nome, cnpj, cidade));
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {
        const concessionaria = await this.repository.buscarPorId(id);

        if (!concessionaria)
            throw new Error("Concessionária não encontrada");

        return concessionaria;
    }

    async atualizar(id, nome, cnpj, cidade) {
        if (!id)
            throw new Error("Id é obrigatório para atualização");

        if (!nome || !cnpj || !cidade)
            throw new Error("Nome, CNPJ e cidade são obrigatórios");

        await this.buscarPorId(id);

        const concessionariaAtualizada = new Concessionaria(
            id,
            nome,
            cnpj,
            cidade
        );

        return await this.repository.atualizar(id, concessionariaAtualizada);
    }

    async excluir(id) {
        await this.buscarPorId(id);

        return await this.repository.excluir(id);
    }
}