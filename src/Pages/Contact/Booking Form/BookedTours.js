import React from "react";
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
    isError,
    error,
    refetch,
  } = useQuery(["tours", userId], () => BookedToursServices(userId), {
    enabled: !!userId,
  });
  console.log("tours: ", data);

  const deleteTourHandler = async (userId, tourId) => {
    const deleteRef = doc(store, `${userId}/booking/tours/${tourId}`);
    try {
      await deleteDoc(deleteRef);
      refetch(userId);
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting tour, please try again");
    }
  };

  let TOURS;

  if (!user) {
    TOURS = <p>Authenticate to see booked tours</p>;
  } else if (isLoading) {
    TOURS = <p>Loading</p>;
  } else if (isError || isLoadingError || isRefetchError) {
    TOURS = (
      <div>
        <p>{error.message}</p>
        <button type="button" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  } else if (data == null) {
    TOURS = <p>No booked tours</p>;
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
      <div className="grid">{TOURS}</div>
    </div>
  );
}
