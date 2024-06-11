"use client";

import RingLoader from "react-spinners/RingLoader";

const override = {
  display: "block",
  margin: "100px auto",
};
const LoadingPage = ({ loading }) => {
  return (
    <RingLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;
