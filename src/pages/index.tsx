import type { NextPage } from "next";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { PokemonDisplay } from "../components/Pokemon";

interface Vote {
  voteFor: number,
  voteAgainst: number
}

const Home: NextPage = () => {
  const [hasVoted, setVoted] = useState(false);

  const {data: pokePair, refetch} = trpc.useQuery(["pokemon.getPokemonPair"], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const voteMutation = trpc.useMutation("pokemon.vote");
  const vote = async (input: Vote) => {
    await voteMutation.mutate(input);
    setVoted(true);
  };

  const reset = () => {
    setVoted(false);
    refetch();
  };

  return (
    <>
      <main>
        <h1 className="mt-auto text-4xl text-center">Keep One, Leave One: Pokemon Edition</h1>
        <div className="flex items-center justify-center w-full gap-12 pt-12 text-4xl ">
          {pokePair ? (
            <>
              <PokemonDisplay pokemon={pokePair.first} vote={() => {vote({voteFor: pokePair.first.code, voteAgainst: pokePair.second.code});}}/>
              <p>VS.</p>
              <PokemonDisplay pokemon={pokePair.second} vote={() => {vote({voteFor: pokePair.second.code, voteAgainst: pokePair.first.code});}}/>
            </>
          ) : (
            "Loading..."
          )}

            {hasVoted && 
            <>
              <p>{pokePair?.first.kept}</p>
              <p>{pokePair?.first.left}</p>
              <p>{pokePair?.second.kept}</p>
              <p>{pokePair?.second.left}</p>
              <button onClick={reset}>Next</button>
            </>
            }

        </div>
      </main>
    </>
  );
};
export default Home;
