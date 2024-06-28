import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
} from "firebase/firestore";
import { store } from "../Configs/firebase";

export const BookedToursServices = async (userId) => {
  try {
    const db = store;
    const toursRef = collection(db, userId + "/booking/" + "tours");
    const q = query(toursRef);
    const querySnapshot = await getDocs(q);

    const bookedTours = [];
    querySnapshot.forEach((doc) => {
      bookedTours.push({
        id: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        email: doc.data().email,
        phone: doc.data().phone,
        country: doc.data().country,
        city: doc.data().city,
        arrivalDate: doc.data().arrivalDate,
        message: doc.data().message,
        selectTour: doc.data().selectTour,
        travelMode: doc.data().travelMode,
        numberOfParticipants: doc.data().numberOfParticipants,
        airportArrival: doc.data().airportArrival,
        arrivalTime: doc.data().arrivalTime,
        timeOfTourPlaced: doc.data().timeOfTourPlaced,
        dayOfTourPlaced: doc.data().dayOfTourPlaced,
      });
    });
    return bookedTours;
  } catch (err) {
    return Promise.reject(err instanceof Error ? err : new Error(err));
  }
};

export const BookedTourService = async (userId, tourId) => {
  try {
    const tourRef = doc(store, userId + "/booking/" + "tours/" + tourId);
    const tourSnapshot = await getDoc(tourRef);

    if (tourSnapshot.exists()) {
      const bookedTour = {
        id: tourId,
        firstName: tourSnapshot.data().firstName,
        lastName: tourSnapshot.data().lastName,
        email: tourSnapshot.data().email,
        phone: tourSnapshot.data().phone,
        country: tourSnapshot.data().country,
        city: tourSnapshot.data().city,
        arrivalDate: tourSnapshot.data().arrivalDate,
        message: tourSnapshot.data().message,
        selectTour: tourSnapshot.data().selectTour,
        travelMode: tourSnapshot.data().travelMode,
        numberOfParticipants: tourSnapshot.data().numberOfParticipants,
        airportArrival: tourSnapshot.data().airportArrival,
        arrivalTime: tourSnapshot.data().arrivalTime,
        timeOfTourPlaced: tourSnapshot.data().timeOfTourPlaced,
        dayOfTourPlaced: tourSnapshot.data().dayOfTourPlaced,
      };
      return bookedTour;
    } else {
      return null || "Error loading tour details";
    }
  } catch (error) {
    return Promise.reject(error instanceof Error ? error : new Error(error));
  }
};
