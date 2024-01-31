"use client";
import { useEffect, useState } from "react";
import Add from "./Add";

const Dashboard = (props) => {
  const [plants, setPlants] = useState([]);

  const refreshList = () => {
    props.client.getPlants(props.token).then((response) => {
      setPlants(response.data);
    });
  };

  const removePlant = (id) => {
    props.client.deletePlant(id, props.token).then(() => {
      refreshList();
    });
  };

  const waterPlant = (id) => {
    props.client.waterPlant(id, props.token).then(() => {
      refreshList();
    });
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <>
    <div className="min-h-screen text-center flex flex-col items-center">
        <p className="text-5xl p-10 it font-bold">Plant Pals</p>
        <Add
        client={props.client} refreshList={() => refreshList()} token={props.token}>
        </Add>
    <div className="flex flex-col md:flex-row md:justify-center flex-wrap text-center ">
      
   
        {plants.map((plant) => (
            <div className="flex flex-col gap-4 w-3/12 p-10 m-4 rounded-lg bg-slate-200">
                <h1 className="font-bold text-2xl">{plant.name}</h1>
                
                <div className="h-60 overflow-hidden">

                <img className="object-cover w-full h-full" src={plant.image} alt={plant.name} /> 
                </div>
                
                <p className="italic text-xl">{plant.sciName}</p>
                <p className="font-bold text-xl">Water every: {plant.waterFrequency} days</p>
                <p className="text-xl">Water a {plant.waterAmount} amount</p>
                {
                  (plant.lastWateredDate === 0 || plant.lastWateredDate === null || plant.lastWateredDate === "1970-01-01T00:00:00.000Z") ? (
                    <p className="text-xl">Never watered</p>
                  ) : (
                    <p className="text-xl">
                      Last watered{' '}
                      {(() => {
                        const today = new Date();
                        const lastWatered = new Date(plant.lastWateredDate);
                        return Math.round(
                          (today.getTime() - lastWatered.getTime()) / (1000 * 3600 * 24)
                        );
                      })()}{' '}
                      days ago
                    </p>
                  )
                }

                
                {
                    (() => {
                    const today = new Date();
                    const lastWatered = new Date(plant.lastWateredDate);
                    return Math.round((today.getTime() - lastWatered.getTime()) / (1000 * 3600 * 24));
                    })() > plant.waterFrequency ? (
                        <div className="bg-red-500 p-2 rounded text-white">
                        <p>Needs water!</p>
                        </div>
                    ) : null
                }
                <div className="flex flex-row gap-10 text-center justify-center pt-6">
                <button onClick={() => waterPlant(plant._id, props.token)} className="bg-cyan-500 text-white rounded p-2 hover:bg-cyan-900">Water</button>
                <button onClick={() => removePlant(plant._id, props.token)} className="bg-red-500 text-white rounded p-2 hover:bg-red-900">Delete</button>
                </div>
            </div>
        ))}
        </div>
       
        </div>
    </>
  )
}

export default Dashboard;