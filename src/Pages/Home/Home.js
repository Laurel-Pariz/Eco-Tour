import CardComponent from "../../Components/Card";
import { AppState } from "../../Store/context";
import { discoverCameroon } from "../../Components/Data/data";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = AppState();
  console.log("userInformation: ", user);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="mb-8">
        <h1 className="text-gray-900 text-2xl uppercase font-medium">
          Touristic Sites
          <span className="text-red-500"> in Cameroon</span>
        </h1>

        <p className="text-gray-900 text-lg">
          Cameroon is a choice destination with a lot of attractions for any
          visitor. The country has a lot of natural attractions and many other
          phenomena that are not found anywhere else in the world, making it
          possible to have various categories of tourism.
        </p>

        <hr className="my-4" />

        <h1 className="text-gray-900 uppercase text-2xl font-medium">Heritage Sites</h1>

        <p className="text-gray-900 text-lg">
          Cameroon is one of the older countries of Africa and therefore has a
          lot of cites that can claim to be labelled as World Heritage Sites.
          There are several rich, historical, cultural and unusual attractions
          in Cameroon that form part of Cameroon's heritage. The diversity of
          languages, about 250 spoken by about 18 million people is in itself
          one of Cameroon's great cultural heritages. The list below are just
          some of the sites we want to you discover. We also advice you to get
          your cameras ready for in Cameroon there is so much to see and
          discover.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {discoverCameroon.map((discover) => (
          <CardComponent
            key={discover.title}
            img={discover.image}
            title={discover.title}
            text={discover.text}
          />
        ))}
      </div>

      <Link to="/our-tours">Book Tour(s)</Link>

      <p>User Email : {user?.email}</p>
      <p>User Name : {user?.displayName}</p>
    </div>
  );
}
