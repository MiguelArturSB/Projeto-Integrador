import HeaderCoordenador from "../components/headerCoordenador/page"
import Footer from "../components/Footer/page"

export default function Coordenador() {
 
    const alunos = [
        { nome: "Felipe Cardoso", ra: "100000011", frequencia: "56%" },
        { nome: "Carolina Pires", ra: "100000012", frequencia: "92%" },
        { nome: "Bruno Santos", ra: "100000013", frequencia: "58%" },
        { nome: "Letícia Nunes", ra: "100000014", frequencia: "31%" },
        { nome: "Rafael Teixeira", ra: "100000015", frequencia: "40%" },
        { nome: "Amanda Duarte", ra: "100000016", frequencia: "48%" },
        { nome: "Vinícius Gomes", ra: "100000017", frequencia: "67%" },
        { nome: "Beatriz Carvalho", ra: "100000018", frequencia: "29%" },
        { nome: "Henrique Melo", ra: "100000019", frequencia: "46%" },
        { nome: "Camila Araújo", ra: "100000020", frequencia: "35%" },
    ];

    return (
        <div className="bg-[#c9e8ff] min-h-screen">
            <HeaderCoordenador />
            <div className="p-10 text-3xl text-center text-[#054068] font-extrabold">
                <h1>Gerenciar alunos</h1>
            </div>

                <div className="flex justify-center gap-20">
                    <div className=" bg-white shadow-md sm:rounded-lg p-10">
                        <div className="bg-sky-100 text-sky-800 px-3 py-3 rounded-full font-medium shadow-inner w-40 text-sm sm:text-xl sm:px-6 mb-5 ">
                            <h1>Turma: 2MD</h1>
                        </div>
                        <table className=" text-sm text-left text-gray-800 ">
                            <thead className="text-xs  bg-[#054068] text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nome do Aluno
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        RA
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Frequência
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {alunos.map((aluno, index) => (
                                    <tr 
                                        key={aluno.ra} 
                                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b border-gray-200`}
                                    >
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                            {aluno.nome}
                                        </th>
                                        <td className="px-6 py-4">
                                            {aluno.ra}
                                        </td>
                                        <td className="px-6 py-4">
                                            {aluno.frequencia}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className=" bg-white shadow-md sm:rounded-lg p-10">
                        <div className="bg-sky-100 text-sky-800 px-3 py-3 rounded-full font-medium shadow-inner w-40 text-sm sm:text-xl sm:px-6 mb-5 ">
                            <h1>Turma: 2TD</h1>
                        </div>
                        <table className=" text-sm text-left text-gray-800 ">
                            <thead className="text-xs  bg-[#054068] text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nome do Aluno
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        RA
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Frequência
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {alunos.map((aluno, index) => (
                                    <tr 
                                        key={aluno.ra} 
                                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} border-b border-gray-200`}
                                    >
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                            {aluno.nome}
                                        </th>
                                        <td className="px-6 py-4">
                                            {aluno.ra}
                                        </td>
                                        <td className="px-6 py-4">
                                            {aluno.frequencia}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className=" bg-white shadow-md sm:rounded-lg p-10">
                        <div className="bg-sky-100 text-sky-800 px-3 py-3 rounded-full font-medium shadow-inner w-40 text-sm sm:text-xl sm:px-6 mb-5 ">
                            <h1>Turma: 2ND</h1>
                        </div>
                        <table className=" text-sm text-left text-gray-800 ">
                            <thead className="text-xs  bg-[#054068] text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nome do Aluno
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        RA
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Frequência
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {alunos.map((aluno, index) => (
                                    <tr 
                                        key={aluno.ra} 
                                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50' }  odd:bg-white even:bg-blue-50 hover:bg-slate-200 transition-all` }
                                    >
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                            {aluno.nome}
                                        </th>
                                        <td className="px-6 py-4">
                                            {aluno.ra}
                                        </td>
                                        <td className="px-6 py-4">
                                            {aluno.frequencia}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
             </div>

             <Footer />
            </div>
   
    );
}