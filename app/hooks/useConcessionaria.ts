'use client';

import { useState, useCallback } from 'react';
import api from '../lib/api';
import { Concessionaria } from '../types/concessionaria';
import Swal from 'sweetalert2';

export function useConcessionaria() {
    const [concessionaria, setConcessionaria] = useState<Concessionaria[]>([]);
    const [loading, setLoading] = useState(false);

    const extrairErro = (error: any, mensagemPadrao: string) => {
        const data = error.response?.data;

        if (data) {
            if (data.erro) return String(data.erro);
            if (data.message) return String(data.message);
            if (data.error) return String(data.error);
        }

        return error.message || mensagemPadrao;
    };

    const listarConcessionaria = useCallback(async () => {
        setLoading(true);

        try {
            const resposta = await api.get('/concessionaria');
            setConcessionaria(resposta.data);
        } catch (error: any) {
            Swal.fire(
                'Erro!',
                extrairErro(error, 'Erro ao buscar concessionárias'),
                'error'
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const buscarPorId = useCallback(async (id: number) => {
        try {
            const resposta = await api.get(`/concessionaria/${id}`);
            return resposta.data;
        } catch (error: any) {
            Swal.fire(
                'Erro!',
                extrairErro(error, 'Erro ao buscar concessionária'),
                'error'
            );

            return null;
        }
    }, []);

    const cadastrar = async (dados: {
        nome: string;
        cnpj: string;
        cidade: string;
    }) => {
        setLoading(true);

        try {
            await api.post('/concessionaria', dados);

            await Swal.fire(
                'Cadastrado!',
                'A concessionária foi cadastrada com sucesso.',
                'success'
            );

            return true;
        } catch (error: any) {
            Swal.fire(
                'Erro!',
                extrairErro(error, 'Erro ao cadastrar concessionária'),
                'error'
            );

            return false;
        } finally {
            setLoading(false);
        }
    };

    const atualizar = async (
        id: number,
        dados: {
            nome: string;
            cnpj: string;
            cidade: string;
        }
    ) => {
        setLoading(true);

        try {
            await api.put(`/concessionaria/${id}`, dados);

            await Swal.fire(
                'Atualizado!',
                'A concessionária foi atualizada com sucesso.',
                'success'
            );

            return true;
        } catch (error: any) {
            Swal.fire(
                'Erro!',
                extrairErro(error, 'Erro ao atualizar concessionária'),
                'error'
            );

            return false;
        } finally {
            setLoading(false);
        }
    };

    const excluir = async (id: number) => {
        const confirmacao = await Swal.fire({
            title: 'Excluir concessionária?',
            text: 'Esta ação não poderá ser desfeita!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacao.isConfirmed) {
            try {
                await api.delete(`/concessionaria/${id}`);

                Swal.fire(
                    'Excluída!',
                    'A concessionária foi removida.',
                    'success'
                );

                listarConcessionaria();
            } catch (error: any) {
                Swal.fire(
                    'Erro!',
                    extrairErro(error, 'Erro ao excluir concessionária'),
                    'error'
                );
            }
        }
    };

    return {
        concessionaria,
        loading,
        listarConcessionaria,
        buscarPorId,
        cadastrar,
        atualizar,
        excluir
    };
}