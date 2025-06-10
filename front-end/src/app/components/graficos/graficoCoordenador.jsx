'use client'
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function GraficoPizza({ dadosDaTurma, titulo }) {
  
  const totalFaltas = dadosDaTurma?.totalFaltas || 0;
  const totalAulas = dadosDaTurma?.totalAulas || 0;

  const percentualFaltas = totalAulas > 0 ? (totalFaltas / totalAulas) * 100 : 0;
  const percentualPresencas = 100 - percentualFaltas;
  
  const series = [
    parseFloat(percentualFaltas.toFixed(1)),
    parseFloat(percentualPresencas.toFixed(1))
  ];

  const options = {
    chart: {
      type: 'pie',
      height: 350,
    },
    labels: ['Faltas', 'Presenças'], 
    colors: ['#054068', '#b6dffa'],
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif',
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val.toFixed(1)}%`;
        }
      }
    },
    // EFEITO DE HOVER NA POSIÇÃO CORRETA
    states: {
      hover: {
        filter: {
          colors: ['#054068', '#b6dffa'],
          type: 'darck',
          value: 0.15,
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: 'Inter, sans-serif',
      },
      formatter: function (val) {
        return `${val.toFixed(1)}%`;
      },
    },
  };

  return (
    <div className="w-full bg-white rounded-lg  p-4 md:p-6">
      <h2 className="text-xl text-center font-bold text-sky-900 mb-4">{titulo}</h2>
      {totalAulas === 0 ? ( 
        <div className="h-[350px] flex items-center justify-center">
          <p className="text-gray-500">Não há dados de aulas para esta turma.</p>
        </div>
      ) : (
        <Chart 
          options={options} 
          series={series} 
          type="pie"  
          height={350} 
        />
      )}
    </div>
  );
}