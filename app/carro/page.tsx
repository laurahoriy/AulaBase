'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCarros } from '@/app/hooks/useCarro';

export default function Carro() {
    const { carros, loading, listarCarros, excluir } = useCarros();

    useEffect(() => {
        listarCarros();
    }, [listarCarros]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Meus Veículos</h1>

                <Link
                    href="/carro/form"
                    className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-md text-2xl pb-1"
                    title="Adicionar novo veículo"
                >
                    +
                </Link>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                                Id
                            </th>

                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                                Nome
                            </th>

                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                                Tipo
                            </th>

                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider text-right">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-8 text-center text-gray-500 font-medium"
                                >
                                    Carregando veículos...
                                </td>
                            </tr>
                        ) : carros.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-8 text-center text-gray-500 font-medium"
                                >
                                    Nenhum veículo encontrado.
                                </td>
                            </tr>
                        ) : (
                            carros.map((carro) => (
                                <tr
                                    key={carro.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        {carro.id}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {carro.nome}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {carro.tipo}
                                    </td>

                                    <td className="px-6 py-4 text-sm flex justify-end gap-4 items-center">
                                        <Link
                                            href={`/carro/form?id=${carro.id}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            onClick={() => excluir(carro.id!)}
                                            className="text-red-500 hover:text-red-700 font-medium transition-colors"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}