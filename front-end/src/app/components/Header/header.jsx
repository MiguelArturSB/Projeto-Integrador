import './header.css'

export default function HomeAluno() {
    return (
      <header className="bg-[#054068]">
  <div className='flex flex-col items-center justify-center text-4xl shadow-xl/30 shadow-blue-900 relative py-4'>
    
    <div className='absolute top-4 right-4 cursor-pointer'>
      <a href='/perfilaluno'>
      <img src="./usericon.svg" width={50} alt="Acessar perfil" className="cursor-pointer hover:opacity-80 transition-opacity" />
      </a>
    </div>

    <img src='./logo2.png' width={200} className='mt-2' />
    <h1 className='text-white font-bold text-shadow-2xs text-shadow-black text-center mt-2'>
      Seja Bem-vindo ao Portal de frequência do Aluno!
    </h1>
    <h4 className='text-white text-2xl mt-2 mb-2 text-center'>
      texto texto texto texto texto texto
    </h4>
  </div>
</header>
    );
  }
  