'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../lib/api';
import { Concessionaria } from '../types/concessionaria';
import Swal from 'sweetalert2';

export function useConcessionariaForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cidade, setCidade] = useState('');

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
            buscarConcessionariaPorId(Number(idParam));
        }
    }, [idParam]);

    const buscarConcessionariaPorId = async (id: number) => {
        setCarregando(true);

        try {
            const resposta = await api.get(`/concessionaria/${id}`);
            const concessionaria = resposta.data;

            setEditandoId(concessionaria.id!);
            setNome(String(concessionaria.nome));
            setCnpj(
                concessionaria.cnpj
                    ? String(concessionaria.cnpj)
                    : ''
            );
            setCidade(
                concessionaria.cidade
                    ? String(concessionaria.cidade)
                    : ''
            );

        } catch (error: any) {

            Swal.fire({
                title: 'Erro!',
                text: extrairErro(
                    error,
                    'Erro ao buscar os detalhes da concessionária.'
                ),
                icon: 'error',
                confirmButtonColor: '#3b82f6'
            });

            router.push('/concessionaria');

        } finally {
            setCarregando(false);
        }
    };

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();
        setSalvando(true);

        try {

            if (editandoId) {

                const dados = {
                    nome,
                    cnpj,
                    cidade
                };

                await api.put(
                    `/concessionaria/${editandoId}`,
                    dados
                );
                router.push('/concessionaria');

            } else {

                const dados: Concessionaria = {
                    nome,
                    cnpj,
                    cidade
                };

                await api.post(
                    '/concessionaria',
                    dados
                );
            }

            await Swal.fire({
                title: 'Sucesso!',
                text: 'Concessionária salva com sucesso!',
                icon: 'success',
                confirmButtonColor: '#8b5cf6'
            });

            router.push('/concessionaria');

        } catch (error: any) {

            Swal.fire({
                title: 'Atenção!',
                text: extrairErro(
                    error,
                    'Erro ao salvar a concessionária.'
                ),
                icon: 'warning',
                confirmButtonColor: '#3b82f6'
            });

        } finally {
            setSalvando(false);
        }
    };

    const cancelar = () => {
        router.push('/concessionaria');
    };

    return {
        nome,
        setNome,

        cnpj,
        setCnpj,

        cidade,
        setCidade,

        editandoId,
        carregando,
        salvando,

        salvar,
        cancelar
    };
}