import CameroonRegions from "../Pages/About Cameroon/Cameroon-Regions/CameroonRegions";
import Home from "../Pages/Home/Home";
import Tours from "../Pages/Tours/Tours";
import Culture from "../Pages/About Cameroon/Culture-Language-Religion/Culture";
import VisaHealth from "../Pages/Travel Guide/Visa-Health/VisaHealth";
import GeneralInformation from "../Pages/Travel Guide/General Information/GeneralInformation";
import AboutUs from "../Pages/Contact/AboutUs/AboutUs";
import BookingForm from "../Pages/Contact/Booking Form/BookingForm";

export const AppRoutes = [
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/Our-tours",
    element: <Tours />,
  },
  {
    path: "/cameroon-regions",
    element: <CameroonRegions />,
  },
  {
    path: "/culture-language-religion",
    element: <Culture />,
  },
  {
    path: "/visa-health-safety",
    element: <VisaHealth />,
  },
  {
    path: "/general-information",
    element: <GeneralInformation />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/booking-form",
    element: <BookingForm />,
  },
];
