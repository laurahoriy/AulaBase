'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../lib/api';
import { Carro } from '@/app/types/carro';
import Swal from 'sweetalert2';

export function useCarroForm(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');

    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [salvando, setSalvando] = useState(false);

    const extrairErro = (error: any, mensagemPadrao: string) => {
        const data = error.response?.data;
        if (data) {
            if (data.erro) return String(data.erro);
            if (data.message) return String(data.message);
            if (data.error) return String(data.error);
        }
        return error.message || mensagemPadrao;
    };

    useEffect(() => {
        if (idParam) {
            buscarCarroPorId(Number(idParam));
        }
    }, [idParam]);

    const buscarCarroPorId = async (id: number) => {
        setCarregando(true);
        try {
            const resposta = await api.get(`/carro/${id}`);
            const carro = resposta.data;

            setEditandoId(carro.id!);
            setNome(String(carro.nome));
            setTipo(carro.tipo ? String(carro.tipo) : '');
        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text: extrairErro(error, "Erro ao buscar os detalhes do carro."),
                icon: 'error',
                confirmButtonColor: '#3b82f6'
            });
            router.push('/carro');
        } finally {
            setCarregando(false);
        }
    };

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();
        setSalvando(true);

        try {
            if (editandoId) {
                const dados = { nome, tipo };
                await api.put(`/carro/${editandoId}`, dados);
            } else {
                const dados: Carro = { nome, tipo };
                await api.post('/carro', dados);
            }

            await Swal.fire({
                title: 'Sucesso!',
                text: 'Veículo salvo com sucesso!',
                icon: 'success',
                confirmButtonColor: '#8b5cf6'
            });

            router.push('/carro');
        } catch (error: any) {
            Swal.fire({
                title: 'Atenção!',
                text: extrairErro(error, "Erro ao salvar o veículo."),
                icon: 'warning',
                confirmButtonColor: '#3b82f6'
            });
        } finally {
            setSalvando(false);
        }
    };

    const cancelar = () => {
        router.push('/carro');
    };

    return {
        nome, setNome, tipo, setTipo, editandoId, carregando, salvando, salvar, cancelar
    };
}