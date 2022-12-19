import { PaginationInfoType } from "./shared";

export type CharacterType = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: LocationShortType;
  location: LocationShortType;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type LocationShortType = {
  name: string;
  url: string;
};

export type CharactersResponseType = {
  info: PaginationInfoType;
  results: CharacterType[];
};
