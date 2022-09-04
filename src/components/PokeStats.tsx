import { Pokemon } from "@prisma/client";

export const PokeStats:React.FC<{
    reset: () => void,
    left: Pokemon,
    right: Pokemon
}> = ({reset, left, right}) => {
    return (
        <>
            <div className="mt-10 text-xl gap-6 flex justify-between items-end">
                <div>
                    <div className="bg-red-400 mx-auto grow-antimation" style={{
                        width: '4rem',
                        height: `${left.kept * 25}px`
                    }}></div>
                    <p className="capitalize">{left.name} wins: {left.kept}</p>
                </div>
                
                <div>
                    <div className="bg-red-300 mx-auto grow-antimation" style={{
                        width: '4rem',
                        height: `${left.left * 25}px`
                    }}></div>
                    <p className="capitalize">{left.name} losses: {left.left}</p>
                </div>

                <div>
                    <div className="bg-blue-400 mx-auto grow-antimation" style={{
                        width: '4rem',
                        height: `${right.kept * 25}px`
                    }}></div>
                    <p className="capitalize">{right.name} wins: {right.kept}</p>
                </div>

                <div>
                    <div className="bg-blue-300 mx-auto grow-antimation" style={{
                        width: '4rem',
                        height: `${right.left * 25}px`
                    }}></div>
                    <p className="capitalize">{right.name} losses: {right.left}</p>
                </div>

            </div>
            <button className="mt-5 px-5 py-1 border text-xl border-gray-500 rounded hover:bg-gray-600" onClick={reset}>Next</button>
        </>
    );
};