const HIGHEST_CODE = 151;

export const getRandomCode: (exclusion?: number) => number = (exclusion) => {
    const pokedexCode = Math.floor(Math.random() * HIGHEST_CODE) + 1;

    if (pokedexCode !== exclusion) return pokedexCode;
    return getRandomCode(exclusion);
};

export const getPokedexCodes = (): [number, number] => {
    const firstId: number = getRandomCode();
    const secondId: number = getRandomCode(firstId);
    return [firstId, secondId];
};