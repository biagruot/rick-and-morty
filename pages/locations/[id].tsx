import React from "react";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
import Location from "@/services/location";
import Character from "@/services/character";
import { CharacterType } from "@/types/character";
import { LocationType } from "@/types/location";
import LocationDetails from "@/components/layout/features/locations/LocationDetails";

import CharacterCard from "@/components/layout/features/characters/CharacterCard";

function getCharactersIds(characters: string[] | undefined) {
  return characters?.map(
    (urlCharacter) => +urlCharacter?.split("/character/")[1]
  );
}

export async function getStaticPaths() {
  return { paths: [{ params: { id: "1" } }], fallback: true };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string }>) {
  const locationData = await Location.getById(+(params?.id || 0));
  const ids = getCharactersIds(locationData?.residents) || [];
  let charactersData = await Character.getByIds(ids);

  //convert to array
  if (ids.length === 1) {
    const array = [];
    array.push(charactersData);
    charactersData = array;
  }
  return { props: { locationData, charactersData }, revalidate: 10 * 60 };
}

type LocationPageType = {
  locationData: LocationType;
  charactersData: CharacterType[];
};

function LocationPage({ locationData, charactersData }: LocationPageType) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full p-6">
      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <>
          <LocationDetails data={locationData} />
          <h3 className={"font-medium text-2xl mt-4"}>Resident List:</h3>
          <div className="flex flex-row flex-wrap w-full h-full gap-8 p-8">
            {charactersData &&
              charactersData.length > 0 &&
              charactersData?.map((character) => (
                <CharacterCard {...character} key={character?.id} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default LocationPage;
