import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { PokemonDisplay } from "../components/PokemonDisplay";
import { PokeStats } from "../components/PokeStats";
import { getPokedexCodes } from "../utils/getPokedexCodes";

interface Vote {
  voteFor: number,
  voteAgainst: number
}
const Home: NextPage = () => {
  const [hasVoted, setVoted] = useState(false);
  const [ids, setIds] = useState(getPokedexCodes());
  const {data: pokePair, refetch} = trpc.useQuery(["pokemon.getPokemonPair", ids], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  
  const voteMutation = trpc.useMutation("pokemon.vote");
  const vote = async (input: Vote) => {
    await voteMutation.mutate(input);
  };
  const reset = () => {
    setVoted(false);
    setIds(getPokedexCodes());
  };

  useEffect(() => {
    const updateStats = async () => {
      await refetch();
      setVoted(true);
    };

    if (!voteMutation.isLoading && voteMutation.isSuccess && !hasVoted) {
      updateStats();
    }
    
  }, [voteMutation, refetch, hasVoted]);

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <h1 className="mt-auto text-4xl text-center">Keep One, Leave One: Pokemon Edition</h1>
        <div className="flex items-center justify-center w-full gap-12 pt-12 text-4xl ">
          {pokePair ? (
            <>
              <PokemonDisplay pokemon={pokePair.first} vote={() => {vote({voteFor: pokePair.first.code, voteAgainst: pokePair.second.code});}} disabled={hasVoted}/>
              <p>VS.</p>
              <PokemonDisplay pokemon={pokePair.second} vote={() => {vote({voteFor: pokePair.second.code, voteAgainst: pokePair.first.code});}} disabled={hasVoted}/>
            </>
          ) : (
            "Loading..."
          )}
        </div>
            {hasVoted && pokePair &&
            <>
              <PokeStats reset={reset} left={pokePair.first} right={pokePair.second}/>
            </>}
      </main>
    </>
  );
};
export default Home;
