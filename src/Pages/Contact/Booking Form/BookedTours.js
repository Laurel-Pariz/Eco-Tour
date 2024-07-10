import React, { useState } from "react";
import { useQuery } from "react-query";
import { BookedToursServices } from "../../../Services/service";
import { AppState } from "../../../Store/context";
import TourCard from "./components/TourCard";
import { deleteDoc, doc } from "firebase/firestore";
import { store } from "../../../Configs/firebase";
import { supabase } from "../../../Configs/supabase";

export default function BookedTours() {
  const { user } = AppState();
  const userId = user?.user.id;
  console.log("booked_tour id: ", userId);

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

  console.log("booked_tours data: ", data);

  const deleteTourHandler = async (userId, tourId) => {
    try {
      const { error } = await supabase
        .from("booked_tours")
        .delete()
        .eq("userId", userId)
        .eq("tour_id", tourId);

      if (error) throw error;

      await refetch();
      alert("Delete successful");
    } catch (error) {
      console.error(error);
      alert("Error deleting tour, try again");
      throw new Error("Error deleting tour, try again");
    }
  };

  const renderBookedTours = () => {
    if (!user) {
      return (
        <p className="text-xl font-medium m-20 p-20 text-center">
          Authenticate to see booked tours
        </p>
      );
    } else if (isLoading) {
      return <p>Loading</p>;
    } else if (isError || isLoadingError || isRefetchError) {
      return (
        <div className="text-xl font-medium m-20 p-20 text-center">
          <p>{error.message}</p>
          <button type="button" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      );
    } else if (data.length === 0) {
      return (
        <p className="text-xl font-medium m-20 p-20 text-center">
          No booked tours
        </p>
      );
    } else {
      return data.map((tour) => (
        <TourCard
          deleteHandler={() => deleteTourHandler(userId, tour.tour_id)}
          key={tour.tour_id}
          tourData={tour}
        />
      ));
    }
  };

  return (
    <div className="mx-20 px-20">
      <div className="grid">{renderBookedTours()}</div>
    </div>
  );
}
