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
      const pokemonFromDb = await ctx.prisma.pokemon.findFirst({
        where: {code: input.code},
      });
      if (pokemonFromDb)
        return pokemonFromDb;
      
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
  });
