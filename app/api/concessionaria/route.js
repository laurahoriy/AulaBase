import { NextResponse } from 'next/server';
import { ConcessionariaRepository } from '@/src/repository/ConcessionariaRepository';
import { ConcessionariaService } from '@/src/services/ConcessionariaService';

const service = new ConcessionariaService(new ConcessionariaRepository());

export async function GET() {
    try {
        const todosConcessionarias = await service.listar();
        return NextResponse.json(todosConcessionarias, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        const body = await req.json();
        const res = await service.cadastrar(body.nome, body.cnpj, body.cidade);
        return NextResponse.json(res, { status: 201 });
    }
    catch (e) {
        return NextResponse.json({ erro: e.message }, { status: 400 });
    }

}
