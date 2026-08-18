import prisma from '@/src/lib/prisma';
import { Concessionaria } from '@/src/models/Concessionaria';

export class ConcessionariaRepository {

    async salvar(obj) {
        return await prisma.concessionaria.create({
            data: {
                nome: obj.nome,
                cnpj: obj.cnpj,
                cidade: obj.cidade
            }
        });
    }

    async listarTodos() {
        const concessionarias = await prisma.concessionaria.findMany();

        return concessionarias.map(c => new Concessionaria(
            c.nome,
            c.cnpj,
            c.cidade,
            c.id
        ));
    }

    async buscarPorId(id) {
        const dado = await prisma.concessionaria.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!dado) return null;

        return new Concessionaria(
            dado.id,
            dado.nome,
            dado.cnpj,
            dado.cidade
        );
    }

    async atualizar(id, obj) {
        return await prisma.concessionaria.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: obj.nome,
                cnpj: obj.cnpj,
                cidade: obj.cidade
            }
        });
    }

    async excluir(id) {
        return await prisma.concessionaria.delete({
            where: {
                id: Number(id)
            }
        });
    }
}