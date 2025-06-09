'use client'

export default function ModalHistorico({ isOpen, onClose, presencas }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-50 flex justify-center items-center p-4"
            onClick={onClose} 
        >
            <div
                className="bg-white rounded-lg shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[90vh] flex flex-col mx-2"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#054068]">
                        Histórico de Faltas
                    </h2>
                </div>

                <div className="max-h-60 md:max-h-100 overflow-auto">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex flex-col items-center justify-center bg-blue-100 w-auto mx-3 my-2 sm:my-3 rounded-2xl">
                            <h1 className="text-xl sm:text-2xl m-1 font-semibold text-[#1d577b]">24/07</h1>
                            <hr className="border-t m-1 border-b-blue-950 w-full" />
                            <h2 className="font-semibold text-sm sm:text-base text-[#1d577b]">Faltou na matéria:</h2>
                            <p className="text-sm sm:text-base">LEV</p>
                        </div>
                    ))}
                </div>
                
                <div className="flex justify-end p-3 sm:p-4 border-t">
                    <button
                        onClick={onClose}
                        className="bg-[#1d577b] text-white font-bold py-1 px-4 sm:py-2 sm:px-6 rounded-lg hover:bg-[#15435f] transition-colors cursor-pointer text-sm sm:text-base"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}