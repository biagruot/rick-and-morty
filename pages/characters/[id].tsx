import CharacterDetails from "@/components/layout/features/characters/CharacterDetails";
import EpisodeList from "@/components/layout/features/episodes/EpisodeList";
import Character from "@/services/character";
import Episode from "@/services/episode";
import { CharacterType } from "@/types/character";
import { EpisodeType } from "@/types/episode";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

export function getEpisodesIds(episodes: string[] | undefined) {
  return episodes?.map((urlEpisode) => +urlEpisode?.split("/episode/")[1]);
}

export async function getStaticPaths() {
  const characters = await Character.get("?page=1");
  const countPages = characters.info.count;
  const paths = [];

  for (let id = 1; id < countPages; id++)
    paths.push({ params: { id: id.toString() } });

  return { paths: paths, fallback: true };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string }>) {
  const characterData = await Character.getById(+(params?.id || 0));
  const ids = getEpisodesIds(characterData?.episode) || [];
  let episodesData = await Episode.getByIds(ids);

  if (ids.length === 1) {
    const array = [];
    array.push(episodesData);
    episodesData = array;
  }

  return { props: { characterData, episodesData }, revalidate: 3600 * 24 };
}

type CharacterPageType = {
  characterData: CharacterType;
  episodesData: EpisodeType[];
};

function CharacterPage({ characterData, episodesData }: CharacterPageType) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full p-6">
      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <>
          <CharacterDetails data={characterData} />
          <h3 className={"font-medium text-2xl mt-6 mb-6"}>Episode List:</h3>
          <EpisodeList data={episodesData} />
        </>
      )}
    </div>
  );
}

export default CharacterPage;
