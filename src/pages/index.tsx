import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const pokemon = trpc.useQuery(["pokemon.getByCode", {code: 120}]);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <main>
        <div className="pt-12 text-4xl flex justify-center items-center w-full">
          {pokemon.data ? 
            <>
              <div>
                <h3 className="text-center">{pokemon.data.name}</h3>
                <Image 
                  src={pokemon.data.sprite}
                 alt={`Image of ${pokemon.data.name}`}
                 width={256}
                 height={256}
                 layout="fixed"/>
              </div>
            </>
          : "Loading..."}
        </div>
      </main>
    </>
  );
};
export default Home;