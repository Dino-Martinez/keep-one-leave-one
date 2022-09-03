import Image from "next/image";
import { inferQueryResponse } from "../pages/api/trpc/[trpc]";

type Pokemon = inferQueryResponse<"pokemon.getPokemonPair">["first"];
export const PokemonDisplay: React.FC<{
    pokemon: Pokemon,
    vote: ()=>void
}> = ({pokemon, vote}) => {
    if (!pokemon) return <></>;
    return (
        <div className="flex flex-col p-6 px-12 border border-gray-500 rounded">
                <h3 className="text-center capitalize">{pokemon.name}</h3>
                <Image
                  src={pokemon.sprite}
                  alt={`Image of ${pokemon.name}`}
                  width={256}
                  height={256}
                  layout="fixed"
                />
                <button className="px-0 py-3 border border-gray-500 rounded hover:bg-gray-300" onClick={vote}>Keep me!</button>
              </div>
    );
};