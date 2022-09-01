import { createRouter } from "./context";
import { z } from "zod";
export const pokemonRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.pokemon.findMany();
    },
  })
  .query("getByCode", {
    input: z
      .object({
        code: z.number()
      }),
    async resolve({ctx, input}) {
      console.log('code: ', input.code);
      const pokemonFromDb = await ctx.prisma.pokemon.findFirst({
        where: {code: input.code},
      });

      console.log('pokemon: ', pokemonFromDb);
      if (pokemonFromDb)
        return pokemonFromDb;

      console.log('could not find pokemon. fetching...', `https://pokeapi.co/api/v2/pokemon/${input.code}`);
      
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.code}`);
      const json = await res.json();
      return await ctx.prisma.pokemon.create({
        data: {
          name: json.name,
          sprite: json.sprites?.front_default,
          code: input.code
        }
      });
    }
  })
  .mutation("vote",{
    input: z
    .object({
      voteFor: z.number(),
      voteAgainst: z.number()
    }),
    async resolve ({ctx, input}) {
      const winner = await ctx.prisma.pokemon.update({
        where: {code: input.voteFor},
        data: {
          kept: {
            increment: 1
          }
        }
      });

      const loser = await ctx.prisma.pokemon.update({
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
