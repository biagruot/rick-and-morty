import React from "react";
import { CharacterType, LocationShortType } from "@/types/character";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/utils/constants";
import FieldDetails from "../../../shared/FieldDetails";

function getLocationId(urlLocation?: string) {
  return urlLocation?.split("/location/")[1];
}

function CharacterDetails({ data }: { data?: CharacterType }) {
  const { image, gender, status, species, name, origin, location } = data || {};

  const getLocationValue = (location?: LocationShortType) =>
    location?.url !== "" ? (
      <Link href={`${ROUTES.LOCATIONS}/${getLocationId(location?.url)}`}>
        <p className="text-md text-blue-500 sm:text-lg">{location?.name}</p>
      </Link>
    ) : (
      <p className="text-md text-gray-800 sm:text-lg">{location?.name}</p>
    );

  return (
    <div className="flex justify-evenly">
      <div>
        <h2 className="text-xl font-mediumbold">{name}</h2>

        <section className="mt-4">
          <FieldDetails label={"Status:"} value={status} />
          <FieldDetails label={"Gender:"} value={gender} />
          <FieldDetails label={"Species:"} value={species} />
          <FieldDetails label={"Origin Location:"}>
            {getLocationValue(origin)}
          </FieldDetails>
          <FieldDetails label={"Last Location:"}>
            {getLocationValue(location)}
          </FieldDetails>
        </section>
      </div>

      <div className="lg:row-span-2">
        <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
          <Image
            height={300}
            width={300}
            src={image || ""}
            alt={"name"}
            className="w-full h-full object-center object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
