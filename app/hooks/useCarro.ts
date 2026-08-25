'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import { Carro } from '@/app/types/carro';
import Swal from 'sweetalert2';

export function useCarros(){
    const [carros, setCarros] = useState<Carro[]>([]);
    const [loading, setLoading] = useState(false);

    // Função blindada para extrair mensagens de erro do backend
    const extrairErro = (error: any, mensagemPadrao: string) => {
        const data = error.response?.data;

        if (data) {
            if (data.erro) return String(data.erro);
            if (data.message) return String(data.message);
            if (data.error) return String(data.error);
        }
        return error.message || mensagemPadrao;
    };

    const listarCarros = useCallback(async () => {
        setLoading(true);
        try {
            const resposta = await api.get('/carro');
            setCarros(resposta.data);
        } catch (error: any) {
            Swal.fire('Erro!', extrairErro(error, "Erro ao buscar Carros"), 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    const excluir = async (id: number) => {
        const confirmacao = await Swal.fire({
            title: 'Excluir veículo?',
            text: "Esta ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacao.isConfirmed) {
            try {
                await api.delete(`/carro/${id}`);
                Swal.fire('Excluído!', 'O veículo foi removido.', 'success');
                listarCarros();
            } catch (error: any) {
                Swal.fire('Erro!', extrairErro(error, "Erro ao excluir"), 'error');
            }
        }
    };

    return { carros, loading, listarCarros, excluir };
}