import { Pokemon } from "@prisma/client";

export const PokeStats:React.FC<{
    reset: () => void,
    left: Pokemon,
    right: Pokemon
}> = ({reset, left, right}) => {
    return (
        <>
            <div className="mt-10 text-xl">
                <p className="capitalize">{left.name} wins: {left.kept}</p>
                <p className="capitalize">{left.name} losses: {left.left}</p>
                <p className="capitalize">{right.name} wins: {right.kept}</p>
                <p className="capitalize">{right.name} losses: {right.left}</p>
                <button className="mt-3 px-3 py-0 border border-gray-500 rounded hover:bg-gray-300" onClick={reset}>Next</button>
            </div>
        </>
    );
};