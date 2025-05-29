"use client";
import { useState, useEffect } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
// import link from '/homealuno/page.js'






export default function Portal() {

  const backendUrl = `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:3001`;
  const [activeForm, setActiveForm] = useState(null);
  const [animado, setAnimado] = useState(false)
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
    let newValue = value;

    if (name === 'cpf') {
      // Remove tudo que não for número
      const numericValue = value.replace(/\D/g, '');

      // Aplica a máscara de CPF: 000.000.000-00
      newValue = numericValue
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
        .slice(0, 14); // Limita ao tamanho máximo com máscara
    }



    if (name === 'ra') {
      const numericValue = value.replace(/\D/g, '');
      newValue = numericValue
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .slice(0, 11); // Limita a 11 caracteres (sem hífen)
    }


    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const animacao = () => {
    setAnimado(true);
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeForm === 'aluno') {
      try {
        const response = await fetch(`${backendUrl}/login/aluno`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            RA_aluno: formData.ra.replace(/\D/g, ''),
            senha_aluno: formData.senha
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Salva o token no localStorage para depois pra poder logar
          localStorage.setItem('token', data.token);

          // Feedback ou redirecionamento pra saber que deu certo
          animacao();
          const timeout = setTimeout(() => {
            router.push('/homealuno');
          }, 1950)



        } else {
          if (data.mensagem === 'Usuário não encontrado') {
            document.getElementById('mensagemLogin').textContent = data.mensagem || 'Erro ao fazer login';
            document.getElementById('mensagemSenha').textContent = '';

          } else {
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
        const response = await fetch(`${backendUrl}/login/professor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cpf_professor: formData.cpf.replace(/\D/g, ''), // remove tudo que não for número
            senha_professor: formData.senha
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Salva o token no localStorage para depois pra poder logar
          localStorage.setItem('token', data.token);

          // Feedback ou redirecionamento pra saber que deu certo
          animacao();
          const timeout = setTimeout(() => {
            router.push('/professor');
          }, 1950)



        } else {
          if (data.mensagem === 'Usuário não encontrado') {
            document.getElementById('mensagemLogin').textContent = data.mensagem || 'Erro ao fazer login';
            document.getElementById('mensagemSenha').textContent = '';

          } else {
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
        const response = await fetch(`${backendUrl}/login/coordenador`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cpf_coordenador: formData.cpf.replace(/\D/g, ''),
            senha_coordenador: formData.senha
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Salva o token no localStorage para depois pra poder logar
          localStorage.setItem('token', data.token);

          // Feedback ou redirecionamento pra saber que deu certo
          const timeout = setTimeout(() => {
            animacao();
            router.push('/coordenador');
          }, 4200)



        } else {
          if (data.mensagem === 'Usuário não encontrado') {
            document.getElementById('mensagemLogin').textContent = data.mensagem || 'Erro ao fazer login';
            document.getElementById('mensagemSenha').textContent = '';

          } else {
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


  //qrcode
  const [url, setUrl] = useState('');

  useEffect(() => {
    const host = window.location.host;

    setUrl(`http://${host}`);
  }, []);


  return (
    <>
      {animado && (
        <div className=" slide-in-left bg-sky-800 z-50 fixed w-[100%] h-[100vh]">
          <div className="text-4xl justify-center items-center flex w-[100%] h-[100%]">
            <p className=" text-black font-bold">Carregando <b>...</b></p>
          </div>
        </div>
      )}

      <div className=" slide-in-volta bg-sky-800 z-50 fixed w-[100%] h-[100vh]"></div>



      <div className="overflow-y-hidden h-screen bg-[url('/background-sm.jpg')] md:bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat flex flex-col">
        <div className="pr-8 flex justify-end items-center">
          <div className="flex items-center gap-4 w-[100%] md:w-auto">
            <img
              className="w-22 md:w-40 mx-38 sm:mx-10 md:mx-0"
              src="./logo2.png"
              alt="Logo"
            />
            <span className="hidden sm:block h-14 w-1 bg-[#1f557b]"></span>
            <h2 className="text-[#1f557b] text-[15px] md:text-2xl font-bold">
              <span className="hidden sm:block">Centro Educacional</span>
              <span className="hidden sm:block">Prof. Tereza Costa</span>
            </h2>
          </div>
        </div>

        <div className={`flex flex-col items-center justify-center text-[#1f557b] font-bold text-6xl titulo transition-opacity duration-700 ${activeForm ? 'fade-out' : 'fade-in'}`}>
          <h1 className='text-3xl md:text-[49px] lg:text-[50px]'>Olá, seja bem vindo!</h1>
          <h4 className='hidden md:block text-[18px]'>Controle acadêmico de presença de forma prática e segura.</h4>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center pb-20 sm:pb-32">
          <div className={`transition-opacity duration-700 ${activeForm ? 'fade-out' : 'fade-in'}`}>
            <h1 className='m-5 text-[#1f557b] font-bold text-[16px] md:text-[18px]'>Escolha abaixo um perfil para acessar.</h1>
          </div>

          {!activeForm ? (
            <div className="flex gap-10 flex-col sm:flex-col md:flex-row">
              {['aluno', 'professor', 'coordenacao'].map(type => (
                <button
                  key={type}
                  onClick={() => handleButtonClick(type)}
                  className="w-60 h-20 md:w-40 md:h-20 bg-white rounded-[10px] cursor-pointer hover:bg-blue-200 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1"
                  type="button"
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white p-4 sm:p-6 rounded-[20px] shadow-2xl w-[88%] sm:w-[80%] md:w-full max-w-md slide-in mt-8 sm:mt-0 max-h-[500px] overflow-y-auto">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-800">
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

              <form onSubmit={handleSubmit} className="space-y-4">
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
                      onClick={() => {
                        setShowModal(true);
                        animacao();
                      }}
                      className="cursor-pointer hover:text-blue-900 mt-4 text-center text-sm text-blue-600 font-semibold"
                    >
                      Entre em outros dispositivos através do QR code!
                    </p>
                  </>
                ) : (
                  <>
                    <p>Esqueceu sua senha? Redefina através do e-mail institucional.</p>
                    <div className="mt-4 text-center text-sm text-gray-600">
                      {(activeForm === 'professor' || activeForm === 'coordenacao') && (
                        <>
                          <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                          <p
                            onClick={() => {
                              setShowModal(true);
                              animacao();
                            }}
                            className="cursor-pointer hover:text-blue-900 mt-4 text-center text-sm text-blue-600 font-semibold"
                          >
                            Entre em outros dispositivos através do QR code!
                          </p>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>


        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md p-6 relative max-h-screen overflow-y-auto">

              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h3 className="text-xl font-semibold text-gray-900">QR Code</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className=' flex flex-col items-center justify-center'>
                <p className='mb-4 text-center'>Escaneie o QR code no seu telefone/tablet:</p>
                {url && <QRCodeSVG value={url} size={200} />}

              </div>

            </div>
          </div>
        )}
      </div>

    </>
  );
}
