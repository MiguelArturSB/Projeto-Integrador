"use client"

import { useState } from "react";

export default function ProfessorTable() {
  const [presence, setPresence] = useState(true);

  const togglePresence = () => {
    setPresence((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center p-8
    
    ">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-6xl p-6 relative overflow-hidden">
        <h1 className=" font-bold text-gray-800 mb-6 border-b pb-4 text-xl 
        sm:text-4xl
        ">Painel da Presença</h1>

        <div className="flex  flex-row justify-between mb-6 gap-4
        sm:flex-row
        ">
          <div className="bg-sky-100 text-sky-800 px-3 py-3 rounded-full font-medium shadow-inner 
          text-sm sm:text-xl sm:px-6
          ">
            Turma: <span className="font-semibold">2MD</span>
          </div>
          <div className="bg-emerald-100 text-emerald-800 px-3 py-3 rounded-full font-medium shadow-inner
           text-sm sm:text-xl  sm:px-6">
            Matéria: <span className="font-semibold">LER</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed rounded-xl overflow-hidden shadow-md
          sm:table-auto
          
          ">
            <thead>
              <tr className="bg-gradient-to-r from-slate-700 to-slate-900 text-white text-left text-sm 
              sm:text-lg
              
              ">
                <th className=" px-6   font-semibold text-xs sm:text-sm">Nome</th>
                <th className="py-4 px-6 font-semibold  text-xs sm:text-sm">RA</th>
                <th className="py-4 px-6 font-semibold  text-xs sm:text-sm">Frequência</th>
                <th className="py-4 px-6 font-semibold  text-xs sm:text-sm">Presente</th>
              </tr>
            </thead>
            <tbody>

              <tr className="odd:bg-white even:bg-slate-100 hover:bg-slate-200 transition-all">
                <td className="py-1 px-6 text-gray-700  text-xs sm:text-sm sm:py-4">Miguel Artur da Silva Barros</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">10000000001</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">100%</td>
                <td className="py-4 px-6">
                  <button
                    onClick={togglePresence}
                    className={`w-6 h-6 rounded-full border-4 transition-colors duration-300 ${
                      presence ? "bg-red-500 border-red-700" : " bg-green-500 border-green-700"
                    }`}
                    title={presence ? "Ausente" : "Presente"}
                  ></button>
                </td>
              </tr>


              <tr className="odd:bg-white even:bg-slate-100 hover:bg-slate-200 transition-all">
                <td className="py-1 px-6 text-gray-700  text-xs sm:text-sm sm:py-4">Miguel Artur da Silva Barros</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">10000000001</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">100%</td>
                <td className="py-4 px-6">
                  <button
                    onClick={togglePresence}
                    className={`w-6 h-6 rounded-full border-4 transition-colors duration-300 ${
                      presence ? "bg-red-500 border-red-700" : " bg-green-500 border-green-700"
                    }`}
                    title={presence ? "Ausente" : "Presente"}
                  ></button>
                </td>
              </tr>





              <tr className="odd:bg-white even:bg-slate-100 hover:bg-slate-200 transition-all">
                <td className="py-1 px-6 text-gray-700  text-xs sm:text-sm sm:py-4">Miguel Artur da Silva Barros</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">10000000001</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">100%</td>
                <td className="py-4 px-6">
                  <button
                    onClick={togglePresence}
                    className={`w-6 h-6 rounded-full border-4 transition-colors duration-300 ${
                      presence ? "bg-red-500 border-red-700" : " bg-green-500 border-green-700"
                    }`}
                    title={presence ? "Ausente" : "Presente"}
                  ></button>
                </td>
              </tr>










              <tr className="odd:bg-white even:bg-slate-100 hover:bg-slate-200 transition-all">
                <td className="py-1 px-6 text-gray-700  text-xs sm:text-sm sm:py-4">Miguel Artur da Silva Barros</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">10000000001</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">100%</td>
                <td className="py-4 px-6">
                  <button
                    onClick={togglePresence}
                    className={`w-6 h-6 rounded-full border-4 transition-colors duration-300 ${
                      presence ? "bg-red-500 border-red-700" : " bg-green-500 border-green-700"
                    }`}
                    title={presence ? "Ausente" : "Presente"}
                  ></button>
                </td>
              </tr>










              <tr className="odd:bg-white even:bg-slate-100 hover:bg-slate-200 transition-all">
                <td className="py-1 px-6 text-gray-700  text-xs sm:text-sm sm:py-4">Miguel Artur da Silva Barros</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">10000000001</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">100%</td>
                <td className="py-4 px-6">
                  <button
                    onClick={togglePresence}
                    className={`w-6 h-6 rounded-full border-4 transition-colors duration-300 ${
                      presence ? "bg-red-500 border-red-700" : " bg-green-500 border-green-700"
                    }`}
                    title={presence ? "Ausente" : "Presente"}
                  ></button>
                </td>
              </tr>










              <tr className="odd:bg-white even:bg-slate-100 hover:bg-slate-200 transition-all">
                <td className="py-1 px-6 text-gray-700  text-xs sm:text-sm sm:py-4">Miguel Artur da Silva Barros</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">10000000001</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">100%</td>
                <td className="py-4 px-6">
                  <button
                    onClick={togglePresence}
                    className={`w-6 h-6 rounded-full border-4 transition-colors duration-300 ${
                      presence ? "bg-red-500 border-red-700" : " bg-green-500 border-green-700"
                    }`}
                    title={presence ? "Ausente" : "Presente"}
                  ></button>
                </td>
              </tr>










              <tr className="odd:bg-white even:bg-slate-100 hover:bg-slate-200 transition-all">
                <td className="py-1 px-6 text-gray-700  text-xs sm:text-sm sm:py-4">Miguel Artur da Silva Barros</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">10000000001</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">100%</td>
                <td className="py-4 px-6">
                  <button
                    onClick={togglePresence}
                    className={`w-6 h-6 rounded-full border-4 transition-colors duration-300 ${
                      presence ? "bg-red-500 border-red-700" : " bg-green-500 border-green-700"
                    }`}
                    title={presence ? "Ausente" : "Presente"}
                  ></button>
                </td>
              </tr>









              <tr className="odd:bg-white even:bg-slate-100 hover:bg-slate-200 transition-all">
                <td className="py-1 px-6 text-gray-700  text-xs sm:text-sm sm:py-4">Miguel Artur da Silva Barros</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">10000000001</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">100%</td>
                <td className="py-4 px-6">
                  <button
                    onClick={togglePresence}
                    className={`w-6 h-6 rounded-full border-4 transition-colors duration-300 ${
                      presence ? "bg-red-500 border-red-700" : " bg-green-500 border-green-700"
                    }`}
                    title={presence ? "Ausente" : "Presente"}
                  ></button>
                </td>
              </tr>








              <tr className="odd:bg-white even:bg-slate-100 hover:bg-slate-200 transition-all">
                <td className="py-1 px-6 text-gray-700  text-xs sm:text-sm sm:py-4">Miguel Artur da Silva Barros</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">10000000001</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">100%</td>
                <td className="py-4 px-6">
                  <button
                    onClick={togglePresence}
                    className={`w-6 h-6 rounded-full border-4 transition-colors duration-300 ${
                      presence ? "bg-red-500 border-red-700" : " bg-green-500 border-green-700"
                    }`}
                    title={presence ? "Ausente" : "Presente"}
                  ></button>
                </td>
              </tr>









              <tr className="odd:bg-white even:bg-slate-100 hover:bg-slate-200 transition-all">
                <td className="py-1 px-6 text-gray-700  text-xs sm:text-sm sm:py-4">Miguel Artur da Silva Barros</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">10000000001</td>
                <td className="py-4 px-6 text-gray-700  text-xs sm:text-sm">100%</td>
                <td className="py-4 px-6">
                  <button
                    onClick={togglePresence}
                    className={`w-6 h-6 rounded-full border-4 transition-colors duration-300 ${
                      presence ? "bg-red-500 border-red-700" : " bg-green-500 border-green-700"
                    }`}
                    title={presence ? "Ausente" : "Presente"}
                  ></button>
                </td>
              </tr>




             
            </tbody>


          </table>
        </div>

        <div className=" mt-[2%]  flex justify-end ">
  <button className="px-6 py-3 bg-sky-600   hover:bg-sky-700 text-white rounded-full font-bold shadow-lg transition-transform transform hover:scale-105">
    Confirmar Presença
  </button>
</div>

      </div>
    </div>
  );
}
