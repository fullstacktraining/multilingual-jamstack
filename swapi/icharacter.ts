export default interface ICharacter {
  _id: string;
  name: string;
  role: string;
  alliance: string;
  species: string;
  gender?: string;
  height: number;
  weapon?: string;
  homeworld?: string;
  bio: string;
  image: string;
}
