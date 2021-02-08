import { httpGetJson, registerPlugin, ScullyConfig } from '@scullyio/scully';
import ICharacter from 'src/app/icharacter';

const getAllCharacters = async () => {
  const characters: ICharacter[] = (await httpGetJson(
    'http://localhost:4000/characters'
  )) as ICharacter[];

  const r = characters.map((character) => {
    return {
      route: `/characters/${character._id}`,
    };
  });
  return r;
};

registerPlugin('router', 'getAllCharacters', getAllCharacters);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'myApp',
  outDir: './dist/static',
  routes: {
    '/characters/:id': {
      type: 'getAllCharacters',
    },
  },
};
