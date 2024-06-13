"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import {
  FaArrowLeft,
  FaBath,
  FaBed,
  FaBookmark,
  FaCheck,
  FaPaperPlane,
  FaMapMarker,
  FaMoneyBill,
  FaRulerCombined,
  FaShare,
} from "react-icons/fa";
import PropertyHeaderImage from "./PropertyHeaderImage";
import Link from "next/link";
import Spinner from "@/components/Spinner";

// get rate display
const SinglePropertyCard = () => {
  // format rates
  const formatRates = (rate) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return formatter.format(rate);
  };

  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch property
    const fetchPropertyData = async () => {
      if (!id) return;

      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.log(` Error fetching property: ${id}`, error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property?.images[0]} />

          {/* <!-- Go Back --> */}
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                    <div className="text-gray-500 mb-4">{property?.type}</div>
                    <h1 className="text-3xl font-bold mb-4">
                      {property?.name}
                    </h1>
                    <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                      <FaMapMarker className="fa-solid fa-location-dot text-lg text-orange-700 mr-2" />
                      <p className="text-orange-700">
                        {property?.location?.city}, {property?.location?.state}
                      </p>
                    </div>

                    <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                      Rates & Options
                    </h3>
                    <div className="flex flex-col md:flex-row justify-around">
                      <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">
                          Nightly
                        </div>
                        {property?.rates?.nightly ? (
                          <p className="text-blue-500 font-bold">
                            {formatRates(property.rates.nightly)}
                          </p>
                        ) : (
                          <p className="text-blue-500 font-bold">N/A</p>
                        )}
                      </div>
                      <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">
                          Weekly
                        </div>
                        {property?.rates?.weekly ? (
                          <p className="text-blue-500 font-bold">
                            {formatRates(property.rates.weekly)}
                          </p>
                        ) : (
                          <p className="text-blue-500 font-bold">N/A</p>
                        )}
                      </div>
                      <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">
                          Monthly
                        </div>
                        {property?.rates?.monthly ? (
                          <p className="text-blue-500 font-bold">
                            {formatRates(property.rates.monthly)}
                          </p>
                        ) : (
                          <p className="text-blue-500 font-bold">N/A</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-lg font-bold mb-6">
                      Description & Details
                    </h3>
                    <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                      <p>
                        <FaBed className="inline-block mr-2" />
                        &nbsp;{property?.beds}
                        <span className="hidden sm:inline-block">Beds</span>
                      </p>
                      <p>
                        <FaBath className="inline-block mr-2" />
                        &nbsp;{property?.baths}
                        <span className="hidden sm:inline-block">Baths</span>
                      </p>
                      <p>
                        <FaRulerCombined className="inline-block mr-2" />
                        &nbsp;
                        {property?.square_feet}
                        <span className="hidden sm:inline-block">sqft</span>
                      </p>
                    </div>
                    <p className="text-gray-600 text-center mb-5 ">
                      {property?.description}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-lg font-bold mb-6">Amenities</h3>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none ">
                      {property?.amenities?.map((amenity) => (
                        <li key={amenity}>
                          <FaCheck className="text-green-600 mr-1 mb-1 inline-block" />{" "}
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <div id="map"></div>
                  </div>
                </main>

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                    <FaBookmark className="mr-2" /> Bookmark Property
                  </button>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                    <FaShare className="mr-2" /> Share Property
                  </button>

                  {/* <!-- Contact Form --> */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">
                      Contact Property Manager
                    </h3>
                    <form>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="phone"
                          type="text"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="message"
                        >
                          Message:
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                          id="message"
                          placeholder="Enter your message"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                          type="submit"
                        >
                          <FaPaperPlane className="mr-2" /> Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
      ;
    </>
  );
};

export default SinglePropertyCard;
