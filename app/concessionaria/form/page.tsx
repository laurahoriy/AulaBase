'use client';

import { useConcessionariaForm } from '@/app/hooks/useConcessionariaForm';

export default function ConcessionariaForm() {
    const {
        nome, setNome,
        cnpj, setCnpj,
        cidade, setCidade,
        editandoId,
        carregando,
        salvando,
        salvar,
        cancelar
    } = useConcessionariaForm();

    if (carregando) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 font-medium">
                    Carregando dados da concessionária...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    {editandoId ? 'Editar Concessionária' : 'Nova Concessionária'}
                </h1>

                <form onSubmit={salvar} className="space-y-6">
                    <div>
                        <label
                            htmlFor="nome"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nome da Concessionária
                        </label>

                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Ex: Concessionária ABC"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="cnpj"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            CNPJ
                        </label>

                        <input
                            id="cnpj"
                            type="text"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            placeholder="Ex: 00.000.000/0001-00"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="cidade"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Cidade
                        </label>

                        <input
                            id="cidade"
                            type="text"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            placeholder="Ex: Itapetininga"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={cancelar}
                            disabled={salvando}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={salvando}
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-sm disabled:opacity-70 flex items-center gap-2"
                        >
                            {salvando ? 'Salvando...' : 'Salvar Concessionária'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}