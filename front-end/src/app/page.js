"use client";
import { useState } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';
// import link from '/homealuno/page.js'






export default function Portal() {
  const [activeForm, setActiveForm] = useState(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    ra: '',
    cpf: '',
    senha: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = (formType) => {
    setActiveForm(formType);
    setFormData({ ra: '', cpf: '', senha: '' });
  };

  const handleCloseForm = () => {
    setActiveForm(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };








  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeForm === 'aluno') {
      try {
        const response = await fetch('http://localhost:3000/login/Aluno', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            RA_aluno: formData.ra,
            senha_aluno: formData.senha
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Salva o token no localStorage para depois pra poder logar
          localStorage.setItem('token', data.token);

          // Feedback ou redirecionamento pra saber que deu certo
          router.push('/aluno/dashboard');


        } else {
          if (data.mensagem === 'Usuário não encontrado'){
            document.getElementById('mensagemLogin').textContent = data.mensagem || 'Erro ao fazer login';
            document.getElementById('mensagemSenha').textContent = '';
            
          }else{
            document.getElementById('mensagemSenha').textContent = data.mensagem || 'Erro ao fazer login';
            document.getElementById('mensagemLogin').textContent = '';
          }
          
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro de conexão com o servidor.');
      }

    }
    if (activeForm === 'professor') {
      try {
        const response = await fetch('http://localhost:3000/login/professor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cpf_professor: formData.cpf,
            senha_professor: formData.senha
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Salva o token no localStorage para depois pra poder logar
          localStorage.setItem('token', data.token);

          // Feedback ou redirecionamento pra saber que deu certo
          router.push('/professor');


        } else {
          if (data.mensagem === 'Usuário não encontrado'){
            document.getElementById('mensagemLogin').textContent = data.mensagem || 'Erro ao fazer login';
            document.getElementById('mensagemSenha').textContent = '';
            
          }else{
            document.getElementById('mensagemSenha').textContent = data.mensagem || 'Erro ao fazer login';
            document.getElementById('mensagemLogin').textContent = '';
          }
          
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro de conexão com o servidor.');
      }

    }

    if (activeForm === 'coordenacao') {
      try {
        const response = await fetch('http://localhost:3000/login/coordenador', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cpf_coordenador: formData.cpf,
            senha_coordenador: formData.senha
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Salva o token no localStorage para depois pra poder logar
          localStorage.setItem('token', data.token);

          // Feedback ou redirecionamento pra saber que deu certo
          router.push('/aluno/dashboard');


        } else {
          if (data.mensagem === 'Usuário não encontrado'){
            document.getElementById('mensagemLogin').textContent = data.mensagem || 'Erro ao fazer login';
            document.getElementById('mensagemSenha').textContent = '';
            
          }else{
            document.getElementById('mensagemSenha').textContent = data.mensagem || 'Erro ao fazer login';
            document.getElementById('mensagemLogin').textContent = '';
          }
          
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro de conexão com o servidor.');
      }

    }


  };



  return (
    <div className="overflow-y-hidden h-screen bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat flex flex-col">
      <div className="pr-8 flex justify-end items-center">
        <div className="flex items-center gap-4">
          <img src="./logo2.png" width={150} alt="Logo" />
          <span className="h-14 w-1 bg-[#1f557b]"></span>
          <h2 className="text-[#1f557b] text-2xl font-bold">
            <span className="block">Centro Educacional</span>
            <span className="block">Prof. Tereza Costa</span>
          </h2>
        </div>
      </div>

      <div className={`flex flex-col items-center justify-center text-[#1f557b] font-bold text-6xl titulo transition-opacity duration-700 ${activeForm ? 'fade-out' : 'fade-in'}`}>
        <h1 className='text-shadow-lg'>Olá, seja bem vindo!</h1>
        <h4 className='text-2xl'>Controle acadêmico de presença de forma prática e segura.</h4>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center pb-70">
        <div className={`transition-opacity duration-700 ${activeForm ? 'fade-out' : 'fade-in'}`}>
          <h1 className='m-5 text-[#1f557b] font-bold text-[18px]'>Escolha abaixo um perfil para acessar.</h1>
        </div>

        {!activeForm ? (
          <div className="flex gap-10">
            {['aluno', 'professor', 'coordenacao'].map(type => (
              <button
                key={type}
                onClick={() => handleButtonClick(type)}
                className="w-40 h-20 bg-white rounded-[10px] cursor-pointer hover:bg-blue-200 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 text-black"
                type="button"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white p-10 rounded-[20px] shadow-2xl w-full max-w-md slide-in">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-black">
                {activeForm === 'aluno' && 'Login do Aluno'}
                {activeForm === 'professor' && 'Login do Professor'}
                {activeForm === 'coordenacao' && 'Login da Coordenação'}
              </h3>
              <button
                onClick={handleCloseForm}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeForm === 'aluno' ? (

                <div>
                  <label htmlFor="ra" className="block text-sm font-medium text-gray-700">
                    Registro do Aluno (R.A.)
                  </label>
                  <input
                    type="text"
                    id="ra"
                    name="ra"
                    value={formData.ra}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <p id='mensagemLogin' className='text-red-600' ></p>
                </div>
              ) : (
                <div>
                  <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                    CPF
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="000.000.000-00"
                  />
                  <p id='mensagemLogin' className='text-red-600' ></p>
                </div>
              )}

              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p id='mensagemSenha' className='text-red-600'></p>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-[#1f557b] rounded-[10px] cursor-pointer hover:bg-[#0e3754] transition-all duration-300"
                >
                  Acessar
                </button>
              </div>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              {activeForm === 'aluno' ? (
                <>
                  <p>Problemas com seu R.A.? Entre em contato com a secretaria.</p>
                  <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                  <p
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer hover:text-blue-900 mt-4 text-center text-sm text-blue-600 font-semibold"
                  >
                    Entre em outros dispositivos através do QR code!
                  </p>
                </>
              ) : (
                <p>Esqueceu sua senha? Redefina através do e-mail institucional.</p>
              )}
            </div>
          </div>
        )}
      </div>


      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm opacity-100 ">
          <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 relative transform transition-all duration-500 scale-100 opacity-100">

            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center justify-center">QR Code</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className=' flex flex-col items-center justify-center'>
              <p>Escaneie o QR code no seu telefone/tablet:</p>
              <img src='./qrcode.jpg' ></img>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
