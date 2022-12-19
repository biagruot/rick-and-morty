import { EpisodeType } from "@/types/episode";
import React from "react";

function EpisodeList({ data }: { data?: EpisodeType[] }) {
  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {data &&
        data.length > 0 &&
        data?.map(({ id, name, episode }) => (
          <div
            key={id}
            className="w-fit rounded-md bg-gray-100 group-hover:opacity-80"
          >
            <div className="text-md font-medium text-gray-700 p-4">
              {name}
              {<p className="mt-1 text-sm text-gray-500">{episode}</p>}
            </div>
          </div>
        ))}
    </div>
  );
}

export default EpisodeList;
