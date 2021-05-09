import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Moment from "react-moment";

const LAUNCH_QUERY = gql`
  query LaunchQuery($id: String!) {
    launch(id: $id) {
      name
      flight_number
      date_local
      success
      rocket
      details
      rocketInfo {
        name
        type
        id
        stages
        cost_per_launch
      }
    }
  }
`;

const Launch = ({ match }) => {
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { id: match.params.id },
  });

  return (
    <>
      <h1>Launch</h1>
      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        console.log(error)
      ) : (
        <div>
          <h1 className="display-4 my-3 ">
            <span className="text-dark">Mission:</span> {data.launch.name}
          </h1>
          <h4 className="mb-3">Launch Details</h4>
          <ul className="list-group text-light">
            <li className="list-group-item list-group-item-action">
              Flight Number: {data.launch.flight_number}
            </li>
            <li className="list-group-item list-group-item-action">
              Launch Year:{" "}
              <Moment format="YYYY">{data.launch.date_local}</Moment>
            </li>
            <li className="list-group-item list-group-item-action">
              Launch Successful:{" "}
              <span
                className={classNames({
                  "text-success": data.launch.success,
                  "text-danger": !data.launch.success,
                })}
              >
                {data.launch.success ? "Yes" : "No"}
              </span>
            </li>
            <li className="list-group-item list-group-item-action">
              Details:
              <br />
              {data.launch.details}
            </li>
          </ul>
          <h4 className="my-3">Rocket Details</h4>
          <ul className="list-group">
            <li className="list-group-item list-group-item-action">
              Rocket ID: {data.launch.rocketInfo.id}
            </li>
            <li className="list-group-item list-group-item-action">
              Rocket Name: {data.launch.rocketInfo.name}
            </li>
            <li className="list-group-item list-group-item-action">
              Rocket Type: {data.launch.rocketInfo.type}
            </li>
            <li className="list-group-item list-group-item-action">
              Rocket Stages: {data.launch.rocketInfo.stages}
            </li>
            <li className="list-group-item list-group-item-action">
              Cost Per Launch:{" "}
              {Intl.NumberFormat("us", {
                style: "currency",
                currency: "USD",
              }).format(data.launch.rocketInfo.cost_per_launch)}
            </li>
          </ul>
          <hr />
          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
        </div>
      )}
    </>
  );
};

export default Launch;
