import { RouterContext } from 'https://deno.land/x/oak@v6.5.0/router.ts';
import ICharacter from './icharacter.ts';
import { characters } from './characters.ts';

export const routes = {
  getCharacters: ({ response }: RouterContext) => {
    response.body = characters;
  },
  getCharacter: ({ response, params }: RouterContext) => {
    const character = characters.filter(
      (characters: ICharacter) => characters._id === params.id
    );
    response.body = character[0];
  },
};
