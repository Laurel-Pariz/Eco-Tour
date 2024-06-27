import { Link } from "react-router-dom";
import { tourAttractionsInfo } from "../../Components/Data/data";

export default function Tours() {
  const handleEmailEvent = (e) => {
    e.preventDefault();
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=camecotour@gmail.com",
      "_blank"
    );
  };

  return (
    <div className="mx-20 px-20 mt-8">
      <h1 className="text-4xl text-center mb-4 text-gray-800 font-medium">
        Our <span className="text-red-500">Tours</span>{" "}
      </h1>
      <div className="text-lg mb-4">
        <p className="my-4">
          Also known as 'Africa in Miniature', Cameroon may not be the tourist
          destination that jumps to your mind but it offers everything you want
          to see on the African continent. From its lush rainforests and
          breathtaking waterfalls to its diverse wildlife and rich cultural
          heritage, Cameroon promises an unforgettable adventure for all kinds
          of travelers.
        </p>
        <p className="my-4">
          If you have specific tours in mind or if you wish to visit particular
          attractions or touristic sites that are not part of our tours, do not
          hesitate to{" "}
          <span className="text-red-500">
            <Link to="mailto:camecotour@gmail.com" onClick={handleEmailEvent}>
              contact us
            </Link>
          </span>
          . We are dedicated to providing you with a tailored experience that
          matches your interests and preferences.
        </p>
        <p className="font-bold">
          NB: Our tours can be modified to meet the needs of our visitors.
        </p>
      </div>
      {tourAttractionsInfo.map((site, index) => (
        <div key={index} className="mt-10" style={{ marginBottom: "20px" }}>
          <div>
            <img
              src={site.image}
              alt={site.name}
              style={{ width: "70rem", height: "25rem" }}
            />
          </div>
          <div className="mt-8 text-xl flex justify-around">
            <div>
              <p className="my-2">
                Tour:{" "}
                <span className="text-red-500">Eco-Tour in {site.name}</span>
              </p>
              <p className="my-2">
                Duration: <span className="text-red-500">{site.duration}</span>
              </p>
              <p className="my-2">
                Price:{" "}
                <span className="text-red-500">{site.price3Persons}</span>
              </p>
              <p className="my-2">
                Price:{" "}
                <span className="text-red-500">{site.price2Persons}</span>
              </p>
              <p className="my-2">
                Start:{" "}
                <span className="text-red-500">{site.startLocation}</span>
              </p>
              <p className="my-2">
                End: <span className="text-red-500">{site.endLocation}</span>
              </p>
            </div>
            <div>
              <p className="my-2">Attractions: </p>
              <ul>
                {site.attractions.map((attraction, idx) => (
                  <li className="my-2" key={idx}>
                    ° <span className="text-red-500">{attraction}</span>
                  </li>
                ))}
              </ul>
              <p className="my-2">Departures:</p>
              <p className="grid text-red-500">
                <span>XXX</span>
                <span>XXX</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
