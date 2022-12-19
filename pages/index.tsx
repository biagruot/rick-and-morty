import React from "react";
import { CharactersResponseType } from "@/types/character";
import { NextRouter, useRouter } from "next/router";
import { useQuery } from "react-query";
import Character from "@/services/character";
import CharacterCard from "@/components/layout/features/characters/CharacterCard";
import { ROUTES } from "@/utils/constants";
import Pagination from "@/components/Pagination";

function useCharactersQuery(page?: number) {
  const queryString = `?page=${page}`;

  return useQuery<CharactersResponseType>(
    ["characters", queryString],
    () => Character.get(queryString),
    {
      enabled: !!page && page > 0,
    }
  );
}

export const getPageQueryParam = (router: NextRouter) => {
  return Number(router.query?.page) || 1;
};

function CharactersPage() {
  const router = useRouter();

  const { isLoading, isError, data, error, isSuccess } = useCharactersQuery(
    getPageQueryParam(router)
  );

  const errorMessage: string | undefined = error?.toString();

  const handlePagination = (pageNumber: number | null) => {
    const queryPage = pageNumber || 0;

    if (pageNumber)
      router
        .push(`${ROUTES.HOME}?page=${queryPage}`, undefined, {
          shallow: true,
        })
        .then();
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <>
          <section>
            <div className="flex flex-row flex-wrap w-full h-full gap-8 p-8">
              {data?.results?.length > 0 &&
                data.results.map((character) => (
                  <CharacterCard {...character} key={character?.id} />
                ))}
            </div>
          </section>
          <Pagination info={data?.info} handlePagination={handlePagination} />
        </>
      )}
      {isError && <div>{errorMessage}</div>}
    </>
  );
}

export default CharactersPage;
