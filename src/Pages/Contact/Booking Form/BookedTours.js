import React, { useState } from "react";
import { useQuery } from "react-query";
import { BookedToursServices } from "../../../Services/service";
import { AppState } from "../../../Store/context";
import TourCard from "./components/TourCard";
import { deleteDoc, doc } from "firebase/firestore";
import { store } from "../../../Configs/firebase";

export default function BookedTours() {
  const { user } = AppState();
  const userId = user?.uid;

  const {
    data = [],
    isLoading,
    isLoadingError,
    isRefetchError,
    isRefetching,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery(["tours", userId], () => BookedToursServices(userId), {
    enabled: !!userId,
  });

  const deleteTourHandler = async (userId, tourId) => {
    const deleteRef = doc(store, `${userId}/booking/tours/${tourId}`);
    try {
      await deleteDoc(deleteRef);
      refetch(userId);
    } catch (error) {
      console.error(error);
      throw new Error("Error delete tour, try again");
    }
  };

  let TOURS;

  if (!user) {
    TOURS = <p>Authenticate to see booked tours</p>;
  } else if (isLoading ) {
    TOURS = <p>Loading</p>;
  } else if (isError || isLoadingError || isRefetchError) {
    TOURS = (
      <div>
        <p>{error}</p>
        <button type="button" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  } else {
    TOURS = data.map((tours) => (
        <TourCard
        deleteHandler={() => deleteTourHandler(userId, tours.id)}
        key={tours.id}
        tourData={tours}
      />
    ));
  }

  return (
    <div className="mx-20 px-20">
      <h1>Booked Tours Page</h1>
      <div className="grid">
        {TOURS}
      </div>
    </div>
  );
}
