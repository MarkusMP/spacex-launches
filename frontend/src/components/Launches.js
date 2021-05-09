import React from "react";
import { gql, useQuery } from "@apollo/client";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      name
      date_local
      success
      id
    }
  }
`;

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);
  return (
    <>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        console.log(error)
      ) : (
        data.launches.map((launch) => (
          <LaunchItem key={launch.id} launch={launch} />
        ))
      )}
    </>
  );
};

export default Launches;
