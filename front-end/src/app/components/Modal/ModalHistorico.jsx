'use client'

import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

/**
 * ModalHistorico
 * 
 * Modal para exibir o histórico de faltas do aluno autenticado.
 * Busca o histórico no backend ao abrir o modal, usando o token JWT salvo no localStorage.
 * 
 * Props:
 * - isOpen (boolean): controla se o modal está aberto
 * - onClose (function): chamada ao fechar o modal
 */
export default function ModalHistorico({ isOpen, onClose }) {
    const [historico, setHistorico] = useState([]);
    const [erro, setErro] = useState('');
    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState(null);

    const backendUrl = `http://localhost:3001`;

    // Busca o histórico de faltas do aluno autenticado
    const buscarHistorico = async (token, decoded) => {
        if (!decoded?.idAluno) {
            console.warn('ID do aluno não encontrado no token:', decoded);
            setErro("Sessão inválida. Faça login novamente.");
            return;
        }

        const payload = { ID_aluno: decoded.idAluno };
        try {
            const response = await fetch(`${backendUrl}/aluno/viewH`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setHistorico(data.view || []);
                setErro('');
            } else {
                setErro(data.mensagem || "Erro ao buscar dados de presença.");
            }
        } catch (error) {
            setErro("Erro de conexão com o servidor. Tente novamente mais tarde.");
        }
    };

    // Executa busca ao abrir o modal
    useEffect(() => {
        if (isOpen) {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                try {
                    const decodedToken = jwtDecode(storedToken);
                    setToken(storedToken);
                    setDecoded(decodedToken);
                    buscarHistorico(storedToken, decodedToken);
                } catch (e) {
                    setErro("Sessão inválida. Por favor, faça login novamente.");
                }
            } else {
                setErro("Sessão expirada. Faça login novamente.");
            }
            window.scrollTo(0, 0);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[90vh] flex flex-col mx-2"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#054068]">
                        Histórico de Faltas
                    </h2>
                </div>

                <div className="max-h-60 md:max-h-100 overflow-auto">
                    {erro ? (
                        <p className="text-center text-sm p-4 text-red-600">{erro}</p>
                    ) : historico.length > 0 ? (
                        historico.map((item, index) => (
                            <div key={index} className="flex flex-col items-center justify-center bg-blue-100 w-auto mx-3 my-2 sm:my-3 rounded-2xl">
                                <h1 className="text-xl sm:text-2xl m-1 font-semibold text-[#1d577b]">{new Date(item.data_falta).toLocaleDateString('pt-BR')}</h1>
                                <hr className="border-t m-1 border-b-blue-950 w-full" />
                                <h2 className="font-semibold text-sm sm:text-base text-[#1d577b]">Faltou na matéria:</h2>
                                <p className="text-sm sm:text-base">{item.materia}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-sm p-4 text-gray-500">Nenhuma falta registrada.</p>
                    )}
                </div>

                <div className="flex justify-end p-3 sm:p-4 border-t">
                    <button
                        onClick={onClose}
                        className="bg-[#1d577b] text-white font-bold py-1 px-4 sm:py-2 sm:px-6 rounded-lg hover:bg-[#15435f] transition-colors cursor-pointer text-sm sm:text-base"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}