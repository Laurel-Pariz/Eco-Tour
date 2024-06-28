import React from "react";
import { useQuery } from "react-query";

export default function BookedTours() {
  const { data = [], isLoading, isError, error, refetch } = useQuery();

  return (
    <div>
      <h1>Booked Tours Page</h1>
    </div>
  );
}
