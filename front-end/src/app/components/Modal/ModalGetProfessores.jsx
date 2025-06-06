'use client';
import { useState } from 'react';

const ModalBuscaProfessor = ({ isOpen, onClose, onSelectProfessor, professores }) => {
  const [termoBusca, setTermoBusca] = useState('');

  if (!isOpen) return null;

  const professoresFiltrados = professores.filter(professor =>
    professor.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    professor.cpf.includes(termoBusca) ||
    (professor.turma && professor.turma.toLowerCase().includes(termoBusca.toLowerCase())) ||
    (professor.disciplina && professor.disciplina.toLowerCase().includes(termoBusca.toLowerCase()))
  );

  return (
    <div className="fixed inset-0  bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col mx-4">

        <div className="flex justify-between items-center p-3">
          <h2 className="text-lg font-semibold text-[#054068]">Buscar Professor</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-lg cursor-pointer"
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
              placeholder="Nome, CPF, turma ou disciplina"
              autoFocus
            />
          </div>

  
          {professoresFiltrados.length > 0 ? (
            <div className="border-t border-gray-200 max-h-[60vh] overflow-y-auto overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-800">
                <thead className="text-xs bg-[#054068] text-white sticky top-0">
                  <tr>
                    <th className="px-4 py-2">Nome</th>
                    <th className="px-4 py-2">CPF</th>
                    <th className="px-4 py-2">Disciplina</th>
                    <th className="px-4 py-2">Turma</th>
                  </tr>
                </thead>
                <tbody>
                  {professoresFiltrados.map((professor, index) => (
                    <tr
                      key={professor.cpf}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-slate-200 cursor-pointer transition-all`}
                      onClick={() => {
                        onSelectProfessor(professor);
                        onClose();
                      }}
                    >
                      <td className="px-4 py-2 font-medium whitespace-nowrap truncate max-w-[200px]">{professor.nome}</td>
                      <td className="px-4 py-2">{professor.cpf}</td>
                      <td className="px-4 py-2">{professor.disciplina}</td>
                      <td className="px-4 py-2">{professor.turma}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-3 text-gray-500 text-sm">
              {termoBusca ? "Nenhum professor encontrado" : "Digite para buscar professores"}
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default ModalBuscaProfessor;