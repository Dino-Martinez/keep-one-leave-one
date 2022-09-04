import { createRouter } from "./context";
import { z } from "zod";
import { prisma } from "../db/client";
import { Pokemon } from "@prisma/client";

const checkForPokemon =async (code: number) => {
  const pokemonFromDb = await prisma.pokemon.findFirst({
    where: {code: code},
  });

  if (pokemonFromDb)
    return pokemonFromDb;
  
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${code}`);
  const json = await res.json();
  return await prisma.pokemon.create({
    data: {
      name: json.name,
      sprite: json.sprites?.front_default,
      code: code
    }
  });
};

export const pokemonRouter = createRouter()
  .query("getPokemonPair", {
    input: z
      .tuple([
        z.number(),
        z.number()
      ]),
      async resolve({input}) {
        const [firstId, secondId] = input;
        const pokePair: [Pokemon, Pokemon] = [await checkForPokemon(firstId), await checkForPokemon(secondId)];
        if (pokePair.length < 2) throw new Error("Failed to find two pokemon");
        return {first: pokePair[0], second: pokePair[1]};
      }
  })
  .mutation("vote",{
    input: z
    .object({
      voteFor: z.number(),
      voteAgainst: z.number()
    }),
    async resolve ({input}) {
      const winner = await prisma.pokemon.update({
        where: {code: input.voteFor},
        data: {
          kept: {
            increment: 1
          }
        }
      });

      const loser = await prisma.pokemon.update({
        where: {code: input.voteAgainst},
        data: {
          left: {
            increment: 1
          }
        }
      });

      return {winner, loser};
    }
  });
