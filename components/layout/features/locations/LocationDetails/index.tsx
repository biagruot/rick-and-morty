import React from "react";
import { LocationType } from "@/types/location";
import FieldDetails from "@/components/layout/shared/FieldDetails";

function LocationDetails({ data }: { data?: LocationType }) {
  const { name, type, dimension } = data || {};

  return (
    <div>
      <h2 className="text-xl font-mediumbold">{name}</h2>
      <section className="mt-4 mb-4">
        <FieldDetails label={"Type:"} value={type} />
        <FieldDetails label={"Dimension:"} value={dimension} />
      </section>
    </div>
  );
}

export default LocationDetails;
