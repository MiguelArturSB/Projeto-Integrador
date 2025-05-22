"use client"

import { useState } from 'react';
import './prof.css';



export default function professor() {
    const [clicado, setClicado] = useState(false);
      const toggleClicado = () => {
    setClicado(!clicado);
  };
      
    return (
        <>
        
            <div className='bg-[#c9e8ff] w-[100%] h-screen items-center mx-auto flex justify-center '>
                <div className='mt-[60px] rendondo_grand w-[1450px] h-[850px] mx-auto flex items-center justify-center bg-[#899197]'>
               
                <nav className='
                rounded-full 
                absolute 
                w-[150px] h-[50px] 
                bg-[#d8dde0]  
                z-10 
                items-center text-center flex justify-center
                top-45 left-140
                 shadow_nim'>
                    <p className='font-bold text-xl'>Turma:2md</p>
                    </nav>

                    <nav className='
                rounded-full 
                absolute 
                w-[150px] h-[50px] 
                bg-[#d8dde0]  
                z-10 
                items-center text-center flex justify-center
                top-45 left-210
                shadow_nim'>
                    <p className='font-bold text-xl'>Materia:LER</p>
                    </nav>
                
                <div className='
        w-[1400px] 
        h-[800px] 
        overflow-y-auto
        bg-[#b2bac0] 
        rendondo_pequeno'>

        <div className='m-auto  w-[1350px] h-[60px] bg-[#d8dde0] rounded-full shadow_nim mt-[45] pl-[130px] pr-[270px] justify-between flex items-center'>

        <p className=' text-2xl'>Nome</p>
        <p className='f text-2xl'>RA</p>
        <p className=' text-2xl'>Frequencia</p>
        </div>


<div className='m-auto w-[1350px] h-[60px] bg-[#d8dde0] rounded-full shadow_nim mt-[25] pl-[50px] pr-[10px]  justify-between flex items-center'>

        <p className=' text-2xl'>Miguel Artur da Silva Barros</p>
        <p className='f text-2xl pr-[200px]'>10000000001</p>
        <p className=' text-2xl pr-[60px]'>100%</p>
        
         <button
      onClick={toggleClicado}
      className={`cursor-pointer rounded-full w-[70px] h-[50px] transition-colors duration-300 ${
        clicado ? 'bg-[#00bf63]' : 'bg-[#899197]'
      }`}
    ></button>

        </div>


        

        </div>




<button className='
                rounded-full 
                absolute 
                w-[190px] h-[60px] 
                bg-[#50bcff]
                text-[#ffffff]
                cursor-pointer
                z-10 
                items-center text-center flex justify-center
                top-250 left-420
                 shadow_nim
                 font-bold 
                 text-xl

                  hover:scale-105 transition-all duration-300
                 '
                  
                    >Turma:2md</button>
        </div>
            </div>
        </>
    );

}