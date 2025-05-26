

export default function Perfil() {
  return (
    <div className="overflow-y-hidden h-screen bg-[url('/bgaluno.jpg')] bg-cover bg-center bg-no-repeat flex flex-col">
      <div className='text-center text-4xl text-[#054068] font-extrabold mt-11 text-shadow-2xs text-blackshadow'>
        <h1>Minhas informações</h1>
      </div>

      <div className='flex flex-col items-center justify-center p-3'>
        <div className='bg-white w-[700px] rounded-2xl shadow-2xl border-2 border-dashed border-[#054068] p-8'>

          <div className="flex flex-row gap-20 ">
            <div className="flex flex-col ">
              <div className='mb-5'>
                <h1 className='text-2xl text-[#054068] font-extrabold'>Nome do Aluno:</h1>
                <p className='bg-blue-100 w-full rounded-2xl text-gray-300 p-2'>Insira nome completo</p>
              </div>
              <div>
                <h1 className='text-2xl text-[#054068] font-extrabold'>Registro do Aluno (RA):</h1>
                <p className='bg-blue-100 w-full rounded-2xl text-gray-300 p-2'>Insira R.A do aluno</p>
              </div>
            </div>

         
            <div className="flex flex-col justify-center items-start w-1/3   ">
              <h1 className='text-2xl  text-[#054068] font-extrabold flex justify-center'>Turma:</h1>
              <p className='h-10 w-full text-center rounded-2xl bg-blue-100 text-gray-300 p-2 '>2MD</p>
            </div>
          </div>

        </div>
      </div>


    </div>
  );
}
