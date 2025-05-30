'use client'

export default function Card() {
    const cardData = [
        {
            icon: '-',
            titulo: 'Remover aluno',
            descricao: 'Clique para remover um aluno do sistema'
        }
    ];

    return (
        <div className="card-container">
            {cardData.map((card, index) => (
                <div 
                    key={index}
                    className="card bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-blue-500"
                    onClick={() => console.log('Cadastrar aluno clicado')}
                >
                    <div className="card-icon flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 text-2xl mb-4">
                        {card.icon}
                    </div>
                    <h3 className="card-title text-lg font-semibold text-gray-800 mb-2">
                        {card.titulo}
                    </h3>
                    <p className="card-description text-gray-600">
                        {card.descricao}
                    </p>
                </div>
            ))}
        </div>
    );
}