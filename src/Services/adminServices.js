import { supabase } from "../Configs/supabase";

export const fetchUserProfiles = async () => {
  const { data, error } = await supabase.from("userProfiles").select("*");

  if (error) {
    console.error("fetch UserProfiles service: ", error.message);
    throw error;
  }

  const ecoTourUsers = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      ecoTourUsers.push({
        id: data[key].id,
        name: data[key].name,
        user: data[key].user,
      });
    }
  }

  return ecoTourUsers;
};

export const EcoToursBookedTours = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("booked_tours")
      .select("*")
      .eq("userId", userId);

    if (error) throw error;

    const bookedTours = data.map((tour) => ({
      tour_id: tour.tour_id,
      firstName: tour.firstName,
      lastName: tour.lastName,
      email: tour.email,
      phone: tour.phone,
      country: tour.country,
      city: tour.city,
      dateOfArrival: tour.dateOfArrival,
      message: tour.message,
      selectTour: tour.selectTour,
      travelMode: tour.travelMode,
      numberOfParticipants: tour.numberOfParticipants,
      airportOfArrival: tour.airportOfArrival,
      timeOfArrival: tour.timeOfArrival,
      created_at: tour.created_at,
      price: tour.price,
    }));

    return bookedTours;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
