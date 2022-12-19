import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/utils/constants";
import { CharacterType } from "@/types/character";

function CharacterCard({ id, name, image }: CharacterType) {
  return (
    <div className="flex flex-col shadow-lg rounded-lg hover:shadow-gray-900/40">
      <Image
        height={250}
        width={250}
        src={image}
        alt={name}
        placeholder="blur"
        blurDataURL="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        className="rounded-lg"
      />
      <div className="p-4">
        <Link href={`${ROUTES.CHARACTERS}/${id}`}>
          <h3 className="text-base font-bold text-gray-900">{name}</h3>
        </Link>
        <Link href={`${ROUTES.CHARACTERS}/${id}`}>
          <h4 className="text-sm font-normal text-blue-600">Details</h4>
        </Link>
      </div>
    </div>
  );
}

export default CharacterCard;
