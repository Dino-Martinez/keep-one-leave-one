import Image from "next/image";
import { inferQueryResponse } from "../pages/api/trpc/[trpc]";

type Pokemon = inferQueryResponse<"pokemon.getPokemonPair">["first"];
export const PokemonDisplay: React.FC<{
    pokemon: Pokemon,
    vote: ()=>void,
    disabled: boolean
}> = ({pokemon, vote, disabled}) => {
    //Typescript wasn't happy
    if (!pokemon) return <></>;
    
    return (
        <div className="flex flex-col p-6 px-12 border border-gray-500 rounded">
                <h2 className="text-center capitalize">{pokemon.name}</h2>
                <Image
                  src={pokemon.sprite}
                  alt={`Image of ${pokemon.name}`}
                  width={256}
                  height={256}
                  layout="fixed"
                  className="floating-animation"
                />
                <button className={`px-0 py-3 border border-gray-500 rounded hover:bg-gray-600 disabled:bg-gray-500 disabled:text-gray-400 ${disabled ? 'cursor-not-allowed focus:outline-none' : '' }`} disabled={disabled} onClick={vote}>Keep me!</button>
              </div>
    );
};