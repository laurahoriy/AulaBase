import { NextResponse } from 'next/server';

import { CarroRepository } from '@/src/repository/CarroRepository';

import { CarroService } from '@/src/services/CarroService';

const service = new CarroService(new CarroRepository());

export async function GET() {

    try {

        const todosCarros = await service.listar();

        return NextResponse.json(todosCarros, { status: 200 });

    } catch (e) {

        return NextResponse.json({ error: e.message }, { status: 500 });

    }

}

export async function POST(req) {

    try {

        const body = await req.json();

        const res = await service.cadastrar(body.nome, body.tipo);

        return NextResponse.json(res, { status: 201 });

    }

    catch (e) {

        return NextResponse.json({ erro: e.message }, { status: 400 });

    }

}