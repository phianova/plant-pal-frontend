"use client";
import { useEffect, useState } from "react";
import Add from "./Add";

const Dashboard = (props) => {
  const [plants, setPlants] = useState([]);
  //const [current, setCurrent] = useState(undefined);
  // gets the plants from the backend and updates the state in this file

  const refreshList = () => {
    props.client.getPlants().then((response) => {
      setPlants(response.data);
    });
  };

  // removes the advert and then calls refresh list so that the list of plants
  //  is updated and doesnt include the ad that the user just deleted.

  const removePlant = (id) => {
    props.client.deletePlant(id).then(() => {
      refreshList();
    });
  };

  const waterPlant = (id) => {
    props.client.waterPlant(id).then(() => {
      refreshList();
    });
  };

  // take an ad from a child component and then we will set the current state to that at
  // so that we can edit it later on

//   const updateAdvert = (ad) => {
//     setCurrent(ad);
//   };

  // this function is called when the component renders and it calls the refresh list function
  // that allows us to see the plants from the db (useeffect)

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <>
        <p>Dashboard</p>
        {plants.map((plant) => (
            <div>
                <h1>{plant.name}</h1>
                <p>{plant.sciName}</p>
                <p>Water every {plant.waterFrequency} days</p>
                <p>Water a {plant.waterAmount} amount</p>
                <p>Last watered {plant.lastWateredDate}</p>
                <button onClick={() => waterPlant(plant._id)}>Water</button>
                <button onClick={() => removePlant(plant._id)}>Delete</button>
            </div>
        ))}
        <Add
        client={props.client} refreshList={() => refreshList()}>
        </Add>

    </>
  )
}

export default Dashboard;