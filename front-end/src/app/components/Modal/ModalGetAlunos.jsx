'use client';
import { useState } from 'react';

const ModalBuscaAluno = ({ isOpen, onClose, onSelectAluno, alunos }) => {
  // const de buscas
  const [termoBusca, setTermoBusca] = useState('');

  // modal para fechar sozinho
  if (!isOpen) return null;


  // const para filtrar os alunos
  // aqui é só um teste para o front-end tabomm
  const alunosFiltrados = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    aluno.ra.includes(termoBusca) ||
    (aluno.turma && aluno.turma.toLowerCase().includes(termoBusca.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 backdrop-blur-sm  bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col mx-4">


        <div className="flex justify-between items-center p-3">
          <h2 className="text-lg font-semibold text-[#054068]">Buscar Aluno</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>


        <div className="p-3 overflow-y-auto flex-grow">


          <div className="relative mb-3">
            <input
              type="text"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full p-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
              placeholder="Nome, RA ou turma"
              autoFocus
            />
            <div className="absolute right-2 top-2 text-gray-400 text-sm select-none">
            </div>
          </div>


          {alunosFiltrados.length > 0 ? (
            <div className="border-t border-gray-200 max-h-[60vh] overflow-y-auto overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-800">
                <thead className="text-xs bg-[#054068] text-white sticky top-0">
                  <tr>
                    <th className="px-4 py-2">Nome</th>
                    <th className="px-4 py-2">RA</th>
                    <th className="px-4 py-2">Freq.</th>
                  </tr>
                </thead>
                <tbody>
                  {alunosFiltrados.map((aluno, index) => (
                    <tr
                      key={aluno.ra}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-slate-200 cursor-pointer transition-all`}
                      onClick={() => {
                        onSelectAluno(aluno);
                        onClose();
                      }}
                    >
                      <td className="px-4 py-2 font-medium whitespace-nowrap truncate max-w-[200px]">{aluno.nome}</td>
                      <td className="px-4 py-2">{aluno.ra}</td>
                      <td className="px-4 py-2">{aluno.frequencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-3 text-gray-500 text-sm">
              {termoBusca ? "Nenhum aluno" : "Busque por alunos"}
            </div>
          )}
        </div>


        
      </div>
    </div>
  );
};

export default ModalBuscaAluno;
