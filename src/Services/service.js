
import { supabase } from "../Configs/supabase";

// /admin/dashboard/home

export const ToursInforServices = async () => {
  try {
    const { data, error } = await supabase.from("tours").select("*");

    if (error) throw error;

    const tours = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        tours.push({
          id: data[key].id,
          tour: data[key].tour,
          price_1: data[key].price_1,
          price_2: data[key].price_2,
        });
      }
    }
    return tours;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const BookedToursServices = async (userId) => {
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
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};

export const BookedTourService = async (userId, tourId) => {
  try {
    const { data, error } = await supabase
      .from("booked_tours")
      .select("*")
      .eq("userId", userId)
      .eq("tour_id", tourId)
      .single();

    if (error) throw error;

    const bookedTour = {
      tour_id: data.tour_id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      city: data.city,
      dateOfArrival: data.dateOfArrival,
      message: data.message,
      selectTour: data.selectTour,
      travelMode: data.travelMode,
      numberOfParticipants: data.numberOfParticipants,
      airportOfArrival: data.airportOfArrival,
      timeOfArrival: data.timeOfArrival,
      created_at: data.created_at,
      price: data.price,
    };

    return bookedTour;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};

