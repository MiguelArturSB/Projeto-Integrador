'use client'
import React from 'react';
import dynamic from 'next/dynamic';

// Carrega o componente Chart do ApexCharts de forma dinâmica
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * Componente de gráfico de pizza para exibir o progresso de aulas dadas.
 * 
 * Props:
 * - aulasDadas: number (Quantidade de aulas que já foram ministradas)
 * - aulasTotais: number (Quantidade total de aulas planejadas)
 * - titulo: string (Título do gráfico)
 */
export default function GraficoPizza({ aulasDadas = 0, aulasTotais = 0, titulo }) {
  
  // Calcula os percentuais com base nas novas props
  const percentualDadas = aulasTotais > 0 ? (aulasDadas / aulasTotais) * 100 : 0;
  const percentualRestantes = 100 - percentualDadas;
  
  const series = [
    parseFloat(percentualDadas.toFixed(1)),
    parseFloat(percentualRestantes.toFixed(1))
  ];

  const options = {
    chart: {
      type: 'pie',
      height: 350,
    },
    // Labels atualizadas para refletir os dados corretamente
    labels: ['Aulas Dadas', 'Aulas Restantes'], 
    colors: ['#054068', '#b6dffa'], // Cor mais escura para 'Dadas', mais clara para 'Restantes'
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
    states: {
      hover: {
        filter: {
          colors: ['#054068', '#b6dffa'],
          type: 'darck', // 'darck' parece ser um erro de digitação, deveria ser 'dark', mas deixado conforme original
          value: 0.15,
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: 'Inter, sans-serif',
      },
      formatter: function (val, { seriesIndex }) {
          // Mostra o valor em porcentagem
          return `${series[seriesIndex].toFixed(1)}%`;
      },
    },
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 md:p-6">
      <h2 className="text-xl text-center font-bold text-sky-900 mb-4">{titulo}</h2>
      
      {/* A condição agora verifica 'aulasTotais' */}
      {aulasTotais === 0 ? ( 
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